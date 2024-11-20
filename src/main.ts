import { app } from 'electron'
import { createMainWindow } from './frontend/mainWindow/main'
import { frondendInit } from './frontend/init'

import { InitDataSource, ICPMain } from '../src/interface/init'

app.on('ready', 
    async () => {
        try {
            await InitDataSource()
            createMainWindow();
            frondendInit();
            ICPMain();
        } catch (error) {
            console.error('Failed to initialize database:', error);
            app.quit();
        }
    }
)
