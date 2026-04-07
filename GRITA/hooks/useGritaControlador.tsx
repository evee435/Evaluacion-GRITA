import { useState } from "react";
import { Dimensions } from "react-native";

const { width: anchoPantalla, height: altoPantalla } = Dimensions.get("window");

export const useGritoControlador = () => {
  const [mensajeUsuario, setMensajeUsuario] = useState("");
  const [nivelCaos, setNivelCaos] = useState(0);
  const [explosion, setExplosion] = useState(false);

  const manejarGrito = () => {
    if (nivelCaos >= 20) {
      setExplosion(true);
      setTimeout(() => {
        setNivelCaos(0);
        setExplosion(false);
      }, 1000);
    } else {
      setNivelCaos((nivelActual) => nivelActual + 1);
    }
  };

  const generarElementosCaos = () => {
    const cantidadElementos = nivelCaos * 5;
    const elementos = [];

    for (let i = 0; i < cantidadElementos; i++) {
      let color;
      if (nivelCaos < 5) color = "#00f"; // Tranquilo
      else if (nivelCaos < 10) color = "#ff0"; // Presión
      else if (nivelCaos < 15) color = "#f80"; // Ansiedad
      else color = "#f00"; // Enojo

      elementos.push({
        id: i,
        texto: (mensajeUsuario || "GRITA").toUpperCase(),
        top: Math.random() * altoPantalla,
        left: Math.random() * anchoPantalla,
        tamaño: 20 + Math.random() * nivelCaos * 5,
        color,
        rotacion: `${Math.random() * 360}deg`,
        escala: 1 + Math.random() * nivelCaos * 0.1,
      });
    }

    return elementos;
  };

  return {
    mensajeUsuario,
    setMensajeUsuario,
    nivelCaos,
    manejarGrito,
    generarElementosCaos,
    explosion,
  };
};