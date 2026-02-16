from dotenv import load_dotenv
import uuid
import fal_client
import services.loadData as loadData
load_dotenv("important.env")

def flux(imageData, character):
    print(imageData)
    unique_id = uuid.uuid4().hex
    imgUrl = f"static/style_output{unique_id}.png"
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
            "fal-ai/flux-1/schnell",
            arguments={
                "prompt": final_image_prompt,
                "num_inference_steps": 8,
                "width": 1024,
                "height": 1024,
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