import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function AddAndClearShoppingItemsButtons() {
    const navigation = useNavigation();
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddAndEditItem")}>
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color="#fff" />
            </TouchableOpacity>
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
    addButton: {
        backgroundColor: "#3498db",
    width: 60,
    height: 60,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
    width: 50,
    height: 50,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    },
});
