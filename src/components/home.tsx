"use client";

import { useEffect, useState } from "react";
import { fetchItems } from "../hooks/useItems";
import ModelViewer  from "@google/model-viewer";
import { ThreeDOMElement } from "@google/model-viewer/lib/features/scene-graph/three-dom-element";
import dynamic from "next/dynamic";



export function HomeComponent() {
  const [name, setName] = useState<string>("");
  const [cores, setCores] = useState<{ name: string; color: string }[]>([]);
  const [modelSrc, setModelSrc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchItems();
        
        console.log(response.glbFile);
        if (response) {
          setName(response.name);
          setModelSrc(response.glbFile); 
          const coresArray = Object.entries(response.variants).map(([name, color]) => ({
            name,
            color,
          }));
          setCores(coresArray);
        } else {
          setError("Formato de resposta inválido");
        }
      } catch (error) {
        setError("Erro ao buscar itens");
        console.error("Erro ao buscar itens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleColorClick = (cor: { name: string; color: string }) => {
    setSelectedColor(cor.color);
    console.log(selectedColor);
  };

  const Model = dynamic(() => import("./model"), { ssr: false });


  return (
    <div className="grid grid-cols-12 gap-5 p-10">
      <div className="text-black flex col-span-6 items-end justify-end p-10">
        <div className="bg-sky-950">
          <Model src={modelSrc} selectedColor={selectedColor}/>
        </div>
      </div>
      <div className="text-black col-span-6 p-5">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-xl">Cores</p>
          <div className="mt-5 flex flex-row gap-4">
            {cores.map((cor, index) => (
              <div
                key={index}
                className={`w-20 h-20 rounded-lg`}
                style={{ backgroundColor: cor.color }}
                title={cor.name}
                onClick={() => handleColorClick(cor)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
