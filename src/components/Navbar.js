"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Ícone de menu
import styles from "./Navbar.module.css"; // Importa o CSS Module
import logo from '/public/image.png';
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleRedirect = () => {
        router.push('/')
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.logo} onClick={handleRedirect}>
                <Image
                    src={logo}
                    alt="Logo"
                    className={styles.logoImage}
                />
            </div>

            <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
                <li className={styles.closeIcon} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faTimes} />
                </li>
                <li className={styles.navItem}>
                    <a href="/home">Home</a>
                </li>
                <li className={styles.navItem}>
                    <a href="#">Sobre</a>
                </li>
                <li className={styles.navItem}>
                    <a href="#">Serviços</a>
                </li>
                <li className={styles.navItem}>
                    <a href="#">Contato</a>
                </li>
            </ul>

            <div className={styles.menuIcon} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </nav>
    );
}
