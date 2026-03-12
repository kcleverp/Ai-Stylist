from flask_cors import CORS
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from supabase import create_client
from google import genai
from google.genai import types
from services.check_input import check_input
from services.imagen import imagen
from services.analyze import analyze
from services.aboutDB import sendToDB, load_closet_data, edit_closet_data, load_item_data, load_selected_items
from services.flux import flux
from services.loadData import load_all_data, get_bmi, get_trend
import services.loadData as loadData
from PIL import Image
from datetime import datetime
import json
import os
import requests
import pytz
import time

server = Flask(__name__)
CORS(server)
load_dotenv("important.env")
db_url = os.getenv("SUPABASE_DB_URL")
db_key = os.getenv("SUPABASE_DB_API_KEY")
client = genai.Client()
supabase_client = create_client(db_url, db_key)
style_label = ["A"]
is_server = os.environ.get('RENDER') == 'true'
load_all_data(is_server)
OPEN_WEATHER_MAP_API_KEY = os.getenv("OPEN_WEATHER_MAP_API_KEY")
start_time = time.time()

#날씨 정보 수집 로직
@server.route("/weather", methods=["POST"])
def getWeather():
    data = request.json
    lat = data.get("lat")
    lon = data.get("lon")
    openWeatherMapUrl = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPEN_WEATHER_MAP_API_KEY}"
    try:
        openWeatherResponse = requests.get(openWeatherMapUrl)
        weather_data = openWeatherResponse.json()
        weather_list = weather_data.get("weather",[{}])
        description_weather = weather_list[0].get("description","clear sky")
        weatherIcon = f"https://openweathermap.org/img/wn/{weather_list[0].get('icon')}@2x.png"
        main = weather_data.get("main")
        temp = round(main.get("temp") - 273.15, 1)
        feels_like = round(main.get("feels_like") - 273.15,1)
    except Exception as e:
        print(f"날씨 API 에러 발생: {e}")
        return jsonify({"error":"오류", "Code": 500}), 500
    
    weather = {
        "description_weather": description_weather,
        "weatherIcon": weatherIcon,
        "temp": temp,
        "feels_like": feels_like
    }
    
    return jsonify(weather)

#코디 생성 로직
@server.route("/create",methods=["POST"])
def createAnswer():
    start = time.time()
    raw_data = request.json
    data = raw_data.get("data")
    selected_items = raw_data.get("items")
    print(selected_items)
    about_selected = {}
    # 유저 입력 필터링
    raw_user_info = data.get("userInfo")
    raw_user_input = data.get("userInput","")
    user_id = data.get("userId")
    user_input, user_info = check_input(raw_user_input, raw_user_info)
    #날씨 정보 로드
    weatherData = data.get("userWeather")
    description_weather = weatherData.get("description_weather")
    temp = weatherData.get("temp")
    feels_like = weatherData.get("feels_like")

    #시간 정보 로드
    kst = pytz.timezone('Asia/Seoul')
    now = datetime.now(kst)
    timestamp = now.strftime('%Y-%m-%dT%H:%M:%S%z')
    response = load_selected_items(supabase_client=supabase_client, user_id=user_id, selected_items=selected_items)
    print(response)
    #최종 유저 정보 로드
    if(response.get("status") == "success"):
        about_selected = response.get("data")
    gender = user_info.get("gender")
    height = user_info.get('height')
    weight = user_info.get('weight')
    style = user_info.get('style')
    bmi = user_info.get("bmi")
    physique_info = get_bmi(gender, bmi)  # 체형 데이터
    trend_info = get_trend(gender, style) # 트렌드 데이터
    character = f"{gender} with {physique_info}"
    final_answer_prompt = f"""
    #[SYSTEM_PROMPT]#
    {loadData.SYSTEM_PROMPT}

    #[STYLE_GUIDELINE]#
    {trend_info}

    #[USER_SELECTED_ITEM]
    {about_selected}

    #[USER_PHYSICAL_SPEC]#
    - Gender: {gender}
    - Height: {height}cm
    - Weight: {weight}kg
    - Body Description: {physique_info}
    """
    try: 
        t1 = time.time()
        ai_response = client.models.generate_content(
            model = "gemini-2.5-flash",
            contents =f"""
            [weatherCondition]
            Temp:{temp}℃ (Feels like:{feels_like}℃), Sky:{description_weather}

            [User's Message] 
            {user_input}
            """,
            config=types.GenerateContentConfig(
                system_instruction=final_answer_prompt,
                response_mime_type="application/json",
                temperature = 0.5,
            )    
        )
        print("gemini 응답시간",time.time() - t1)
        t2 = time.time()
        raw_ai_response = ai_response.text
        answer = json.loads(raw_ai_response)
    except Exception as e:
        print(f"코디 생성중 오류발생: {e}")
        result = {
        "status": "failed",
        "timestamp":timestamp,
        "data": {
            "recommendation":{
                "style": None,
                "for_image": None,
                "imgUrl": None, 
                },
            },
        }
        return jsonify(result)
    print("코디생성 완료 소요시간:",time.time() - start)
    #이미지 생성 로직
    imageData = answer.get("for_image")
    expected = len(style_label)
    # imgUrl = imagen(imageData, expected, gender, client)
    imgUrl = flux(imageData, character, user_id)
    
    #프론트 엔드로 데이터 파싱 로직
    style_recommendation = answer.get("style_recommendation")
    result = {
        "status": "success",
        "timestamp":timestamp,
        "data": {
            "recommendation":{
                "style": style_recommendation,
                "for_image":imageData,
                "imgUrl": imgUrl, 
            },
        },
    }
    return jsonify(result)

#이미지 재요청 로직
@server.route("/imagen", methods=["POST"])
def create_image():
    data = request.json
    imageData = data.get("for_image")
    gender = data.get("gender")
    expected = len(style_label)
    imgUrl = imagen(imageData, expected, gender, client)
    result = {"status":"success", "imgUrl": imgUrl}
    return jsonify(result)

#이미지 삭제 로직
@server.route("/cleanup", methods=["DELETE"])
def cleanup_image():
    data = request.json
    imgUrl = data.get("imgUrl")
    if (not imgUrl):
        return jsonify({"status": "error", "message": "No path provided"}), 404
    filename = os.path.basename(imgUrl) 
    safe_path = os.path.join("static", filename)
    if os.path.exists(safe_path):
        try:
            os.remove(safe_path)
            result = {
                "status":"success",
                "message":f"imgFile:{safe_path} is deleted"
            }
            return jsonify(result), 200
        except Exception as e:
            result = {
                "status":"error",
                "message":"오류"
            }
            return jsonify(result), 500
    return jsonify({"status": "error", "message": "File not found"}), 404

@server.route("/health", methods=["GET"])
def check_server():
    uptime = int(time.time() - start_time)
    uptime_str = time.strftime("%H,%M,%S", time.gmtime(uptime))
    result = {
        "status":"success",
        "time_stamp":time.time(),
        "uptime":uptime_str
    }
    return jsonify(result)

@server.route("/analyze", methods=["POST"])
def analyzeImage():
    data = request.json
    json_data = analyze(data, client)
    result = sendToDB(json_data, data, supabase_client)
    return result

@server.route("/requestClosetData", methods=["GET"])
def requestClosetData():
    user_id = request.args.get('userId')
    if(not user_id):
        return jsonify({"status": "error", "message": "userId가 필요합니다."}), 400
    response = load_closet_data(supabase_client= supabase_client, user_id= user_id)
    return jsonify(response)

@server.route("/editClosetData", methods=["PATCH"])
def editClosetData():
    data = request.json
    closet_id = data.get("closetId")
    new_name = data.get("newName")
    if (not closet_id or not new_name):
        return jsonify({"status": "error", "message": "closetId와 newName이 모두 필요합니다."}), 400
    response = edit_closet_data(closet_id= closet_id, new_name= new_name, supabase_client= supabase_client)
    return jsonify(response)

@server.route("/requestItemData", methods=["GET"])
def requestItemData():
    auth_header = request.headers.get("Authorization")
    closet_id = request.headers.get("X-Closet-Id")
    if auth_header and auth_header.startswith("Bearer "):
        parts = auth_header.split(" ")
        if len(parts) > 1:
            user_id = parts[1]
        else:
            return jsonify({"error": "유효하지 않은 인증 형식입니다."}), 401
    else:
        return jsonify({"error": "인증 정보가 없습니다."}), 401

    if not closet_id:
        return jsonify({"error": "옷장 ID가 없습니다."}), 400
    
    item_data = load_item_data(supabase_client= supabase_client, user_id= user_id, closet_id= closet_id)

    if(isinstance(item_data, dict) and item_data.get("status") == "error"):
        return jsonify(item_data), 403
    
    return jsonify(item_data)

if __name__ == "__main__":
    # Render가 주는 PORT 환경변수를 사용하고, 없으면 10000을 사용합니다.
    port = int(os.environ.get("PORT", 10000))
    server.run(host='0.0.0.0', port=port, debug=True)
