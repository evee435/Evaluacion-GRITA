import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export const useGritoControlador = () => {
  const [tipo, setTipo] = useState<"fuerte" | "medio" | "suave" | null>(null);
  const [frase, setFrase] = useState("");
  const [escuchando, setEscuchando] = useState(false);

  useEffect(() => {
    console.log("Tipo:", tipo);
    console.log("Frase:", frase);
  }, [tipo, frase]);

  const iniciarEscucha = async () => {
    try {
      const permiso = await Audio.requestPermissionsAsync();
      if (!permiso.granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();

      await recording.prepareToRecordAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      });

      let volumenMax = -160;
      let meteringDisponible = false;

      recording.setOnRecordingStatusUpdate((status) => {
        console.log("metering:", status.metering);

        if (status.metering !== undefined) {
          meteringDisponible = true;

          if (status.metering > volumenMax) {
            volumenMax = status.metering;
          }
        }
      });

      await recording.startAsync();
      setEscuchando(true);

      setTimeout(async () => {
        await recording.stopAndUnloadAsync();
        setEscuchando(false);

        let volumen = volumenMax;

        // 🔥 fallback si metering no funcionó
        if (!meteringDisponible) {
          console.log("⚠️ Metering no disponible, usando fallback");
          volumen = -15; // valor medio simulado
        }

        console.log("Volumen final:", volumen);

        if (volumen >= -10) {
          setTipo("fuerte");
          setFrase("TU DESTINO NO ES CALLAR LO QUE SENTÍS");
        } else if (volumen >= -20) {
          setTipo("medio");
          setFrase("No es el momento… es vos evitando el momento");
        } else {
          setTipo("suave");
          setFrase(
            "No todo destino está escrito… algunas cosas dependen de lo que te animás a sentir",
          );
        }
      }, 5000);
    } catch (error) {
      console.error("Error en grabación:", error);
    }
  };

  const reiniciar = () => {
    setTipo(null);
    setFrase("");
  };

  return {
    tipo,
    frase,
    iniciarEscucha,
    escuchando,
    reiniciar,
  };
};