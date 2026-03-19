import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/app/theme";

export default function NavigationButton({ style, icon, iconSize, iconColor, onPress, name }) {
    return (
        <TouchableOpacity style={style || styles.button} onPress={onPress}>
            {name ? <Text style={{ color: iconColor || `${theme.colors.lightText}` }}>{name}</Text> : <Ionicons name={icon} size={iconSize || theme.fontSizes.md} color={iconColor || `${theme.colors.lightText}`} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.secondary,
        width: 50,
        height: 50,
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
