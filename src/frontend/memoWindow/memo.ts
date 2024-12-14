import { BrowserWindow } from 'electron'
import path from 'path';

let memoWindow: BrowserWindow
export function createMemoWindow() {
  if ( memoWindow && !memoWindow.isDestroyed()) {
    memoWindow.focus(); 
    return
  }
  memoWindow = new BrowserWindow({
    width: 1200,
    height: 500,
    webPreferences:{
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  memoWindow.loadFile(path.join(__dirname, 'memo.html'));
}
