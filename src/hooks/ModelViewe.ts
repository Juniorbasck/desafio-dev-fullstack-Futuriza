// LoadModelViewer.ts
export default function loadModelViewer(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load model-viewer script'));
      document.body.appendChild(script);
    });
  }
  