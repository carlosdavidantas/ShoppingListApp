import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Button from "@/app/components/Button";

export default function AddAndClearShoppingItemsButtons( {addButtonScreenRoute, clearList} ) {
    console.log(addButtonScreenRoute);
    
    const navigation = useNavigation();

    const handleClearList = () => {
            Alert.alert(
                "Limpar Lista",
                "Deseja realmente limpar toda a lista? Esta ação não pode ser desfeita.",
                [
                    {text: "Cancelar", style: "cancel"},
                    {
                        text: "Limpar",
                        onPress: async () => {
                            try{
                                await clearList();
                            } catch (error) {
                                Alert.alert("Erro", "Não foi possível limpar a lista.");
                            }
                        }
                    }
                ]
    
            )
        }

    return (
        <View style={styles.buttonContainer}>
            <Button
                icon="add"
                onPress={() => navigation.navigate(addButtonScreenRoute)}
            />

            <Button
                style={styles.deleteButton}
                icon="trash-outline"
                onPress={() => handleClearList()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        right: 10,
        flexDirection: "row",
        gap: 10,
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
});
