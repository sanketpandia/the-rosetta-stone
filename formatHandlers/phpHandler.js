const fs = require("fs");
const path = require("path");

function addTranslationToPHP(
  key,
  selectedText,
  workspaceFolder,
  selectedLanguage
) {
  const translationFilePath = path.join(
    workspaceFolder,
    "resources",
    "lang",
    selectedLanguage,
    `${key.split(".")[0]}.php`
  );

  if (!fs.existsSync(translationFilePath)) {
    fs.writeFileSync(
      translationFilePath,
      `<?php\n\nreturn [\n    '${
        key.split(".")[1]
      }' => '${selectedText}',\n];\n`
    );
  } else {
    const fileContent = fs.readFileSync(translationFilePath, "utf-8");
    const updatedContent = fileContent.replace(
      /return \[\n([\s\S]*?)\];/,
      (match, p1) => {
        return `return [\n${p1.trim() ? p1.trim() + "," : ""}\n    '${
          key.split(".")[1]
        }' => '${selectedText}',\n];`;
      }
    );

    fs.writeFileSync(translationFilePath, updatedContent);
  }
}

module.exports = addTranslationToPHP;
