import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useShopping } from "../context/ShoppingContext";
import theme from "@/app/theme";

export default function SearchAndFilter() {
    const { searchTerm, setSearchTerm, filter, setFilter } = useShopping();

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
                style={styles.filterContainer}
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
    filterContainer: {
        flexDirection: 'row',
    },
    filterButton: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borders.sm,
        backgroundColor: theme.colors.lightText,
        marginRight: theme.spacing.md,
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