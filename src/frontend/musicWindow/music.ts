import { BrowserWindow} from 'electron'
import path from 'path';

let controlWindow: BrowserWindow;

export function createControlWindow() {
  if (controlWindow && !controlWindow.isDestroyed()) {
    controlWindow.focus(); 
    return
  }
  controlWindow = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
  });

  controlWindow.loadFile(path.join(__dirname, 'music.html'));
}



