import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Share } from "react-native";
import { useShopping } from "../context/ShoppingContext";
import * as Clipboard from "expo-clipboard";
import Button from "@/app/components/Button";
import theme from "@/app/theme";

export default function SearchAndListFunctionalities() {
    const {
        searchTerm,
        setSearchTerm,
        filter,
        setFilter,
        markAllAsTaken,
        markAllAsNotTaken,
        exportList,
        importList,
    } = useShopping();

    const handleMarkAllAsTaken = async () => {
        try {
            Alert.alert(
                "Marcar todos como pegos?",
                "Deseja realmente marcar todos como pegos? Esta ação não pode ser desfeita.",
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Marcar",
                        onPress: async () => {
                            try {
                                await markAllAsTaken();
                            } catch (error) {
                                Alert.alert("Erro", "Não foi possível marcar todos como pegos.");
                            }
                        }
                    }
                ]
            )
        } catch (error) {
            Alert.alert("Erro", "Não foi possível marcar todos como pegos.");
        }
    };

    const handleMarkAllAsNotTaken = async () => {
        try {
            Alert.alert(
                "Desmarcar todos como pegos?",
                "Deseja realmente desmarcar todos como pegos? Esta ação não pode ser desfeita.",
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Desmarcar",
                        onPress: async () => {
                            try {
                                await markAllAsNotTaken();
                            } catch (error) {
                                Alert.alert("Erro", "Não foi possível desmarcar todos como pegos.");
                            }
                        }
                    }
                ]

            )
        } catch (error) {
            Alert.alert("Erro", "Não foi possível marcar todos como pegos.");
        }
    };

    const filters = [
        { key: 'all', label: 'Todos' },
        { key: 'pending', label: 'Pendentes' },
        { key: 'taken', label: 'Pegos' },
    ];

    const handleClearTextInputValue = () => {
        setSearchTerm("");
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchInputBackground}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar itens..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholderTextColor={"#444444"}
                />
                {searchTerm.length > 0 && (
                    <Button
                        style={styles.clearInputButton}
                        icon={"close-outline"}
                        iconColor={theme.colors.text}
                        iconSize={22}
                        onPress={handleClearTextInputValue}
                    />
                )}
            </View>


            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: theme.spacing.sm }}
            >
                {filters.map(({ key, label }) => (
                    <TouchableOpacity
                        key={key}
                        style={[
                            styles.functionalitiesButton,
                            filter === key && styles.activeFilterButton,
                        ]}
                        onPress={() => setFilter(key)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === key && styles.activeFilterText,
                            ]}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                ))}
                <Button
                    style={styles.functionalitiesButton}
                    icon={"checkbox-outline"}
                    iconColor={theme.colors.text}
                    onPress={handleMarkAllAsTaken}
                />
                <Button
                    style={styles.functionalitiesButton}
                    icon={"square-outline"}
                    iconColor={theme.colors.text}
                    onPress={handleMarkAllAsNotTaken}
                />
                <Button
                    style={styles.functionalitiesButton}
                    name={"Exportar lista"}
                    iconColor={theme.colors.text}
                    onPress={async () => {
                        try {
                            const jsonList = await exportList();
                            await Share.share({ message: jsonList });
                            console.log("Lista exportada:", jsonList);

                            Alert.alert(
                                "Lista Exportada",
                                "A lista foi copiada com sucesso. Você pode compartilhá-la.",
                                [{ text: "OK" }]
                            );
                        } catch (error) {
                            Alert.alert("Erro", "Não foi possível exportar a lista.");
                        }
                    }}
                />
                <Button
                    style={styles.functionalitiesButton}
                    name={"Importar lista"}
                    iconColor={theme.colors.text}
                    onPress={async () => {
                        Alert.alert(
                            "Importar Lista",
                            "Copie a lista para importar com sucesso.",
                            [
                                {
                                    text: "Não copiei a lista",
                                    style: "cancel"
                                },
                                {
                                    text: "Já copiei a lista, Importar!",
                                    onPress: async () => {
                                        const clipboardText = await Clipboard.getStringAsync();
                                        if (!clipboardText) {
                                            Alert.alert("Clipboard vazio", "Copie uma lista primeiro.");
                                            return;
                                        }

                                        try {
                                            const result = await importList(clipboardText);
                                            Alert.alert(
                                                "Sucesso",
                                                `${result.itemsImported} itens importados com sucesso!`
                                            );
                                        } catch (error) {
                                            Alert.alert("Erro ao importar a lista", "Se certifique de copiar corretamente a lista.");
                                        }
                                    }
                                }
                            ]
                        );
                    }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.secoundaryText,
    },
    searchInputBackground: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colors.secoundaryText,
        borderRadius: theme.borders.sm,
        marginBottom: theme.spacing.md,
    },
    searchInput: {
        borderRadius: theme.borders.sm,
        padding: theme.spacing.md,
        fontSize: theme.fontSizes.md,
        color: theme.colors.text,
        width: "85%",
        outlineStyle: "none"
    },
    clearInputButton: {
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outlineStyle: "none",
        marginRight: theme.spacing.sm,
    },
    functionalitiesButton: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borders.sm,
        backgroundColor: theme.colors.secoundaryText,
        borderWidth: 1,
        borderColor: theme.colors.secoundaryText,
    },
    activeFilterButton: {
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.secondary,
    },
    filterText: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.text,
    },
    activeFilterText: {
        color: theme.colors.primaryText,
    },
});