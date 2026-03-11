import React, {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "../types/schema";
import { useState, useEffect } from "react";
const SelectedItemsContext = createContext<any>(null);


export const ItemsProvider = ({children}: {children: React.ReactNode}) => {
    const [items,setItems] = useState<Item[]>([])
    useEffect(() => {
        const loadUser = async () => {
            const saved = await AsyncStorage.getItem("selectedItems");
            if (saved) setItems(JSON.parse(saved));
        };
        loadUser();
    }, []);

    const updateSelectedItems = async(item:Item[]) => {
        setItems(item)
        await AsyncStorage.setItem("selectedItems", JSON.stringify(item))
    };
    const toggleItem = (target: Item) => {
        const exists = items.find(i => i.id === target.id);
        if (exists) {
            updateSelectedItems(items.filter(i => i.id !== target.id));
        } else {
            updateSelectedItems([...items, target]);
        }
    };
    return (
        <SelectedItemsContext.Provider value={{ items, updateSelectedItems, toggleItem }}>
            {children}
        </SelectedItemsContext.Provider>
    );
}
export const useSelectedItemsContext = () => useContext(SelectedItemsContext);