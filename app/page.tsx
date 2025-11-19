"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { ImageRecognizer } from "./_components/ImageRecognizer";

type User = {
  name: string;
  age: number;
  _id: string;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const generateImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prompt = formData.get("prompt");
    console.log("the prompt", prompt);

    const response = (await fetch("http://localhost:3000/api/ai", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    })) as any;
    const blob = await response.blob();
    console.log("blob", blob);
    console.log("res", response);
    const url = URL.createObjectURL(blob);
    setImageUrl(url);
  };
  // useEffect(() => {
  //   fetch("/api/users/:id")
  //     .then((res) => res.json())
  //     .then((res) => setUsers(res));
  //   console.log("users", users);
  // }, []);

  return (
    <div>
      {/* <div>
        <form action="" onSubmit={generateImage}>
          <input type="text" name="prompt" />
          <button type="submit">
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </form>
      </div>
      <div>
        <img src={imageUrl} alt="" />
      </div> */}
      <ImageRecognizer />
    </div>
  );
}
