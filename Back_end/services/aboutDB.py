
def sendToDB(json_data, data, supabase_client):
    img_url = data.get("images")
    device_id = data.get("deviceId")
    closet_id = data.get("closetId")
    name = data.get("name")
    saved_item = []
    for item in json_data["closet_items"]:
        insert_data = {
            "closet_id": closet_id,
            "device_id": device_id,
            "name": name,
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
        response =supabase_client.table("closet_items").insert(saved_item).execute()
        if response:
            print(f"저장 완료")
            return ({
                "status":"success",
                "closetId":closet_id,
                "name": name
                })
        else:
            return {"status":"failed"}
        
def load_db_data(supabase_client, user_id, closet_id = None):
    try:
        if (closet_id):
            response = supabase_client.table("closet_items") \
                    .select("category, item_name, style_tags") \
                    .eq("closet_id", closet_id) \
                    .execute()
            result = [{"category": item['category'], "item_name": item['item_name'], "style_tags": item['style_tags']} for item in response.data]
            return result
        else:
            response = supabase_client.table("closet_items") \
                    .select("name, closet_id") \
                    .eq("device_id", user_id) \
                    .execute()
            unique_closets = {item['closet_id']: item['name'] for item in response.data}
            result = [{"closet_id": c, "name": n} for c, n in unique_closets.items()]
            return result
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
def edit_db_data(closet_id, new_name, supabase_client):
    try:
        response = supabase_client.table("closet_items") \
        .update({"name": new_name}) \
        .eq("closet_id", closet_id) \
        .execute()
        result= {"status":"success"}
        return result
    except Exception as e:
        return {"status": "error", "message": str(e)}
