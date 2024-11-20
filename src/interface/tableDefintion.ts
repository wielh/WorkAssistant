import { Entity, PrimaryGeneratedColumn, Column, Repository, Index } from 'typeorm';

@Entity()
export class DailyEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index() 
  title!: string;
  
  @Column()
  content!: string;
}

export interface DailyEventOperatorInterface {
  repo: Repository<DailyEvent>
  InsertOne(title:string, content:string):Promise<DailyEvent>
  Update(id:number, title:string, content:string):Promise<boolean>
  Delete(id:number):Promise<boolean>
  SelectAll():Promise<DailyEvent[]>
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index() 
  title!: string;
  
  @Column()
  content!: string;

  @Column({ type: 'date' })
  @Index() 
  startDate !: Date;

  @Column({ type: 'date' })
  @Index() 
  endDate !: Date;
}

export interface EventOperatorInterface {
  repo: Repository<Event>
  InsertOne(title:string, content:string, startDate:Date, endDate:Date):Promise<Event>
  SelectAll():Promise<Event[]> 
  SelectNow():Promise<Event[]> 
  SelectThisWeek():Promise<Event[][]> 
  Update(id:number, title:string, content:string, startDate:Date, endDate:Date):Promise<boolean>
  Delete(id:number) : Promise<boolean>
  DeleteHistory() : Promise<boolean>
}

@Entity()
@Index("IDX_title_subtitle", ["title", "subtitle"]) 
export class Memo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  subtitle!: string;

  @Column()
  content!: string;
}

export interface MemoOperatorInterface {
  repo: Repository<Memo>
  InsertOne(title:string, subtitle:string, content:string):Promise<Memo>
  Delete(id:number):Promise<boolean>
  Update(id:number, subtitle:string, content:string):Promise<boolean>
  SelectAll():Promise<Map<string, Memo[]>>
  SelectByTitle(title:string):Promise<Memo[]>
  SelectBySubtitle(title:string, subtitle:string):Promise<Memo[]>
}

export enum FileType {
  WAV = "wav",
  MP4 = "mp4",
}

export function getFileTypeRole(fileName: string): FileType| null {
  const parts = fileName.split('.');
  const suffix = parts.length > 1 ? parts[parts.length - 1] : "";
  if (Object.values(FileType).includes(suffix as FileType)) {
    return suffix as FileType;
  }
  return null;
}

export function isValidMusic(fileName: string): boolean {
  const parts = fileName.split('.');
  const suffix = parts.length > 1 ? parts[parts.length - 1] : "";
  return Object.values(FileType).includes(suffix as FileType);
}

export class Music {
  type!: string;
  name!: string;
  fullPath!: string;
  format !:FileType
}

@Entity()
export class MusicSetting {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  rootFolder!: string;
}

export interface MusicOperatorInterface {
  repo: Repository<MusicSetting>
  GetRootFolder(): Promise<string>
  SetRootFolder(path:string): Promise<boolean>
  SelectAll(): Promise<Map<string, Music[]>>
  SelectByTitle(title:string):Promise<Music[]>
}

export enum WeekdayType {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thusday = 4,
  Friday = 5,
  Saturday = 6,
  Weekday = 7,
  holiday = 8
}

export enum ActivityType {
  rest = 0,
  work = 1,
  break = 2,
}

@Entity()
export class WeeklySchedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column(
    {
      type: "int",
      enum: WeekdayType,
      default: WeekdayType.Monday
    }
  )
  @Index() 
  dayOfWeek !:  WeekdayType;
  
  @Column({ type: 'time' })
  @Index() 
  startTime!: string;

  @Column({ type: 'time' })
  @Index() 
  endTime!: string;

  @Column(
    {
      type: "int",
      enum: ActivityType,
      default: ActivityType.rest
    }
  )
  ActivityType !: ActivityType;
}

export interface WeeklyScheduleOperatorInterface {
  repo: Repository<WeeklySchedule>
  InsertOne(weeklyType: WeekdayType, activityType:ActivityType, startTime:string, endTime: string):Promise<WeeklySchedule|null>
  Update(id:number, dayOfWeek:WeekdayType, activityType:ActivityType, startTime:string, endTime: string):Promise<boolean>
  SelectAll():Promise<Map<WeekdayType, WeeklySchedule[]>>
  SelectToday():Promise<WeeklySchedule[]>
  Delete(id:number) : Promise<boolean>
  DeleteByWeekday(dayOfWeek:WeekdayType) : Promise<boolean>
}


