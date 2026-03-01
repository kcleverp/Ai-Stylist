import json
import httpx
from google.genai import types
import services.loadData as loadData
def analyze(data, client):
    imagesUrl = data.get("images",[])
    image_parts = []
    with httpx.Client() as http_client:
        for url in imagesUrl:
            try:
                print(f"이미지 다운로드 중: {url}")
                response = http_client.get(url)
                if response.status_code == 200:
                    image_parts.append(f"Image_ID: {url}")
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
                system_instruction= loadData.ANALYZE_PROMPT,
                response_mime_type="application/json",
            )
        )
        raw_ai_response = ai_response.text
        answer = json.loads(raw_ai_response)
        return answer
    except Exception as e:
        print(f"이미지분석중 오류발생: {e}")
        return None

