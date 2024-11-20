import { ipcMain } from 'electron'
import { createDailyEventWindow } from './dailyEventWindow/dailyEvent'
import { win as mainWindow, createEventWindow, createInputWindow } from './eventWindow/event'
import { createMemoWindow } from './memoWindow/memo'
import { createControlWindow } from './musicWindow/music'
import { createScheduleWindow } from './weeklyScheduleWindow/schedule'

export enum ipcWindow {
    dailyEventWindow = "dailyEventWindow",
    eventWindow = "eventWindow",
    eventInputWindow = "eventInputWindow",
    eventWindowReload = "eventWindowReload",
    memoWindow = "memoWindow",
    musicWindow = "musicWindow",
    scheduleWindow = "scheduleWindow"
}
   
export function frondendInit(){
    ipcMain.on(ipcWindow.dailyEventWindow, () => {
        createDailyEventWindow();
    });

    ipcMain.on(ipcWindow.eventWindow, () => {
        createEventWindow();
    });

    ipcMain.on(ipcWindow.eventInputWindow, () => {
        createInputWindow();
    });

    ipcMain.on(ipcWindow.eventWindowReload, () => {
        if (mainWindow) {
            mainWindow.close();
            createEventWindow();
        }
    });

    ipcMain.on(ipcWindow.memoWindow, () => {
        createMemoWindow();
    });

    ipcMain.on(ipcWindow.musicWindow, () => {
        createControlWindow();
    });

    ipcMain.on(ipcWindow.scheduleWindow, () => {
        createScheduleWindow();
    });
}

