"use client";

import { useState } from "react";

export function ImageRecognizer() {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [detectedObj, setDetectedObj] = useState([]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files[0];
    if (files) {
      setImage(files);
      const imageUrl = URL.createObjectURL(files);
      setUrl(imageUrl);
    }
  };
  const handleAnalyze = async () => {
    if (!url) return;

    setAnalyzing(true);
    setDetectedObj([]);

    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await fetch("/api/recognizer", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDetectedObj(data.objects || []);
        console.log("working", data);
      } else {
        console.error("Failed to analyze image");
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setAnalyzing(false);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleAnalyze}>Analyze</button>
      <img src={url} alt="" />
      <div>
        {detectedObj.map((obj: any) => {
          return (
            <div>
              <div>{obj.label}</div>
              <div>{obj.score}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
