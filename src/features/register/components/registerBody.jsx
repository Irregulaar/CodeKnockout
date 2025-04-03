import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function LoginBody() {
  const [stage, setStage] = useState(1);

  const handleStageChange = () => {
    setStage(stage === 1 ? 2 : 1);
  };

  return (
    <>
      {stage === 1 ? (
        <div className="text-regular bg-dark mt-20 mb-15 flex h-fit w-[90%] flex-col items-center justify-start rounded-xl p-10 md:w-100">
          <h1 className="text-[30px] font-semibold">Sign up</h1>

          <p className="mt-1 flex gap-2 text-[12px]">
            You have a account?{" "}
            <a href="/login" className="cursor-pointer font-bold hover:underline">
              Log in
            </a>
          </p>
          <input
            type="text"
            className="bg-regular border-regular bg-dark mt-2 flex h-10 w-full flex-row items-center justify-center rounded-lg border-1 p-2 text-start text-[12px] outline-none"
            placeholder="Username"
          />
          <input
            type="text"
            className="bg-regular border-regular bg-dark mt-2 flex h-10 w-full flex-row items-center justify-center rounded-lg border-1 p-2 text-start text-[12px] outline-none"
            placeholder="Email"
          />
          <input
            type="password"
            className="bg-regular border-regular bg-dark mt-2 flex h-10 w-full flex-row items-center justify-center rounded-lg border-1 p-2 text-start text-[12px] outline-none"
            placeholder="Password"
          />
          <input
            type="password"
            className="bg-regular border-regular bg-dark mt-2 flex h-10 w-full flex-row items-center justify-center rounded-lg border-1 p-2 text-start text-[12px] outline-none"
            placeholder="Confirm password"
          />
          <button className="bg-light mt-3 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg text-center hover:underline">
            Continue
          </button>

          <div className="mt-5 mb-4 flex h-px w-full items-center justify-center bg-white opacity-50">
            <p className="bg-dark p-1 text-center text-[12px]">OR</p>
          </div>

          <button className="bg-regular mt-3 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg text-center hover:underline">
            Continue with Google
          </button>
          <button className="bg-regular mt-3 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg text-center hover:underline">
            Continue with GitHub
          </button>
        </div>
      ) : (
        <div className="text-regular bg-dark mt-20 mb-20 flex h-fit w-[90%] flex-col items-center justify-start rounded-xl p-10 md:w-100">
          <div
            onClick={handleStageChange}
            className="bg-dark hover:bg-light mb-5 flex h-fit w-fit cursor-pointer flex-row items-center justify-center gap-2 self-start rounded p-2 transition-colors duration-200"
          >
            <FaArrowLeft size={15} className="cursor-pointer" />
            <p>Back</p>
          </div>
          <h1 className="text-[30px] font-semibold">Welcome back!</h1>
          <p className="text-[12px]">Please log in to continue.</p>

          <input
            type="password"
            className={`bg-regular border-regular bg-dark mt-3 flex h-10 w-full flex-row items-center justify-center rounded-lg border p-2 text-start text-[12px] outline-none`}
            placeholder="Password"
          />
          <button className="bg-light mt-3 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg text-center hover:underline">
            Log in
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
