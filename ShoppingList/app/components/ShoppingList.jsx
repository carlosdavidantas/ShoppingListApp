import { FlatList, StyleSheet, View, Text } from "react-native";
import ShoppingItem from "@/app/components/ShoppingItem";
import { useShopping } from "../context/ShoppingContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import theme from "@/app/theme";

export default function ShoppingList() {
    const navigation = useNavigation();

    const {
        getFilteredItems,
        deleteItem,
        toggleItemTaken,
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
            <Ionicons name="cart-outline" size={theme.borders.xl} color={theme.colors.secoundaryText}/>
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
        backgroundColor: "transparent",
        height: 600,
    },
    listContent: {
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.md,
        padding: theme.spacing.md,
    },
    emptyContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: theme.spacing.xl,
    },
    emptyTitle: {
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.secoundaryText,
        marginTop: theme.spacing.md,
    },
    emptySubtitle: {
        fontSize: theme.fontSizes.md,
        color: theme.colors.secoundaryText,
        textAlign: "center",
        marginTop: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
    },
});