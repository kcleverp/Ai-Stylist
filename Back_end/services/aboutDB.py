
def sendToDB(json_data, data, supabase_client):
    img_url = data.get("images")
    device_id = data.get("deviceId")
    name = data.get("name")
    supabase_client.table("user_ids").upsert({"id":device_id}).execute()
    supabase_client.table("closets").insert({ "user_id": device_id ,"name":name}).execute()
    request_id = supabase_client.table("closets").select("id").eq("user_id", device_id).execute()
    closet_id = request_id.data[0]["id"]
    saved_closet_items = []
    for item in json_data["closet_items"]:
        closet_items_data = {
            "closet_id": closet_id,
            "item_name": item["item_name"],
            "for_front": item["for_front"],
            "category": item["category"],
            "sub_category": item["sub_category"],
            "color": item["color"],
            "fit": item["fit"],
            "material": item["material"],
            "item_coord": item["item_coord"],
            "detail_info": item["detail_info"],
            "style_tags": item["style_tags"],
            "description": item["description"],
            "confidence_score": item["confidence_score"],
            "image_url": img_url
        }
        saved_closet_items.append(closet_items_data)
    if saved_closet_items:
        response =supabase_client.table("closet_items").insert(saved_closet_items).execute()
        if response:
            print(f"저장 완료")
            return ({
                "status":"success",
                "closetId":closet_id,
                "name": name
                })
        else:
            return {"status":"failed"}
        
def load_closet_data(supabase_client, user_id):
    try:
        response = supabase_client.table("closets") \
                .select("name, id") \
                .eq("user_id", user_id) \
                .execute()
        unique_closets = {item['id']: item['name'] for item in response.data}
        result = [{"closet_id": c, "name": n} for c, n in unique_closets.items()]
        return result
    except Exception as e:
        return {"status": "error", "message": str(e)}

def load_item_data(supabase_client, closet_id):
    try:
        response = supabase_client.table("closet_items") \
                .select("category","style_tags", "for_front") \
                .eq("closet_id", closet_id) \
                .execute()
        result = [{"category": item['category'], "style_tags": item['style_tags'], "for_front": item['for_front'], } for item in response.data]
        return result
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
def edit_closet_data(closet_id, new_name, supabase_client):
    try:
        response = supabase_client.table("closets") \
        .update({"name": new_name}) \
        .eq("id", closet_id) \
        .execute()
        if(response):
            result= {"status":"success"}
            return result
        else:
            return {"status": "error", "message": "수정 실패"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
