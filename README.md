# Human-Like Paste

Hi, I'm WaseemRazaKhan, and I built **Human-Like Paste** to transform the way you paste text in Visual Studio Code. With this extension, your clipboard content is "typed" out in real time with realistic delays and natural variability—all without any extra setup.

## What It Does

- **Zero-Config Experience:**  
  If you haven't activated the server, normal copy/paste works as usual.

- **Server Mode & Main Paste Simulation:**  
  - **Start (Ctrl+Alt+Shift+S):** Activates the server.
    - If a main simulation is paused, pressing Start prompts you to **Resume** (continue from the saved point) or **Restart** (discard the paused context and start fresh).
  - With the server live, pressing **Ctrl+V/Cmd+V** triggers the simulated paste.
    - If a main simulation is paused, normal paste occurs.
  - **Stop (Ctrl+Alt+Shift+X):** Stops the main simulation and clears its context so new content is pasted normally.

- **Special One-Time Commands:**  
  - **Special Copy (Ctrl+Alt+Shift+Q):** Saves the current clipboard content into a special instance.
  - **Special Paste (Ctrl+Alt+Shift+W):** Always triggers a simulated paste using the special instance (or current clipboard if none), regardless of server state.
    - This special simulation runs independently and can be paused, resumed, or stopped without affecting the main simulation.

- **Additional Controls:**  
  - **Resume (Ctrl+Alt+Shift+R):** Resumes a paused simulation (special simulation takes precedence if active).
  - **Pause (Ctrl+Alt+Shift+P):** Pauses an active simulation (special simulation takes precedence if active).
  - **Toggle Notifications (Ctrl+Alt+Shift+Z):** Enables or disables on-screen notifications.
  - **Adjust Speed:** Increase with **Ctrl+Alt+Shift+Up** or decrease with **Ctrl+Alt+Shift+Down** (or adjust the **Speed Factor** in Settings, range: 0.1–5.0).

## How to Get Started

1. **Install from the Marketplace:**  
   Simply install Human-Like Paste from the VS Code Marketplace—no additional setup needed.

2. **Activate the Server (Optional):**  
   Press **Ctrl+Alt+Shift+S** to activate the server for main simulated pasting.
   - If you don't activate it, normal copy/paste works as usual.

3. **Trigger Main Paste Simulation:**  
   With the server live, press **Ctrl+V/Cmd+V** to start a simulated paste.
   - If a main simulation is paused, normal paste occurs until you use the Start command to resume or restart.

4. **Use Special Commands:**  
   - **Special Copy (Ctrl+Alt+Shift+Q):** Captures the clipboard content for a one-time paste.
   - **Special Paste (Ctrl+Alt+Shift+W):** Always triggers a simulated paste using the special instance (or current clipboard), independent of the main simulation or server state.

5. **Control the Simulation:**  
   Use the dedicated shortcut keys to pause, resume, stop, toggle notifications, and adjust typing speed.

## Why I Built This

I created Human-Like Paste to inject a bit of fun and interactivity into everyday coding. Whether you're recording a demo or simply want a more engaging workflow, I hope you enjoy this dynamic paste experience as much as I enjoyed building it.

## Feedback

Your feedback is invaluable. If you have suggestions or encounter issues, please leave a review or visit my GitHub repository.

## License

This extension is licensed under the MIT License.

---

Thank you for choosing Human-Like Paste. Install it, activate the server if desired, and let your text come to life!
