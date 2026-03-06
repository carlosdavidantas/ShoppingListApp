import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShopping } from "../context/ShoppingContext";
import Header from "@/app/components/Header";
import SearchAndFilter from "@/app/components/SearchAndFilter";
import ShoppingList from "@/app/components/ShoppingList";
import AddAndClearShoppingItemsButtons from "@/app/components/AddAndClearShoppingItemsButtons";
import theme from "@/app/theme";

export default function Home() {
    const { clearList } = useShopping();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.appContainer}>
                <Header />
                <SearchAndFilter />
                <ShoppingList />
                <AddAndClearShoppingItemsButtons
                    addButtonScreenRoute={"AddAndEditItem"}
                    clearList={clearList}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme.colors.background,
    },
    appContainer: {
        height: "100%",
    }
});
