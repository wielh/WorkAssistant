import { contextBridge, ipcRenderer } from 'electron'
import { ipcName } from '../../interface/constant'

contextBridge.exposeInMainWorld('api', {
    SelectAll: () => ipcRenderer.invoke(ipcName.Music.SelectAll),
    SelectByTitle: (title:string) => ipcRenderer.invoke(ipcName.Music.SelectByTitle, title),
    GetRootDir: () => ipcRenderer.invoke(ipcName.Music.GetRootDir),
    SetRootDir: (path:string) => ipcRenderer.invoke(ipcName.Music.SetRootDir, path),
});