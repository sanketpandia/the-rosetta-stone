const fs = require("fs");
const path = require("path");

function addTranslationToJSON(
  key,
  selectedText,
  workspaceFolder,
  selectedLanguage
) {
  const translationFilePath = path.join(
    workspaceFolder,
    "resources",
    "lang",
    selectedLanguage + ".json"
  );

  let translations = {};
  if (fs.existsSync(translationFilePath)) {
    translations = JSON.parse(fs.readFileSync(translationFilePath, "utf-8"));
  }

  translations[key] = selectedText;

  fs.writeFileSync(translationFilePath, JSON.stringify(translations, null, 4));
}

module.exports = addTranslationToJSON;
