"use client";
import { useEffect, useRef } from "react";
import styles from "./FullListModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function FullListModal({ onClose }) {
    const scrollContainerRef = useRef(null);
    const scrollSpeed = 0.5; // Ajuste a velocidade de rolagem aqui

    const handleMouseScroll = (event) => {
        event.preventDefault();
        if (scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current;
            const delta = event.deltaY * scrollSpeed;
            scrollContainer.scrollBy({
                top: delta,
                behavior: 'smooth',
            });
        }
    };

    const handleScroll = (event) => {
        event.preventDefault(); // Bloqueia a rolagem quando o mouse está pressionado na scrollbar
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.addEventListener('wheel', handleMouseScroll, { passive: false });
        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('wheel', handleMouseScroll);
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const scrollToTop = (duration) => {
        const scrollContainer = scrollContainerRef.current;
        const start = scrollContainer.scrollTop;
        const startTime = performance.now();

        const animationFrame = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            scrollContainer.scrollTop = start * (1 - progress);

            if (progress < 1) {
                requestAnimationFrame(animationFrame);
            }
        };

        requestAnimationFrame(animationFrame);
    };

    const handleScrollToTop = () => {
        scrollToTop(2000); // Ajuste o valor para alterar a duração da rolagem (em milissegundos)
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div
                    className={styles.scrollContainer}
                    ref={scrollContainerRef}
                >
                    <ul className={styles.sponsorList}>
                        {/* Lista de patrocinadores */}
                        <li>Initech Corporation</li>
                        <li>Cyberdyne Systems</li>
                        <li>Acme Corp</li>
                        <li>Stark Industries</li>
                        <li>Wayne Enterprises</li>
                        <li>Oscorp</li>
                        <li>Dunder Mifflin</li>
                        <li>Umbrella Corporation</li>
                        <li>Aperture Science</li>
                        <li>Weyland-Yutani</li>
                        <li>Soylent Green</li>
                        <li>Tyrell Corporation</li>
                        <li>Buy N Large</li>
                        <li>Zorg Industries</li>
                        <li>Duff Beer</li>
                        <li>Krusty Burger</li>
                        <li>Palhaço Pimpão</li>
                        <li>Palhaço Trupica</li>
                        <li>Balões Furados Inc.</li>
                        <li>Fábrica de Risadas S/A</li>
                        <li>Risadinha's Pizza</li>
                        <li>Bob's Falhas Técnicas</li>
                        <li>Zumbis em Ação Ltda.</li>
                        <li>Comida de Gato Industrializada</li>
                        <li>Borrachas Quebráveis</li>
                        <li>Viagens no Tempo™</li>
                        <li>Lugares Desagradáveis Para Férias</li>
                        <li>Calçados de Concreto</li>
                        <li>Não Faça Isso! Corp</li>
                        <li>Pequenos Negócios Ilegais</li>
                        <li>Aliados Inúteis S/A</li>
                        <li>Pechinchas Que Enganam</li>
                        <li>Clube dos Supervilões</li>
                        <li>Chá de Sumiço Ltda.</li>
                        <li>Planeta das Piadas Sem Graça</li>
                        <li>Roupas que Não Duram</li>
                        <li>Livros Que Ninguém Lê</li>
                        <li>Protetor Solar Noturno</li>
                        <li>Empresa de Caras Amassadas</li>
                        <li>Más Ideias™</li>
                        <li>Dúvidas Eternas Inc.</li>
                        <li>Artigos Aleatórios S/A</li>
                        <li>Sonhos Interrompidos</li>
                        <li>Alarme que Não Desliga</li>
                        <li>Contos Mal Contados</li>
                        <li>Esconderijos Visíveis</li>
                        <li>Invisibilidade Duvidosa Inc.</li>
                        <li>Rua Sem Saída</li>
                        <li>Luzes que Pisca Inc.</li>
                        <li>Placas com Erros Ortográficos</li>
                        <li>Agulhas no Palheiro Corp</li>
                        <li>Caixas de Pandora S/A</li>
                        <li>Montanha-Russa Sem Cinto</li>
                        <li>Areia Movediça Importada</li>
                        <li>Bananas para Todos</li>
                        <li>Tatuagens Temporárias que Duram</li>
                        <li>Piadas de Tiozão Ltda.</li>
                        <li>Geladeiras sem Luz</li>
                        <li>Canetas Que Não Escrevem</li>
                        <li>Apitos Surdos S/A</li>
                        <li>Carros Sem Freio</li>
                        <li>Biscoitos da Sorte Duvidosa</li>
                        <li>Doces que Derretem</li>
                        <li>Sapatos com Chulé Automático</li>
                        <div className={styles.modalFooter}>
                            <button className={styles.scrollTopButton} onClick={handleScrollToTop}>
                                Voltar ao Início
                            </button>
                            <button className={styles.closeButton} onClick={onClose}>
                                Fechar Modal
                            </button>
                        </div>
                    </ul>
                </div>
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={faArrowCircleDown}/>
                </div>
            </div>
        </div>
    );
}
