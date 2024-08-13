const vscode = require("vscode");

function selectTranslationFormat() {
  const SUPPORTED_FORMATS = ["PHP", "JSON"];

  return vscode.window
    .showQuickPick(SUPPORTED_FORMATS, {
      placeHolder: "Select Translation Format: ",
    })
    .then((selectedFormat) => {
      if (!selectedFormat) return;

      vscode.workspace
        .getConfiguration()
        .update(
          "rosettaStone.format",
          selectedFormat,
          vscode.ConfigurationTarget.Workspace
        );
      vscode.window.showInformationMessage(
        `Repostory Format set to ${selectedFormat}`
      );
    });
}

module.exports = selectTranslationFormat;
