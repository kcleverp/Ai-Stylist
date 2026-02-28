import os
import json

# 1. 메모리에 상주할 전역 변수 (캐시) 선언
_BMI_DATA = None
_TREND_DATA = None
SYSTEM_PROMPT = ""
IMAGE_REQUIREMENTS = ""
ANALYZE_PROMPT = ""
def load_all_data(is_server):
    """서버 시작 시 데이터를 메모리에 로드하는 함수"""
    global _BMI_DATA, _TREND_DATA, SYSTEM_PROMPT, IMAGE_REQUIREMENTS, ANALYZE_PROMPT
    
    bmi_path = "bmi.json" if is_server else "data/bmi/bmi.json"
    trend_path = "trend.json" if is_server else "data/trends/trend.json"
    propmts_path = "fluxver_prompt.txt" if is_server else "prompts/fluxver_prompt.txt" 
    image_requirements_path = "image_requirements.txt" if is_server else "prompts/image_requirements.txt"
    analyze_prompt_path = "analyze_prompt.txt" if is_server else "prompts/analyze_prompt.txt"
    
    try:
        if os.path.exists(bmi_path):
            with open(bmi_path, "r", encoding="utf-8") as f:
                _BMI_DATA = json.load(f)
        
        if os.path.exists(trend_path):
            with open(trend_path, "r", encoding="utf-8") as f:
                _TREND_DATA = json.load(f)
                
        if os.path.exists(propmts_path):
            with open(propmts_path,"r",encoding="utf-8") as f:
                SYSTEM_PROMPT = f.read()

        if os.path.exists(image_requirements_path):
            with open(image_requirements_path,"r",encoding="utf-8") as f:
                IMAGE_REQUIREMENTS = f.read()

        if os.path.exists(analyze_prompt_path):
            with open(analyze_prompt_path,"r",encoding="utf-8") as f:
                ANALYZE_PROMPT = f.read()
        
        print("✅ 모든 트렌드 및 BMI 데이터가 메모리에 로드되었습니다.")
    except Exception as e:
        print(f"❌ 데이터 로드 중 오류 발생: {e}")

def get_bmi(gender, bmi):
    if bmi < 18.5:
        status = "slim"
    elif 18.5 <= bmi < 23:
        status = "average"
    elif 23 <= bmi < 25:
        status = "overweight"
    else:
        status = "fat"
    selected_block = ""
    if (_BMI_DATA):
        selected_block = _BMI_DATA.get(gender, {}).get("bmi",{}).get(status)
        if selected_block:
            return (selected_block)
        else:
            print(f"경고: {status} 체형 데이터가 JSON 내에 정의되어 있지 않습니다.")
    else:
        print(f"경고: Bmi 데이터가 메모리에 없습니다.")
    return ""



def get_trend(gender, style):
    selected_trend_data= ""
    if (_TREND_DATA):
        selected_block = _TREND_DATA.get(gender, {}).get('styles', {}).get(style, {})
        if selected_block:
            # Gemini가 읽기 좋게 JSON 문자열로 변환 (한글 깨짐 방지)
            selected_trend_data = json.dumps(selected_block, ensure_ascii=False)
        else:
            print(f"경고: {style} 스타일이 JSON 내에 정의되어 있지 않습니다.")
    else:
        print(f"경고: 트렌드 데이터가 메모리에 없습니다.")
    return (selected_trend_data)