import { useState } from "react";
import Py from "../components/test/py";
import Js from "../components/test/js";

function Test() {
  const [view, setView] = useState(null);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      {!view && (
        <>
          <button onClick={() => setView("python")} className="p-2 bg-blue-500 text-white">
            Seleccionar Python
          </button>
          <button onClick={() => setView("javascript")} className="p-2 bg-yellow-500 text-black">
            Seleccionar JavaScript
          </button>
        </>
      )}
      {view === "python" && <Py />}
      {view === "javascript" && <Js />}
    </div>
  );
}

export default Test;
