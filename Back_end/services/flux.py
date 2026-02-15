from dotenv import load_dotenv
import uuid
import os
import fal_client

load_dotenv("layouts.env")
load_dotenv("important.env")

def flux(imageData):
    if os.path.exists("prompts/image_requirements.txt"):
        with open("prompts/image_requirements.txt","r",encoding="utf-8") as f:
            image_requirements = f.read()
    else:
        image_requirements = "지정된 이미지 프롬프트 없음 [오류]라고 출력"
    unique_id = uuid.uuid4().hex
    imgUrl = f"static/style_output{unique_id}.png"
    image_prompt = ""

    if imageData:
        character = imageData.get("character", "")
        outfits = imageData.get("outfits") or {}

        subject = character if character else "A fashion model"

        outerwear = outfits.get("outerwear", "")
        top = outfits.get("top", "")
        neck_acc = outfits.get("neck_acc", "")
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
        if neck_acc:
            outfit_parts.append(neck_acc)
        if shoes:
            outfit_parts.append(shoes)

        if not outfit_parts:
            outfit_desc = "minimal outfit"
        else:
            outfit_desc = ", ".join(outfit_parts)

        image_prompt = f"{subject} wearing {outfit_desc}."

    final_image_prompt = f"{image_requirements}\n### SUBJECT ###\n{image_prompt}"

 
    try: 
        flux_response = fal_client.subscribe(
            "fal-ai/flux-1/schnell",
            arguments={
                "prompt": final_image_prompt,
                "num_inference_steps": 6
            },
        )
        
        if flux_response:
            print(flux_response)
            return "failed"

            
        else:
            print("❌ 생성된 이미지가 없습니다.")
            return "failed"
        return imgUrl

    except Exception as e:
        print(f"이미지 생성중 오류발생: {e}")
        return "failed"