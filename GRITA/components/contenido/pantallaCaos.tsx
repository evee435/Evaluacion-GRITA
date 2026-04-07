import { View, Text, Pressable, StyleSheet } from "react-native";

export default function PantallaCaos({
  elementosCaos,
  manejarGrito: 
  nivelCaos: number,
}) {
  return (
    <View style={{ flex: 1 }}>
      {elementosCaos.map((item) => (
        <Text
          key={item.id}
          style={{
            position: "absolute",
            top: item.top,
            left: item.left,
            fontSize: item.tamaño,
            color: item.color,
            transform: [
              { rotate: item.rotacion },
              { scale: item.escala },
            ],
          }}
        >
          {item.texto}
        </Text>
      ))}

      <Pressable style={styles.boton} onPress={manejarGrito}>
        <Text style={styles.textoBoton}>
          MÁS CAOS ({nivelCaos})
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
  },
  textoBoton: {
    color: "white",
    fontWeight: "bold",
  },
});