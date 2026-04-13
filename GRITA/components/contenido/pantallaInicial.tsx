import { Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function PantallaInicial({ iniciarEscucha, escuchando }) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 2000 });
  }, []);

  const estilo = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, estilo]}>
      <Text style={styles.texto}>
        ¿Querés saber qué te depara hoy…{"\n"}
        o solo necesitás gritar?
      </Text>

      <Pressable style={styles.boton} onPress={iniciarEscucha}>
        <Text style={styles.botonTexto}>
          {escuchando ? "ESCUCHANDO..." : "HABLÁ"}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  texto: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 40,
  },
  boton: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },
});