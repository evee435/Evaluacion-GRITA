import { View } from "react-native";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  colorFondo?: string;
};

export default function ContenedorPrincipal({ children, colorFondo }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: colorFondo }}>
      {children}
    </View>
  );
}