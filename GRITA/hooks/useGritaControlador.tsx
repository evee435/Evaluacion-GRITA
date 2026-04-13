import { useState } from "react";
import { Audio } from "expo-av";

export const useGritoControlador = () => {
  const [tipo, setTipo] = useState(null);
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

    await recording.startAsync();
    setEscuchando(true);

    setTimeout(async () => {
      const status = await recording.getStatusAsync();
      await recording.stopAndUnloadAsync();
      setEscuchando(false);

const volumen = status.metering ?? -160;
      if (volumen > -20) {
        setTipo("fuerte");
        setFrase("TU DESTINO NO ES CALLAR LO QUE SENTÍS");
      } else if (volumen > -50){
        setTipo("medio");
        setFrase("No es el momento… es vos evitando el momento");
      } else {
        setTipo("suave");
        setFrase("No todo destino está escrito… algunas cosas dependen de lo que te animás a sentir");
      }
    }, 4000);
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