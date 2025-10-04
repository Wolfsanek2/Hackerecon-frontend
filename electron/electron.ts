import { app, BrowserWindow, session, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import type {
	RequestData,
	ResponseData,
	ErrorData,
} from '../src/types/electron.d.ts';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow: BrowserWindow | undefined;
let backendUrl = 'http://localhost:8000';

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	const startUrl = isDev
		? 'http://localhost:5173'
		: `file://${path.join(__dirname, '../build/index.html')}`;

	mainWindow.loadURL(startUrl);

	if (isDev) {
		mainWindow.webContents.openDevTools();
	}
}

app.whenReady().then(() => {
	createWindow();
	setupRequestInterceptor();
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (!BrowserWindow.getAllWindows().length) {
		createWindow();
	}
});

function setupRequestInterceptor() {
	const defaultSession = session.defaultSession;

	defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
		const requestData: RequestData = {
			id: details.id,
			url: details.url,
			method: details.method,
			timestamp: new Date().toISOString(),
			resourceType: details.resourceType,
			headers: details.requestHeaders,
		};

		if (mainWindow?.webContents) {
			mainWindow.webContents.send(
				'http-request-intercepted',
				requestData
			);
		}

		sendToBackend(requestData);
		callback({ cancel: false });
	});

	defaultSession.webRequest.onCompleted((details) => {
		const responseData: ResponseData = {
			id: details.id,
			url: details.url,
			statusCode: details.statusCode,
			statusLine: details.statusLine,
			timestamp: new Date().toISOString(),
		};

		if (mainWindow?.webContents) {
			mainWindow.webContents.send(
				'http-response-completed',
				responseData
			);
		}

		sendToBackend(responseData);
	});

	defaultSession.webRequest.onErrorOccurred((details) => {
		const errorData: ErrorData = {
			id: details.id,
			url: details.url,
			error: details.error,
			timestamp: new Date().toISOString(),
		};

		if (mainWindow?.webContents) {
			mainWindow.webContents.send('http-error-occurred', errorData);
		}

		sendToBackend(errorData);
	});
}

async function sendToBackend(
	data: RequestData | ResponseData | ErrorData
): Promise<void> {
	try {
		const response = await fetch(backendUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			console.error('Backend send error:', response.statusText);
		}
		mainWindow?.webContents.send('backend-response', {
			requestId: data.id,
			status: response.status,
		});
	} catch (error) {
		console.error('Error sending to backend');
		mainWindow?.webContents.send('backend-response', {
			requestId: data.id,
			status: 500,
		});
	}
}

ipcMain.handle('get-backend-url', (): string => {
	return backendUrl;
});
