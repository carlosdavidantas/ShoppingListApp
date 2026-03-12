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
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="AddAndEditItem"
                    component={AddAndEditItem}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </ShoppingProvider>
    );
}
