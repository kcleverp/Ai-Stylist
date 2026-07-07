
def sendToDB(json_data, data, supabase_client):
    user_id = data.get("userId")
    exist_closet_id = data.get("closetId")
    print(exist_closet_id)
    supabase_client.table("user_ids").upsert({"id":user_id}).execute()
    if(exist_closet_id is not None):
        closet_id = exist_closet_id
        raw_name = supabase_client.table("closets") \
                .select("name") \
                .eq("id", closet_id) \
                .execute()
        name = raw_name.data[0]["name"]
    else:
        name = data.get("name")
        request_id = supabase_client.table("closets").insert({ "user_id": user_id ,"name":name}).execute()
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
                "image_url" : item["image_url"],
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

def load_selected_items(supabase_client, user_id, selected_items):
    try:
        closet_map = {}
        result_map = {}
        for obj in selected_items:
            c_id = obj["closetId"]
            i_id = obj["id"]
            if c_id not in closet_map:
                closet_map[c_id] = []
            closet_map[c_id].append(i_id)
        print(closet_map)
        for closet_id, item_list in closet_map.items():
            print(user_id)
            check = supabase_client.table("closets") \
            .select("id") \
            .eq("id", closet_id) \
            .eq("user_id", user_id) \
            .execute()
            print(check)
            if len(check.data) == 0:
                return {"status":"error", "message": "이 옷장에 접근할 권한이 없거나 존재하지 않습니다."}
    
            response = supabase_client.table("closet_items") \
                .select("for_front", "description", "style_tags", "category",) \
                .eq("closet_id", closet_id) \
                .in_("id", item_list) \
                .execute()
            result = [
                {   
                    "for_front": item["for_front"],
                    "category": item['category'], 
                    "style_tags":item['style_tags'],
                    "description": item['description'], 
                } for item in response.data
            ] 
            for obj in result:
                for_front = obj["for_front"]
                cate = obj["category"]
                style = obj["style_tags"]
                des = obj["description"]
                if cate not in result_map:
                    result_map[cate] = []
                item = {"for_front": for_front, "descriptin": des, "style": style}
                result_map[cate].append(item)
        return {"status": "success", "data": result_map}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
def del_item(supabase_client, user_id, closet_id, item_id):
    try:
        pass
    except Exception as e:
        pass
        return {"status": "error", "message": str(e)}