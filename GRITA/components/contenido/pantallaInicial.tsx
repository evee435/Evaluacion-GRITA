import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function PantallaInicial({
  mensajeUsuario,
  setMensajeUsuario,
  manejarGrito,
}) {
  return (
    <View>
      <Text style={styles.titulo}>
        No te quedes en silencio...
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Escribí lo que sentís..."
        placeholderTextColor="#aaa"
        value={mensajeUsuario}
        onChangeText={setMensajeUsuario}
      />

      <Pressable style={styles.boton} onPress={manejarGrito}>
        <Text style={styles.textoBoton}>GRITAR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginTop: 100,
  },
  input: {
    backgroundColor: "#222",
    color: "white",
    margin: 20,
    padding: 10,
    borderRadius: 8,
  },
  boton: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBoton: {
    color: "white",
    fontWeight: "bold",
  },
});