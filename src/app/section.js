import React from 'react';
import { BookOpenIcon, LanguageIcon, AcademicCapIcon, GlobeAltIcon, BriefcaseIcon, UserCircleIcon } from '@heroicons/react/24/solid';

function Section() {
  return (
    <div className="w-full max-w-7xl mx-auto p-5">
      <section className="text-center my-12">
        <h1 className="text-4xl font-bold text-gray-800">Bienvenidos a DiccionarioWEB</h1>
        <p className="mt-4 text-gray-600 text-lg">Tu diccionario y traductor web todo en uno.</p>
      </section>

      <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <BookOpenIcon className="w-20 h-20 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Diccionario Completo</h2>
          <p className="mt-2 text-gray-600 text-center">
            Encuentra definiciones detalladas, sinónimos y ejemplos de uso para una amplia gama de palabras en múltiples idiomas.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <LanguageIcon className="w-20 h-20 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Traductor Instantáneo</h2>
          <p className="mt-2 text-gray-600 text-center">
            Traduce texto de manera rápida y precisa entre más de 20 idiomas. Perfecto para estudiantes, viajeros y profesionales.
          </p>
        </div>
      </section>

      <section className="my-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Casos de Uso</h2>
        <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
          Descubre cómo DiccionarioWEB ha ayudado a nuestros usuarios a comunicarse y aprender de manera más efectiva.
        </p>
      </section>

      <section className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center">
          <AcademicCapIcon className="w-16 h-16 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Estudiantes</h3>
          <p className="mt-2 text-gray-600 text-center">
            Los estudiantes pueden utilizar DiccionarioWEB para encontrar definiciones precisas y ejemplos de uso, así como para traducir textos académicos y mejorar sus habilidades lingüísticas.
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center">
          <GlobeAltIcon className="w-16 h-16 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Viajeros</h3>
          <p className="mt-2 text-gray-600 text-center">
          DiccionarioWEB es el compañero ideal para los viajeros, permitiendo traducciones rápidas y precisas para comunicarse fácilmente en diferentes países y entender la cultura local.
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center">
          <BriefcaseIcon className="w-16 h-16 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Profesionales</h3>
          <p className="mt-2 text-gray-600 text-center">
            En el ámbito profesional, DiccionarioWEB facilita la comprensión de documentos en varios idiomas, mejorando la eficiencia y permitiendo una comunicación efectiva en entornos internacionales.
          </p>
        </div>
      </section>

      <section className="my-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Testimonios de Usuarios</h2>
        <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
          Nuestros usuarios aman DiccionarioWEB. Aquí hay algunas de sus experiencias:
        </p>
      </section>

      <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center">
          <UserCircleIcon className="w-16 h-16 text-blue-600 mb-4" />
          <p className="mt-2 text-gray-600 text-center">
            "He probado muchos traductores en línea, pero DiccionarioWEB es el mejor. La interfaz es intuitiva y las traducciones son precisas." - Pedro M.
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center">
          <UserCircleIcon className="w-16 h-16 text-blue-600 mb-4" />
          <p className="mt-2 text-gray-600 text-center">
            "El diccionario de DiccionarioWEB es increíblemente completo. Me ha ayudado a ampliar mi vocabulario de una manera significativa." - Ana L.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Section;
