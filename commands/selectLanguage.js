const vscode = require("vscode");

function selectLanguage() {
  const languages = ["English", "French", "German"]; // Add more languages as needed
  return vscode.window
    .showQuickPick(languages, {
      placeHolder: "Select Repository Language",
    })
    .then((selectedLanguage) => {
      if (selectedLanguage) {
        // Save the selected language in the workspace settings
        vscode.workspace
          .getConfiguration()
          .update(
            "rosettaStone.language",
            selectedLanguage,
            vscode.ConfigurationTarget.Workspace
          );
        vscode.window.showInformationMessage(
          `Repository language set to ${selectedLanguage}`
        );
      }
    });
}

module.exports = selectLanguage;
