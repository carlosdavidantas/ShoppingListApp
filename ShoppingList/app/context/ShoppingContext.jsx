import { createContext, useContext, useState, useEffect } from "react";
import { StorageService } from "@/app/services/storageService";

const ShoppingContext = createContext({
    items: [],
    filter: "all",
    searchTerm: "",
    addItem: async (item) => { },
    updateItem: async (id, updates) => { },
    deleteItem: async (id) => { },
    toggleItemTaken: async (id) => { },
    setFilter: (filter) => { },
    setSearchTerm: (term) => { },
    clearList: async () => { },
    getTakenItemsPrice: () => 0,
    getTotalPrice: () => 0,
    getFilteredItems: () => [],
    markAllAsTaken: async () => { },
    markAllAsNotTaken: async () => { },
    exportList: async () => { },
    importList: async (jsonList) => { },
});

export function useShopping() {
    const context = useContext(ShoppingContext);
    if (!context) {
        throw new Error("useShopping must be used within a ShoppingProvider");
    }
    return context;
}

export function ShoppingProvider({ children }) {
    const [state, setState] = useState({
        items: [],
        filter: "all",
        searchTerm: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadItems();
    }, []);


    const loadItems = async () => {
        try {
            const items = await StorageService.getItems();
            setState(prev => ({ ...prev, items }));
        } catch (error) {
            console.error('Error while loading items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addItem = async (itemData) => {
        const newItem = {
            ...itemData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };

        setState(prev => ({
            ...prev,
            items: [...prev.items, newItem],
        }));

        try {
            await StorageService.addItem(newItem);
        } catch (error) {
            console.error("Error saving item:", error);
            setState(prev => ({
                ...prev,
                items: prev.items.filter(item => item.id !== newItem.id),
            }));
            throw error;
        }
    };

    const updateItem = async (id, updates) => {
        setState(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, ...updates } : item
            ),
        }));

        try {
            await StorageService.updateItem(id, updates);
        } catch (error) {
            await loadItems();
            throw error;
        }
    };

    const deleteItem = async (id) => {
        const previousItems = state.items;
        setState(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id),
        }));

        try {
            await StorageService.deleteItem(id);
        } catch (error) {
            setState(prev => ({ ...prev, items: previousItems }));
            throw error;
        }
    };

    const toggleItemTaken = async (id) => {
        const item = state.items.find(item => item.id === id);
        if (item) {
            await updateItem(id, { taken: !item.taken });
        }
    };

    const setFilter = (filter) => {
        setState(prev => ({ ...prev, filter }));
    };

    const setSearchTerm = (term) => {
        setState(prev => ({ ...prev, searchTerm: term }));
    };

    const clearList = async () => {
        const previousItems = state.items;
        setState(prev => ({ ...prev, items: [] }));

        try {
            await StorageService.clearList();
        } catch (error) {
            setState(prev => ({ ...prev, items: previousItems }));
            throw error;
        }
    };

    const getTakenItemsPrice = () => {
        const taken = state.items.filter(item => item.taken == true);
        return calculateTotalPrice(taken);
    }

    const getTotalPrice = () => {
        return calculateTotalPrice(state.items);
    };

    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + ((item.unitPrice || 0) * (item.quantity || 1)), 0);
    };

    const getFilteredItems = () => {
        let filtered = state.items;

        if (state.searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(state.searchTerm.toLowerCase())
            );
        }

        switch (state.filter) {
            case 'pending':
                return filtered.filter(item => !item.taken);
            case 'taken':
                return filtered.filter(item => item.taken);
            default:
                return filtered;
        }
    };

    const markAllAsTaken = async () => {
        const updatedItems = state.items.map(item => ({ ...item, taken: true }));
        setState(prev => ({ ...prev, items: updatedItems }));
        try {
            await StorageService.saveItems(updatedItems);
        } catch (error) {
            await loadItems();
            throw error;
        }
    };

    const markAllAsNotTaken = async () => {
        const updatedItems = state.items.map(item => ({ ...item, taken: false }));
        setState(prev => ({ ...prev, items: updatedItems }));
        try {
            await StorageService.saveItems(updatedItems);
        } catch (error) {
            await loadItems();
            throw error;
        }
    };

    const validateImportedItems = (items) => {
        if (!Array.isArray(items)) {
            throw new Error("Invalid format: expected array of items");
        }
        
        return items.map(item => {
            if (!item.id || !item.name) {
                throw new Error("Invalid item: missing required fields (id, name)");
            }
            return {
                id: item.id,
                name: item.name,
                quantity: item.quantity || 1,
                unitPrice: item.unitPrice || 0,
                taken: item.taken || false,
                note: item.note || "",
                createdAt: item.createdAt || new Date().toISOString(),
            };
        });
    };

    const exportList = async () => {
        const exportData = {
            version: 1,
            exportedAt: new Date().toISOString(),
            itemCount: state.items.length,
            items: state.items,
        };
        return JSON.stringify(exportData, null, 2);
    };

    const importList = async (jsonList) => {
        try {
            const data = JSON.parse(jsonList);
            const itemsToImport = data.items || data;
            const validatedItems = validateImportedItems(itemsToImport);
        
            setState({
                items: validatedItems,
                filter: "all",
                searchTerm: "",
            });
            
            await StorageService.saveItems(validatedItems);
            
            return {
                success: true,
                itemsImported: validatedItems.length,
            };
        } catch (error) {
            const errorMessage = error.message || "Unknown error during import";
            console.error("Error importing list:", errorMessage);
            throw new Error(`Failed to import list: ${errorMessage}`);
        }
    };

    const value = {
        items: state.items,
        filter: state.filter,
        searchTerm: state.searchTerm,
        addItem,
        updateItem,
        deleteItem,
        toggleItemTaken,
        setFilter,
        setSearchTerm,
        clearList,
        getTakenItemsPrice,
        getTotalPrice,
        getFilteredItems,
        markAllAsTaken,
        markAllAsNotTaken,
        exportList,
        importList,
    };

    return (
        <ShoppingContext.Provider value={value}>
            {children}
        </ShoppingContext.Provider>
    );
}