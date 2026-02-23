import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@shopping_list_items";

export class StorageService {
    static async getItems() {
        try {
            const itemsJson = await AsyncStorage.getItem(STORAGE_KEY);
            return itemsJson ? JSON.parse(itemsJson) : [];
        } catch (error) {
            console.error("Error retrieving items: ", error);
            return [];
        }
    }
    
    static async saveItems(items) {
        try{
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error("Error saving item:", error);
            throw error;
        }
    }
    
    static async addItem(item) {
        try{
            const items = await this.getItems();
            items.push(item);
            await this.saveItems(items);
        } catch (error) {
            console.error("Error saving item:", error);
            throw error;
        }
    }

    static async deleteItem(id) {
        try {
            const items = await this.getItems();
            const filteredItems = items.filter(item => item.id !== id);
            await this.saveItems(filteredItems);
        } catch (error) {
            console.error("Error deleting item:", error);
            throw error;
        }
    }

    static async clearList() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error("Error clearing list:", error);
            throw error;
        }
    }
}
