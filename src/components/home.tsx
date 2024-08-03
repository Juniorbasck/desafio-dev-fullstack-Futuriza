"use client"

import { useEffect, useState } from "react";
import loadModelViewer from "../hooks/ModelViewe"; // Certifique-se de que o caminho esteja correto
import { fetchItems } from "../hooks/useItems"; // Certifique-se de que o caminho esteja correto

export function HomeComponent() {
  const [name, setName] = useState<string>("");
  const [cores, setCores] = useState<{ name: string; color: string }[]>([]);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadModelViewer(); // Carrega o script do model-viewer
        const response = await fetchItems();
        
        if (response) {
          setName(response.name);
          // Transformar o objeto variants em um array de objetos { name, color }
          const coresArray = Object.entries(response.variants).map(([name, color]) => ({
            name,
            color,
          }));
          setCores(coresArray);
          setModelUrl(response.glbFile); // Configura o URL do modelo GLB
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

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="flex col-span-6 bg-red-600 justify-end p-5">
        <h1>Lado 1</h1>
        {modelUrl && (
          <model-viewer
            alt="Modelo 3D"
            src={modelUrl}
            ar
            environment-image="shared-assets/environments/moon_1k.hdr"
            poster="shared-assets/models/NeilArmstrong.webp"
            shadow-intensity="1"
            camera-controls
            touch-action="pan-y"
            style={{ width: "100%", height: "400px" }} // Ajuste o tamanho conforme necessário
          ></model-viewer>
        )}
      </div>
      <div className="text-black col-span-6 border p-5">
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
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
