from image_layouts import SINGLE_STYLE, DOUBLE_STYLE, MULTI_STYLE
from google.genai import types
import uuid
import os



def imagen(answer, style_label, gender, client):
    if os.path.exists("image_requirements.txt"):
        with open("image_requirements.txt","r",encoding="utf-8") as f:
            image_requirements = f.read()
    else:
        image_requirements = "지정된 이미지 프롬프트 없음 [오류]라고 출력"

    imageData = answer.get("for_image")
    unique_id = uuid.uuid4().hex
    imgUrl = f"static/style_output{unique_id}.png"
    expected = len(style_label)
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
            cap = i.get("cap", "")
            outerwear = i.get("outerwear", "")
            top = i.get("top", "")
            bottom = i.get("bottom", "")
            shoes = i.get("shoes", "")
            acc = i.get("acc", "")
            if expected >= 2:
                describe += f"This outfit is {label}, "
            describe += "Dressed in "
            if cap:
                describe += f"{cap}-"
            if outerwear:
                describe += f"{outerwear}-"
            if acc:
                describe += f"{acc}-"
            describe += f"{top}-"
            describe += f"{bottom}-{shoes}."
            image_prompt += f"{describe}\n"
            describe = ""
            
    final_image_prompt = f"{image_requirements}\n{image_prompt}"
    print(final_image_prompt)
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
            return None
        return imgUrl

    except Exception as e:
        print(f"이미지 생성중 오류발생: {e}")
        return None