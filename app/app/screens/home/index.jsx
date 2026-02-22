import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import ShoppingList from "@/app/components/ShoppingList";
import AddAndClearShoppingItemsButtons from "@/app/components/AddAndClearShoppingItemsButtons";

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ShoppingList />
            <AddAndClearShoppingItemsButtons />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c2a66',
    },
});
