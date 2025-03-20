# Human-Like Paste

Overview
--------

Welcome to **Human-Like Paste**—a VS Code extension that revolutionizes the way you paste text. This extension types out your clipboard content with natural delays and variability, mimicking human keystrokes for a more dynamic and interactive experience. No extra setup required!

Features
--------

### **Zero-Config Experience**

*   If the server is not activated, copy/paste functions normally.
    

### **Main Paste Simulation (Server Mode)**

*   **Start (Ctrl+Alt+Shift+S)** – Activates the server.
    
    *   If a simulation is paused, you can either **Resume** from the last point or **Restart** from scratch.
        
*   **Paste (Ctrl+V / Cmd+V)** – Initiates the simulated typing effect.
    
    *   If a simulation is paused, regular paste occurs instead.
        
*   **Stop (Ctrl+Alt+Shift+X)** – Stops the simulation and clears its context.
    

### **Special One-Time Paste Commands**

*   **Special Copy (Ctrl+Alt+Shift+Q)** – Saves the clipboard content into a special instance.
    
*   **Special Paste (Ctrl+Alt+Shift+W)** – Pastes using the special instance (or the clipboard if none is set), regardless of server status.
    
    *   Runs independently of the main simulation and can be paused, resumed, or stopped separately.
        
    *   If paused, prompts to **Resume** or **Restart** the special paste.
        

### **Additional Controls**

*   **Resume (Ctrl+Alt+Shift+.)** – Resumes a paused simulation, prioritizing the special simulation if active.
    
*   **Pause (Ctrl+Alt+Shift+P)** – Pauses an ongoing simulation, prioritizing the special simulation if active.
    
*   **Toggle Notifications (Ctrl+Alt+Shift+Z)** – Enables or disables on-screen notifications.
    
*   **Adjust Typing Speed:**
    
    *   Increase: **Ctrl+Alt+Shift+Up**
        
    *   Decrease: **Ctrl+Alt+Shift+Down**
        
    *   Alternatively, modify the **Speed Factor** in settings (Range: **0.1 – 5.0**).
        

Getting Started
---------------

### **1\. Install from the Marketplace**

Find **Human-Like Paste** on the VS Code Marketplace and install it—no additional setup required.

### **2\. Activate the Server (Optional)**

*   Press **Ctrl+Alt+Shift+S** to enable simulated pasting.
    
*   If not activated, normal pasting remains unchanged.
    

### **3\. Start a Simulated Paste**

*   With the server active, press **Ctrl+V / Cmd+V** to simulate typing.
    
*   If a simulation is paused, regular pasting occurs until resumed or restarted.
    

### **4\. Utilize Special Paste Commands**

*   **Special Copy (Ctrl+Alt+Shift+Q)** – Captures the clipboard for a one-time paste.
    
*   **Special Paste (Ctrl+Alt+Shift+W)** – Always executes a simulated paste using the special instance.
    

### **5\. Control the Simulation**

*   Use shortcuts to pause, resume, stop, toggle notifications, or fine-tune the typing speed.
    

Why I Built This
----------------

I developed **Human-Like Paste** to add an element of fun and interactivity to everyday coding. Whether for live demos, presentations, or personal workflow enhancement, this extension delivers a unique typing experience.

Feedback & Support
------------------

Your feedback matters! If you have any suggestions, issues, or feature requests, please leave a review or visit the [GitHub repository](https://github.com/wk23aau/human-like-paste#) to contribute.

License
-------

This extension is licensed under the **MIT License**.

Thank you for using **Human-Like Paste**! Install it, activate the server if needed, and watch your text come to life. 🚀