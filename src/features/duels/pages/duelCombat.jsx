import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Registry } from "monaco-textmate";
import { wireTmGrammars } from "monaco-editor-textmate";
import { useLocation } from "react-router-dom";

// Este sería el "challengeData" que puede venir de la base de datos
const challengeData = {
  description: `En este desafío, debes implementar una función que encuentre [todos los números ocultos] dentro de una [cadena de texto] y devuelva la [suma de ellos].
  
  Los números pueden aparecer en [cualquier parte del texto], ya sea [juntos dentro de palabras], [separados por espacios] o [mezclados con otros caracteres].
  
  Tu objetivo es completar la función [sum_hidden_numbers(text)] para que realice correctamente la [suma de los números] dentro de la cadena. 
    `,
  defaultCode: `
  def sum_hidden_numbers(text):
      # [Aquí debes escribir tu solución]
      pass  
    `,
  code_for_tests: `
class Test: 
    def Equal(self, first, second, expected):
        if first == second:
            print("Test Passed: " + expected)
        else:
            print(f"Test Failed: {expected}, got {first} instead of {second}")

# [Instancia de Test para ejecutar las pruebas]
test = Test()

test.Equal(sum_hidden_numbers("abc123xyz"), 123, "[sum_hidden_numbers('abc123xyz')] debe devolver [123]")
test.Equal(sum_hidden_numbers("1a2b3c"), 6, "[sum_hidden_numbers('1a2b3c')] debe devolver [6]")
test.Equal(sum_hidden_numbers("nothing here"), 0, "[sum_hidden_numbers('nothing here')] debe devolver [0]")
test.Equal(sum_hidden_numbers("42 is the answer, not 12"), 54, "[sum_hidden_numbers('42 is the answer, not 12')] debe devolver [54]")
test.Equal(sum_hidden_numbers("100cats and 200dogs"), 300, "[sum_hidden_numbers('100cats and 200dogs')] debe devolver [300]")
    `,
  test_module: `
  
  class Test: 
    def Equal(self, first, second, expected):
      if first == second:
        print("Test Passed" + expected )
  
  # Crear una instancia de la clase Test y probar las funciones
  test = Test()
    `,
};

function duelCombat() {
  const [editorState, setEditorState] = useState(1);
  const [output, setOutput] = useState([]);
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState(challengeData.defaultCode.trim());
  const [start, setStart] = useState(false);
  const location = useLocation();
  const userData = location.state;

  const [totalPassed, setTotalPassed] = useState(0);
  const [totalFailed, setTotalFailed] = useState(0);

  const [executionTime, setExecutionTime] = useState(null); // Tiempo total de ejecución

  // Función para procesar el texto y resaltar palabras o bloques entre corchetes
  const highlightText = (text) => {
    // Dividimos el texto en partes usando una expresión regular para encontrar [texto]
    const parts = text.split(/(\[.*?\])/gs); // 's' permite que el punto (.) coincida con saltos de línea

    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        // Quitamos los corchetes
        const content = part.slice(1, -1); // Quitamos [ y ]
        return (
          <span key={index} className="bg-dark pr-0.5 pl-0.5">
            {content}
          </span>
        );
      }
      return part; // Si no está entre corchetes, lo dejamos como está
    });
  };

  const handleEditorDidMount = async (editor, monaco) => {
    fetch("/monaco-editor/theme.json")
      .then((res) => res.json())
      .then((themeData) => {
        monaco.editor.defineTheme("custom-theme", themeData);
        monaco.editor.setTheme("custom-theme");
      })
      .catch((error) => {
        console.error("Error loading theme:", error);
      });

    const { loadWASM } = await import("onigasm");
    await loadWASM("/monaco-editor/onigasm.wasm");

    monaco.languages.register({ id: "python" });

    const registry = new Registry({
      getGrammarDefinition: async (scopeName) => {
        if (scopeName === "source.python") {
          return {
            format: "json",
            content: await (await fetch("/monaco-editor/python-grammar.json")).json(),
          };
        }
        return null;
      },
    });

    const grammars = new Map();
    grammars.set("python", "source.python");

    wireTmGrammars(monaco, registry, grammars, editor).then(() => {
      monaco.editor.setModelLanguage(editor.getModel(), "python");
    });

    let decorationIds = [];

    const updateDecorations = () => {
      const model = editor.getModel();
      if (!model) return;

      const code = model.getValue();
      const decorations = [];

      const functionParams = [...code.matchAll(/\bdef\s+\w+\(([\w\s,]+)\)/g)];
      functionParams.forEach((match) => {
        const params = match[1].split(",").map((p) => p.trim());
        params.forEach((param) => {
          if (!param) return;
          const regex = new RegExp(`\\b${param}\\b`, "g");
          const matches = [...code.matchAll(regex)];
          if (matches.length === 1) {
            matches.forEach((m) => {
              decorations.push({
                range: new monaco.Range(1, m.index + 1, 1, m.index + param.length + 1),
                options: {
                  inlineClassName: "unused-variable",
                  className: "unused-variable-underline",
                },
              });
            });
          }
        });
      });

      decorationIds = editor.deltaDecorations(decorationIds, decorations);
    };

    editor.onDidChangeModelContent(updateDecorations);
    updateDecorations();
  };

  useEffect(() => {
    async function initPyodide() {
      try {
        const { loadPyodide } = await import("pyodide");
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
    setTotalFailed(0);
    setTotalPassed(0);
    if (!pyodide) {
      setOutput("Cargando Pyodide...");
      return;
    }

    console.log("Iniciando ejecución...");
    setOutput([{ type: "info", message: "Ejecutando..." }]);
    setExecutionTime(null); // Resetear el tiempo antes de ejecutar

    try {
      const fullCode = `import math\n\n${code}\n\n${challengeData.code_for_tests}`;
      console.log("Código completo a ejecutar:", fullCode);

      pyodide.globals.clear();
      console.log("Namespace limpiado.");

      // Medir tiempo de inicio
      const startTime = performance.now();

      await pyodide.runPythonAsync(`
import sys
from io import StringIO

sys.stdout = StringIO()
sys.stderr = StringIO()

try:
    exec(${JSON.stringify(fullCode)})
except Exception as e:
    sys.stderr.write(str(e))

stdout_output = sys.stdout.getvalue().strip()
stderr_output = sys.stderr.getvalue().strip()
result = stdout_output if stdout_output else stderr_output
result
      `);

      // Medir tiempo de fin
      const endTime = performance.now();
      const totalTime = (endTime - startTime).toFixed(2); // Tiempo total en ms
      let totalFailedTemp = 0;
      let totalPassedtemp = 0;

      const pythonOutput = pyodide.globals.get("result") || "No se generó salida.";
      console.log("Salida de Python:", pythonOutput);
      const processedOutput = pythonOutput
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => {
          if (line.startsWith("Test Passed")) {
            totalPassedtemp += 1;
            return { type: "success", message: line };
          } else if (line.startsWith("Test Failed")) {
            totalFailedTemp += 1;
            return { type: "error", message: line };
          } else {
            return { type: "info", message: line };
          }
        });

      setOutput(processedOutput);
      setTotalPassed(totalPassedtemp);
      setTotalFailed(totalFailedTemp);
      setExecutionTime(totalTime); // Guardar el tiempo total
    } catch (err) {
      console.error("Error externo en Pyodide:", err);
      setOutput("Error al ejecutar el código: " + err.message);
    }
  };

  // Renderizamos el output con elementos p coloreados
  const renderOutput = () => {
    // Verificamos que output sea un array antes de usar map
    if (!Array.isArray(output) || output.length === 0) {
      return <p className="p-1 text-[12px] text-gray-400">No hay resultados aún</p>;
    }
    return (
      <div>
        {executionTime && (
          <div className="mb-4">
            <div className="flex flex-row gap-3">
              <p className="font-regular mb-1 text-[12px]">Tiempo: {executionTime}ms</p>
              <p className="font-regular text-[12px]">Passed: {totalPassed}</p>
              <p className="font-regular text-[12px] text-red-400">Failed: {totalFailed}</p>
            </div>

            <div className="h-[1px] w-full bg-[#ffffff50]"></div>
          </div>
        )}
        <div className="relative mb-1 flex h-5 w-fit flex-row items-center justify-center gap-3">
          <div className={`h-full w-[2px] ${totalFailed > 0 ? "bg-red-400" : "bg-green-400"}`}></div>
          <p className="text-[12px] font-semibold text-white">Resultado de los tests:</p>
        </div>

        {output.map((item, index) => (
          <p
            key={index}
            className={`p-1 text-[12px] font-light ${
              item.type === "success" ? "text-green-400" : item.type === "error" ? "text-red-400" : "text-gray-400"
            }`}
          >
            {item.type === "success" ? "✅ Test passed" : item.type === "error" ? " " + item.message : item.message}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="relative grid h-screen w-full grid-rows-[40%_40%_20%] md:grid-cols-[30%_70%] md:grid-rows-[60%_40%]">
      <div className="border-b-1 md:border-b-0 border-r-0 md:border-r-1 border-light text-white text-[12px] p-2 whitespace-pre-line md:row-span-2">
        {highlightText(challengeData.description)}
      </div>
      <div className="border-b-1 border-light flex h-full flex-col">
        <header className="border-b-1 border-light h-12 flex flex-row gap-3">
          <div className="border-r-1 border-light w-20 flex flex-row gap-3 justify-center items-center text-white text-[20px]">
            <button
              onClick={() => setEditorState(1)}
              className={`hover:scale-120 cursor-pointer w-fit h-fit ${editorState === 2 ? "opacity-100" : "opacity-50"}`}
            >
              {"<"}
            </button>
            <button
              onClick={() => setEditorState(2)}
              className={`hover:scale-120 cursor-pointer w-fit h-fit ${editorState === 1 ? "opacity-100" : "opacity-50"}`}
            >
              {">"}
            </button>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 text-white text-[12px]">
            <div
              onClick={() => setEditorState(1)}
              className="flex flex-col justify-between cursor-pointer hover:bg-light transition-all duration-300"
            >
              <p className="pr-2 pl-2 pt-1 pb-1 w-fit text-center">Coder.py</p>
              <div className={`h-px w-full bg-white ${editorState === 1 ? "opacity-60" : "opacity-0"}`}></div>
            </div>

            <div
              onClick={() => setEditorState(2)}
              className="flex flex-col justify-between cursor-pointer hover:bg-light transition-all duration-300"
            >
              <p className="pr-2 pl-2 pt-1 pb-1 w-fit text-center">Testing.py</p>
              <div className={`h-px w-full bg-white ${editorState === 2 ? "opacity-60" : "opacity-0"}`}></div>
            </div>
          </div>
        </header>
        <div className="w-full h-full bg-dark">
          {editorState === 1 ? (
            <Editor
              key="editor-1"
              defaultValue={code}
              language="python"
              theme="custom-theme"
              onChange={(newValue) => {
                if (newValue !== code) {
                  setCode(newValue);
                }
              }}
              onMount={handleEditorDidMount}
              options={{
                automaticLayout: true,
                renderLineHighlight: "all",
                minimap: { enabled: false },
                overviewRulerLanes: 0,
                padding: { top: 2 },
                glyphMargin: false,
                lineNumbersMinChars: 3,
                lineDecorationsWidth: 13,
                folding: false,
                foldingHighlight: false,
                showFoldingControls: "never",
                renderIndentGuides: false,
                fontSize: 12,
                scrollBeyondLastLine: false,
                stickyScroll: { enabled: false },
              }}
            />
          ) : (
            <Editor
              key="editor-2"
              height="100%"
              defaultValue={challengeData.code_for_tests.trim()}
              language="python"
              theme="custom-theme"
              onMount={handleEditorDidMount}
              options={{
                automaticLayout: true,
                renderLineHighlight: "all",
                minimap: { enabled: false },
                readOnly: { enabled: true },
                overviewRulerLanes: 0,
                padding: { top: 2 },
                glyphMargin: false,
                lineNumbersMinChars: 3,
                lineDecorationsWidth: 13,
                folding: false,
                foldingHighlight: false,
                showFoldingControls: "never",
                renderIndentGuides: false,
                fontSize: 12,
                scrollBeyondLastLine: false,
                stickyScroll: { enabled: false },
              }}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <header
          className="w-full h-12 border-b-1 border-light flex flex-row justify-between items-center text-white text-[14px] pl-2
            pr-2"
        >
          <div className="flex flex-col justify-between items-center h-full cursor-pointer">
            <p className="flex-1 flex items-center">Terminal</p>
            <div className="h-px w-full bg-white opacity-50 mt-auto"></div>
          </div>
          <p
            onClick={runCode}
            className="bg-light pl-3 pr-3 pt-1 pb-1 hover:brightness-125 transition-all duration-300 cursor-pointer"
          >
            Run
          </p>
        </header>
        <div className="h-full p-1 text-white">{renderOutput()}</div>
      </div>
    </div>
  );
}

export default duelCombat;
