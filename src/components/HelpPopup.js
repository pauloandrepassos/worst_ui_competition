"use client";
import { useEffect, useState } from "react";
import styles from "./HelpPopup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";

export default function HelpPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
    }, 10000);
    setTimeout(() => setIsVisible(true), 40000);
  };

  useEffect(() => {
    if (!isVisible) {
      const timeout = setTimeout(() => setIsVisible(true), 20000);
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    isVisible && (
      <div className={`${isClosing ? styles.popupClosing : ''} ${isExpanded ? styles.popupExpanded : styles.popup}`}>
        <button className={styles.arrowUpButton} onClick={handleExpand}>
          <FontAwesomeIcon icon={isExpanded ? faMinimize : faMaximize} />
        </button>
        <p>Está precisando de ajuda com algo?</p>

        {isExpanded && (
          <>
            <p className={styles.infoTag}>Dica: Use palavras-chave para melhores resultados.</p>
            <p className={styles.infoTag}>Lembre-se: Escreva de forma clara e objetiva para evitar confusões.</p>
            <p className={styles.infoTag}>Nota: Mensagens mais detalhadas geralmente resultam em respostas mais rápidas.</p>
            <p className={styles.infoTag}>Curiosidade: O uso de emojis pode ajudar a expressar melhor suas emoções.</p>
            <p className={styles.infoTag}>Sugestão: Se o problema for técnico, descreva os passos que levou até o erro.</p>
            <p className={styles.infoTag}>Informação: Este serviço está disponível 24/7 para atender suas necessidades.</p>
            <p className={styles.infoTag}>Alerta: Evite fornecer informações pessoais ou sensíveis neste campo.</p>
            <p className={styles.infoTag}>Dica: Utilize o botão de envio após revisar sua mensagem.</p>
            <p className={styles.infoTag}>Dica: Você pode usar até 500 caracteres neste campo.</p>
            <p className={styles.infoTag}>Nota: Mensagens muito longas podem demorar mais para serem processadas.</p>
            <p className={styles.infoTag}>Sugestão: Revise sua mensagem antes de enviar para garantir clareza.</p>
            <p className={styles.infoTag}>Curiosidade: O campo de texto aceita todas as letras, números e símbolos.</p>
            <p className={styles.infoTag}>Lembre-se: Você receberá uma confirmação após enviar sua mensagem.</p>
            <p className={styles.infoTag}>Alerta: Não feche a janela até que sua mensagem seja enviada.</p>
            <p className={styles.infoTag}>Sugestão: Se precisar de mais ajuda, utilize nosso chat ao vivo.</p>
            <p className={styles.infoTag}>Curiosidade: A equipe de suporte responde dentro de 24 horas.</p>
            <p className={styles.infoTag}>Dica: Ao clicar em 'Enviar', sua mensagem será processada imediatamente.</p>

          </>
        )}

        <input type="text" placeholder="Digite aqui..." />

        <button className={styles.sendButton}>Enviar</button>

        {!isExpanded && (
          <p className={styles.closeButton}>
            Clique AQUI para{" "}
            <button className={styles.closeButton} onClick={closePopup}>
              fechar
            </button>
          </p>
        )}
      </div>
    )
  );
}
