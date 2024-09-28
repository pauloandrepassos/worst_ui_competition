"use client"
import { useState } from "react";
import styles from "./Footer.module.css";
import FullListModal from "./FullListModal";

export default function Footer() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <footer className={styles.footer}>
      <marquee behavior="scroll" direction="left" className={styles.marquee}>
        <span>
          Patrocinado por: 
          Initech Corporation | Cyberdyne Systems | Acme Corp | Stark Industries | Wayne Enterprises |
          Oscorp | Dunder Mifflin | Umbrella Corporation | Aperture Science | Weyland-Yutani |
          Soylent Green | Tyrell Corporation | Buy N Large | Zorg Industries | Duff Beer | Krusty Burger |
          Palhaço Pimpão | Palhaço Trupica | Balões Furados Inc. | Fábrica de Risadas S/A | Risadinha's Pizza |
          Bob's Falhas Técnicas | Zumbis em Ação Ltda. | Comida de Gato Industrializada |
          Borrachas Quebráveis | Viagens no Tempo™ | Lugares Desagradáveis Para Férias | Calçados de Concreto |
          Não Faça Isso! Corp | Pequenos Negócios Ilegais | Aliados Inúteis S/A | Pechinchas Que Enganam |
          Clube dos Supervilões | Chá de Sumiço Ltda. | Planeta das Piadas Sem Graça | Roupas que Não Duram |
          Livros Que Ninguém Lê | Protetor Solar Noturno | Empresa de Caras Amassadas | Más Ideias™ |
          Dúvidas Eternas Inc. | Artigos Aleatórios S/A | Sonhos Interrompidos | Alarme que Não Desliga |
          Contos Mal Contados | Esconderijos Visíveis | Invisibilidade Duvidosa Inc. | Rua Sem Saída |
          Luzes que Pisca Inc. | Placas com Erros Ortográficos | Agulhas no Palheiro Corp | Caixas de Pandora S/A |
          Montanha-Russa Sem Cinto | Areia Movediça Importada | Bananas para Todos | Tatuagens Temporárias que Duram |
          Piadas de Tiozão Ltda. | Geladeiras sem Luz | Canetas Que Não Escrevem | Apitos Surdos S/A |
          Carros Sem Freio | Biscoitos da Sorte Duvidosa | Doces que Derretem | Sapatos com Chulé Automático
        </span>
      </marquee>
      <button className={styles.fullListButton} onClick={openModal}>
        Ver lista completa
      </button>
      {isModalOpen && <FullListModal onClose={closeModal} />}
    </footer>
  );
}
