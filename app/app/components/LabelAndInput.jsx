import { View, Text, TextInput } from "react-native";

export default function LabelAndInput({ label, inputPlaceHolder }) {
    return (
        <View style={{ backgroundColor: "#fff", marginLeft: 16, marginRight: 16, marginBottom: 5, padding: 16, borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>{label}</Text>
            <TextInput
                placeholder={inputPlaceHolder}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 4,
                    fontSize: 16,
                }}
            />
        </View>
    );
}
