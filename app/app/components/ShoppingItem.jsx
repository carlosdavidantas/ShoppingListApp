import { View, Text, StyleSheet, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import Button from "@/app/components/Button";
import theme from "@/app/theme";

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
            <View style={styles.firstLine}>
                <Text style={styles.itemName}> {item.name} </Text>

                <View style={styles.checkboxContainer}>
                    <Text>No carrinho: </Text>
                    <Checkbox value={item.taken} onValueChange={() => onToggleTaken(item.id)} />
                </View>
            </View>
            <View style={styles.itemInfosBackground}>
                <View style={styles.itemInfos}>
                    <Text style={styles.itemDetails} >{item.quantity ? `Quantidade: ${item.quantity}` : "Quantidade não informada"}</Text>
                    <Text style={styles.itemDetails} >{item.unitPrice ? `Preço por ${item.unit}: R$ ${item.unitPrice.toFixed(2)}` : "Preço não informado"}</Text>
                    <Text style={styles.itemDetailsTotal} >{`Total: R$ ${(item.unitPrice * item.quantity).toFixed(2)}`}</Text>
                </View>
                <View style={styles.editAndDeleteButtonBackground}>
                    <Button
                        icon={"pencil"}
                        iconSize={theme.spacing.md}
                        onPress={() => onEdit(item)}
                        style={styles.buttonEdit}
                    />
                    <Button
                        icon={"trash"}
                        iconSize={theme.spacing.md}
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
        flexWrap: "wrap",
        padding: theme.spacing.md,
        backgroundColor: theme.colors.primaryText,
        borderRadius: theme.borders.sm,
        marginBottom: theme.spacing.xs,
        shadowColor: theme.buttonsShadow.shadowColor,
        shadowOffset: theme.buttonsShadow.shadowOffset,
        shadowOpacity: theme.buttonsShadow.shadowOpacity,
        shadowRadius: theme.buttonsShadow.shadowRadius,
        elevation: theme.buttonsShadow.elevation,
    },
    firstLine: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemName: {
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.bold,
    },
    itemDetails: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.text,
    },
    itemDetailsTotal: {
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.success,
    },
    itemInfosBackground: {
        paddingTop: theme.spacing.sm,
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
    editAndDeleteButtonBackground: {
        width: "30%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonEdit: {
        backgroundColor: theme.colors.secondary,
        width: 30,
        height: 30,
        borderRadius: theme.borders.sm,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: theme.buttonsShadow.shadowColor,
        shadowOffset: theme.buttonsShadow.shadowOffset,
        shadowOpacity: theme.buttonsShadow.shadowOpacity,
        shadowRadius: theme.buttonsShadow.shadowRadius,
        elevation: theme.buttonsShadow.elevation,
    },
    buttonDelete: {
        backgroundColor: theme.colors.danger,
        width: 30,
        height: 30,
        borderRadius: theme.borders.sm,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: theme.buttonsShadow.shadowColor,
        shadowOffset: theme.buttonsShadow.shadowOffset,
        shadowOpacity: theme.buttonsShadow.shadowOpacity,
        shadowRadius: theme.buttonsShadow.shadowRadius,
        elevation: theme.buttonsShadow.elevation,
    },
});