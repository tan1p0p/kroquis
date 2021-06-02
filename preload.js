const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    send: async (channel, data) => await ipcRenderer.send(channel, data),
    get: async (channel, data) => await ipcRenderer.invoke(channel)
  }
);

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
