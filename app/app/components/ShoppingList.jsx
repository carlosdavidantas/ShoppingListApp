import { FlatList, StyleSheet, View, Text } from "react-native";
import ShoppingItem from "@/app/components/ShoppingItem";
import { useShopping } from "../context/ShoppingContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ShoppingList() {
    const navigation = useNavigation();

    const {
        getFilteredItems,
        deleteItem,
        toggleItemTaken,
        clearList,
        getTotalPrice,
    } = useShopping();

    const filteredItems = getFilteredItems();

    const handleEditItem = (item) => {
        navigation.navigate("AddAndEditItem", { item });
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteItem(id);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir o item.");
        }
    };

    const handleToggleTaken = async (id) => {
        try {
            await toggleItemTaken(id);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar o status do item.");
        }
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color="#bdc3c7" />
            <Text style={styles.emptyTitle}>
                {filteredItems.length === 0 ? "Lista vazia" : "Nenhum item encontrado"}
            </Text>
            <Text style={styles.emptySubtitle}>
                {filteredItems.length === 0
                    ? "Adicione itens à sua lista de compras"
                    : "Tente ajustar os filtros ou a busca"}
            </Text>
        </View>
    );

    return (
        <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ShoppingItem
                    item={item}
                    onDelete={handleDeleteItem}
                    onToggleTaken={handleToggleTaken}
                    onEdit={handleEditItem}
                />
            )}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={[
                styles.listContent,
            ]}
            showsVerticalScrollIndicator={true}
            style={styles.flatList}
        />
    );
}


const styles = StyleSheet.create({
    flatList: {
        backgroundColor: "#ada30d",
        height: 600,
    },
    listContent: {
        backgroundColor: "#13cc03",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 16,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#7f8c8d",
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: 16,
        color: "#95a5a6",
        textAlign: "center",
        marginTop: 8,
        paddingHorizontal: 32,
    },
    footer: {
        position: "absolute",
        bottom: 20,
        right: 20,
        flexDirection: "row",
        gap: 12,
    },
    addButton: {
        backgroundColor: "#3498db",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    clearButton: {
        backgroundColor: "#e74c3c",
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
});