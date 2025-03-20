import * as vscode from 'vscode';

// -------------------- Main Simulation Variables --------------------
let simulationRunning = false;
let isPaused = false;
let isStopped = false;
let serverLive = false; // Activated by Start command
let typingSpeedFactor = 1.0;
let showNotifications = true;

interface SimulationData {
  editor: vscode.TextEditor;
  text: string;
  currentIndex: number;
}
let simulationData: SimulationData | null = null;
let simulationPromise: Promise<void> | null = null;

// -------------------- Special Simulation Variables --------------------
let specialSimulationRunning = false;
let specialIsPaused = false;
let specialIsStopped = false;
let specialSimulationData: SimulationData | null = null;
let specialSimulationPromise: Promise<void> | null = null;

// Special instance for one-time special paste (stored via Special Copy)
let specialInstance: string | null = null;

// -------------------- Utility Functions --------------------
function updateSettingsFromConfig() {
  const config = vscode.workspace.getConfiguration("humanLikePaste");
  typingSpeedFactor = config.get("speedFactor", 1.0);
  showNotifications = config.get("showNotifications", true);
}

function notify(message: string) {
  if (showNotifications) {
    vscode.window.showInformationMessage(message);
  }
}

function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// -------------------- Main Simulation Functions --------------------
async function simulateHumanLikeTyping(editor: vscode.TextEditor, text: string, startIndex: number): Promise<void> {
  simulationRunning = true;
  isStopped = false;
  isPaused = false;
  if (simulationData) {
    simulationData.editor = editor;
  } else {
    simulationData = { editor, text, currentIndex: startIndex };
  }
  for (let i = startIndex; i < text.length; i++) {
    if (isStopped) break;
    simulationData.currentIndex = i;
    while (isPaused && !isStopped) {
      await sleep(100);
    }
    if (isStopped) break;
    const char = text[i];
    await editor.edit(editBuilder => {
      editBuilder.insert(editor.selection.active, char);
    });
    const pos = editor.selection.active;
    const newPos = pos.translate(0, 1);
    editor.selection = new vscode.Selection(newPos, newPos);
    let delay: number;
    if (char === '\n') delay = randomRange(400, 700);
    else if (char === ' ') delay = randomRange(200, 500);
    else if (['.', ',', ':', ';', '!', '?'].includes(char)) delay = randomRange(300, 600);
    else delay = randomRange(50, 300);
    const jitter = delay * 0.2;
    delay = delay + randomRange(-jitter, jitter);
    delay = delay / typingSpeedFactor;
    await sleep(delay);
  }
  simulationRunning = false;
  if (!isStopped && !isPaused) simulationData = null;
}

// -------------------- Special Simulation Functions --------------------
async function simulateSpecialTyping(editor: vscode.TextEditor, text: string, startIndex: number): Promise<void> {
  specialSimulationRunning = true;
  specialIsStopped = false;
  specialIsPaused = false;
  if (specialSimulationData) {
    specialSimulationData.editor = editor;
  } else {
    specialSimulationData = { editor, text, currentIndex: startIndex };
  }
  for (let i = startIndex; i < text.length; i++) {
    if (specialIsStopped) break;
    specialSimulationData.currentIndex = i;
    while (specialIsPaused && !specialIsStopped) {
      await sleep(100);
    }
    if (specialIsStopped) break;
    const char = text[i];
    await editor.edit(editBuilder => {
      editBuilder.insert(editor.selection.active, char);
    });
    const pos = editor.selection.active;
    const newPos = pos.translate(0, 1);
    editor.selection = new vscode.Selection(newPos, newPos);
    let delay: number;
    if (char === '\n') delay = randomRange(400, 700);
    else if (char === ' ') delay = randomRange(200, 500);
    else if (['.', ',', ':', ';', '!', '?'].includes(char)) delay = randomRange(300, 600);
    else delay = randomRange(50, 300);
    const jitter = delay * 0.2;
    delay = delay + randomRange(-jitter, jitter);
    delay = delay / typingSpeedFactor;
    await sleep(delay);
  }
  specialSimulationRunning = false;
  if (!specialIsStopped && !specialIsPaused) specialSimulationData = null;
}

// -------------------- Command Handlers --------------------
export function activate(context: vscode.ExtensionContext) {
  updateSettingsFromConfig();
  vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration("humanLikePaste")) {
      updateSettingsFromConfig();
      notify("Human-Like Paste settings updated.");
    }
  });

  // Main Simulation: Start command (activates server).
  const startDisposable = vscode.commands.registerCommand('extension.humanLikePasteStart', async () => {
    serverLive = true;
    if (simulationData && isPaused) {
      const selection = await vscode.window.showInformationMessage(
        "A simulation is paused. Would you like to Resume or Restart?",
        { modal: true },
        "Resume", "Restart"
      );
      if (selection === "Resume") {
        isPaused = false;
        notify("Resuming paste simulation.");
        return;
      } else if (selection === "Restart") {
        simulationData = null;
      } else {
        return;
      }
    }
    if (simulationData && !isPaused) {
      notify("A simulation is already in progress. Use Resume to continue.");
      return;
    }
    notify("Server is live and ready. Now use Ctrl+V/Cmd+V to paste.");
  });

  // Main Simulation: Paste command override.
  const doPasteDisposable = vscode.commands.registerCommand('extension.humanLikePasteDo', async () => {
    if (!serverLive) {
      await vscode.commands.executeCommand("editor.action.clipboardPasteAction");
      return;
    }
    if (simulationData && isPaused) {
      await vscode.commands.executeCommand("editor.action.clipboardPasteAction");
      return;
    }
    if (simulationData && !isPaused) {
      notify("A simulation is already in progress. Use Resume if paused.");
      return;
    }
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const clipboardText = await vscode.env.clipboard.readText();
    if (!clipboardText) return;
    simulationData = { editor, text: clipboardText, currentIndex: 0 };
    simulationPromise = simulateHumanLikeTyping(editor, clipboardText, 0);
  });

  // Resume command: Special simulation takes precedence if paused.
  const resumeDisposable = vscode.commands.registerCommand('extension.humanLikePasteResume', async () => {
    if (specialSimulationData && specialIsPaused) {
      specialIsPaused = false;  // Reset paused flag.
      notify("Resuming special paste simulation.");
      specialSimulationPromise = simulateSpecialTyping(specialSimulationData.editor, specialSimulationData.text, specialSimulationData.currentIndex);
      return;
    } else if (simulationData && (isPaused || isStopped)) {
      isPaused = false; // Reset paused flag.
      notify("Resuming paste simulation.");
      simulationPromise = simulateHumanLikeTyping(simulationData.editor, simulationData.text, simulationData.currentIndex);
      return;
    } else {
      notify("No paused simulation to resume.");
      return;
    }
  });

  // Pause command: Pauses active simulation (special takes precedence).
  const pauseDisposable = vscode.commands.registerCommand('extension.humanLikePastePause', () => {
    if (specialSimulationData && specialSimulationRunning && !specialIsPaused) {
      specialIsPaused = true;
      notify("Paused special paste simulation.");
    } else if (simulationRunning && !isPaused) {
      isPaused = true;
      notify("Paused paste simulation.");
    } else {
      notify("No running simulation to pause.");
    }
  });

  // Stop command: Stops active simulation (special takes precedence).
  const stopDisposable = vscode.commands.registerCommand('extension.humanLikePasteStop', () => {
    if (specialSimulationData && specialSimulationRunning) {
      specialIsStopped = true;
      notify("Stopped special paste simulation.");
      specialSimulationData = null;
    } else if (simulationRunning) {
      isStopped = true;
      serverLive = false;
      notify("Stopped paste simulation. Server is no longer live.");
      simulationData = null;
    } else {
      notify("No simulation is running.");
    }
  });

  // Toggle notifications.
  const toggleNotifyDisposable = vscode.commands.registerCommand('extension.humanLikePasteToggleNotifications', async () => {
    const config = vscode.workspace.getConfiguration("humanLikePaste");
    const current = config.get("showNotifications", true);
    await config.update("showNotifications", !current, vscode.ConfigurationTarget.Global);
    updateSettingsFromConfig();
    notify("Notifications " + (showNotifications ? "enabled" : "disabled") + ".");
  });

  // Increase speed.
  const speedUpDisposable = vscode.commands.registerCommand('extension.humanLikePasteSpeedUp', async () => {
    const config = vscode.workspace.getConfiguration("humanLikePaste");
    let currentSpeed = config.get("speedFactor", 1.0);
    currentSpeed = Math.min(currentSpeed + 0.1, 5.0);
    await config.update("speedFactor", currentSpeed, vscode.ConfigurationTarget.Global);
    updateSettingsFromConfig();
    notify("Paste Speed: x" + currentSpeed.toFixed(1));
  });

  // Decrease speed.
  const speedDownDisposable = vscode.commands.registerCommand('extension.humanLikePasteSpeedDown', async () => {
    const config = vscode.workspace.getConfiguration("humanLikePaste");
    let currentSpeed = config.get("speedFactor", 1.0);
    currentSpeed = Math.max(currentSpeed - 0.1, 0.1);
    await config.update("speedFactor", currentSpeed, vscode.ConfigurationTarget.Global);
    updateSettingsFromConfig();
    notify("Paste Speed: x" + currentSpeed.toFixed(1));
  });

  // Special Copy: Saves clipboard content into special instance.
  const specialCopyDisposable = vscode.commands.registerCommand('extension.humanLikePasteSpecialCopy', async () => {
    const clipboardText = await vscode.env.clipboard.readText();
    if (clipboardText) {
      specialInstance = clipboardText;
      notify("Special copy stored.");
    } else {
      notify("Clipboard is empty.");
    }
  });

  // Special Paste: Always triggers a simulated paste using the special instance (or current clipboard if none),
  // regardless of server state.
  const specialPasteDisposable = vscode.commands.registerCommand('extension.humanLikePasteSpecialPaste', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    // If a special simulation is paused, prompt for Resume or Restart.
    if (specialSimulationData && specialIsPaused) {
      const selection = await vscode.window.showInformationMessage(
        "A special paste simulation is paused. Would you like to Resume or Restart?",
        { modal: true },
        "Resume", "Restart"
      );
      if (selection === "Resume") {
        specialIsPaused = false;
        notify("Resuming special paste simulation.");
        specialSimulationPromise = simulateSpecialTyping(specialSimulationData.editor, specialSimulationData.text, specialSimulationData.currentIndex);
        return;
      } else if (selection === "Restart") {
        specialSimulationData = null;
      } else {
        return;
      }
    }
    // Always trigger simulation for special paste.
    let textToPaste = specialInstance;
    if (!textToPaste) {
      textToPaste = await vscode.env.clipboard.readText();
      if (!textToPaste) return;
    }
    specialSimulationData = { editor, text: textToPaste, currentIndex: 0 };
    specialSimulationPromise = simulateSpecialTyping(editor, textToPaste, 0);
  });

  context.subscriptions.push(
    startDisposable,
    doPasteDisposable,
    resumeDisposable,
    pauseDisposable,
    stopDisposable,
    toggleNotifyDisposable,
    speedUpDisposable,
    speedDownDisposable,
    specialCopyDisposable,
    specialPasteDisposable
  );
}

export function deactivate() {}
