import * as vscode from 'vscode';

let typingTimeout: NodeJS.Timeout | undefined;

// Configuration defaults
const config = () => {
    const cfg = vscode.workspace.getConfiguration('humanLikePaste');
    return {
        enabled: cfg.get<boolean>('enabled', true),
        charDelay: cfg.get<number>('charDelay', 50),
        wordDelay: cfg.get<number>('wordDelay', 200),
        sentenceDelay: cfg.get<number>('sentenceDelay', 500),
    };
};

// Simulate typing effect
function typeText(editor: vscode.TextEditor, text: string) {
    const lines = text.split('\n');
    let lineIndex = 0;

    const typeNextCharacter = () => {
        if (!config().enabled || lineIndex >= lines.length) {
            return;
        }

        const line = lines[lineIndex];
        let charIndex = 0;

        const typeCharacter = () => {
            if (!config().enabled || charIndex >= line.length) {
                lineIndex++;
                setTimeout(typeNextCharacter, config().sentenceDelay);
                return;
            }

            const char = line[charIndex];
            editor.edit(editBuilder => {
                editBuilder.insert(editor.selection.active, char);
            });

            // Variable delay for realism
            const isSpaceOrPunctuation = char === ' ' || /[.,!?;]/.test(char);
            const delay = isSpaceOrPunctuation ? config().wordDelay : config().charDelay;

            charIndex++;
            typingTimeout = setTimeout(typeCharacter, delay + Math.random() * 50);
        };

        typeCharacter();
    };

    typeNextCharacter();
}

// Override the paste command
export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('humanLikePaste.paste', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || !config().enabled) {
            await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
            return;
        }

        // Get clipboard text
        const clipboardText = await vscode.env.clipboard.readText();
        if (!clipboardText) { return; }

        // Simulate typing
        typeText(editor, clipboardText);
    });

    context.subscriptions.push(disposable);
	    // NEW TOGGLE COMMAND
	const toggleCommand = vscode.commands.registerCommand('humanLikePaste.toggle', () => {
		const isEnabled = config().enabled;
		vscode.workspace.getConfiguration('humanLikePaste').update('enabled', !isEnabled, vscode.ConfigurationTarget.Global);
		vscode.window.showInformationMessage(`Human-Like Paste ${!isEnabled ? 'Enabled' : 'Disabled'}`);
	});
	context.subscriptions.push(toggleCommand);

    // Replace default paste shortcut
    vscode.commands.executeCommand('workbench.action.openGlobalKeybindings');
    vscode.workspace.getConfiguration('keybindings').update('editor.action.clipboardPasteAction', 'humanLikePaste.paste', vscode.ConfigurationTarget.Global);
}