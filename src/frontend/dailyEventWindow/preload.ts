import { contextBridge, ipcRenderer } from 'electron'
import { ipcName } from '../../interface/constant'

contextBridge.exposeInMainWorld('api', {
    SelectAll: () => ipcRenderer.invoke(ipcName.DailyEvent.SelectAll),
    Delete: (id:number) => ipcRenderer.invoke(ipcName.DailyEvent.Delete, id),
    Update: (id:number, title:string, content:string) => ipcRenderer.invoke(ipcName.DailyEvent.Update, id, title, content),
    InsertOne: (title:string, content:string) => ipcRenderer.invoke(ipcName.DailyEvent.InsertOne, title, content)
});