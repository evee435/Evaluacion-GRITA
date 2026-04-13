import { View } from "react-native";

export default function ContenedorPrincipal({ children, colorFondo }) {
  return (
    <View style={{ flex: 1, backgroundColor: colorFondo }}>
      {children}
    </View>
  );
}