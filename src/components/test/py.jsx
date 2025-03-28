import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "../../styles/global.css";

function PY() {
  const [output, setOutput] = useState("");
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState("# Escribe tu código aquí...");

  useEffect(() => {
    async function initPyodide() {
      try {
        const py = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.4/full/",
        });
        console.log("Pyodide cargado correctamente.");
        setPyodide(py);
      } catch (error) {
        console.error("Error cargando Pyodide:", error);
      }
    }
    initPyodide();
  }, []);

  const runCode = async () => {
    if (!pyodide) {
      setOutput("Cargando Pyodide...");
      return;
    }
    try {
      await pyodide.runPythonAsync(`
  import sys
  from io import StringIO
  
  sys.stdout = StringIO()
  namespace = {}
  exec(compile(${JSON.stringify(code)}, "<string>", "exec"), namespace)
  output = sys.stdout.getvalue()
  output
      `);
      setOutput(pyodide.globals.get("output").trim() || "✅ Código ejecutado sin salida.");
    } catch (err) {
      setOutput("Error en el código: " + err.message);
    }
  };

  return (
    <div className="relative flex flex-col w-screen h-screen">
      <Editor
        height="50%"
        defaultValue={code}
        language="python"
        theme="vs-dark"
        onChange={(value) => setCode(value || "")} // Asegura que `value` nunca sea null
      />
      <button className="p-2 bg-blue-500 text-white" onClick={runCode}>
        Ejecutar Código
      </button>
      <pre className="h-[50%] p-4 bg-gray-900 text-white overflow-auto whitespace-pre-wrap">{output}</pre>
    </div>
  );
}

export default PY;
