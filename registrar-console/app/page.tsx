import type { Metadata } from "next";
import { RegistrarConsole } from "@/components/RegistrarConsole";

export const metadata: Metadata = {
  title: "Registrar Console",
  description: "JDJS University · Office of Student Affairs",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RegistrarPage() {
  return <RegistrarConsole />;
}
