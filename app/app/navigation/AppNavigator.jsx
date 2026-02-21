import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/app/screens/home";
import AddAndEditItem from "@/app/screens/addAndEditItem";

const Stack = createNativeStackNavigator();
export default function APPNavigator() {
    return (
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
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
}