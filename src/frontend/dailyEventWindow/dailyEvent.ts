import { BrowserWindow } from 'electron'
import path from 'path';

let win: BrowserWindow | null;

export function createDailyEventWindow() {
  if (win != null) {
    win.focus(); 
    return
  }
  win = new BrowserWindow({
    width: 900,
    height: 450,
    webPreferences:{
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'dailyEvent.html'));
  win.on('closed', () => {
    win = null;
  })
 // win.webContents.openDevTools();
}
