import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useShopping } from "../context/ShoppingContext";
import Button from "@/app/components/Button";
import theme from "@/app/theme";

export default function SearchAndFilter() {
    const {
        searchTerm,
        setSearchTerm,
        filter,
        setFilter,
        markAllAsTaken,
        markAllAsNotTaken
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

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar itens..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholderTextColor="#999"
            />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: theme.spacing.sm }}
            >
                {filters.map(({ key, label }) => (
                    <TouchableOpacity
                        key={key}
                        style={[
                            styles.filterButton,
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
                    style={styles.filterButton}
                    icon={"checkbox-outline"}
                    color={theme.colors.text}
                    onPress={handleMarkAllAsTaken}
                />
                <Button
                    style={styles.filterButton}
                    icon={"square-outline"}
                    color={theme.colors.text}
                    onPress={handleMarkAllAsNotTaken}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primaryText,
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.borderColor,
    },
    searchInput: {
        backgroundColor: theme.colors.lightText,
        borderRadius: theme.borders.sm,
        padding: theme.spacing.md,
        fontSize: theme.fontSizes.md,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    filterButton: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borders.sm,
        backgroundColor: theme.colors.lightText,
        borderWidth: 1,
        borderColor: theme.colors.borderColor,
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