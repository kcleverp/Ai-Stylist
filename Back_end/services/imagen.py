from dotenv import load_dotenv
from google.genai import types
import uuid
import os

load_dotenv("layouts.env")
SINGLE_STYLE = os.getenv("SINGLE_STYLE")
DOUBLE_STYLE = os.getenv("DOUBLE_STYLE")
MULTI_STYLE = os.getenv("MULTI_STYLE")
def imagen(imageData, expected, gender, client):

    if os.path.exists("prompts/image_requirements.txt"):
        with open("prompts/image_requirements.txt","r",encoding="utf-8") as f:
            image_requirements = f.read()
    else:
        image_requirements = "지정된 이미지 프롬프트 없음 [오류]라고 출력"
    unique_id = uuid.uuid4().hex
    imgUrl = f"static/style_output{unique_id}.png"
    if (expected == 1):
        imageLayout = SINGLE_STYLE
        ratio = "1:1"  
    elif (expected == 2):
        imageLayout = DOUBLE_STYLE
        ratio = "16:9"  
    elif (expected >= 3):
        imageLayout = MULTI_STYLE
        ratio = "16:9"  

    if (imageData) :
        image_prompt = ""
        character = imageData.get("character", "")
        background = imageData.get("background", "")
        image_prompt += f"[Character] {character}\n"
        image_prompt += f"[Background] {background}\n"
        outfits = imageData.get("outfits")[:expected]
        image_prompt += f"{imageLayout}\n"
        if expected >= 2:
                image_prompt += f"{expected} separate {gender} figures standing side by side. Each figure wears a different outfit.\n"
        for i in outfits:
            describe = "[Outfit] "
            label = i.get("style_label","")
            outerwear = i.get("outerwear", "")
            top = i.get("top", "")
            neck_acc = i.get("neck_acc", "")
            bottom = i.get("bottom", "")
            shoes = i.get("shoes", "")
            if expected >= 2:
                describe += f"This outfit is {label}, "
            describe += "Wearing a "
            if outerwear:
                describe += f"{outerwear} layered over a "   
            describe += f"{top}, "
            describe += f"{bottom}, "
            if neck_acc:
                describe += f" {neck_acc}, "
            describe += f"Finished with {shoes}."
            image_prompt += f"{describe}\n"
            describe = ""
            
    final_image_prompt = f"{image_requirements}\n{image_prompt}"
    try: 
        imagen_response = client.models.generate_images(
            model = "imagen-4.0-fast-generate-001",
            prompt = final_image_prompt,
            config = types.GenerateImagesConfig(
                number_of_images = 1,
                aspect_ratio = ratio,
                output_mime_type="image/png",
                person_generation="ALLOW_ADULT",
            )
        )
        
        if imagen_response.generated_images:
            generated_images = imagen_response.generated_images[0]
            generated_images.image.save(imgUrl)
            
        else:
            print("❌ 생성된 이미지가 없습니다.")
            return "failed"
        return imgUrl

    except Exception as e:
        print(f"이미지 생성중 오류발생: {e}")
        return "failed"