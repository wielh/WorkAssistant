import { WeekdayType, ActivityType, WeeklySchedule, WeeklyScheduleOperatorInterface } from "../../interface/tableDefintion"
import { AppDataSource } from "../../interface/init"
import { Repository } from "typeorm";
import { MatchTime } from "../common"


export class WeeklyScheduleOperator implements WeeklyScheduleOperatorInterface {
    
    repo: Repository<WeeklySchedule>
    constructor() {
        this.repo = AppDataSource.getRepository(WeeklySchedule);
    }

    public async InsertOne(weeklyType: WeekdayType, activityType:ActivityType, startTime:string, endTime: string): Promise<WeeklySchedule|null> {
        if(!MatchTime(startTime)) {
            return null
        } 

        if (!MatchTime(endTime)) {
            return null
        }

        let weeklySchedule = new WeeklySchedule();
        weeklySchedule.ActivityType = activityType
        weeklySchedule.dayOfWeek = weeklyType 
        weeklySchedule.startTime = startTime
        weeklySchedule.endTime = endTime
        return await this.repo.save(weeklySchedule)
    }

    public async Update(id:number, dayOfWeek:WeekdayType, activityType:ActivityType, startTime:string, endTime: string):Promise<boolean> {
        if(!MatchTime(startTime)) {
            return false
        } 

        if (!MatchTime(endTime)) {
            return false
        }

        let r = await this.repo.update(id, { ActivityType:activityType, dayOfWeek:dayOfWeek, startTime:startTime, endTime:endTime })
        return r.affected != undefined && r.affected > 0
    }

    public async SelectToday():Promise<WeeklySchedule[]> {
        const dayNum = new Date().getDay()
        let result = await this.repo.find({where:{dayOfWeek:dayNum}})
        if (result) {
            return result
        }

        if (dayNum == WeekdayType.Sunday || dayNum == WeekdayType.Saturday) {
            return await this.repo.find({where:{dayOfWeek:WeekdayType.holiday}})
        } else {
            return await this.repo.find({where:{dayOfWeek:WeekdayType.Weekday}})
        }
    }

    public async Delete(id:number) : Promise<boolean>{
        const result = await this.repo.delete({id: id})
        return result.affected != undefined && result.affected > 0
    }

    public async DeleteByWeekday(dayOfWeek:WeekdayType) : Promise<boolean>{
        const result = await this.repo.delete({dayOfWeek:dayOfWeek})
        return result.affected != undefined && result.affected > 0
    }

    public async SelectAll(): Promise<Map<WeekdayType, WeeklySchedule[]>> {
        const answer = new Map()
        for (const weekdayEnum of Object.keys(WeekdayType)) {
            answer.set(weekdayEnum, [])
        }

        const DBanswer = await this.repo.find({order:{dayOfWeek:'ASC', startTime: 'ASC'}})
        for (let schedule of DBanswer) {
            answer.get(schedule.dayOfWeek).push(schedule)
        }
        return answer
    }
}
