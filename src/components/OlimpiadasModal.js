"use client"
import { useState, useEffect } from 'react';
import styles from './OlimpiadasModal.module.css';

const anuncios = [
  {
    id: 1,
    imagem: '/anuncio1.jpg',
  },
  {
    id: 2,
    imagem: '/anuncio2.png',
  },
  {
    id: 3,
    imagem: '/anuncio3.webp',
  },
  {
    id: 4,
    imagem: '/anuncio4.jpg',
  },
  {
    id: 5,
    imagem: '/anuncio5.webp',
  },
  {
    id: 6,
    imagem: '/anuncio6.webp',
  },
];

const OlimpiadasModal = () => {
  const [currentAnuncio, setCurrentAnuncio] = useState(anuncios[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openModalAfterDelay = setTimeout(() => {
      setIsOpen(true);
    }, 30000); // Abre o modal após 30 segundos

    return () => clearTimeout(openModalAfterDelay);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const reopenModalAfterDelay = setTimeout(() => {
        setIsOpen(true);
      }, 30000); // Reabre o modal após 30 segundos se estiver fechado

      return () => clearTimeout(reopenModalAfterDelay);
    }
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnuncio((prevAnuncio) => {
        const currentIndex = anuncios.findIndex(a => a.id === prevAnuncio.id);
        const nextIndex = (currentIndex + 1) % anuncios.length;
        return anuncios[nextIndex];
      });
    }, 30000); // Troca de anúncio a cada 60 segundos

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <button className={styles.close} onClick={() => setIsOpen(false)}>×</button>
        <img src={currentAnuncio.imagem} alt={currentAnuncio.titulo} className={styles.image} />
      </div>
    </div>
  );
};

export default OlimpiadasModal;
