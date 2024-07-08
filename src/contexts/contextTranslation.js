import { createContext, useContext, useState } from 'react';

// Crear el contexto
const TranslateContext = createContext();

// Proveedor del contexto
export const TranslateProvider = ({ children }) => {
  // Estado local del contexto
  const [savedTranslations, setSavedTranslations] = useState([]);

  // Funciones para actualizar el estado
  const addTranslation = (translation) => {
    setSavedTranslations([translation]);
  };

  const removeTranslation = (translationId) => {
    setSavedTranslations(savedTranslations.filter((t) => t.id !== translationId));
  };

  // Proveer el estado y funciones a los componentes hijos
  return (
    <TranslateContext.Provider value={{ savedTranslations, addTranslation, removeTranslation }}>
      {children}
    </TranslateContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useTranslate = () => useContext(TranslateContext);
