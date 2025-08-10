# Python Tutor Code Visualizer

A lightweight web-based code visualizer inspired by [Python Tutor](https://pythontutor.com/).  
This project lets users write code in a CodeMirror-powered editor, then visualize the code execution step-by-step using Python Tutor’s official visualization tool embedded via iframe.

---

## Features

- Clean, responsive UI using Bootstrap and CodeMirror
- Syntax-highlighted, editable code editor
- Seamless transition between code input page (`index.html`) and visualization page (`visualizer.html`)
- URL encoding of code for easy sharing and bookmarking
- Embedded Python Tutor visualization via iframe using `render.html` for direct execution output display
- User prompt to manually trigger visualization inside iframe due to browser security restrictions
- Modular JavaScript code (`visualizer.js`) managing editor, iframe loading, and navigation

---

## How It Works

1. **Write code:** User writes or edits C code in the editor on `index.html`.
2. **Visualize:** Clicking **Visualize Code** sends the code as a URL parameter to `visualizer.html`.
3. **View execution:** `visualizer.html` loads the Python Tutor visualization page inside an iframe, passing the user’s code.
4. **Interact:** User can interact with the embedded Python Tutor interface to step through execution.

---

## Usage

- Open `index.html` in a modern browser.
- Write or paste your code in the editor.
- Click **Visualize Code** to open `visualizer.html` with your code loaded.
- Inside the embedded Python Tutor iframe, manually click **Visualize Execution** if visualization does not start automatically.
- Step through your program’s execution using Python Tutor’s interface.

---

## Dependencies

- [Bootstrap 5](https://getbootstrap.com/) for responsive styling
- [CodeMirror 5](https://codemirror.net/) for code editing and syntax highlighting
- Python Tutor online visualization service for rendering code execution

---

## Notes

- Due to browser cross-origin security policies, automatic clicking of buttons inside the embedded Python Tutor iframe is restricted.
- You may need to manually start visualization inside the iframe.
- For full control and auto-run features, consider hosting a local copy of Python Tutor’s visualization code.

---

## License

MIT License © Md. Anisur Rahman

---

## Credits

- [Python Tutor](https://pythontutor.com/) — Original visualization platform  
- [CodeMirror](https://codemirror.net/) — Code editor component  
- [Bootstrap](https://getbootstrap.com/) — CSS framework




