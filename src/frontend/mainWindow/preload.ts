import { contextBridge, ipcRenderer } from 'electron'
import { ipcName } from '../../interface/constant'
import { ipcWindow } from '../init'

contextBridge.exposeInMainWorld('api', {
    GetMainUIGIFPath: () => ipcRenderer.invoke(ipcName.Main.UIGIFPath),

    openDailyEvent: () => ipcRenderer.send(ipcWindow.dailyEventWindow),
    openEvent: () => ipcRenderer.send(ipcWindow.eventWindow),
    openMemo: () => ipcRenderer.send(ipcWindow.memoWindow),
    openMusic: () => ipcRenderer.send(ipcWindow.musicWindow),
    openSchedule: () => ipcRenderer.send(ipcWindow.scheduleWindow)
});