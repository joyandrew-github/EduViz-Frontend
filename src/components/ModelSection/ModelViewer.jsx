import { useEffect, useRef } from "react";
import "@google/model-viewer";
import styles from './ModelViewer.module.css';

function ModelViewer({ modelSrc, isPlaying, showDetailView, onLoad }) {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    if (modelViewerRef.current) {
      if (isPlaying) {
        modelViewerRef.current.play();
      } else {
        modelViewerRef.current.pause();
      }
      
      modelViewerRef.current.maxCameraOrbit = "auto auto 300%";
      
      // Set initial camera orbit only on first load
      if (!modelViewerRef.current.hasAttribute('data-initialized')) {
        modelViewerRef.current.cameraOrbit = "0deg 75deg 100%";
        modelViewerRef.current.setAttribute('data-initialized', 'true');
      }
      
      onLoad(modelViewerRef);
    }
  }, [isPlaying, showDetailView, onLoad]);

  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        const orbitValues = viewer.getCameraOrbit();
        const newRadius = Math.min(orbitValues.radius * 1.2, orbitValues.radius + 5);
        viewer.cameraOrbit = `${orbitValues.theta}rad ${orbitValues.phi}rad ${newRadius}m`;
      }
    };

    viewer.addEventListener('wheel', handleWheel);
    return () => viewer.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <model-viewer
      ref={modelViewerRef}
      src={modelSrc}
      camera-controls
      auto-rotate={showDetailView}
      className={styles.modelViewer}
      shadow-intensity="0.8"
      shadow-softness="0.5"
      min-camera-orbit="auto auto 50%"
      max-camera-orbit="auto auto 300%"
      interpolation-decay="100"
    />
  );
}
export default ModelViewer;