import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function LoginBody() {
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStageChange = () => {
    setStage(stage === 1 ? 2 : 1);
    setPassword(""); // Limpiar password al cambiar de stage
  };

  const handleLogin = async () => {
    setLoading(true);
    setPasswordError(null);

    if (password === "") {
      setPasswordError("Password is required");
      setLoading(false);
      return;
    }

    const response = await fetch("https://safe-github-io.onrender.com/auth/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setPasswordError("Invalid credentials");
      setLoading(false);
      throw new Error("Error al iniciar sesión");
    }

    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.datauser));
    window.location.href = "/dashboard";
  };

  const emailContinue = async () => {
    setLoading(true);
    setEmailError(null);
    setPasswordError(null);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "") {
      setEmailError("Email is required");
      setLoading(false);
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      setLoading(false);
      return;
    }

    const response = await fetch(`https://safe-github-io.onrender.com/auth/validate-email?email=${email}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error("Login error");
    }

    const data = await response.json();

    if (data.message === true) {
      setLoading(false);
      setStage(2);
    } else {
      setEmailError("Email is not registered");
      setLoading(false);
      return;
    }
  };

  return (
    <>
      {stage === 1 ? (
        <div
          className="text-regular bg-dark mt-20 mb-15 flex h-fit w-[90%] flex-col items-center justify-start rounded-xl p-10
            md:w-100"
        >
          <h1 className="text-[30px] font-semibold">Welcome back!</h1>
          <p className="text-[12px]">Please log in to continue.</p>

          <p className="mt-3 flex gap-2 text-[12px]">
            Don't have an account?{" "}
            <a href="/register" className="cursor-pointer font-bold hover:underline">
              Sign up
            </a>
          </p>
          <input
            type="text"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            className={`${emailError ? "border-red-500" : "border-regular"} bg-regular bg-dark mt-5 flex h-10 w-full flex-row
              items-center justify-center rounded-lg border-1 p-2 text-start text-[12px] outline-none `}
            placeholder="Email"
          />
          {emailError && <p className="text-red-500 text-[12px] self-start">{emailError}</p>}
          <button
            onClick={emailContinue}
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
      ) : (
        <div
          className="text-regular bg-dark mt-20 mb-20 flex h-fit w-[90%] flex-col items-center justify-start rounded-xl p-10
            md:w-100"
        >
          <div
            onClick={handleStageChange}
            className="bg-dark hover:bg-light mb-5 flex h-fit w-fit cursor-pointer flex-row items-center justify-center gap-2
              self-start rounded p-2 transition-colors duration-200"
          >
            <FaArrowLeft size={15} className="cursor-pointer" />
            <p>Back</p>
          </div>
          <h1 className="text-[30px] font-semibold">Welcome back!</h1>
          <p className="text-[12px]">Please log in to continue.</p>

          <input
            type="password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            className={`${passwordError ? "border-red-500" : "border-regular"} bg-regular bg-dark mt-5 flex h-10 w-full flex-row
              items-center justify-center rounded-lg border-1 p-2 text-start text-[12px] outline-none `}
            placeholder="Password"
          />
          {passwordError && <p className="text-red-500 text-[12px] self-start">{passwordError}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-light mt-3 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg text-center
              hover:underline"
          >
            {loading ? "Loading..." : "Log in"}
          </button>

          <p className="mt-3 flex gap-2 text-[12px]">
            Forgot your password? <span className="cursor-pointer font-bold hover:underline">Reset password</span>
          </p>
        </div>
      )}
    </>
  );
}

export default LoginBody;
