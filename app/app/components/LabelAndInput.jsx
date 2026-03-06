import { View, Text, TextInput, StyleSheet } from "react-native";
import theme from "@/app/theme";

export default function LabelAndInput({ label, inputPlaceHolder, valueState, onChangeTextState, textInputType }) {
    return (
        <View style={sytles.background}>
            <Text style={sytles.label}>{label}</Text>
            <TextInput
                placeholder={inputPlaceHolder}
                value={valueState}
                onChangeText={onChangeTextState}
                keyboardType={textInputType}
                style={sytles.input}
            />
        </View>
    );
}

const sytles = StyleSheet.create({
    background: {
        backgroundColor: theme.colors.primaryText,
        marginLeft: theme.spacing.md,
        marginRight: theme.spacing.md,
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
        borderRadius: theme.borders.sm,
        shadowColor: theme.buttonsShadow.shadowColor,
        shadowOffset: theme.buttonsShadow.shadowOffset,
        shadowOpacity: theme.buttonsShadow.shadowOpacity,
        shadowRadius: theme.buttonsShadow.shadowRadius,
        elevation: theme.buttonsShadow.elevation,
    },
    label: {
        fontSize: theme.fontSizes.md,
        marginBottom: theme.spacing.sm
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.borderColor,
        borderRadius: theme.borders.sm,
        fontSize: theme.fontSizes.md,
        paddingLeft: theme.spacing.sm
    }
})
