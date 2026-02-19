from dotenv import load_dotenv
import uuid
import fal_client
import services.loadData as loadData
import requests
import os
load_dotenv("important.env")
FAL_SEED = os.getenv("FAL_SEED")
def flux(imageData, character, userId=None):
    print(imageData)
    unique_id = uuid.uuid4().hex
    imgUrl = f"static/style_output_{unique_id}.webp"
    if userId:
        imgUrl = f"static/style_output_{userId}_{unique_id}.webp"
    image_prompt = ""

    if imageData:
        outfits = imageData.get("outfits") or {}
        subject = character if character else "A fashion model"
        outerwear = outfits.get("outerwear", "")
        top = outfits.get("top", "")
        bottom = outfits.get("bottom", "")
        shoes = outfits.get("shoes", "")

        outfit_parts = []

        if outerwear and top:
            outfit_parts.append(f"{outerwear} layered over {top}")
        elif outerwear:
            outfit_parts.append(outerwear)
        elif top:
            outfit_parts.append(top)

        if bottom:
            outfit_parts.append(bottom)
        if shoes:
            outfit_parts.append(shoes)

        if not outfit_parts:
            outfit_desc = "minimal outfit"
        else:
            outfit_desc = ", ".join(outfit_parts)

        image_prompt = f"\n{subject} wearing {outfit_desc}"

    final_image_prompt = f"{loadData.IMAGE_REQUIREMENTS}\n#SUBJECT#\n{image_prompt}"
    try: 
        flux_response = fal_client.subscribe(
            "fal-ai/flux-2/klein/9b",
            arguments={
                "prompt": final_image_prompt,
                "num_inference_steps": 8,
                "seed": FAL_SEED,
                "output_format": "webp"
            },
        )
        
        if flux_response:
            fal_url = flux_response.get("images")[0].get("url")
            print(flux_response)

            response = requests.get(fal_url)

            if response.status_code == 200:
                # 4. 서버 static 폴더에 파일 쓰기
                with open(imgUrl, 'wb') as f:
                    f.write(response.content)
                print(f"✅ 서버 저장 완료: {imgUrl}")
                
                # 프론트엔드에 전달할 상대 경로 반환 [cite: 2026-01-28]
                return imgUrl
            else:
                print("❌ 이미지 다운로드 실패")
                return "failed"
            
        else:
            print("❌ 생성된 이미지가 없습니다.")
            return "failed"

    except Exception as e:
        print(f"이미지 생성중 오류발생: {e}")
        return "failed"