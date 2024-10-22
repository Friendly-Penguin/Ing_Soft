import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import "./Profile.css";
import { IoIosArrowDown } from "react-icons/io";


function Profile() {
    const [profileInfo, setProfileInfo] = useState(null);  // Stato per le informazioni del profilo
    const [answeredQuestions, setAnsweredQuestions] = useState([]);  // Stato per domande con risposta
    const [unansweredQuestions, setUnansweredQuestions] = useState([]);  // Stato per domande senza risposta
    const [expandedQuestion, setExpandedQuestion] = useState(null);  // Stato per tracciare la domanda espansa
    const [error, setError] = useState(null);  // Stato per eventuali errori
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);

    const retriveProfileInfo = async () => {
        try {
            const user = await ApiService.getUser(localStorage.getItem("userID"));
            setProfileInfo(user.user);  // Salva i dati del profilo nello stato
        } catch (error) {
            console.error('Error retrieving user info: ', error.message);
            setError("Errore nel recupero delle informazioni del profilo.");
        }
    };

    const retriveUserQuestion = async () => {
        try {
            const response = await ApiService.getAllUserQuestion(localStorage.getItem("userID"));
            const questions = response.questionDTOList;

            // Filtra le domande in base alla presenza di "title"
            const answered = questions.filter(question => question.content);  // Domande con risposta
            const unanswered = questions.filter(question => !question.content);  // Domande senza risposta

            setAnsweredQuestions(answered);  // Salva le domande con risposta
            setUnansweredQuestions(unanswered);  // Salva le domande senza risposta
        } catch (error) {
            console.error('Error retrieving user question: ', error.message);
        }
    };

    useEffect(() => {
        retriveProfileInfo();
        retriveUserQuestion();  // Chiamata API solo al montaggio del componente
    }, []);

    // Funzione per gestire l'espansione o il collasso delle sezioni
    const toggleExpandSection = (ID) => {
        setIsExpanded(prevState => !prevState);  // Se la domanda è già espansa, la collassa, altrimenti la espande
    };

    // Funzione per gestire l'espansione o il collasso delle sezioni
    const toggleExpandSection2 = (ID) => {
        setIsExpanded2(prevState => !prevState);  // Se la domanda è già espansa, la collassa, altrimenti la espande
    };

    // Funzione per gestire l'espansione o il collasso delle domande
    const toggleExpandQuestion = (questionId) => {
        setExpandedQuestion(prevId => (prevId === questionId ? null : questionId));  // Se la domanda è già espansa, la collassa, altrimenti la espande
    };




    return (

        <div className="contenitore">


            {/* Mostra altre informazioni del profilo */}
            <h1 className="infoTitle">Infomazioni Account</h1>
            <div className="profile-info">
                {error && <p>{error}</p>}
                {profileInfo ? (
                    <div>
                        <div className="details-container">
                            <h1>Nome: </h1>
                            <h2>{profileInfo.name}</h2>
                        </div>
                        
                        <div className="details-container">
                            <h1>Email:</h1>
                            <h2>{profileInfo.email}</h2>
                        </div >
                            
                        
                    </div>
                ) : (
                    <p>Caricamento informazioni del profilo...</p>
                )}
            </div>

            <hr/>

            <h2 className="sectionTitle">LE TUE DOMANDE</h2>




            {/* Sezione per le domande con risposta */}
                <div className="divTitle" onClick={toggleExpandSection}>
                    <h4 id="title1" >Ticket Chiusi</h4>
                    <IoIosArrowDown className={`icon ${isExpanded ? 'rotate' : ''}`} />
                </div>

                <div className={`divQuestion ${isExpanded ? 'expanded' : ''}`}>
                        {answeredQuestions.length > 0 ? ( isExpanded && (
                            answeredQuestions.map((question, index) => (
                                <div key={index}>
                                    {/* Titolo della domanda, cliccabile per espandere/collassare */}
                                    <div onClick={() => toggleExpandQuestion(question.id)} className="question-title">
                                        <h1 className="questionTitle">• {question.title}</h1>
                                    </div>
                                    {/* Se la domanda è espansa, mostra i dettagli */}
                                    {expandedQuestion === question.id && (
                                        <div className="question-details">
                                            <p>Risposta: {question.content}</p>
                                            {/* Puoi aggiungere altri dettagli qui */}
                                        </div>
                                    )}
                                </div>
                            ))
                        )) : (
                            <p>Non ci sono domande con risposta.</p>
                        )}
                    </div>

                    <hr id="2divisorio"/>

                {/* Sezione per le domande senza risposta */}
                <div className="divTitle" onClick={toggleExpandSection2}>
                    <h4 id="title1" >Ticket aperti</h4>
                    <IoIosArrowDown className={`icon ${isExpanded2 ? 'rotate' : ''}`} />
                </div>

                <div className={`divQuestion ${isExpanded2 ? 'expanded' : ''}`}>
                    {unansweredQuestions.length > 0 ? ( isExpanded2 && ( 
                        unansweredQuestions.map((question, index) => (
                            <div key={index}>
                                <div className="question-title">
                                    <h1 className="questionTitle1">• {question.title}</h1>
                                </div>
                            </div>
                        ))
                    )) : (
                        <p>Non ci sono domande senza risposta.</p>
                    )}
                </div>
            </div>
    );
}

export default Profile;
