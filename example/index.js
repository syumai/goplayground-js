/***
 * example.js
 *
 * This file is a initializing script for The Go Plaground example.
 * See: https://syumai.github.io/goplayground-js
 */

import { GoPlayground } from "../index.js";
const gpOriginal = new GoPlayground();
const gpGo2Go = new GoPlayground("https://go2goplay.golang.org");
let gp = gpOriginal;

const gpBody = document.getElementById("gpBody");
const editor = CodeMirror.fromTextArea(gpBody, {
  lineNumbers: true,
  mode: "go",
  tabSize: 8,
  indentUnit: 8,
  smartIndent: true,
  indentWithTabs: true,
  matchBrackets: true,
});
window.editor = editor;

const optionsStr = window.localStorage.getItem("goplayground-options");
const optionKeys = ["goimports", "go2go", "vimMode", "tabSize"];
const defaultOptions = {
  goimports: false,
  go2go: false,
  vimMode: false,
  tabSize: 8,
};
const parsedOptions = JSON.parse(optionsStr) || {};
const options =
  optionKeys.length === Object.keys(parsedOptions).length
    ? parsedOptions
    : defaultOptions;

const gpResult = document.getElementById("gpResult");
const gpOptions = document.getElementById("gpOptions");

const gpRunBtn = document.getElementById("gpRunBtn");
const gpFmtBtn = document.getElementById("gpFmtBtn");
const gpShareBtn = document.getElementById("gpShareBtn");

const createLine = (kind, message) => {
  const line = document.createElement("div");
  line.classList.add("line");
  line.classList.add(kind);
  line.textContent = message;
  return line;
};

const waitingMsg = "Waiting for remote server...";

async function executeRun() {
  editor.save();
  gpResult.textContent = waitingMsg;
  const result = await gp.compile(gpBody.value);
  gpResult.textContent = "";
  if (result.Errors !== "") {
    const line = createLine("stderr", result.Errors);
    gpResult.appendChild(line);
    return;
  }
  for (const event of result.Events) {
    const line = createLine(event.Kind, event.Message);
    gpResult.appendChild(line);
  }
  gpResult.appendChild(
    createLine(
      "system",
      `
Program exited.`
    )
  );
}

async function executeFmt() {
  editor.save();
  gpResult.textContent = waitingMsg;
  const result = await gp.format(gpBody.value, options.goimports);
  gpResult.textContent = "";
  if (result.Error !== "") {
    const line = createLine("stderr", result.Error);
    gpResult.appendChild(line);
    return;
  }
  gpBody.value = result.Body;
  editor.setValue(result.Body);
}

async function executeShare() {
  editor.save();
  gpResult.textContent = waitingMsg;
  const result = await gp.share(gpBody.value);
  gpResult.innerHTML = "";
  const link = document.createElement("a");
  const url = `https://play.golang.org/p/${result}`;
  link.textContent = url;
  link.href = url;
  link.target = "_blank";
  gpResult.appendChild(link);
}

gpRunBtn.addEventListener("click", () => executeRun());
gpFmtBtn.addEventListener("click", () => executeFmt());
gpShareBtn.addEventListener("click", () => executeShare());

window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (e.shiftKey) {
      e.preventDefault();
      executeRun();
    }
    if (e.ctrlKey) {
      e.preventDefault();
      executeFmt();
    }
  }
});

function applyOptions() {
  editor.setOption("keyMap", options.vimMode ? "vim" : "default");
  editor.setOption("tabSize", options.tabSize);
  editor.setOption("indentUnit", options.tabSize);
  if (options.go2go) {
    gp = gpGo2Go;
  } else {
    gp = gpOriginal;
  }
}

function initOptionsForm() {
  const gpOptionsForm = document.getElementById("gpOptionsForm");
  window.gpOptionsForm = gpOptionsForm;

  for (const key of optionKeys) {
    const input = gpOptionsForm[key];
    const value = options[key];
    if (input.type === "checkbox") {
      input.checked = value;
      continue;
    }
    input.value = value;
  }

  gpOptionsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    for (const key of optionKeys) {
      const input = gpOptionsForm[key];
      if (input.type === "checkbox") {
        options[key] = input.checked;
        continue;
      }
      options[key] = input.value;
    }
    applyOptions();
    window.localStorage.setItem(
      "goplayground-options",
      JSON.stringify(options)
    );
  });

  applyOptions();
}
initOptionsForm();

const gpOptionsBtn = document.getElementById("gpOptionsBtn");
gpOptionsBtn.addEventListener("click", () => {
  const closedLabel = "Options";
  const openedLabel = "Hide Options";
  if (gpOptionsBtn.textContent === closedLabel) {
    gpOptionsBtn.textContent = openedLabel;
    gpOptions.classList.remove("hidden");
    gpResult.classList.add("hidden");
    return;
  }
  gpOptionsBtn.textContent = closedLabel;
  gpResult.classList.remove("hidden");
  gpOptions.classList.add("hidden");
});
