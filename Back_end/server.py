from flask_cors import CORS
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from supabase import create_client
from google import genai
from google.genai import types
from services.imagen import imagen
from services.analyze import analyze
from services.aboutDB import sendToDB, load_closet_data, edit_closet_data
from services.flux import flux
from services.loadData import load_all_data, get_bmi, get_trend
import services.loadData as loadData
from PIL import Image
from datetime import datetime
import json
import os
import requests
import pytz
import re
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
    data = request.json
    # 유저 입력 필터링
    raw_userInput = data.get("userInput","")
    trim_text = " ".join(raw_userInput.split())
    clean_text = re.sub(r"[ㄱ-ㅎㅏ-ㅣ]+", "", trim_text).strip()
    forbidden_keywords = ["ignore", "previous instructions", "지침", "시스템", "설정", "프롬프트", "무시" , "instruction", "prompt", "setting", "rule"]
    if len(clean_text) > 50 or len(clean_text) == 0: #글자 길이 확인
        clean_text = "일상생활 룩"
    elif not any(ord('가') <= ord(c) <= ord('힣') or ord('a') <= ord(c.lower()) <= ord('z') for c in clean_text): #유효한 질문인지 확인
        clean_text = "일상생활 룩"
    elif any(keyword in clean_text.lower() for keyword in forbidden_keywords): #금지어가 들어가있는지 확인
        return jsonify({"error":"부적절한 입력", "Code": 500}), 500
    userInput = clean_text
    # 유저 정보 로드
    userInfo = data.get("userInfo")
    userStyle = userInfo.get('userStyle')
    userGender = userInfo.get('gender')
    userHeight = userInfo.get('height')
    userWeight = userInfo.get('weight')
    userBmi = userInfo.get("bmi")
    userId = userInfo.get("userId")
    #유저 정보 필터링
    cleanInfo = {
        "style": userStyle if (userStyle in ["street", "classic", "casual"]) else "casual", 
        "gender": userGender if (userGender in ["Man","Woman"] ) else "Man",
        "height":  userHeight if userHeight is not None and (userHeight < 200 and userHeight >= 100 ) else  170 ,
        "weight":  userWeight if userWeight is not None and (userWeight < 200 and userWeight >= 25 ) else 60,
        "bmi": userBmi if userBmi is not (userHeight/userWeight) else 170/60
        }
    
    #날씨 정보 로드
    weatherData = data.get("userWeather")
    description_weather = weatherData.get("description_weather")
    temp = weatherData.get("temp")
    feels_like = weatherData.get("feels_like")

    #시간 정보 로드
    kst = pytz.timezone('Asia/Seoul')
    now = datetime.now(kst)
    timestamp = now.strftime('%Y-%m-%dT%H:%M:%S%z')

    #최종 유저 정보 로드
    gender = cleanInfo.get("gender")
    height = cleanInfo.get('height')
    weight = cleanInfo.get('weight')
    style = cleanInfo.get('style')
    bmi = cleanInfo.get("bmi")
    physique_info = get_bmi(gender, bmi)  # 체형 데이터
    trend_info = get_trend(gender, style) # 트렌드 데이터
    character = f"{gender} with {physique_info}"
    final_answer_prompt = f"""
    #[SYSTEM_PROMPT]#
    {loadData.SYSTEM_PROMPT}

    #[STYLE_GUIDELINE]#
    {trend_info}

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
            {userInput}
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
    imgUrl = flux(imageData, character, userId)
    
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
if __name__ == "__main__":
    # Render가 주는 PORT 환경변수를 사용하고, 없으면 10000을 사용합니다.
    port = int(os.environ.get("PORT", 10000))
    server.run(host='0.0.0.0', port=port, debug=True)
