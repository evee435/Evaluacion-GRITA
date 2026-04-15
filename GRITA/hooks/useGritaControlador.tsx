import { useState } from "react";
import { Audio } from "expo-av";

export const useGritoControlador = () => {
  const [tipo, setTipo] = useState<"fuerte" | "medio" | "suave" | null>(null);
  const [frase, setFrase] = useState("");
  const [escuchando, setEscuchando] = useState(false);

  const iniciarEscucha = async () => {
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

recording.setOnRecordingStatusUpdate((status) => {
  if (status.metering !== undefined) {
    if (status.metering > volumenMax) {
      volumenMax = status.metering;
    }
  }
});
    await recording.startAsync();
    setEscuchando(true);

    setTimeout(async () => {
      const status = await recording.getStatusAsync();
      await recording.stopAndUnloadAsync();
      setEscuchando(false);

const volumen = volumenMax;
      console.log("Volumen:", volumen);
if (volumen >= -10) {
  setTipo("fuerte");
  setFrase("TU DESTINO NO ES CALLAR LO QUE SENTÍS");
} else if (volumen >= -20) {
  setTipo("medio");
  setFrase("No es el momento… es vos evitando el momento");
} else {
  setTipo("suave");
  setFrase("No todo destino está escrito… algunas cosas dependen de lo que te animás a sentir");
}
    }, 5000);
  }
  console.log("Tipo:", tipo);
console.log("Frase:", frase);

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