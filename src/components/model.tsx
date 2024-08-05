import "@google/model-viewer";
import { useEffect, useRef } from "react";

interface ModelProps {
  src: string;
  selectedColor: string;
}

const Model: React.FC<ModelProps> = ({ src, selectedColor }) => {
  const modelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (modelRef.current) {
      const modelViewer = modelRef.current as unknown as { variantName: string };
      modelViewer.variantName = "blue";
    }
  }, [selectedColor]);

  return (  
    <div id="card">
      <model-viewer
        ref={modelRef}
        src={src}
        ios-src=""
        // poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
        alt="A 3D model of an astronaut"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        tone-mapping="yellow"
        ar5
        ar-modes="webxr scene-viewer quick-look"
        style={{ width: "750px", height: "400px" }}
      ></model-viewer>
    </div>
  );
};

export default Model;
