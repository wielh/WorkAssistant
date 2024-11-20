import { BrowserWindow } from 'electron'
import path from 'path';

let memoWindow: BrowserWindow | null
export function createMemoWindow() {
  if (memoWindow!=null) {
    memoWindow.focus(); 
    return
  }
  memoWindow = new BrowserWindow({
    width: 900,
    height: 450,
    webPreferences:{
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  memoWindow.loadFile(path.join(__dirname, 'memo.html'));
  memoWindow.on('closed', () => {
    memoWindow = null;
  })
  //memoWindow.webContents.openDevTools();
}
