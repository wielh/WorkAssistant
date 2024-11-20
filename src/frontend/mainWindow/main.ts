import { BrowserWindow, screen } from 'electron'
import * as path from "path"

export function createMainWindow() {
  const { width } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: 350,
    height: 500, 
    x: width -  350,         
    y: 0,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  win.loadFile(path.join(__dirname, 'main.html'));
}

