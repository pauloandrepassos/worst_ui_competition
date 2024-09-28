"use client";
import { createContext, useState } from 'react';

export const AtletasContext = createContext();

export function AtletasProvider({ children }) {
    const initialAtletas = [
        { id: 10, nome: 'Rebeca Andrade', imagem: '/rebeca_andrade.jpg' },
        { id: 1, nome: 'Sofia', imagem: '/atleta1.jpeg' },
        { id: 2, nome: 'Pedro', imagem: '/atleta2.jpeg' },
        { id: 3, nome: 'Lara', imagem: '/atleta3.jpeg' },
        { id: 4, nome: 'Carlos', imagem: '/atleta4.jpeg' },
        { id: 5, nome: 'Aiko', imagem: '/atleta5.jpeg' },
        { id: 6, nome: 'Kikanguru', imagem: '/canguru.jpeg' },
        { id: 7, nome: 'Mingau', imagem: '/guepardo.jpeg' },
    ];

    const initialPontuacoes = {
        10: ['1010', '1010'],
        1: ['0100', '1010'],
        2: ['0100', '1000'],
        3: ['0010', '0110'],
        4: ['0111', '0100'],
        5: ['1000', '0110'], 
        6: ['1010', '0101'],
        7: ['1010', '0101'],
    };

    const [atletas, setAtletas] = useState(initialAtletas);
    const [pontuacoes, setPontuacoes] = useState(initialPontuacoes);

    const adicionarPontuacao = (atletaId, pontuacao) => {
        setPontuacoes(prevPontuacoes => ({
            ...prevPontuacoes,
            [atletaId]: [...(prevPontuacoes[atletaId] || []), pontuacao],
        }));
    };

    const calcularMediaPontuacoes = (atletaId) => {
        const atletaPontuacoes = pontuacoes[atletaId] || [];
        if (atletaPontuacoes.length === 0) return 0;

        const soma = atletaPontuacoes.reduce((acc, p) => acc + parseInt(p, 2), 0);
        return (soma / atletaPontuacoes.length).toFixed(2);
    };

    return (
        <AtletasContext.Provider value={{ atletas, pontuacoes, adicionarPontuacao, calcularMediaPontuacoes }}>
            {children}
        </AtletasContext.Provider>
    );
}
