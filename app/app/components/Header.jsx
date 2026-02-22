import { View, Text, StyleSheet } from "react-native";

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Compras</Text>
            <Text style={styles.totalValueText}>R$ {0}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#1c2a66',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 4,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    totalText: {
        color: '#cacaca',
        fontSize: 18,
        fontWeight: 'bold', 
    },
    totalValueText: {
        color: '#ff0000',
        fontSize: 18,
        flexWrap: 'wrap',
    }
});
