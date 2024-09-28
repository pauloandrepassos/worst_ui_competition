"use client";
import { useState } from "react";
import styles from "./Signup.module.css";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCheck, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
    const [alphabet, setAlphabet] = useState("MZQGJWBKXHTYPVDFRLSUOAEICN".split(""))
    const [question, setQuestion] = useState(null)
    const [formData, setFormData] = useState({
        name: "placeholder",
        email: "placeholder",
        password: "",
        confirmPassword: "",
        phone: "placeholder",
        birthDate: { day: "", month: "", year: "" },
        profileImage: "",
    });

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const router = useRouter()

    const steps = 7
    const progressWidth = ((steps - step + 1) / steps) * 100

    const generateRandomArray = (min, max) => {
        const arr = Array.from({ length: max - min + 1 }, (_, i) => i + min);
        return arr.sort(() => Math.random() - 0.5);
    };

    // Gerando arrays aleatórios para dia, mês e ano
    const randomDays = generateRandomArray(1, 31);
    const randomMonths = generateRandomArray(1, 12);
    const randomYears = generateRandomArray(1900, 2024);

    const handleBirthDateChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            birthDate: { ...prev.birthDate, [field]: value },
        }));
    };

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleLetterClick = (letter) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            name: prevFormData.name + letter,
        }));
        setAlphabet(shuffle([...alphabet]));
    };

    const handleSpace = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            name: prevFormData.name + " ",
        }));
    };

    const handleBackspace = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            name: prevFormData.name.slice(0, -1),
        }));
    };

    const validatePassword = (password) => {
        const minLength = 20;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const noRepeatingChars = /(.)\1\1/;
        const commonSequences = ["12345", "abcde", "password", "qwerty"];

        if (password.length < minLength) {
            return `A senha deve ter pelo menos ${minLength} caracteres.`;
        }
        if (!uppercaseRegex.test(password)) {
            return "A senha deve conter pelo menos uma letra maiúscula.";
        }
        if (!lowercaseRegex.test(password)) {
            return "A senha deve conter pelo menos uma letra minúscula.";
        }
        if (!numberRegex.test(password)) {
            return "A senha deve conter pelo menos um número.";
        }
        if (!specialCharRegex.test(password)) {
            return "A senha deve conter pelo menos um símbolo especial.";
        }
        if (noRepeatingChars.test(password)) {
            return "A senha não deve conter o mesmo caractere mais de três vezes consecutivas.";
        }
        for (let sequence of commonSequences) {
            if (password.includes(sequence)) {
                return "A senha não deve conter sequências comuns.";
            }
        }
        return null; // Senha válida
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setFormData({
            ...formData,
            password: newPassword,
        });

        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            setErrors({
                password: passwordError,
            });
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: null,
            }));
        }
    };

    const validateStep = () => {
        let valid = true;
        let newErrors = {};

        if (step === 1 && !formData.name.trim()) {
            newErrors.name = "Nome é obrigatório.";
            valid = false;
        }

        if (step === 2 && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email inválido.";
            valid = false;
        }

        if (step === 3) {
            const passwordError = validatePassword(formData.password);
            if (passwordError) {
                newErrors.password = passwordError;
                valid = false;
            }
        }

        if (step === 4 && !formData.phone.trim()) {
            newErrors.phone = "Número de telefone é obrigatório.";
            valid = false;
        }

        if (
            step === 5 &&
            (!formData.birthDate.day || !formData.birthDate.month || !formData.birthDate.year)
        ) {
            newErrors.birthDate = "Data de nascimento é obrigatória.";
            valid = false;
        }

        if (step === 6 && !formData.profileImage) {
            newErrors.profileImage = "Imagem de perfil é obrigatória.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleNextStep = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep()) {
            console.log("Form data submitted:", formData);
        }
    };

    const generateRandomPhone = () => {
        setQuestion('Esse é o seu número?')
        const phone = `(${Math.floor(Math.random() * 900 + 100)}) ${Math.floor(Math.random() * 90000 + 10000)}-${Math.floor(Math.random() * 9000 + 1000)}`;
        setFormData({
            ...formData,
            phone: phone,
        });
    };

    const handleReload = () => {
        window.location.reload();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                profileImage: URL.createObjectURL(file),
            }));
        }
    };

    const handleDownloadImage = () => {
        const a = document.createElement("a");
        a.href = formData.profileImage || "/userimage.png"; // Caminho para a imagem padrão
        a.download = "profile-image.png";
        a.click();
    };

    const handleVoltarAoInicio = () => {
        router.push(`/`)
    }
    
    const handleRedirect = () => {
        router.push('/home');
    };

    return (
        <main className={styles.main}>
            <div className={styles.signupContainer}>
                <h2>Cadastro</h2>

                <div className={styles.progressBarContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progressWidth}%` }}
                    />
                    <div>
                        <p>{progressWidth.toFixed(2)} % preenchido</p>
                        <p>{step} / {steps}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.signupForm}>
                    {step === 1 && (
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Nome</label>
                            <input
                                placeholder="placeholder"
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                readOnly
                                required
                                className={styles.nameInput}
                            />
                            <div className={styles.virtualKeyboard}>
                                <button
                                    type="button"
                                    className={styles.backspaceButton}
                                    onClick={handleBackspace}
                                >
                                    ⌫
                                </button>
                                {alphabet.map((letter) => (
                                    <button
                                        type="button"
                                        key={letter}
                                        className={styles.letterButton}
                                        onClick={() => handleLetterClick(letter)}
                                    >
                                        {letter}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    className={styles.spaceButton}
                                    onClick={handleSpace}
                                >
                                    Espaço
                                </button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="placeholder"
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="off"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                required
                                className={errors.email ? styles.inputError : ""}
                            />
                        </div>
                    )}
                    {step === 3 && (
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Senha</label>
                            <input
                                placeholder="placeholder"
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handlePasswordChange}
                                required
                                className={errors.password ? styles.inputError : ""}
                            />
                        </div>
                    )}
                    {step === 4 && (
                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Telefone</label>
                            <input
                                placeholder="placeholder"
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                readOnly
                                required
                                className={styles.phoneInput}
                                onClick={generateRandomPhone}
                            />
                            {question && (
                                <p className={styles.question}>{question}</p>
                            )}
                            <button
                                type="button"
                                className={styles.generateButton}
                                onClick={handleReload}
                            >
                                Alterar
                            </button>
                        </div>
                    )}
                    {step === 5 && (
                        <div className={styles.formGroup}>
                            <label>Data de Nascimento</label>
                            <div className={styles.birthDateContainer}>
                                <select
                                    value={formData.birthDate.day}
                                    onChange={(e) => handleBirthDateChange("day", e.target.value)}
                                    required
                                    onKeyDown={(e) => e.preventDefault()} // Previne a interação por teclado
                                >
                                    <option value="">Dia</option>
                                    {randomDays.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={formData.birthDate.month}
                                    onChange={(e) => handleBirthDateChange("month", e.target.value)}
                                    required
                                    onKeyDown={(e) => e.preventDefault()} // Previne a interação por teclado
                                >
                                    <option value="">Mês</option>
                                    {randomMonths.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={formData.birthDate.year}
                                    onChange={(e) => handleBirthDateChange("year", e.target.value)}
                                    required
                                    onKeyDown={(e) => e.preventDefault()} // Previne a interação por teclado
                                >
                                    <option value="">Ano</option>
                                    {randomYears.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    {step === 6 && (
                        <div className={styles.formGroup}>
                            <label>Imagem de Perfil</label>
                            <div className={styles.profileSection}>
                                <img
                                    src={formData.profileImage || "/userimage.png"}
                                    alt="Imagem de Perfil"
                                    className={styles.profilePreview}
                                />
                                <div className={styles.profileInfo}>
                                    <p>
                                        Para completar seu perfil, por favor faça o{' '}
                                        <label htmlFor="profileImage" className={styles.uploadText}>
                                            upload
                                        </label>{' '}
                                        de uma imagem.
                                    </p>
                                    <button
                                        type="button"
                                        className={styles.downloadButton}
                                        onClick={handleDownloadImage}
                                    >
                                        <FontAwesomeIcon icon={faUpload} /> Download Image
                                    </button>
                                </div>
                            </div>
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                className={`${styles.hiddenInput} ${errors.profileImage ? styles.inputError : ""}`}
                            />
                        </div>
                    )}
                    {step === 7 && (
                        <div className={`${styles.formGroup} ${styles.endSection}`}>
                            <span>Finalizar cadastro?</span>
                        </div>
                    )}



                    <div className={styles.buttons}>
                        <div className={`${styles.divButtons} ${styles.left}`}>
                            {step < 7 ? (
                                <button
                                    type="button"
                                    className={styles.nextButton}
                                    onClick={handleNextStep}
                                >
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className={styles.signupButton}
                                    onClick={handleRedirect}
                                >
                                    Cadastrar
                                </button>
                            )}
                        </div>

                        <div className={`${styles.divButtons} ${styles.center}`}>
                            {step === 7 && (
                                <button
                                    type="submit"
                                    className={styles.cancelButton}
                                    onClick={handleVoltarAoInicio}
                                >
                                    Cancelar{" "}
                                    <FontAwesomeIcon icon={faCheck}/>
                                </button>
                            )}
                        </div>

                        <div className={`${styles.divButtons} ${styles.right}`}>
                            {step > 1 && (
                                <button
                                    type="button"
                                    className={styles.backButton}
                                    onClick={handlePrevStep}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                            )}
                        </div>
                    </div>
                </form>

            </div>
            {errors.name && (
                <p className={styles.errorText}>{errors.name}</p>
            )}
            {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
            )}
            {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
            )}
            {(step === 3 && !errors.password) && (
                <p className={styles.question}>Sua senha é segura!!!</p>
            )}
            {errors.phone && (
                <p className={styles.errorText}>{errors.phone}</p>
            )}
            {errors.birthDate && (
                <p className={styles.errorText}>{errors.birthDate}</p>
            )}

            {errors.profileImage && (
                <p className={styles.errorText}>{errors.profileImage}</p>
            )}
        </main>
    );
}
