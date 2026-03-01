
def sendToDB(json_data, data, supabase_client):
    user_id = data.get("userId")
    name = data.get("name")
    supabase_client.table("user_ids").upsert({"id":user_id}).execute()
    supabase_client.table("closets").insert({ "user_id": user_id ,"name":name}).execute()
    request_id = supabase_client.table("closets").select("id").eq("user_id", user_id).execute()
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
            "image_url": item["image_url"]
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

def load_item_data(supabase_client, user_id, closet_id):
    try:
        check = supabase_client.table("closets") \
        .select("id") \
        .eq("id", closet_id) \
        .eq("user_id", user_id) \
        .execute()

        if len(check.data) == 0:
            return {"status":"error", "message": "이 옷장에 접근할 권한이 없거나 존재하지 않습니다."}
        
        response = supabase_client.table("closet_items") \
                .select("id", "category","style_tags", "for_front", "item_coord", "image_url") \
                .eq("closet_id", closet_id) \
                .execute()
        result = [
            {   
                "id": item["id"],
                "category": item['category'], 
                "style_tags": item['style_tags'], 
                "for_front": item['for_front'], 
                "item_coord": item["item_coord"], 
                "image_url" : item["image_url"]
            } for item in response.data
        ] 
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
