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
    getTotalPrice: () => 0,
    getFilteredItems: () => [],
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
            console.log(" Item saved:", newItem);
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

    const getTotalPrice = () => {
        return calcularTotalGeral(state.items);
    };

    const calcularTotalGeral = (items) => {
        return items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);
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
        getTotalPrice,
        getFilteredItems,
    };

    return (
        <ShoppingContext.Provider value={value}>
            {children}
        </ShoppingContext.Provider>
    );
}