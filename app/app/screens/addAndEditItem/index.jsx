import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Button from "@/app/components/Button";

export default function AddAndEditItem() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={styles.buttonContainer}>
                <Button style={styles.backButton} icon="arrow-back" size={15} onPress={() => navigation.goBack()} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#bb0909",
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
});
