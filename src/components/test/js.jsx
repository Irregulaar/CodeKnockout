import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

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
  defaultCode: `function litres(time) { return 0; }`,
  code_for_tests: `
    // Tests básicos sin Chai
    const tests = [
      { input: 0, expected: 0, message: 'litres(0) should return 0' },
      { input: 1, expected: 0, message: 'litres(1) should return 0' },
      { input: 2, expected: 1, message: 'litres(2) should return 1' },
      { input: 3, expected: 1, message: 'litres(3) should return 1' },
      { input: 4, expected: 2, message: 'litres(4) should return 2' },
      { input: 1.4, expected: 0, message: 'litres(1.4) should return 0' },
      { input: 12.3, expected: 6, message: 'litres(12.3) should return 6' },
      { input: 0.82, expected: 0, message: 'litres(0.82) should return 0' },
      { input: 11.8, expected: 5, message: 'litres(11.8) should return 5' },
      { input: 1787, expected: 893, message: 'litres(1787) should return 893' },
    ];

    let passed = 0;
    let output = "";
    for (const { input, expected, message } of tests) {
      const result = litres(input);
      if (result === expected) {
        passed++;
      } else {
        output += \`❌ \${message}: obtuvo \${result}, esperaba \${expected}\\n\`;
      }
    }
    if (passed === tests.length) {
      output += "✅ Todos los tests pasaron!\\n";
    } else {
      output += \`✅ Pasaron \${passed} de \${tests.length} tests\\n\`;
    }
    console.log(output);
  `,
};

function JSChallenge() {
  const [output, setOutput] = useState("");
  const [code, setCode] = useState(challengeData.defaultCode);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const newWorker = new Worker(
      URL.createObjectURL(
        new Blob(
          [
            `
            self.onmessage = ({ data }) => {
              try {
                let out = "";
                const log = (...args) => (out += args.join(" ") + "\\n");
                const console = { log };

                // Combinar el código del usuario y los tests
                const fullCode = data.userCode + "\\n" + data.codeForTests;

                // Ejecutar el código completo
                eval(fullCode);

                self.postMessage(out || "✅ Todos los tests pasaron!\\n");
              } catch (err) {
                self.postMessage("Error: " + err.message + "\\n");
              }
            };
          `,
          ],
          { type: "application/javascript" },
        ),
      ),
    );
    setWorker(newWorker);
    return () => newWorker.terminate();
  }, []);

  const runCode = () => {
    worker?.postMessage({
      userCode: code,
      codeForTests: challengeData.code_for_tests,
    });
    worker?.addEventListener("message", (e) => setOutput(e.data), { once: true });
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Explicación del reto */}
      <div className="p-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">Explicación del reto:</h2>
        <p>{challengeData.description}</p>
      </div>

      {/* Editor para que el usuario complete la solución */}
      <Editor height="50%" theme="vs-dark" defaultValue={challengeData.defaultCode} language="javascript" onChange={setCode} />

      {/* Botón para ejecutar el código */}
      <button onClick={runCode} className="p-2 bg-blue-500 text-white">
        Ejecutar
      </button>

      {/* Mostrar los resultados de los tests */}
      <pre className="h-1/2 p-4 bg-gray-900 text-white overflow-auto">{output}</pre>
    </div>
  );
}

export default JSChallenge;
