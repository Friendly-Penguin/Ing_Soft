import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from '../../service/ApiService'; // Importa ApiService

const AddQuestion = () => {
    // Definizione dell'array di categorie
    const categories = [
        'SPEDIZIONE',
        'ACQUISTO BIGLIETTI',
        'I MIEI DATI',
        'I MIEI ORDINI',
        'COVID 19'
    ];
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/FAQ';
    

    // Stati per memorizzare i dati del form
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // Funzione per gestire il submit del form
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene il comportamento predefinito di ricaricamento della pagina
        
        // Validazione di base
        if (!title || !selectedCategory) {
            alert("Per favore, compila tutti i campi");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", selectedCategory);
        formData.append("userID", localStorage.getItem("userID"));

        try {
            // Invia i dati alla funzione API
            const response = await ApiService.addQuestion(formData);
            console.log("Domanda inviata con successo:", response);
            alert("La domanda è stata inviata con successo!"); // Notifica di successo

            // Pulisci i campi dopo l'invio
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Errore durante l'invio della domanda:", error);
            alert("Si è verificato un errore durante l'invio della domanda."); // Notifica di errore
        }
    };

    return (
        <div className="add-question-wrapper" style={{ padding: "20px" }}>
            <h2>Inserisci una nuova domanda</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
                {/* Campo di testo per il titolo della domanda */}
                <label htmlFor="title">Titolo della domanda:</label>
                <input 
                    type="text" 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Inserisci il titolo" 
                    style={{ padding: "10px", fontSize: "16px" }} 
                />
                
                {/* Menu a tendina per selezionare la categoria */}
                <label htmlFor="category">Seleziona la categoria:</label>
                <select 
                    id="category" 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)} 
                    style={{ padding: "10px", fontSize: "16px" }}
                >
                    <option value="">-- Seleziona una categoria --</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                {/* Pulsante per inviare il form */}
                <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Invia domanda
                </button>
            </form>
        </div>
    );
};

export default AddQuestion;