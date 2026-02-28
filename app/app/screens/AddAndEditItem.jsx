import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import LabelAndInput from "@/app/components/LabelAndInput";
import Checkbox from "expo-checkbox";
import { useShopping } from "@/app/context/ShoppingContext";
import { validateName, validateQuantity, validateUnitPrice } from "@/app/utils/calculations";

export default function AddAndEditItem() {
    const navigation = useNavigation();
    const route = useRoute();

    const { addItem, updateItem } = useShopping();
    const { item } = route.params || {};

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [selectedUnit, setSelectedUnit] = useState(null);
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
                console.log("Item updated:", newItem);
                Alert.alert("Success", "Item updated successfully!");
                navigation.goBack();
                return;
            }
            
            await addItem(newItem);
            console.log("Item added:", newItem);
            Alert.alert("Success", "Item added successfully!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "An error occurred while saving the item. Please try again.")
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#ecf0f1", flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Button style={styles.backButton} icon="arrow-back" size={15} onPress={() => navigation.goBack()} />
                <Text style={styles.title}>Adicionar item</Text>
            </View>
            <View style={styles.inputBackground}>
                <LabelAndInput label="Nome do Item" inputPlaceHolder="Digite aqui" valueState={name} onChangeTextState={setName} />
                <LabelAndInput label="Quantidade" inputPlaceHolder="Digite aqui" valueState={quantity} onChangeTextState={setQuantity} />
                <LabelAndInput label="Preço Unitário" inputPlaceHolder="Digite aqui" valueState={unitPrice} onChangeTextState={setUnitPrice} />

                <View style={styles.unitsBackground}>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>Unidade de Medida</Text>
                    <View style={styles.checkboxsBackground}>
                        <View style={styles.checkboxContainer}>
                            <Checkbox value={selectedUnit === "un"} onValueChange={() => setSelectedUnit("un")} style={styles.checkbox} />
                            <Text style={styles.checkboxLabel}>Unidade</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Checkbox value={selectedUnit === "l"} onValueChange={() => setSelectedUnit("l")} style={styles.checkbox} />
                            <Text style={styles.checkboxLabel}>Litros</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Checkbox value={selectedUnit === "kg"} onValueChange={() => setSelectedUnit("kg")} style={styles.checkbox} />
                            <Text style={styles.checkboxLabel}>Kilogramas</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.takenButtonBackground}>
                <Button
                    name={taken ? "No carrinho" : "Fora do carrinho"}
                    style={[styles.takenButton, taken && { backgroundColor: "#3498db" }]}
                    onPress={() => setTaken(!taken)}
                />
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", gap: 20 }}>
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
        padding: 16,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    backButton: {
        backgroundColor: "#3498db",
        width: 30,
        height: 30,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 16,
    },
    unitsBackground: {
        height: 100,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 5,
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    checkboxsBackground: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    checkboxContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-around",
        marginLeft: 5,
    },
    checkbox: {
        transform: [{ scale: 1.5 }],
    },
    checkboxLabel: {
        color: "#1a1919",
        fontSize: 16,
        fontWeight: "bold",
    },
    takenButtonBackground: {
        backgroundColor: "transparent",
        padding: 16,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    takenButton: {
        backgroundColor: "#e74c3c",
        width: 100,
        height: 50,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    saveButton: {
        backgroundColor: "#3498db",
        width: "90%",
        height: "20%",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    cancelButton: {
        backgroundColor: "#417191",
        width: "90%",
        height: "20%",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
});
