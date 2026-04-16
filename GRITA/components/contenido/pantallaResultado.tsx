import { Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useEffect } from "react";

type Props = {
  tipo: string | null;
  frase: string;
  reiniciar: () => void;
};

export default function PantallaResultado({ tipo, frase, reiniciar }: Props) {  const anim = useSharedValue(0);

  useEffect(() => {
    if (tipo === "suave") {
      anim.value = withTiming(1, { duration: 2000 });
    } else if (tipo === "medio") {
      anim.value = withRepeat(withTiming(1, { duration: 300 }), -1, true);
    } else {
      anim.value = withRepeat(withTiming(10, { duration: 50 }), -1, true);
    }
  }, [tipo]);

  const estilo = useAnimatedStyle(() => {
    if (tipo === "fuerte") {
      return {
        transform: [{ translateX: anim.value }],
      };
    }
    return {
      opacity: anim.value,
    };
  });

  const color =
    tipo === "suave"
      ? "#6ECFF6"
      : tipo === "medio"
      ? "#F4D35E"
      : "#F95738";

  return (
    <Animated.View style={[styles.container, estilo]}>
      <Text style={[styles.texto, { color }]}>
        {frase}
      </Text>

      <Pressable style={styles.boton} onPress={reiniciar}>
        <Text style={styles.botonTexto}>VOLVER</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  texto: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
  },
  boton: {
    marginTop: 40,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
  },
  botonTexto: {
    color: "white",
  },
});