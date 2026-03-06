import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import LabelAndInput from "@/app/components/LabelAndInput";
import Checkbox from "expo-checkbox";
import { useShopping } from "@/app/context/ShoppingContext";
import { validateName, validateQuantity, validateUnitPrice } from "@/app/utils/calculations";
import theme from "@/app/theme";

export default function AddAndEditItem() {
    const navigation = useNavigation();
    const route = useRoute();

    const { addItem, updateItem } = useShopping();
    const { item } = route.params || {};

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("unidade");
    const [taken, setTaken] = useState(false);
    const [errors, setErrors] = useState({ name: "", quantity: "", unitPrice: "", selectedUnit: "" });

    useEffect(() => {
        if(item) {
            setName(item.name);
            setQuantity(item.quantity.toString());
            setUnitPrice(item.unitPrice ? item.unitPrice.toString() : "");
            setSelectedUnit(item.unit);
            setTaken(item.taken);
            navigation.setOptions({ title: "Editar item" });
        } else {
            navigation.setOptions({ title: "Adicionar item" });
        }
    }, [item, navigation]);

    const validadeFields = () => {
        const newErrors = {};

        const nameValidation = validateName(name);
        if (!nameValidation.isValid)
            newErrors.name = nameValidation.error;

        const quantityValue = parseFloat(quantity.replace(",", "."));

        const quantityValidation = validateQuantity(quantityValue);
        if (!quantityValidation.isValid)
            newErrors.quantity = quantityValidation.error;

        if (unitPrice) {
            const unitPriceValue = parseFloat(unitPrice.replace(",", "."));
            const unitPriceValidation = validateUnitPrice(unitPriceValue);
            if (!unitPriceValidation.isValid)
                newErrors.unitPrice = unitPriceValidation.error;
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validadeFields())
            return;

        try {
            const quantityParsed = parseFloat(quantity.replace(",", "."));
            const unitPriceParsed = unitPrice ? parseFloat(unitPrice.replace(",", ".")) : null;

            const newItem = {
                name: name.trim(),
                quantity: quantityParsed,
                unitPrice: unitPriceParsed,
                unit: selectedUnit,
                taken,
            }

            if(item) {
                await updateItem(item.id, newItem);
                navigation.goBack();
                return;
            }
            
            await addItem(newItem);
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "An error occurred while saving the item. Please try again.")
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Button style={styles.backButton} icon="arrow-back" iconSize={theme.spacing.md} onPress={() => navigation.goBack()} />
                <Text style={styles.title}>Adicionar item</Text>
            </View>
            <View style={styles.inputBackground}>
                <LabelAndInput label="Nome do Item" inputPlaceHolder="Digite aqui" valueState={name} onChangeTextState={setName} />
                <LabelAndInput label="Quantidade" inputPlaceHolder="Digite aqui" valueState={quantity} onChangeTextState={setQuantity} textInputType={"decimal-pad"} />
                <LabelAndInput label="Preço Unitário" inputPlaceHolder="Digite aqui" valueState={unitPrice} onChangeTextState={setUnitPrice} textInputType={"decimal-pad"} />

                <View style={styles.unitsBackground}>
                    <Text style={{ fontSize: theme.fontSizes.md, marginBottom: theme.spacing.md }}>Unidade de Medida</Text>
                    <View style={styles.checkboxsBackground}>
                        <View style={styles.checkboxContainer}>
                            <Checkbox value={selectedUnit === "unidade"} onValueChange={() => setSelectedUnit("unidade")} style={styles.checkbox} />
                            <Text style={styles.checkboxLabel}>Unidade</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Checkbox value={selectedUnit === "litro"} onValueChange={() => setSelectedUnit("litro")} style={styles.checkbox} />
                            <Text style={styles.checkboxLabel}>Litros</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Checkbox value={selectedUnit === "kilograma"} onValueChange={() => setSelectedUnit("kilograma")} style={styles.checkbox} />
                            <Text style={styles.checkboxLabel}>Kilogramas</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.takenButtonBackground}>
                <Button
                    name={taken ? "No carrinho" : "Fora do carrinho"}
                    style={[styles.takenButton, taken && { backgroundColor: theme.colors.secondary }]}
                    onPress={() => setTaken(!taken)}
                />
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", gap: theme.spacing.lg }}>
                <Button name="Salvar" style={styles.saveButton} onPress={() => handleSave()} />
                <Button name="Cancelar" style={styles.cancelButton} onPress={() => navigation.goBack()} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputBackground: {
        backgroundColor: "transparent",
    },
    buttonContainer: {
        flexDirection: "row",
        padding: theme.spacing.md,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    backButton: {
        backgroundColor: theme.colors.secondary,
        width: 30,
        height: 30,
        borderRadius: theme.borders.xl,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: theme.buttonsShadow.shadowColor,
        shadowOffset: theme.buttonsShadow.shadowOffset,
        shadowOpacity: theme.buttonsShadow.shadowOpacity,
        shadowRadius: theme.buttonsShadow.shadowRadius,
        elevation: theme.buttonsShadow.elevation,
    },
    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: theme.fontWeights.bold,
        marginLeft: theme.spacing.md,
    },
    unitsBackground: {
        height: 100,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: theme.colors.primaryText,
        marginLeft: theme.spacing.md,
        marginRight: theme.spacing.md,
        marginBottom: theme.spacing.xs,
        padding: theme.spacing.md,
        borderRadius: theme.borders.sm,
        shadowColor: theme.buttonsShadow.shadowColor,
        shadowOffset: theme.buttonsShadow.shadowOffset,
        shadowOpacity: theme.buttonsShadow.shadowOpacity,
        shadowRadius: theme.buttonsShadow.shadowRadius,
        elevation: theme.buttonsShadow.elevation,
    },
    checkboxsBackground: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    checkboxContainer: {
        flexDirection: "row",
        gap: theme.spacing.md,
        alignItems: "center",
        justifyContent: "space-around",
        marginLeft: theme.spacing.xs,
    },
    checkbox: {
        transform: [{ scale: 1.5 }],
    },
    checkboxLabel: {
        color: "#1a1919",
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.bold,
    },
    takenButtonBackground: {
        backgroundColor: "transparent",
        padding: theme.spacing.md,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    takenButton: {
        backgroundColor: theme.colors.danger,
        width: 100,
        height: 50,
        borderRadius: theme.borders.sm,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: theme.buttonsShadow.shadowColor,
        shadowOffset: theme.buttonsShadow.shadowOffset,
        shadowOpacity: theme.buttonsShadow.shadowOpacity,
        shadowRadius: theme.buttonsShadow.shadowRadius,
        elevation: theme.buttonsShadow.elevation,
    },
    saveButton: {
        backgroundColor: theme.colors.secondary,
        width: "90%",
        height: "30%",
        borderRadius: theme.borders.md,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: theme.buttonsShadow.shadowColor,
        shadowOffset: theme.buttonsShadow.shadowOffset,
        shadowOpacity: theme.buttonsShadow.shadowOpacity,
        shadowRadius: theme.buttonsShadow.shadowRadius,
        elevation: theme.buttonsShadow.elevation,
    },
    cancelButton: {
        backgroundColor: theme.colors.primary,
        width: "90%",
        height: "30%",
        borderRadius: theme.borders.md,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: theme.buttonsShadow.shadowColor,
        shadowOffset: theme.buttonsShadow.shadowOffset,
        shadowOpacity: theme.buttonsShadow.shadowOpacity,
        shadowRadius: theme.buttonsShadow.shadowRadius,
        elevation: theme.buttonsShadow.elevation,
    },
});
