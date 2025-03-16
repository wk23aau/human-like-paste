Human-Like Paste 🚀
Simulate human-like typing when pasting text in VS Code. Perfect for tutorials, demos, or making pasted code feel "natural."

Features ✨
Typing Effect : Pastes text character-by-character with realistic delays.
Configurable Speed : Adjust typing speed, word pauses, and sentence pauses.
Toggleable : Enable/disable via Command Palette.
No External Tools : Works entirely within VS Code.
Installation 📦
From VS Code Marketplace :
Open VS Code → Extensions (Ctrl+Shift+X / Cmd+Shift+X).
Search for "Human-Like Paste" and install.
Manual Install :
Download the .vsix file from Releases .
Run Extensions: Install from VSIX in VS Code.
Usage 🖱️
Copy text to your clipboard.
Paste (Ctrl+V/Cmd+V) → text types out progressively.
Toggle the feature :
Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P).
Search for "Toggle Human-Like Paste" .
Configuration ⚙️
Adjust settings in File → Preferences → Settings:

```json
1
2
3
4
5
6
⌄
{
    "humanLikePaste.enabled": true,        // Enable/disable the feature
    "humanLikePaste.charDelay": 50,        // Base delay between characters (ms)
    "humanLikePaste.wordDelay": 200,       // Extra delay after spaces/punctuation (ms)
    "humanLikePaste.sentenceDelay": 500    // Delay after line breaks (ms)
}
```
Known Issues 🐛
Complex clipboard content (e.g., images) may not work.
Very long texts might lag (use smaller snippets for best results).
Contributing 🤝
Fork this repository.
Run npm install to set up dependencies.
Make changes and test with F5 in VS Code.
Submit a pull request!
Credits 🙌
Built with VS Code Extension Generator .
Inspired by automation tools like AutoHotkey.
License 📜
MIT License
Copyright (c) [Your Name]

Enjoyed this extension?
⭐ Star it on GitHub or share feedback! 🎉