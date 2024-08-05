declare module '@google/model-viewer' {
    interface ModelViewerElement extends HTMLElement {
      variantName: string;
    }
    
    const modelViewer: ModelViewerElement;
    export default modelViewer;
  }
  