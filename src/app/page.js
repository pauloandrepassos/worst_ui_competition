// Home.js
import styles from "./page.module.css";
import HelpPopup from "../components/HelpPopup";
import LoginButton from "../components/LoginButton"; // Importe o novo componente
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sistema de Avaliação Olímpica</h1>
        <h4 className={styles.subtitle}>Pontue a excelência, celebre a vitória!</h4>
        <p>Entre, compartilhe sua visão e avalie o desempenho dos campeões olímpicos – sua opinião pode inspirar e motivar!</p>
      </header>
      <LoginButton />
      <Footer />
    </main>
  );
}
