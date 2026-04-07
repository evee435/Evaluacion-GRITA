import ContenedorPrincipal from "@/components/contenedores/contenedorPrincipal";
import PantallaCaos from "@/components/contenido/pantallaCaos";
import PantallaInicial from "@/components/contenido/pantallaInicial";
import { useGritaControlador } from "@/hooks/useGritaControlador";

export default function App() {
  const {
    mensajeUsuario,
    setMensajeUsuario,
    nivelCaos,
    manejarGrito,
    generarElementosDeCaos,
  } = useGritaControlador();

  const colorFondo =
    nivelCaos === 0
      ? "#111"
      : `hsl(${Math.random() * 360}, 50%, 10%)`;

  return (
    <ContenedorPrincipal colorFondo={colorFondo}>
      {nivelCaos === 0 ? (
        <PantallaInicial
          mensajeUsuario={mensajeUsuario}
          setMensajeUsuario={setMensajeUsuario}
          manejarGrito={manejarGrito}
        />
      ) : (
        <PantallaCaos
          elementosCaos={generarElementosDeCaos()}
          manejarGrito={manejarGrito}
          nivelCaos={nivelCaos}
        />
      )}
    </ContenedorPrincipal>
  );
}