import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "../../styles/global.css";

function JS() {
  const [output, setOutput] = useState("");
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
                eval("(function(console){ " + data + " })( { log } )");
                self.postMessage(out || "Código ejecutado sin salida.");
              } catch (err) {
                self.postMessage("Error: " + err.message);
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

  const runCode = (code) => {
    worker?.postMessage(code);
    worker?.addEventListener("message", (e) => setOutput(e.data), { once: true });
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <Editor height="50%" theme="vs-dark" defaultValue="// Escribe tu código aquí..." language="javascript" onChange={runCode} />
      <pre className="h-1/2 p-4 bg-gray-900 text-white overflow-auto">{output}</pre>
    </div>
  );
}

export default JS;
