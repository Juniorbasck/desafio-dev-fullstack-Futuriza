"use client"

import { useEffect } from "react";
import { fetchItems } from "../hooks/useItems"; // Certifique-se de que o caminho esteja correto

export function HomeComponent() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchItems();
        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="flex col-span-6 bg-red-600 justify-end p-5">
        <h1>lado 1</h1>
      </div>
      <div className="text-black col-span-6 border p-5">
        <div>
          <h1 className="text-2xl font-bold">Tenis femino</h1>
          <p className="text-xl">Cores</p>
          <div className="mt-5 flex flex-row gap-4">
            <div className="bg-blue-700 w-20 h-20 rounded-lg"></div>
            <div className="bg-red-600 w-20 h-20 rounded-lg"></div>
            <div className="bg-yellow-400 w-20 h-20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
