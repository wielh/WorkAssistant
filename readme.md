## 專案介紹
   1. 簡介: 本程式為一個簡單的桌面精靈兼工作管家
   2. 用到的技術: electron, typescript, typeorm ,sqlite
   3. 功能:
      - 每日例行: 紀錄每天的例行工作
      - 行事曆: 可以設定事件的開始與結束，每天會顯示今天該辦的事
      - 備忘錄: 可以儲存一些易忘的事
      - 音樂: 選定一個資料夾，會播放資料夾裡面的音樂，支持.mp4 與 .wav
      - 每周作息: 記錄每天的上班與休息時間
   4. 如何使用(windows): 
      1. 執行 npm run build 編譯檔案
      2. 執行 dist/work-assistant Setup 1.0.0.exe 以完成安裝
      3. 桌面應該會有work-assistant的捷徑
   5. 如果想要在開機時自動運行本程式，可以用以下方法:
      1. 按下 Win + R 打开运行窗口。
      2. 输入 shell:startup 并按下 enter。
      3. 将想要开机启动的程序的快捷方式拖放到该文件夹中。

## 程式架構
   1. dist: 打包工具生成的安裝檔案
   2. src: source code
   3.  程式架構
      -  frontend: 渲染與定義窗口，每個視窗定義 preload.js ，preload事先定義了向主進程發送資源請求的樣式，其主體是 ipcRenderer.invoke。
      -  interface: 用來定義前端調用資料的介面，也定義了 ipcMain.on，用來監聽 ipcRenderer.invoke 發來的請求。
      -  backend: 主進程與實現介面定義的地方。

## Electron 介紹
   1.  簡介: Electron 是一個用於建立跨平台桌面應用程式的開源框架，由 GitHub 開發和維護。它基於 Node.js 和 Chromium，可以讓開發者使用 HTML、CSS 和 JavaScript 建立現代的桌面應用程式。
   2.  Electron 應用由兩個主要部分組成：
      - 主程序（Main Process）：負責管理應用的生命週期（啟動、退出）和系統互動。執行 Node.js 腳本，支援檔案系統存取、視窗管理等。
      - 渲染進程（Renderer Process）：類似瀏覽器的標籤頁，負責渲染使用者介面。每個視窗都有獨立的渲染進程，可以運行 Web 技術（HTML、CSS、JS）。
   3. Electron 提供了两个模块用于实现 IPC：
      - ipcMain：用于主进程接收来自渲染进程的消息。
      - ipcRenderer：用于渲染进程发送或接收消息。
      - 此外，Electron 提供了 contextBridge 用于安全地暴露 IPC 通信到渲染进程。
      
## 待改進的部分
   1. 功能:
      + 根據時段，播放不同的 GIF
      + 精靈新增對話框
   2. 前端:
      + 用 vue，react 或 angular 當作前端框架