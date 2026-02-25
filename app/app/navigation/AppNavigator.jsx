import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/app/screens/Home";
import AddAndEditItem from "@/app/screens/AddAndEditItem";
import { ShoppingProvider } from "@/app/context/ShoppingContext";

const Stack = createNativeStackNavigator();
export default function APPNavigator() {
    return (
        <ShoppingProvider>
            <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#2c3e50",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false  }}
            />

            <Stack.Screen
                name="AddAndEditItem"
                component={AddAndEditItem}
                options={{
                    title: "Adicionar Item",
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
        </ShoppingProvider>
    );
}
