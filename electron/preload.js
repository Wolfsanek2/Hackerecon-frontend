import { contextBridge, ipcRenderer } from 'electron';

const electronAPI = {
	getBackendUrl: () => ipcRenderer.invoke('get-backend-url'),
	updateBackendUrl: (newUrl) =>
		ipcRenderer.invoke('update-backend-url', newUrl),
	onRequestIntercepted: (callback) => {
		ipcRenderer.on('http-request-intercepted', callback);
	},
	onResponseCompleted: (callback) => {
		ipcRenderer.on('http-response-completed', callback);
	},
	onErrorOccurred: (callback) => {
		ipcRenderer.on('http-error-occurred', callback);
	},
	onBackendResponse: (callback) => {
		ipcRenderer.on('backend-response', callback);
	},
	removeAllListeners: (channel) => {
		ipcRenderer.removeAllListeners(channel);
	},
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
