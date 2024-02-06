import { Header } from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <div>
        <h2>Listagem de Contatos</h2>
        
      </div>
    </main>
  );
}
