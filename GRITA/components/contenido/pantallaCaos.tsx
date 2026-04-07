import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Audio } from "expo-av";
import { useEffect } from "react";

export default function PantallaCaos({
  elementosCaos,
  manejarGrito,
  nivelCaos,
  explosion,
}) {
  // Reproducir sonido según intensidad
  useEffect(() => {
    const reproducirSonido = async () => {
      const sonido = new Audio.Sound();
      try {
        await sonido.loadAsync(
          nivelCaos < 10
            ? require("../../assets/sonido_bajo.mp3")
            : require("../../assets/sonido_alto.mp3")
        );
        await sonido.playAsync();
      } catch (error) {
        console.log("Error al reproducir sonido:", error);
      }
    };
    reproducirSonido();
  }, [nivelCaos]);

  return (
    <View style={{ flex: 1 }}>
      {elementosCaos.map((elemento) => {
        const vibracion = useSharedValue(0);
        vibracion.value = withRepeat(
          withTiming(5, { duration: 100 }),
          -1,
          true
        );

        const estiloAnimado = useAnimatedStyle(() => ({
          transform: [
            { translateX: vibracion.value },
            { translateY: vibracion.value },
            { rotate: elemento.rotacion },
            { scale: elemento.escala },
          ],
        }));

        return (
          <Animated.Text
            key={elemento.id}
            style={[
              {
                position: "absolute",
                top: elemento.top,
                left: elemento.left,
                fontSize: elemento.tamaño,
                color: elemento.color,
              },
              estiloAnimado,
              explosion && { opacity: 0 },
            ]}
          >
            {elemento.texto}
          </Animated.Text>
        );
      })}

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