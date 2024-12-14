const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    
    receiveData: (callback) => ipcRenderer.on('data-from-main', (event, data) => callback(data)),
    feedback: (callback) => ipcRenderer.on('feedback', (event, data) => callback(data)),
    setAction: (data) => ipcRenderer.send('set-action', data),

});
