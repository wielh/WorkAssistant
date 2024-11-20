import { contextBridge, ipcRenderer } from 'electron'
import { ipcName } from '../../interface/constant'

contextBridge.exposeInMainWorld('api', {
    InsertOne: (activityType:number, dayOfWeek:number, startDate:string, endDate:string) => ipcRenderer.invoke(ipcName.WeeklySchedule.InsertOne, activityType, dayOfWeek, startDate, endDate),
    Update: (id:number, activityType:number, dayOfWeek:number, startDate:string, endDate:string) => ipcRenderer.invoke(ipcName.WeeklySchedule.Update, id, activityType, dayOfWeek, startDate, endDate),
    SelectAll: () => ipcRenderer.invoke(ipcName.WeeklySchedule.SelectAll),
    SelectToday: () => ipcRenderer.invoke(ipcName.WeeklySchedule.SelectToday),
    Delete: (id:number) => ipcRenderer.invoke(ipcName.WeeklySchedule.Delete, id),
    DeleteByWeekday: (dayOfWeek:number) => ipcRenderer.invoke(ipcName.WeeklySchedule.Delete, dayOfWeek)
});