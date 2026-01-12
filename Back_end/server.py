from flask_cors import CORS
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image
from datetime import datetime
import json
import os
import requests
import pytz



server = Flask(__name__)
CORS(server)
load_dotenv("important.env")
client = genai.Client()

if os.path.exists("prompt.txt"):
    with open("prompt.txt","r",encoding="utf-8") as f:
        SYSTEM_PROMPT = f.read()
else:
    SYSTEM_PROMPT = "지정된 프롬프트 없음 [오류]라고 출력"

if os.path.exists("image_requirements.txt"):
    with open("image_requirements.txt","r",encoding="utf-8") as f:
        image_requirements = f.read()
else:
    image_requirements = "지정된 이미지 프롬프트 없음 [오류]라고 출력"

OPEN_WEATHER_MAP_API_KEY = os.getenv("OPEN_WEATHER_MAP_API_KEY")


@server.route("/create",methods=["POST"])
def createAnswer():
    data = request.json
    userInput = data.get("userInput")
    userInfo = data.get("userInfo")
    userCoords = data.get("userCoords")
    lat = userCoords.get("lat")
    lon = userCoords.get("lon")
    kst = pytz.timezone('Asia/Seoul')
    now = datetime.now(kst)
    timestamp = now.strftime('%Y-%m-%dT%H:%M:%S%z')

    openWeatherMapUrl = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPEN_WEATHER_MAP_API_KEY}"
    
    openWeatherResponse = requests.get(openWeatherMapUrl)
    if openWeatherResponse.status_code != 200:
        print(f"날씨 API 에러 발생: {weather_data}")
    weather_data = openWeatherResponse.json()
    weather_list = weather_data.get("weather",[{}])
    description_weather = weather_list[0].get("description","clear sky")
    main = weather_data.get("main")
    temp = round(main.get("temp") - 273.15, 1)
    feels_like = round(main.get("feels_like") - 273.15,1)

    print(weather_data)
    print(userInput)
    print(userInfo)
    try: 
        ai_response = client.models.generate_content(
            model = "gemini-3-flash-preview",
            contents =f"""
            [userInput]
            {userInput}

            [userInfo]
            gender: {userInfo.get('gender')}
            height: {userInfo.get('height')}cm
            weight: {userInfo.get('weight')}kg
            perfer_style: {userInfo.get('userStyle')}

            [weatherCondition]
            temperature:{temp}℃
            feels_like:{feels_like}℃
            description_weather:{description_weather}
            """,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                response_mime_type="application/json"
            )    
        ) 
    except Exception as e:
        print(f"코디 생성중 오류발생: {e}")
        return jsonify({"error":str(e), "Code": 500}), 500
      
    answer = json.loads(ai_response.text)
    print(answer)
    imageData = answer.get("for_image")
    
    layout = os.getenv("IMAGE_BASE_LAYOUT")
    vibe = os.getenv("IMAGE_STYLE_VIBE")
    quality = os.getenv("IMAGE_QUALITY_BOOST")
   
    character = imageData.get("gender_spec", "")
    cap = imageData.get("cap", "")
    top = imageData.get("top", "")
    bottom = imageData.get("bottom", "")
    shoes = imageData.get("shoes", "")
    acc = imageData.get("acc", "")

    
    image_prompt = f"{layout} {character} "
    image_prompt += f"the person is wearing {top}, {bottom} and {shoes} "
    
    if cap:
        image_prompt += f"On head, {cap} "
    if acc:
        image_prompt += f"Accessory:{acc}. "

    image_prompt += f"{vibe} {quality} "

    final_image_prompt = image_prompt + image_requirements

    try: 
        imagen_response = client.models.generate_content(
            model = "gemini-2.5-flash-image",
            contents = [final_image_prompt],
        )

        for part in imagen_response.candidates[0].content.parts:
            if part.inline_data is not None:
                image = part.as_image()
                image.save("static/style_output.png")
                break

    except Exception as e:
        print(f"이미지 생성중 오류발생: {e}")
        return jsonify({"error":str(e), "Code": 500}), 500
    
    filename = "style_output.png"
    analysis = answer.get("style_analysis")
    imgUrl = f"/static/{filename}"
    style = answer.get("for_answer")
    emoji = answer.get("weatherEmoji")
    hashtags = answer.get("hashtags")
    result = {
        "status": "success",
        "timestamp":timestamp,
        "data": {
            "weather":{
                "temp":temp, 
                "condition":description_weather,
                "emoji":emoji
            },
            "recommendation":{
                "answer":style, 
                "imgUrl": imgUrl, 
                "analysis": analysis,
                "hashtags": hashtags,
            },
        },
    }

    return jsonify(result)
   
if __name__ == "__main__":
    # Render가 주는 PORT 환경변수를 사용하고, 없으면 10000을 사용합니다.
    port = int(os.environ.get("PORT", 10000))
    server.run(host='0.0.0.0', port=port, debug=True)