import { useState, useRef } from "react";
import { ArrowsRightLeftIcon, ClipboardDocumentCheckIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { Menu, MenuHandler, MenuList, MenuItem, Button, IconButton, Tooltip } from "../MaterialTailwind";
import { languages, targetLanguages, languageToVoiceMap } from "@/lib/languajeData";


export function TranslateUI() {
  const [sourceLanguage, setSourceLanguage] = useState("detect");
  const [targetLanguage, setTargetLanguage] = useState("ES");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const textareaRef = useRef(null);
  const [copied, setCopied] = useState(false);


  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };


  const handleTranslate = async () => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          sourceLang: sourceLanguage === "detect" ? null : sourceLanguage.toLowerCase(),
          targetLang: targetLanguage.toLowerCase(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTranslatedText(data.translatedText);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error al traducir el texto:', error);
    }
  };

  const handleCopyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
    }
  };

  const handleSpeak = () => {
    if (textareaRef.current) {
      const textToSpeak = new SpeechSynthesisUtterance(textareaRef.current.value);

      // Obtener todas las voces disponibles
      const voices = window.speechSynthesis.getVoices();

      // Encontrar la voz que coincida con el código de idioma objetivo
      const voiceName = languageToVoiceMap[targetLanguage];
      const targetVoice = voices.find(voice => voice.name === voiceName);

      // Configurar la voz del texto a hablar
      if (targetVoice) {
        textToSpeak.voice = targetVoice;
      } else {
        console.warn(`No se encontró una voz para el idioma ${targetLanguage}. Se utilizará la voz predeterminada.`);
      }

      // Hablar el texto
      window.speechSynthesis.speak(textToSpeak);
    }
  };

  return (
    <div className="w-full max-w-7xl p-5 bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex flex-col w-full space-y-4 md:space-y-0 md:flex-row md:space-x-4">
        <div className="flex w-full space-x-4">
          <Menu className="w-full" animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}>
            <MenuHandler>
              <Button className="w-full h-12 text-left" color="blue-gray" variant="text">
                {sourceLanguage === "detect" ? "Detectar Idioma" : languages.find(lang => lang.code === sourceLanguage).name}
              </Button>
            </MenuHandler>
            <MenuList className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-auto">
              <MenuItem onClick={() => setSourceLanguage("detect")} href="#">Detectar Idioma</MenuItem>
              {languages.map(lang => (
                <MenuItem key={lang.code} onClick={() => setSourceLanguage(lang.code)}>
                  {lang.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <button
            className="flex items-center justify-center w-full h-12 p-2 text-black bg-white rounded-lg hover:bg-stone-50 md:w-auto"
            onClick={handleSwapLanguages}
            disabled={sourceLanguage === "detect"}
          >
            <ArrowsRightLeftIcon color="blue-gray" className="w-5 h-5" />
          </button>

          <Menu className="w-full" animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}>
            <MenuHandler>
              <Button className="w-full h-12 text-left" color="blue-gray" variant="text">
                {targetLanguages.find(lang => lang.code === targetLanguage).name}
              </Button>
            </MenuHandler>
            <MenuList className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-auto">
              {targetLanguages.map(lang => (
                <MenuItem key={lang.code} onClick={() => setTargetLanguage(lang.code)}>
                  {lang.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
      </div>

      <div className="flex flex-col mt-4 md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2">
          <textarea
            className="w-full h-40 p-4 mb-4 border border-gray-300 rounded resize-none md:h-60"
            placeholder="Ingrese el texto a traducir"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          <div className="invisible md:visible md:h-4"></div>
        </div>

        <div className="w-full md:w-1/2">
          <textarea
            ref={textareaRef}
            className="w-full h-40 p-4 bg-gray-100 rounded resize-none md:h-60"
            readOnly
            value={translatedText}
          ></textarea>
          <div className="flex justify-end md:visible md:h-4">
            <Tooltip content="Copiar" className="border border-blue-gray-50 bg-white text-black">
              <IconButton onClick={handleCopyToClipboard} size="lg" variant="text" color="blue-gray">
                <ClipboardDocumentCheckIcon className="w-5 h-5" />
              </IconButton>
            </Tooltip>
            <Tooltip content="Reproducir" className="border border-blue-gray-50 bg-white text-black">
            <IconButton onClick={handleSpeak} size="lg" variant="text" color="blue-gray">
              <SpeakerWaveIcon className="w-5 h-5" />
            </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <button
        className="w-full px-4 py-2 mt-5 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        onClick={handleTranslate}
      >
        Traducir
      </button>
    </div>
  );

}

export default TranslateUI;
