import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

import "./plaground.css";

const Playground = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  const runCode = () => {
    const src = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
    setSrcDoc(src);
  };

  return (
    <div className="playground-container">
      {/* Editors */}
      <div className="editors">
        <div className="editor-box">
          <h3>HTML</h3>
          <AceEditor
            mode="html"
            theme="monokai"
            onChange={setHtml}
            name="HTML_EDITOR"
            fontSize={14}
            width="100%"
            height="100%"
            setOptions={{ showLineNumbers: true, tabSize: 2 }}
          />
        </div>
        <div className="editor-box">
          <h3>CSS</h3>
          <AceEditor
            mode="css"
            theme="monokai"
            onChange={setCss}
            name="CSS_EDITOR"
            fontSize={14}
            width="100%"
            height="100%"
            setOptions={{ showLineNumbers: true, tabSize: 2 }}
          />
        </div>
        <div className="editor-box">
          <h3>JavaScript</h3>
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={setJs}
            name="JS_EDITOR"
            fontSize={14}
            width="100%"
            height="100%"
            setOptions={{ showLineNumbers: true, tabSize: 2 }}
          />
        </div>
      </div>

      {/* Run Button */}
      <button className="run-btn" onClick={runCode}>
        ▶ Run
      </button>

      {/* Output */}
      <div className="output">
        <h3>Output</h3>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Playground;
