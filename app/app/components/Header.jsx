import { View, Text, StyleSheet } from "react-native";
import { useShopping } from "../context/ShoppingContext";
import theme from "@/app/theme";

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
        padding: theme.spacing.md,
        backgroundColor: theme.colors.primary,
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: theme.spacing.xs,
    },
    title: {
        color: theme.colors.primaryText,
        fontSize: theme.fontSizes.lg,
        fontWeight: theme.fontWeights.bold,
    },
    totalItemsValue: {
        color: theme.colors.secoundaryText,
        fontSize: theme.fontSizes.sm,
        paddingBottom: theme.spacing.md,
    },
    takenItemsPrice: {
        color: theme.colors.success,
        fontSize: theme.fontSizes.sm,
    },
    totalValueText: {
        color: theme.colors.danger,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.bold,
    }
});
