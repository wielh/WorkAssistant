import { BrowserWindow } from 'electron'
import path from 'path';

export let win: BrowserWindow
let inputWindow: BrowserWindow

export function createEventWindow() {
  if (win && !win.isDestroyed()) {
    win.focus(); 
    return
  }

  win = new BrowserWindow({
    width: 1200,
    height: 450,
    webPreferences:{
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'event.html'));
  win.webContents.openDevTools();
}

export function createInputWindow() {
  if (inputWindow && !inputWindow.isDestroyed()) {
    inputWindow.focus(); 
    return
  }

  inputWindow = new BrowserWindow({
    width: 1300,
    height: 700,
    parent: win!,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  inputWindow.loadFile(path.join(__dirname, 'eventInput.html'));
  //inputWindow.webContents.openDevTools();
  inputWindow.once('ready-to-show', () => inputWindow?.show());
}



