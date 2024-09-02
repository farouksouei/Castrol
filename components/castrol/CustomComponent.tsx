"use client";  // Add this line at the top of your file

import React from 'react';
import Image from 'next/image';

// Define the props type
interface CustomComponentProps {
    footnote: string;
    photo: string;
    header: string;
    paragraph: string;
    advantages?: string[];
}

// Styles for the component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '1200px',
        margin: '20px auto',
        fontFamily: 'Fieldwork, sans-serif',
    },
    containerMobile: {
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        textAlign: 'center' as 'center',
    },
    photo: {
        width: '250px',
        height: '250px',
        borderRadius: '8px',
        // center the image

        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
    },
    photoMobile: {
        width: '200px',
        height: '200px',
        margin: '20px 0',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'column' as 'column',
    },
    header: {
        color: '#008D3F',
        fontStyle: 'italic',
        marginBottom: '10px',
        fontSize: '40px',
        fontWeight: '900',
    },
    paragraph: {
        marginBottom: '10px',
        color: "#928F8F",
        fontWeight: '300',
        float: 'left',
    },
    advantages: {
        listStyleType: 'none',
        paddingLeft: '0',
        color: "#928F8F",
        fontWeight: '300',
        marginLeft: '50px',
    },
    advantageItem: {
        color: 'red',
        fontWeight: '900',
    },
    advantageItem2: {
        marginBottom: '15px',
    },
    footnote: {
        color: "#928F8F",
        fontWeight: '500',
        fontSize: '12px',
        fontStyle: 'italic',
    },
};

// This is an array of strings that need to be displayed in bold and it's in the paragraph
const magic_words = ['Castrol EDGE avec Fluid TITANIUM'];

const CustomComponent: React.FC<CustomComponentProps> = ({ footnote, photo, header, paragraph, advantages = [] }) => {
    const formatParagraph = (text: string) => {
        return text.split(' ').map((word, index) => {
            return magic_words.includes(word) ? <strong key={index}>{word}</strong> : word + ' ';
        });
    };

    // To manage responsiveness, you can use the window width
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Initial check

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={isMobile ? { ...styles.container, ...styles.containerMobile } : styles.container}>
            {!isMobile && (<Image
                src={photo}
                alt="Photo"
                style={isMobile ? {...styles.photo, ...styles.photoMobile} : styles.photo}
                width="150"
                height="150"
            />)}
            <div style={styles.content}>
                <hr style={{ border: '1px solid green', width: '50px', margin: '10px 0' }} />
                <h2 style={styles.header}>{header}</h2>
                {isMobile && (<Image
                    src={photo}
                    alt="Photo"
                    style={isMobile ? {...styles.photo, ...styles.photoMobile} : styles.photo}
                    width="150"
                    height="150"
                />)}
                <p style={{marginBottom: '10px',
                    color: "#928F8F",
                    fontWeight: '300',
                    float: 'left',}}>{formatParagraph(paragraph)}</p>
                {advantages.length > 0 && (
                    <>
                        <h3 style={styles.header}>Advantages</h3>
                        <ul style={styles.advantages}>
                            {advantages.map((advantage, index) => (
                                <li style={styles.advantageItem2} key={index}>
                                    <span style={styles.advantageItem}>•</span> {advantage}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <p style={styles.footnote}>{footnote}</p>
            </div>
        </div>
    );
};

export default CustomComponent;
