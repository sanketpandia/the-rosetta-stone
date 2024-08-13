const vscode = require("vscode");
const path = require("path");
const addTranslationToPHP = require("../formatHandlers/phpHandler");
const addTranslationToJSON = require("../formatHandlers/jsonHandler");

async function addTranslation() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("No editor is active.");
    return;
  }

  const selectedText = editor.document.getText(editor.selection);
  if (!selectedText) {
    vscode.window.showErrorMessage("No text selected.");
    return;
  }

  const key = await vscode.window.showInputBox({
    prompt: `Enter translation key for: "${selectedText}"`,
    placeHolder: "e.g., payment.loan_id",
  });

  if (!key) {
    vscode.window.showErrorMessage("Translation key is required.");
    return;
  }

  const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
  const selectedLanguage = vscode.workspace
    .getConfiguration()
    .get("rosettaStone.language", "en");
  const format = vscode.workspace
    .getConfiguration()
    .get("rosettaStone.format", "PHP");

  if (format === "PHP") {
    addTranslationToPHP(key, selectedText, workspaceFolder, selectedLanguage);
  } else if (format === "JSON") {
    addTranslationToJSON(key, selectedText, workspaceFolder, selectedLanguage);
  }

  const newText = `{{ __('${key}') }}`;
  editor.edit((editBuilder) => {
    editBuilder.replace(editor.selection, newText);
  });

  vscode.window.showInformationMessage(`Translation added for key: ${key}`);
}

module.exports = addTranslation;
