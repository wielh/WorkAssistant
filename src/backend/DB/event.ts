import { Event,EventOperatorInterface } from  "../../interface/tableDefintion"
import { AppDataSource } from "../../interface/init"
import { UTCTimeToCurrentTime } from  "../../interface/constant"
import { Repository, LessThanOrEqual, MoreThanOrEqual } from "typeorm";


export class EventOperator implements EventOperatorInterface {
    repo: Repository<Event>
    constructor() {
        this.repo = AppDataSource.getRepository(Event);
    }

    public async InsertOne(title:string, content:string, startDate:Date, endDate:Date):Promise<Event> {
        let event = new Event();
        event.title = title

        startDate.setHours(0,0,0,0);
        event.startDate = startDate
        const nextDate = new Date(startDate)
        nextDate.setDate(nextDate.getDate() + 1); // 在新日期上加一天
        endDate.setHours(0,0,0,0);
        event.endDate = new Date(Math.max(endDate.getTime(), nextDate.getTime()))

        event.content = content
        return await this.repo.save(event)
    }

    public async SelectAll(): Promise<Event[]> {
        return await this.repo.find({
            order:{ endDate: 'DESC'}
        })
    }

    async SelectSpecificDay(time:Date):Promise<Event[]> {
        let currentTime = UTCTimeToCurrentTime(time)
        return await this.repo.find({
            where:[
                {
                    startDate: LessThanOrEqual(currentTime),
                    endDate: MoreThanOrEqual(currentTime)
                }
            ], order: {
                endDate: 'DESC'
            }
        });
    }
    
    public async SelectNow():Promise<Event[]> {
        return this.SelectSpecificDay(new Date())
    }

    public async SelectThisWeek():Promise<Event[][]> {
        let answer: Event[][] = []
        let today = new Date()
        for (let i = 0; i < 7; i++) {
            const time = today
            time.setDate(time.getDate() + i)
            answer.push(await this.SelectSpecificDay(time))
        }
        return answer
    }

    public async Update(id:number, title:string, content:string, startDate:Date, endDate:Date):Promise<boolean> {
        var r = await this.repo.update(id, { title:title, content:content, startDate:startDate, endDate:endDate })
        return r.affected!=undefined && r.affected>0
    }

    public async Delete(id:number) : Promise<boolean>{
        const result = await this.repo.delete({id: id})
        return result.affected != undefined && result.affected>0
    }

    public async DeleteHistory(): Promise<boolean> {
        let oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const result = await this.repo.createQueryBuilder().delete().from(Event).where("endDate < :date", { date: oneMonthAgo }).execute()
        return result.affected != undefined && result.affected>0
    }
}
