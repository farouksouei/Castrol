"use client";

import React, {useState} from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import swal from "sweetalert";


// Define the props type
interface TwoPartComponentProps {
    imageUrl: string;
}

// Styles for the component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        width: '100%',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '1200px',
        margin: '20px auto',
        fontFamily: 'Fieldwork, sans-serif',
    },
    containerMobile: {
        flexDirection: 'column' as 'column',
    },
    part: {
        flex: 1,
        padding: '10px',
        boxSizing: 'border-box' as 'border-box',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        gap: '10px',
    },
    formGroup: {
        flex: '1 1 48%', // Each form input takes 48% width to ensure two per row
        marginBottom: '10px',
    },
    formGroupFull: {
        flex: '1 1 100%', // Full width for fields like rue and code postal
        marginBottom: '10px',
    },
    formGroupMobile: {
        flex: '1 1 100%', // Full width for mobile view
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '10px 0',
        border: 'none',
        borderBottom: '2px solid #928F8F', // Bottom border in #928F8F
        outline: 'none',
        fontSize: '16px',
        color: '#928F8F', // Text color in #928F8F
        backgroundColor: 'transparent', // Make background transparent
    },
    question: {
        color: 'red',
        fontSize: '18px',
        margin: '20px 0',
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'column' as 'column',
    },
    radioInput: {
        marginBottom: '5px',
        cursor: 'pointer',
    },
    radioLabel: {
        color: '#928F8F',
        fontSize: '16px',
    },
    inputFocus: {
        borderBottomColor: 'red', // Bottom border color changes to red on focus
    },
    button: {
        backgroundColor: '#008D3F',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    buttonContainer: {
        textAlign: 'center' as 'center',
    },
    imageContainer: {
        textAlign: 'center' as 'center',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const TwoPartComponent: React.FC<TwoPartComponentProps> = ({ imageUrl }) => {
    const [isMobile, setIsMobile] = React.useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cin, setCin] = useState('');
    const [rue, setRue] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Initial check

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let winner = false;
        if (!name || !email || !phone || !cin || !rue || !postalCode || !selectedAnswer) {
            await swal("Erreur", "Veuillez remplir tous les champs", "error");
            return;
        }

        if (selectedAnswer == "20% de plastique en moins") {
            winner = true;
        }



        const supabase = createClient();
        // check if the email already exists
        const { data: users, error: usersError } = await supabase
            .from('castrol_winners')
            .select('email')
            .eq('email', email);

        if (users && users.length > 0) {
            await swal("Erreur", "Vous avez déjà participé", "warning");
            return
        }
        const { data, error } = await supabase.from('castrol_winners').insert([
            {
                name,
                email,
                phone,
                cin,
                rue,
                postalCode,
                selectedAnswer,
                winner,
            },
        ]);

        if (error) {
            await swal("Erreur", "Une erreur est survenue", "error");
        } else {
            if (winner) {
                await swal("Félicitations", "Vous avez gagné", "success");
            } else {
                await swal("Merci", "Merci pour votre participation vous n'avez pas gagné", "success");
            }
        }
    };

    return (
        <div
            style={isMobile ? { ...styles.container, ...styles.containerMobile } : styles.container}
        >
            {isMobile && (
                <div style={styles.imageContainer}>
                    <Image src={imageUrl} alt="Photo" width={1500} height={1500} className="w-full" />
                </div>
            )}
            <div style={styles.part}>
                <div style={styles.imageContainer}>
                    <Image src={'assets/castrol.svg'} alt="Photo" width={250} height={250} className="flex items-center justify-center"/>
                </div>
                <form style={styles.form} onSubmit={onSubmit}>
                    {/* Form Fields */}
                    <div style={isMobile ? styles.formGroupMobile : styles.formGroup}>
                        <input
                            style={styles.input}
                            type="text"
                            placeholder="Nom et Prénom (*)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={(e) => (e.target.style.borderBottomColor = 'red')}
                            onBlur={(e) => (e.target.style.borderBottomColor = '#928F8F')}
                        />
                    </div>
                    <div style={isMobile ? styles.formGroupMobile : styles.formGroup}>
                        <input
                            style={styles.input}
                            type="email"
                            placeholder="Email (*)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => (e.target.style.borderBottomColor = 'red')}
                            onBlur={(e) => (e.target.style.borderBottomColor = '#928F8F')}
                        />
                    </div>
                    <div style={isMobile ? styles.formGroupMobile : styles.formGroup}>
                        <input
                            style={styles.input}
                            type="tel"
                            placeholder="Téléphone (*)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onFocus={(e) => (e.target.style.borderBottomColor = 'red')}
                            onBlur={(e) => (e.target.style.borderBottomColor = '#928F8F')}
                        />
                    </div>
                    <div style={isMobile ? styles.formGroupMobile : styles.formGroup}>
                        <input
                            style={styles.input}
                            type="text"
                            placeholder="CIN (*)"
                            value={cin}
                            onChange={(e) => setCin(e.target.value)}
                            onFocus={(e) => (e.target.style.borderBottomColor = 'red')}
                            onBlur={(e) => (e.target.style.borderBottomColor = '#928F8F')}
                        />
                    </div>
                    <div style={styles.formGroupFull}>
                        <input
                            style={styles.input}
                            type="text"
                            placeholder="Rue (*)"
                            value={rue}
                            onChange={(e) => setRue(e.target.value)}
                            onFocus={(e) => (e.target.style.borderBottomColor = 'red')}
                            onBlur={(e) => (e.target.style.borderBottomColor = '#928F8F')}
                        />
                    </div>
                    <div style={styles.formGroupFull}>
                        <input
                            style={styles.input}
                            type="text"
                            placeholder="Code Postal (*)"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            onFocus={(e) => (e.target.style.borderBottomColor = 'red')}
                            onBlur={(e) => (e.target.style.borderBottomColor = '#928F8F')}
                        />
                    </div>

                    {/* Quiz Question */}
                    <div style={styles.formGroupFull}>
                        <p style={styles.question}>
                            Quelles est la spécificité des nouveaux emballages de Castrol?
                        </p>
                        <div style={styles.radioGroup}>
                            <label style={styles.radioLabel}>
                                <input
                                    style={{
                                        ...styles.radioInput,
                                        accentColor: selectedAnswer === "20% de plastique en moins" ? 'red' : 'red',
                                    }}
                                    type="radio"
                                    name="quiz"
                                    value="5% de plastique en moins"
                                    checked={selectedAnswer === "5% de plastique en moins"}
                                    onChange={(e) => setSelectedAnswer(e.target.value)}
                                />
                                5% de plastique en moins
                            </label>
                            <label style={styles.radioLabel}>
                                <input
                                    style={{
                                        ...styles.radioInput,
                                        accentColor: selectedAnswer === "20% de plastique en moins" ? 'red' : 'red',
                                    }}
                                    type="radio"
                                    name="quiz"
                                    value="10% de plastique en moins"
                                    checked={selectedAnswer === "10% de plastique en moins"}
                                    onChange={(e) => setSelectedAnswer(e.target.value)}
                                />
                                10% de plastique en moins
                            </label>
                            <label style={styles.radioLabel}>
                                <input
                                    style={{
                                        ...styles.radioInput,
                                        accentColor: selectedAnswer === "20% de plastique en moins" ? 'red' : 'red',
                                    }}
                                    type="radio"
                                    name="quiz"
                                    value="20% de plastique en moins"
                                    checked={selectedAnswer === "20% de plastique en moins"}
                                    onChange={(e) => setSelectedAnswer(e.target.value)}
                                />
                                20% de plastique en moins
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div style={styles.buttonContainer}>
                        <button style={styles.button} type="submit">
                            S'inscrire
                        </button>
                    </div>
                </form>
            </div>
            {!isMobile && (
                <div style={styles.part}>
                    <div style={styles.imageContainer}>
                        <Image src={imageUrl} alt="Photo" width={1500} height={1500} className="w-full"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TwoPartComponent;
