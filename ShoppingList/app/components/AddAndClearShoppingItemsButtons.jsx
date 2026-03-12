import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Button from "@/app/components/Button";
import theme from "@/app/theme";

export default function AddAndClearShoppingItemsButtons( {addButtonScreenRoute, clearList} ) {    
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
        gap: theme.spacing.sm,
    },
    deleteButton: {
        backgroundColor: theme.colors.danger,
        width: 40,
        height: 40,
        borderRadius: theme.borders.xl,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: theme.buttonsShadow.shadowColor,
        shadowOffset: theme.buttonsShadow.shadowOffset,
        shadowOpacity: theme.buttonsShadow.shadowOpacity,
        shadowRadius: theme.buttonsShadow.shadowRadius,
        elevation: theme.buttonsShadow.elevation,
    },
});
