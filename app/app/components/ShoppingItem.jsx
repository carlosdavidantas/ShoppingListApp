import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ShoppingItem({ item, onEdit, onDelete, onToggleTaken }) {
    const handleDelete = () => {
        Alert.alert(
            "Confirmar exclusão",
            `Tem certeza que deseja excluir "${item.name}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => onDelete(item.id) }
            ]
        );
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}> {item.name} </Text>
                <Text style={styles.itemDetails} >
                    {item.quantity ? `Qtd: ${item.quantity}` : "Qtd: 1"}
                    {item.unitPrice ? ` | Preço Unit: R$ ${item.unitPrice.toFixed(2)}` : ""}
                    {item.taken ? " | No carrinho" : " | A pegar"}
                </Text>
            </View>
            <View style={styles.itemActions}>
                <TouchableOpacity onPress={() => onEdit(item)}>
                    <Ionicons name="pencil" size={20} color="#007bff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete()}>
                    <Ionicons name="trash" size={20} color="#dc3545" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemDetails: {
        fontSize: 14,
        color: "#666",
    },
    itemActions: {
        flexDirection: "row",
        alignItems: "center",
    },
});