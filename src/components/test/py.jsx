import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "../../styles/global.css";

// Este sería el "challengeData" que puede venir de la base de datos
const challengeData = {
  description: `
    Nathan loves cycling.
    
    Because Nathan knows it is important to stay hydrated, he drinks 0.5 litres of water per hour of cycling.
    
    You get given the time in hours and you need to return the number of litres Nathan will drink, rounded down.
    
    For example:
    time = 3 ----> litres = 1
    time = 6.7 ---> litres = 3
    time = 11.8 --> litres = 5
  `,
  defaultCode: `
def litres(time):
    return 0
  `,
  code_for_tests: `
import math

# Tests básicos
tests = [
    {"input": 0, "expected": 0, "message": "litres(0) should return 0"},
    {"input": 1, "expected": 0, "message": "litres(1) should return 0"},
    {"input": 2, "expected": 1, "message": "litres(2) should return 1"},
    {"input": 3, "expected": 1, "message": "litres(3) should return 1"},
    {"input": 4, "expected": 2, "message": "litres(4) should return 2"},
    {"input": 1.4, "expected": 0, "message": "litres(1.4) should return 0"},
    {"input": 12.3, "expected": 6, "message": "litres(12.3) should return 6"},
    {"input": 0.82, "expected": 0, "message": "litres(0.82) should return 0"},
    {"input": 11.8, "expected": 5, "message": "litres(11.8) should return 5"},
    {"input": 1787, "expected": 893, "message": "litres(1787) should return 893"},
]

passed = 0
output = ""
for test in tests:
    result = litres(test["input"])
    if result == test["expected"]:
        passed += 1
    else:
        output += f"❌ {test['message']}: obtuvo {result}, esperaba {test['expected']}\\n"

if passed == len(tests):
    output += "✅ Todos los tests pasaron!\\n"
else:
    output += f"✅ Pasaron {passed} de {len(tests)} tests\\n"

print(output)
  `,
};

function PY() {
  const [output, setOutput] = useState("");
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState(challengeData.defaultCode.trim());

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
        setOutput("Error al cargar Pyodide: " + error.message);
      }
    }
    initPyodide();
  }, []);

  const runCode = async () => {
    if (!pyodide) {
      setOutput("Cargando Pyodide...");
      return;
    }

    console.log("Iniciando ejecución...");
    setOutput("Ejecutando...");

    try {
      // Combinar el código del usuario y los tests
      const fullCode = `import math\n\n${code}\n\n${challengeData.code_for_tests}`;
      console.log("Código completo a ejecutar:", fullCode);

      // Limpiar el namespace global antes de ejecutar
      pyodide.globals.clear();
      console.log("Namespace limpiado.");

      // Ejecutar el código y capturar toda la salida
      const result = await pyodide.runPythonAsync(`
import sys
from io import StringIO

# Redirigir stdout y stderr
sys.stdout = StringIO()
sys.stderr = StringIO()

try:
    exec(${JSON.stringify(fullCode)})
except Exception as e:
    sys.stderr.write(str(e))

# Combinar stdout y stderr
stdout_output = sys.stdout.getvalue().strip()
stderr_output = sys.stderr.getvalue().strip()
result = stdout_output if stdout_output else stderr_output
result
      `);

      const pythonOutput = pyodide.globals.get("result") || "No se generó salida.";
      console.log("Salida de Python:", pythonOutput);
      setOutput(pythonOutput);
    } catch (err) {
      console.error("Error externo en Pyodide:", err);
      setOutput("Error al ejecutar el código: " + err.message);
    }
  };

  return (
    <div className="relative flex flex-col w-screen h-screen">
      {/* Explicación del reto */}
      <div className="p-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">Explicación del reto:</h2>
        <p>{challengeData.description}</p>
      </div>

      {/* Editor para que el usuario complete la solución */}
      <Editor
        height="50%"
        defaultValue={code}
        language="python"
        theme="vs-dark"
        onChange={(value) => setCode(value || "")} // Asegura que `value` nunca sea null
      />

      {/* Botón para ejecutar el código */}
      <button className="p-2 bg-blue-500 text-white" onClick={runCode}>
        Ejecutar Código
      </button>

      {/* Mostrar los resultados de los tests */}
      <pre className="h-1/2 p-4 bg-gray-900 text-white overflow-auto whitespace-pre-wrap">{output}</pre>
    </div>
  );
}

export default PY;
