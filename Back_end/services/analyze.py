import json
import os
import httpx
from google.genai import types

is_server = os.environ.get('RENDER') == 'true'
if is_server:
        server_propmts_path = "analyze_prompt.txt"
        if os.path.exists(server_propmts_path):
            with open(server_propmts_path,"r",encoding="utf-8") as f:
                ANALYZE_PROMPT = f.read()
        else:
            ANALYZE_PROMPT = ""
else:
    local_prompt_path ="prompts/analyze_prompt.txt" 
    if os.path.exists(local_prompt_path):
        with open(local_prompt_path,"r",encoding="utf-8") as f:
            ANALYZE_PROMPT = f.read()
    else:
        ANALYZE_PROMPT = ""

def analyze(data, client):
    imagesUrl = data.get("images",[])
    image_parts = []
    with httpx.Client() as http_client:
        for url in imagesUrl:
            try:
                print(f"이미지 다운로드 중: {url}")
                response = http_client.get(url)
                if response.status_code == 200:
                    # 'file_uri' 대신 'inline_data'로 실제 이미지 데이터 전달
                    image_parts.append({
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": response.content  # 바이트 데이터
                        }
                    })
                else:
                    print(f"다운로드 실패(상태코드): {response.status_code}")
            except Exception as e:
                print(f"이미지 획득 실패: {e}")

    if not image_parts:
        print("분석할 이미지 데이터가 없습니다.")
        return None
    try: 
        ai_response = client.models.generate_content(
            model = "gemini-3-flash-preview",
            contents=["Extract data from this image according to the defined format.", *image_parts],
            config=types.GenerateContentConfig(
                system_instruction= ANALYZE_PROMPT,
                response_mime_type="application/json",
            )
        )
        raw_ai_response = ai_response.text
        answer = json.loads(raw_ai_response)
        return answer
    except Exception as e:
        print(f"이미지분석중 오류발생: {e}")
        return None

def sendToDB(json_data, data, supabase_client):
    img_url = data.get("images")
    device_id = data.get("deviceId")
    closet_id = data.get("closetId")
    saved_item = []
    for item in json_data["closet_items"]:
        insert_data = {
            "closet_id": closet_id,
            "device_id": device_id,
            "item_name": item["item_name"],
            "category": item["category"],
            "sub_category": item["sub_category"],
            "attributes": item["attributes"],
            "style_tags": item["style_tags"],
            "description": item["description"],
            "image_url": img_url
        }
        saved_item.append(insert_data)
    if saved_item:
        response = supabase_client.table("closet_items").insert(saved_item).execute()
        print(f"저장 완료")
