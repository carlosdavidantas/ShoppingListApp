import { View, Text, StyleSheet, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import Button from "@/app/components/Button";

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

    const handleItemTaken =() => {
        onToggleTaken()
    }

    return (
        <View style={styles.itemContainer}>
            <View style={styles.firstLine}>
                <Text style={styles.itemName}> {item.name} </Text>

                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>No carrinho: </Text>
                    <Checkbox value={item.taken} onValueChange={() => onToggleTaken(item.id)} style={styles.checkbox} />
                </View>
            </View>
            <View style={styles.itemInfosBackground}>
                <View style={styles.itemInfos}>
                    <Text style={styles.itemDetails} >{item.quantity ? `Qtd: ${item.quantity}` : "Qtd: 1"}</Text>
                    <Text style={styles.itemDetails} >{item.unitPrice ? `Preço por ${item.unit}: R$ ${item.unitPrice.toFixed(2)}` : ""}</Text>
                    <Text style={styles.itemDetailsTotal} >{`Total: R$ ${(item.unitPrice * item.quantity).toFixed(2)}`}</Text>
                </View>
                <View style={styles.editAndDeleteButtonBackground}>
                    <Button
                        icon={"pencil"}
                        iconSize={16}
                        onPress={() => onEdit(item)}
                        style={styles.buttonEdit}
                    />
                    <Button
                        icon={"trash"}
                        iconSize={16}
                        onPress={() => handleDelete()}
                        style={styles.buttonDelete}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexWrap: "wrap",
    },
    firstLine: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    itemDetails: {
        fontSize: 15,
        color: "#666",
    },
    itemDetailsTotal: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#00a035",
    },
    itemInfosBackground: {
        paddingTop: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    itemInfos: {
        display: "flex",
        flexDirection: "collum",
        justifyContent: "space-between",
    },
    checkboxContainer: {
        display: "flex",
        width: "30%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    checkbox: {
    },
    checkboxLabel: {
    },
    editAndDeleteButtonBackground: {
        width: "30%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonEdit: {
        backgroundColor: "#3498db",
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    buttonDelete: {
        backgroundColor: "#e00f00",
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
});