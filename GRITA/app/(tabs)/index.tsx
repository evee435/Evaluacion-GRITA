import ContenedorPrincipal from "@/components/contenedores/contenedorPrincipal";
import PantallaCaos from "@/components/contenido/pantallaCaos";
import PantallaInicial from "@/components/contenido/pantallaInicial";
import { useGritoControlador } from "@/hooks/useGritaControlador";

export default function App() {
  const {
    mensajeUsuario,
    setMensajeUsuario,
    nivelCaos,
    manejarGrito,
    generarElementosCaos,
    explosion,
  } = useGritoControlador();

  // Fondo cambia según caos; más alto el caos → color más intenso
  const colorFondo =
    nivelCaos === 0
      ? "#111"
      : `hsl(${Math.random() * 360}, 50%, 10%)`;

  return (
    <ContenedorPrincipal colorFondo={colorFondo}>
      {nivelCaos === 0 || explosion ? (
        <PantallaInicial
          mensajeUsuario={mensajeUsuario}
          setMensajeUsuario={setMensajeUsuario}
          manejarGrito={manejarGrito}
        />
      ) : (
        <PantallaCaos
          elementosCaos={generarElementosCaos()}
          manejarGrito={manejarGrito}
          nivelCaos={nivelCaos}
          explosion={explosion}
        />
      )}
    </ContenedorPrincipal>
  );
}