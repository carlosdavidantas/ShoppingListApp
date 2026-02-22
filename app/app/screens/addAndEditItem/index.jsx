import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import Button from "@/app/components/Button";
import LabelAndInput from "@/app/components/LabelAndInput";
import Checkbox from "expo-checkbox";

export default function AddAndEditItem() {
    const navigation = useNavigation();
    const [selectedUnit, setSelectedUnit] = useState(null);
    return (
        <SafeAreaView style={{ backgroundColor: "#ecf0f1", flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Button style={styles.backButton} icon="arrow-back" size={15} onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.inputBackground}>
                <LabelAndInput label="Nome do Item" inputPlaceHolder="Digite aqui" />
                <LabelAndInput label="Quantidade" inputPlaceHolder="Digite aqui" />
                <LabelAndInput label="Preço Unitário" inputPlaceHolder="Digite aqui" />

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
            <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center", gap: 20 }}>
                <Button name="Salvar" style={styles.saveButton} />
                <Button name="Cancelar" style={styles.cancelButton} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        padding: 16,
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
        gap:10,
        alignItems: "center",
        justifyContent: "space-around",
        marginLeft: 5,
    },
    checkbox: {
        transform: [{ scale: 1.5}],
    },
    checkboxLabel: {
        color: "#1a1919",
        fontSize: 16,
        fontWeight: "bold",
    }, 
    saveButton: {
        backgroundColor: "#3498db",
        width: "70%",
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
        width: "70%",
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
