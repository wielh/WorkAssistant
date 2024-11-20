export const SELECT_LIMIT = 30

export namespace ipcName {
  export enum Main {
    UIGIFPath = "Main_UIGIFPath"
  }

  export enum DailyEvent {
    InsertOne = "DailyEvent_InsertOne",
    Update = "DailyEvent_Update",
    Delete = "DailyEvent_Delete",
    SelectAll = "DailyEvent_SelectAll",
  }
  
  export enum Event {
    InsertOne = "Event_InsertOne",
    SelectAll = "Event_SelectAll",
    SelectNow = "Event_SelectNow",
    SelectThisWeek = "Event_SelectThisWeek",
    Update = "Event_Update",
    Delete = "Event_Delete",
    DeleteHistory = "Event_DeleteHistory",
  }

  export enum Memo {
    InsertOne = "Memo_InsertOne",
    Delete = "Memo_Delete",
    SelectAll = "Memo_SelectAll",
    SelectByTitle = "Memo_SelectByTitle",
    SelectBySubtitle = "Memo_SelectBySubtitle",
    Update = "Memo_Update"
  }

  export enum Music {
    SelectAll = "Music_SelectAll",
    SelectByTitle = "Music_SelectByTitle",
    GetRootDir = "Music_GetRootDir",
    SetRootDir = "Music_SetRootDir",
  }

  export enum WeeklySchedule {
    InsertOne = "WeeklySchedule_InsertOne",
    Update = "WeeklySchedule_Update",
    SelectAll = "WeeklySchedule_SelectAll",
    SelectToday = "WeeklySchedule_SelectToday",
    Delete = "WeeklySchedule_Delete",
    DeleteByWeekday = "WeeklySchedule_DeleteByWeekday",
  }
}

const offset =  new Date().getTimezoneOffset() * -1 / 60
export function UTCTimeToCurrentTime(time:Date): Date {
  let answer = new Date(time)
  answer.setHours(offset,0,0,0);
  return answer
}


