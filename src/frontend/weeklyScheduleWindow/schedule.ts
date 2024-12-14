import { BrowserWindow} from 'electron'
import * as path from "path"

export function createScheduleWindow() {
  const controlWindow = new BrowserWindow({
    width: 1300,
    height: 700,
    webPreferences: {
      preload: path.join( __dirname , '/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
  });

  controlWindow.loadFile(path.join(__dirname, 'schedule.html'));
  //controlWindow.webContents.openDevTools();
}


