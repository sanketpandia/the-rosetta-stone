const vscode = require("vscode");

const selectLanguage = require("./commands/selectLanguage");
const selectTranslationFormat = require("./commands/selectTranslationFormat");
const addTranslation = require("./commands/addTranslation");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("Rosetta Stone extension is now active!");

  // Register the command
  let selectLanguageCommand = vscode.commands.registerCommand(
    "the-rosetta-stone.selectLanguage",
    selectLanguage
  );

  let selectFormatCommand = vscode.commands.registerCommand(
    "the-rosetta-stone.selectFormat",
    selectTranslationFormat
  );

  let addTranslationCommand = vscode.commands.registerCommand(
    "the-rosetta-stone.addTranslation",
    addTranslation
  );

  context.subscriptions.push(selectLanguageCommand);
  context.subscriptions.push(selectFormatCommand);
  context.subscriptions.push(addTranslationCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
