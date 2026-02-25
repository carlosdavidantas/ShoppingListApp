import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import ShoppingList from "@/app/components/ShoppingList";
import AddAndClearShoppingItemsButtons from "@/app/components/AddAndClearShoppingItemsButtons";

export default function Home() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.appContainer}>
                <Header />
                <ShoppingList />
                <AddAndClearShoppingItemsButtons />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#a2b3ff',
    },
    appContainer: {
        height: "100%",
    }
});
