import { contextBridge, ipcRenderer } from 'electron'
import { ipcName } from '../../interface/constant'
import { ipcWindow } from '../init'


contextBridge.exposeInMainWorld('api', {
    Delete: (id:number) => ipcRenderer.invoke(ipcName.Event.Delete, id),
    DeleteHistory: () => ipcRenderer.invoke(ipcName.Event.DeleteHistory),
    InsertOne: (title:string, content:string, startDate: Date, endDate: Date) => ipcRenderer.invoke(ipcName.Event.InsertOne, title, content, startDate, endDate),
    SelectAll: () => ipcRenderer.invoke(ipcName.Event.SelectAll),
    SelectNow: () => ipcRenderer.invoke(ipcName.Event.SelectNow),
    SelectThisWeek: () => ipcRenderer.invoke(ipcName.Event.SelectThisWeek),
    Update: (id: number, title: string, content: string, startDate: Date, endDate: Date) => ipcRenderer.invoke(ipcName.Event.Update, id, title, content, startDate, endDate),

    Reload: () => ipcRenderer.send(ipcWindow.eventWindowReload),
});