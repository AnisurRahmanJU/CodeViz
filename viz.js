/**
 * viz.js
 * JS module to create and control iframe in index.html
 */

const Viz = (() => {
  function encodeCode(code) {
    return encodeURIComponent(code)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')
      .replace(/\n/g, '%0A');
  }

  function createVisualizerIframe(container, code) {
    if (!container) {
      console.error('Viz.createVisualizerIframe: container not found');
      return;
    }
    container.innerHTML = '';

    const url = `visualizer.html?code=${encodeCode(code)}`;

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = 'PythonTutor Visualizer';
    iframe.setAttribute('loading', 'lazy');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    container.appendChild(iframe);
  }

  return {
    createVisualizerIframe,
  };
})();
