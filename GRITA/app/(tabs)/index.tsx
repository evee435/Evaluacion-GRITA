import ContenedorPrincipal from "@/components/contenedores/contenedorPrincipal";
import PantallaInicial from "@/components/contenido/pantallaInicial";
import PantallaResultado from "@/components/contenido/pantallaResultado";
import { useGritoControlador } from "@/hooks/useGritaControlador";

export default function App() {
  const {
    tipo,
    frase,
    iniciarEscucha,
    escuchando,
    reiniciar,
  } = useGritoControlador();

  const colorFondo =
    tipo === "suave"
      ? "#111"
      : tipo === "medio"
      ? "#332200"
      : tipo === "fuerte"
      ? "#330000"
      : "#111";

  return (
    <ContenedorPrincipal colorFondo={colorFondo}>
      {!tipo ? (
        <PantallaInicial
          iniciarEscucha={iniciarEscucha}
          escuchando={escuchando}
        />
      ) : (
        <PantallaResultado
          tipo={tipo}
          frase={frase}
          reiniciar={reiniciar}
        />
      )}
    </ContenedorPrincipal>
  );
}