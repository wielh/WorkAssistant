import { contextBridge, ipcRenderer } from 'electron'
import { ipcName } from '../../interface/constant'

contextBridge.exposeInMainWorld('api', {
    Delete: (id:number) => ipcRenderer.invoke(ipcName.Memo.Delete, id),
    InsertOne: (title:string, subtitle:string, content:string) => ipcRenderer.invoke(ipcName.Memo.InsertOne, title, subtitle ,content),
    SelectAll: () => ipcRenderer.invoke(ipcName.Memo.SelectAll),
    SelectByTitle: (title:string) => ipcRenderer.invoke(ipcName.Memo.SelectByTitle, title),
    SelectBySubTitle: (title:string, subtitle:string) => ipcRenderer.invoke(ipcName.Memo.SelectBySubtitle, title, subtitle),
    Update: (id:number, title:string, subtitle:string, content:string) => ipcRenderer.invoke(ipcName.Memo.Update, id, title, subtitle, content),
});