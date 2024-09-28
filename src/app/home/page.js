"use client";
import { useState, useEffect, useContext } from 'react';
import styles from './home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { AtletasContext } from '@/context/AtletasContext';
import Footer from '@/components/Footer';

export default function Home() {
    const router = useRouter();
    const { atletas, adicionarPontuacao, pontuacoes, calcularMediaPontuacoes } = useContext(AtletasContext);
    const [selectedAtleta, setSelectedAtleta] = useState(null);
    const [pontuacao, setPontuacao] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [inverted, setInverted] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setInverted(prevInverted => !prevInverted); // Alterna o estado de inversão
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    const openModal = (atleta) => {
        setSelectedAtleta(atleta);
    };

    const closeModal = () => {
        setSelectedAtleta(null);
        setPontuacao('');
    };

    const handlePontuacaoChange = (e) => {
        const valor = e.target.value;
        const isBinary = /^[01]+$/.test(valor);
        const isInRange = parseInt(valor, 2) >= 1 && parseInt(valor, 2) <= 10;

        if (isBinary && isInRange) {
            setPontuacao(valor);
        } else if (valor === '') {
            setPontuacao('');
        }
    };

    const handleConfirmarPontuacao = () => {
        if (selectedAtleta && (pontuacao > 0 )) {
            adicionarPontuacao(selectedAtleta.id, pontuacao);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
            setPontuacao('')
            //closeModal();
        }
    };

    const handleRedirect = () => {
        router.push('/');
    };

    // Define a ordem dos atletas
    const atletasExibidos = inverted ? [...atletas].reverse() : atletas;

    return (
        <div className={styles.container}>
            <h1>Lista de Atletas</h1>
            <p>Selecione o atleta de sua preferência e atribua uma avaliação de desempenho</p>
            <ul className={styles.lista}>
                {atletasExibidos.map((atleta) => (
                    <li key={atleta.id} className={styles.item} onClick={() => openModal(atleta)}>
                        <img src={atleta.imagem} alt={atleta.nome} className={styles.imagem} />
                        <span>{atleta.nome}</span>
                        {pontuacoes[atleta.id] && (
                            <div className={styles.pontuacaoDisplay}>
                                Média: {calcularMediaPontuacoes(atleta.id)}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {selectedAtleta && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>{selectedAtleta.nome}</h2>
                        <div className={styles.row}>
                            <img src={selectedAtleta.imagem} alt={selectedAtleta.nome} className={styles.modalImagem} />
                            <div className={styles.pontuacaoContainer}>
                                
                            <div className={styles.modalPontuacaoDisplay}>
                                    Média: {calcularMediaPontuacoes(selectedAtleta.id)}
                                </div>
                                <div className={styles.pontuacoesList}>
                                    <h3>Pontuações Anteriores:</h3>
                                    <ul>
                                        {pontuacoes[selectedAtleta.id]?.map((pontuacao, index) => (
                                            <li key={index}>{pontuacao}</li>
                                        ))}
                                    </ul>
                                </div>
                                <label htmlFor="pontuacao">Dê uma pontuação:</label>
                                <input
                                    type="text"
                                    id="pontuacao"
                                    value={pontuacao}
                                    onChange={handlePontuacaoChange}
                                    className={styles.inputPontuacao}
                                    placeholder="placeholder"
                                />
                                <span className={styles.close} onClick={closeModal}>
                                    <FontAwesomeIcon icon={faClose} />
                                </span>
                                <div className={styles.buttons}>
                                    <button className={styles.otherButton} onClick={handleConfirmarPontuacao}>
                                    enregistrer le score
                                    </button>
                                    <button className={styles.cancelButton} onClick={handleRedirect}>
                                        Annuler le score
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button className={styles.otherButton}>aide</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {showToast && (
                <div className={styles.toast}>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Pontuação registrada!
                </div>
            )}
            <Footer />
        </div>
    );
}
