import re
from flask import jsonify


def check_input(raw_user_input, raw_user_info):
    trim_text = " ".join(raw_user_input.split())
    clean_text = re.sub(r"[ㄱ-ㅎㅏ-ㅣ]+", "", trim_text).strip()
    forbidden_keywords = ["ignore", "previous instructions", "지침", "시스템", "설정", "프롬프트", "무시" , "instruction", "prompt", "setting", "rule"]
    if len(clean_text) > 50 or len(clean_text) == 0: #글자 길이 확인
        clean_text = "일상생활 룩"
    elif not any(ord('가') <= ord(c) <= ord('힣') or ord('a') <= ord(c.lower()) <= ord('z') for c in clean_text): #유효한 질문인지 확인
        clean_text = "일상생활 룩"
    elif any(keyword in clean_text.lower() for keyword in forbidden_keywords): #금지어가 들어가있는지 확인
        return jsonify({"error":"부적절한 입력", "Code": 500}), 500
    
    user_style = raw_user_info.get('userStyle')
    user_gender = raw_user_info.get('gender')
    user_height = raw_user_info.get('height')
    user_weight = raw_user_info.get('weight')
    user_bmi = raw_user_info.get("bmi")
    #유저 정보 필터링
    cleanInfo = {
        "style": user_style if (user_style in ["street", "classic", "casual"]) else "casual", 
        "gender": user_gender if (user_gender in ["Man","Woman"] ) else "Man",
        "height":  user_height if user_height is not None and (user_height < 200 and user_height >= 100 ) else  170 ,
        "weight":  user_weight if user_weight is not None and (user_weight < 200 and user_weight >= 25 ) else 60,
        "bmi": user_bmi if user_bmi is not (user_height/user_weight) else 170/60
        }
    return [clean_text, cleanInfo]