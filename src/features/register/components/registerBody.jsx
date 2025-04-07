import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function RegisterBody() {
  // Changed from LoginBody to RegisterBody
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const [errorUsername, setErrorUsername] = useState(null);

  const handleRegisterSubmit = async (e) => {
    setLoading(true);
    setError(null);
    setErrorEmail(null);
    setErrorPassword(null);
    setErrorUsername(null);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "") {
      setErrorEmail("Email address is required");
      setLoading(false);
      return;
    } else if (!emailRegex.test(email)) {
      setErrorEmail("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (username === "") {
      setErrorUsername("Username is required");
      setLoading(false);
      return;
    }

    if (password === "") {
      setErrorPassword("Password is required");
      setLoading(false);
      return;
    } else if (confirmPassword === "") {
      setErrorPassword("Please confirm your password");
      setLoading(false);
      return;
    } else if (password !== confirmPassword) {
      setErrorPassword("Passwords do not match");
      setLoading(false);
      return;
    }

    const response = await fetch("https://safe-github-io.onrender.com/auth/register", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error("Registration failed. Please try again.");
    }

    setLoading(false);
    window.location.href = "/login";
  };

  return (
    <div
      className="text-regular bg-dark mt-20 mb-15 flex h-fit w-[90%] flex-col items-center justify-start rounded-xl pt-5 p-10
        md:w-100"
    >
      <h1 className="text-[30px] font-semibold">Sign up</h1>

      <p className="mt-1 flex gap-2 text-[12px]">
        You have a account?{" "}
        <a href="/login" className="cursor-pointer font-bold hover:underline">
          Log in
        </a>
      </p>
      <input
        type="text"
        value={username}
        disabled={loading}
        onChange={(e) => setUsername(e.target.value)}
        className={`${errorUsername ? "border-red-500" : "border-regular"} bg-regular bg-dark mt-2 flex h-10 w-full flex-row
          items-center justify-center rounded-lg border-1 p-2 text-start text-[12px] outline-none`}
        placeholder="Username"
      />
      {errorUsername && <p className="text-red-500 text-[12px] self-start">{errorUsername}</p>}

      <input
        type="text"
        value={email}
        disabled={loading}
        onChange={(e) => setEmail(e.target.value)}
        className={`${errorEmail ? "border-red-500" : "border-regular"} bg-regular bg-dark mt-2 flex h-10 w-full flex-row
          items-center justify-center rounded-lg border-1 p-2 text-start text-[12px] outline-none`}
        placeholder="Email"
      />
      {errorEmail && <p className="text-red-500 text-[12px] self-start">{errorEmail}</p>}

      <input
        type="password"
        value={password}
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
        className={`${errorPassword ? "border-red-500" : "border-regular"} bg-regular bg-dark mt-2 flex h-10 w-full flex-row
          items-center justify-center rounded-lg border-1 p-2 text-start text-[12px] outline-none`}
        placeholder="Password"
      />

      <input
        type="password"
        value={confirmPassword}
        disabled={loading}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={`${errorPassword ? "border-red-500" : "border-regular"} bg-regular bg-dark mt-2 flex h-10 w-full flex-row
          items-center justify-center rounded-lg border-1 p-2 text-start text-[12px] outline-none`}
        placeholder="Confirm password"
      />
      {errorPassword && <p className="text-red-500 text-[12px] self-start">{errorPassword}</p>}

      <button
        onClick={handleRegisterSubmit}
        disabled={loading}
        className="bg-light mt-3 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg text-center
          hover:underline"
      >
        {loading ? "Loading..." : "Continue"}
      </button>

      <div className="mt-5 mb-4 flex h-px w-full items-center justify-center bg-white opacity-50">
        <p className="bg-dark p-1 text-center text-[12px]">OR</p>
      </div>

      <button
        className="bg-regular mt-3 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg text-center
          hover:underline"
      >
        Continue with Google
      </button>
      <button
        className="bg-regular mt-3 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg text-center
          hover:underline"
      >
        Continue with GitHub
      </button>
    </div>
  );
}

export default RegisterBody; // Changed from LoginBody to RegisterBody
