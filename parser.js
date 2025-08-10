/**
 * parser.js
 * JS module for visualizer.html
 * Extracts code from URL and loads PythonTutor iframe
 */

const Parser = (() => {
  function getCodeFromURL() {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('code') || '';
    } catch {
      return '';
    }
  }

  function encodeCode(code) {
    return encodeURIComponent(code)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')
      .replace(/\n/g, '%0A');
  }

  return {
    getCodeFromURL,
    encodeCode,
  };
})();
