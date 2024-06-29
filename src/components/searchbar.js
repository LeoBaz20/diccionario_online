"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Navbar, Button, Input } from "../components/MaterialTailwind";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    // Redireccionar a la página de resultados con la palabra como parámetro de la URL
    router.push(`/search/${searchTerm}`);
  };

  return (
    <Navbar fullWidth className="w-screen">
      <div className="container mx-auto flex justify-center items-center text-blue-gray-900">
        <form onSubmit={handleSubmit} className="relative flex w-full max-w-lg gap-2">
          <Input
            type="text"
            placeholder="Escribe cualquier palabra"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            containerProps={{
              className: "w-full",
            }}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:opacity-100"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Button
        size="sm"
        className="!absolute right-1 top-1 rounded"
        type="submit"
        color="light-blue"
      >
Buscar
      </Button>
        </form>
      </div>
    </Navbar>
  );
}

export default SearchBar;
