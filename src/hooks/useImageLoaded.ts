import { useState, useEffect } from "react";

export default function useImageLoaded(src: any): boolean {
  const [Loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(src);
  }, [src]);

  return Loaded;
}
