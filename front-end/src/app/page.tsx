import { Header } from "@/components/Header";
import { Contact, ListItem } from "@/components/ListItem";
import { List } from '@/components/List';





export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <List/>
    </main>
  );
}
