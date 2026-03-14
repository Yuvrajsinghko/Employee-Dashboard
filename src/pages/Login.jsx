import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const status = login(username, password);

    if (status) {
      navigate("/list");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg-blue-400 flex items-center flex-col justify-center h-screen bg-[url('./public/login-hero-bg.jpg')]">
      <div className="p-10 flex flex-col items-center justify-center gap-5 border-2 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl ">
        <h1 className="text-3xl  font-semibold  ">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
          <input
            type="text"
            placeholder="Username"
            className="border p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-white/10 backdrop-blur-lg font-semibold text-xl text-white px-2 py-3 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
