import { useState } from "react";
import { Dimensions } from "react-native";

const { width: anchoPantalla, height: altoPantalla } = Dimensions.get("window");

export const useGritaControlador = () => {
  const [mensajeUsuario, setMensajeUsuario] = useState("");
  const [nivelCaos, setNivelCaos] = useState(0);

  const manejarGrito = () => {
    setNivelCaos((nivelActual) => nivelActual + 1);
  };

  const generarElementosDeCaos = () => {
    const cantidadElementos = nivelCaos * 5;
    const elementos = [];

    for (let i = 0; i < cantidadElementos; i++) {
      elementos.push({
        id: i,
        texto: (mensajeUsuario || "GRITA").toUpperCase(),
        top: Math.random() * altoPantalla,
        left: Math.random() * anchoPantalla,
        tamaño: 20 + Math.random() * nivelCaos * 5,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        rotacion: `${Math.random() * 360}deg`,
        escala: 1 + Math.random() * nivelCaos,
      });
    }

    return elementos;
  };

  return {
    mensajeUsuario,
    setMensajeUsuario,
    nivelCaos,
    manejarGrito,
    generarElementosDeCaos,
  };
};