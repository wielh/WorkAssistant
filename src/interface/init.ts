import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as path from 'path'

import { 
    MusicOperatorInterface, MusicSetting,
    Memo, MemoOperatorInterface, Event, 
    EventOperatorInterface, 
    DailyEvent, DailyEventOperatorInterface,
    WeeklySchedule, WeeklyScheduleOperatorInterface, WeekdayType, ActivityType } from './tableDefintion'

import { MusicOperator } from '../backend/DB/music'
import { MemoOperator } from '../backend/DB/memo'
import { EventOperator } from '../backend/DB/event'
import { DailyEventOperator } from "../backend/DB/daily-event"
import { WeeklyScheduleOperator } from "../backend/DB/weekly-schedule"
import { ipcMain } from "electron";
import { ipcName } from "./constant"


export var 
    musicOI: MusicOperatorInterface,
    memoOI: MemoOperatorInterface,
    eventOI: EventOperatorInterface,
    dailyEventOI: DailyEventOperatorInterface,
    weeklyScheduleOI: WeeklyScheduleOperatorInterface


export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.vpet',
    entities: [Memo, Event, DailyEvent, WeeklySchedule, MusicSetting],
    synchronize: true, 
});

export async function InitDataSource() {
    await AppDataSource.initialize();
    memoOI = new MemoOperator()
    eventOI = new EventOperator()
    dailyEventOI = new DailyEventOperator()
    weeklyScheduleOI = new WeeklyScheduleOperator()
    musicOI = await MusicOperator.new()
}

export function ICPMain() {

    ipcMain.handle(ipcName.Main.UIGIFPath, async (_event: Electron.IpcMainInvokeEvent) => {
        return path.join(__dirname, '../../img/example1.gif')
    })

    ipcMain.handle(ipcName.DailyEvent.Delete, async (_event: Electron.IpcMainInvokeEvent, id:number) => {
        return await dailyEventOI.Delete(id);
    })
    ipcMain.handle(ipcName.DailyEvent.InsertOne, async (_event: Electron.IpcMainInvokeEvent, title: string, content: string) => {
        return await dailyEventOI.InsertOne(title, content);
    })
    ipcMain.handle(ipcName.DailyEvent.SelectAll, async (_event: Electron.IpcMainInvokeEvent) => {
        return await dailyEventOI.SelectAll();
    })
    ipcMain.handle(ipcName.DailyEvent.Update, async (_event: Electron.IpcMainInvokeEvent, id: number, title: string, content: string) => {
        return await dailyEventOI.Update(id, title, content);
    })

    ipcMain.handle(ipcName.Event.Delete, async (_event: Electron.IpcMainInvokeEvent, id:number) => {
        return await eventOI.Delete(id);
    })
    ipcMain.handle(ipcName.Event.DeleteHistory, async (_event: Electron.IpcMainInvokeEvent) => {
        return await eventOI.DeleteHistory();
    })
    ipcMain.handle(ipcName.Event.InsertOne, async (_event: Electron.IpcMainInvokeEvent, title: string, content: string, startDate: Date, endDate: Date) => {
        return await eventOI.InsertOne(title, content, startDate, endDate);
    })
    ipcMain.handle(ipcName.Event.SelectAll, async (_event: Electron.IpcMainInvokeEvent) => {
        return await eventOI.SelectAll();
    })
    ipcMain.handle(ipcName.Event.SelectNow, async (_event: Electron.IpcMainInvokeEvent) => {
        return await eventOI.SelectNow();
    })
    ipcMain.handle(ipcName.Event.SelectThisWeek, async (_event: Electron.IpcMainInvokeEvent) => {
        return await eventOI.SelectThisWeek();
    })
    ipcMain.handle(ipcName.Event.Update, async (_event: Electron.IpcMainInvokeEvent, id: number, title: string, content: string, startDate: Date, endDate: Date) => {
        return await eventOI.Update(id,title,content,startDate,endDate);
    })

    ipcMain.handle(ipcName.Memo.Delete, async (_event: Electron.IpcMainInvokeEvent, id:number) => {
        return await memoOI.Delete(id);
    })
    ipcMain.handle(ipcName.Memo.InsertOne, async (_event: Electron.IpcMainInvokeEvent, title: string, subTitle:string, content: string) => {
        return await memoOI.InsertOne(title, subTitle, content);
    })
    ipcMain.handle(ipcName.Memo.SelectAll, async (_event: Electron.IpcMainInvokeEvent) => {
        return await memoOI.SelectAll();
    })
    ipcMain.handle(ipcName.Memo.SelectBySubtitle, async (_event: Electron.IpcMainInvokeEvent, title: string, subtitle: string) => {
        return await memoOI.SelectBySubtitle(title, subtitle)
    })
    ipcMain.handle(ipcName.Memo.SelectByTitle, async (_event: Electron.IpcMainInvokeEvent, title: string) => {
        return await memoOI.SelectByTitle(title)
    })
    ipcMain.handle(ipcName.Memo.Update, async (_event: Electron.IpcMainInvokeEvent, id: number, subtitle: string, content: string) => {   
        return await memoOI.Update(id,subtitle,content);
    })

    ipcMain.handle(ipcName.Music.GetRootDir, async (_event: Electron.IpcMainInvokeEvent) => {
        return await musicOI.GetRootFolder();
    })
    ipcMain.handle(ipcName.Music.SetRootDir, async (_event: Electron.IpcMainInvokeEvent, path: string) => {
        return await musicOI.SetRootFolder(path);
    })
    ipcMain.handle(ipcName.Music.SelectAll, async (_event: Electron.IpcMainInvokeEvent) => {
        return await musicOI.SelectAll();
    })
    ipcMain.handle(ipcName.Music.SelectByTitle, async (_event: Electron.IpcMainInvokeEvent, title: string) => {
        return await musicOI.SelectByTitle(title);
    })

    ipcMain.handle(ipcName.WeeklySchedule.Delete, async (_event: Electron.IpcMainInvokeEvent, id: number) => {
        return weeklyScheduleOI.Delete(id)
    })
    ipcMain.handle(ipcName.WeeklySchedule.DeleteByWeekday, async (_event: Electron.IpcMainInvokeEvent, dayOfWeek: WeekdayType) => {
        return weeklyScheduleOI.DeleteByWeekday(dayOfWeek);
    })
    ipcMain.handle(ipcName.WeeklySchedule.InsertOne, async (_event: Electron.IpcMainInvokeEvent, weeklyType: WeekdayType, activityType: ActivityType, startTime: string, endTime: string) => {
        return weeklyScheduleOI.InsertOne(weeklyType, activityType, startTime, endTime);
    })
    ipcMain.handle(ipcName.WeeklySchedule.SelectAll, async (_event: Electron.IpcMainInvokeEvent) => {
        return weeklyScheduleOI.SelectAll()
    })
    ipcMain.handle(ipcName.WeeklySchedule.SelectToday, async (_event: Electron.IpcMainInvokeEvent) => {
        return weeklyScheduleOI.SelectToday()
    })
    ipcMain.handle(ipcName.WeeklySchedule.Update, async (_event: Electron.IpcMainInvokeEvent, id: number, dayOfWeek: WeekdayType, activityType: ActivityType, startTime: string, endTime: string) => {
        return weeklyScheduleOI.Update(id, dayOfWeek, activityType, startTime, endTime)
    })
}





    