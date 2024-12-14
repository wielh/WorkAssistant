import { BrowserWindow } from 'electron'
import path from 'path';

let win: BrowserWindow;

export function createDailyEventWindow() {
  if (win != null && !win.isDestroyed()) {
    win.focus(); 
    return
  }
  win = new BrowserWindow({
    width: 1300,
    height: 450,
    webPreferences:{
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'dailyEvent.html'));
 // win.webContents.openDevTools();
}
