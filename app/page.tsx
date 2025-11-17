import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  fetch("/api/")
    .then((res) => {
      res.json();
    })
    .then((res) => setUsers(res.users));
  return (
    <div>
      <p>as</p>
    </div>
  );
}
