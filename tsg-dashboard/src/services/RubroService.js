// src/services/RubroService.js
const API_URL = "http://localhost:5093/Rubros"; // tu endpoint real

export const getRubros = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error al obtener los rubros");
        }
        const data = await response.json();
        console.log("Datos de la API:", data); // <--- mirar qué propiedades tiene

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
