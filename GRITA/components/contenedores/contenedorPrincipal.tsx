import { View, StyleSheet } from "react-native";

export default function ContenedorPrincipal({ children, colorFondo }) {
  return (
    <View style={[styles.contenedor, { backgroundColor: colorFondo }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
});