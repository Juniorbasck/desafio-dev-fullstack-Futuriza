import "@google/model-viewer";
import { useEffect, useRef, useState } from "react";

interface ModelProps {
  src: string;
  selectedColor: string;
}

const Model: React.FC<ModelProps> = ({ src, selectedColor }) => {
  const modelRef = useRef<HTMLDivElement | null>(null);
  const [variants, setVariants] = useState<string[]>([]);

  useEffect(() => {
    const modelViewer = modelRef.current as unknown as HTMLDivElement & { variantName: string, availableVariants: string[] };

    const onLoad = () => {
      if (modelViewer.availableVariants) {
        setVariants(modelViewer.availableVariants);
      }
      if (selectedColor) {
        modelViewer.variantName = selectedColor;
      }
    };

    modelViewer?.addEventListener('load', onLoad);

    return () => {
      modelViewer?.removeEventListener('load', onLoad);
    };
  }, [selectedColor]);

  const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (modelRef.current) {
      const modelViewer = modelRef.current as unknown as { variantName: string };
      modelViewer.variantName = event.target.value === 'default' ? '' : event.target.value;
    }
  };

  return (
    <div id="card">
      <model-viewer
        ref={modelRef}
        src={src}
        ios-src=""
        alt="A 3D model"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        tone-mapping="neutral"
        ar
        ar-modes="webxr scene-viewer quick-look"
        style={{ width: "750px", height: "400px" }}
      ></model-viewer>
      <div className="controls">
        <div className="">Variant: 
          <select id="variant" onChange={handleVariantChange}>
            <option value="default">Default</option>
            {variants.map(variant => (
              <option key={variant} value={variant}>{variant}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Model;
