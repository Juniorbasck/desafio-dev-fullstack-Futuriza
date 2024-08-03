import Image from "next/image";
import {Header} from "../components/header";
import {HomeComponent} from "../components/home";

export default function Home() {
  return (
    <main className="w-full h-screen">
      <Header>
      </Header>
      <HomeComponent></HomeComponent>
    </main>
  );
}
