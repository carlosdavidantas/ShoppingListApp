import { View, Text, StyleSheet } from "react-native";
import { useShopping } from "../context/ShoppingContext";

export default function Header() {
    const { getTotalPrice, getFilteredItems, getTakenItemsPrice } = useShopping();
    const totalPrice = getTotalPrice().toFixed(2);
    const totalItems = getFilteredItems().length;
    const takenItemsPrice = getTakenItemsPrice().toFixed(2);
    const itemLabel = totalItems === 1 ? "item" : "itens";
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Compras</Text>
            <Text style={styles.totalItemsValue}>{totalItems} {itemLabel}</Text>
            <Text style={styles.takenItemsPrice}>Previsão: R$ {totalPrice}</Text>
            <Text style={styles.totalValueText}>Total: R$ {takenItemsPrice}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#1c2a66",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 4,
    },
    title: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
    totalItemsValue: {
        color: "#b6b6b6",
        fontSize: 12,
        paddingBottom: 10,
    },
    takenItemsPrice: {
        color: "#00910c",
        fontSize: 14,
        paddingBottom: 8,
    },
    totalValueText: {
        color: "#ff0000",
        fontSize: 18,
        fontWeight: "bold",
    }
});
