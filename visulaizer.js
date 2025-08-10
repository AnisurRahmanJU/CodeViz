/**
 * visualizer.js
 * 
 * Handles code editor setup, code serialization,
 * iframe loading of Python Tutor visualization,
 * navigation between pages,
 * and UI control.
 * 
 * Author: Md. Anisur Rahman
 * License: MIT
 */

// Immediately Invoked Function Expression (IIFE) for scope isolation
(() => {
  // Globals for editor and iframe container
  let editor = null;
  let iframeContainer = null;
  const PYTHON_TUTOR_RENDER_URL = "https://pythontutor.com/render.html";

  /**
   * Initialize CodeMirror editor on the given DOM element.
   * @param {HTMLElement} container 
   * @param {string} initialCode 
   */
  function initCodeEditor(container, initialCode = '') {
    if (!container) {
      console.error("CodeMirror container not found");
      return null;
    }
    const cm = CodeMirror(container, {
      mode: 'text/x-csrc',
      theme: 'eclipse',
      lineNumbers: true,
      lineWrapping: true,
      value: initialCode,
      autofocus: true,
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-/": "toggleComment"
      }
    });

    // Style font-family consistent with Python Tutor
    cm.getWrapperElement().style.fontFamily = 'Consolas, "Courier New", monospace';
    cm.getWrapperElement().style.fontSize = '14px';

    return cm;
  }

  /**
   * Encode code string for safe URL transmission.
   * Uses encodeURIComponent plus replaces some characters for neatness.
   * @param {string} code 
   * @returns {string}
   */
  function encodeCodeForUrl(code) {
    // Basic encodeURIComponent
    let encoded = encodeURIComponent(code);
    // Optional: further shorten or replace spaces, etc. if needed
    return encoded;
  }

  /**
   * Decode code string from URL parameter.
   * @param {string} encodedCode 
   * @returns {string}
   */
  function decodeCodeFromUrl(encodedCode) {
    try {
      return decodeURIComponent(encodedCode);
    } catch (e) {
      console.error("Error decoding code from URL", e);
      return '';
    }
  }

  /**
   * Read the code parameter from current page URL.
   * @returns {string} decoded code or empty string
   */
  function getCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedCode = urlParams.get('code') || '';
    return decodeCodeFromUrl(encodedCode);
  }

  /**
   * Build the Python Tutor iframe src URL with given code and language.
   * @param {string} code 
   * @param {string} lang 
   * @returns {string}
   */
  function buildPythonTutorUrl(code, lang = 'c') {
    const encodedCode = encodeCodeForUrl(code);
    // Using render.html with mode=display to show visualization directly
    return `${PYTHON_TUTOR_RENDER_URL}#mode=display&code=${encodedCode}&lang=${lang}`;
  }

  /**
   * Navigate to visualizer.html with the given code as URL param.
   * @param {string} code 
   */
  function navigateToVisualizer(code) {
    if (!code || code.trim() === '') {
      alert("Please enter code before visualizing.");
      return;
    }
    const encodedCode = encodeCodeForUrl(code);
    window.location.href = `visualizer.html?code=${encodedCode}`;
  }

  /**
   * Load iframe with Python Tutor visualization for given code.
   * @param {HTMLElement} iframeContainer 
   * @param {string} code 
   * @param {string} lang 
   */
  function loadVisualizerIframe(iframeContainer, code, lang = 'c') {
    if (!iframeContainer) {
      console.error("iframe container not found");
      return;
    }
    if (!code) {
      iframeContainer.innerHTML = "<p style='color:red;'>No code to visualize.</p>";
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'pt-iframe';
    iframe.src = buildPythonTutorUrl(code, lang);
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');

    // Clear previous iframe if any
    iframeContainer.innerHTML = '';
    iframeContainer.appendChild(iframe);

    // Optional: Listen for iframe load events if needed
    iframe.addEventListener('load', () => {
      console.log("Python Tutor iframe loaded.");
    });
  }

  /**
   * Setup event listeners for page interactions.
   * @param {HTMLElement} visualizeBtn 
   * @param {HTMLElement} iframeContainer 
   */
  function setupEventListeners(visualizeBtn, iframeContainer) {
    visualizeBtn.addEventListener('click', () => {
      const code = editor.getValue();
      // For index.html, navigate to visualizer page
      if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        navigateToVisualizer(code);
      }
      // For visualizer.html, load iframe directly (optional)
      else if (window.location.pathname.endsWith('visualizer.html')) {
        loadVisualizerIframe(iframeContainer, code);
      }
    });
  }

  /**
   * Initialize page for index.html
   */
  function initIndexPage() {
    const editorContainer = document.getElementById('editor');
    const visualizeBtn = document.getElementById('visualize-btn');
    editor = initCodeEditor(editorContainer, `#include <stdio.h>\n\nint main() {\n    printf("Hello, PythonTutor Visualizer!\\n");\n    return 0;\n}`);

    setupEventListeners(visualizeBtn, null);
  }

  /**
   * Initialize page for visualizer.html
   */
  function initVisualizerPage() {
    const iframeContainer = document.getElementById('iframe-container');
    const visualizeBtn = document.getElementById('visualize-btn');

    const codeFromUrl = getCodeFromUrl();
    if (!codeFromUrl) {
      iframeContainer.innerHTML = '<p style="color:red;">No code provided to visualize.</p>';
      return;
    }

    loadVisualizerIframe(iframeContainer, codeFromUrl);

    // Optionally create a read-only CodeMirror showing the code
    const editorContainer = document.getElementById('editor');
    editor = initCodeEditor(editorContainer, codeFromUrl);
    editor.setOption('readOnly', true);

    setupEventListeners(visualizeBtn, iframeContainer);
  }

  /**
   * Entry point: decide which page we are on and initialize accordingly.
   */
  function main() {
    // Cache iframe container globally for visualizer page
    iframeContainer = document.getElementById('iframe-container');

    const path = window.location.pathname;
    if (path.endsWith('index.html') || path.endsWith('/')) {
      initIndexPage();
    } else if (path.endsWith('visualizer.html')) {
      initVisualizerPage();
    } else {
      console.warn("Unknown page, no initialization performed.");
    }
  }

  // Run main after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
