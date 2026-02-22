import { View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Button from "@/app/components/Button";

export default function AddAndClearShoppingItemsButtons() {
    const navigation = useNavigation();
    return (
        <View style={styles.buttonContainer}>
            <Button
                icon="add"
                onPress={() => navigation.navigate("AddAndEditItem")}
            />

            <Button
                style={styles.deleteButton}
                icon="trash-outline"
                onPress={() => console.log("Limpar itens")}
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
