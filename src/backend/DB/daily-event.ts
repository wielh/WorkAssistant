import { DailyEvent, DailyEventOperatorInterface } from "../../interface/tableDefintion"
import { AppDataSource } from "../../interface/init"
import { Repository } from "typeorm";

export class DailyEventOperator implements DailyEventOperatorInterface{
    repo: Repository<DailyEvent>
    constructor() {
        this.repo = AppDataSource.getRepository(DailyEvent);
    }

    public async InsertOne(title:string, content:string):Promise<DailyEvent> {
        let dailyEvent = new DailyEvent();
        dailyEvent.title = title
        dailyEvent.content = content
        return await this.repo.save(dailyEvent)
    }

    public async Update(id:number, title:string,  content:string):Promise<boolean> {
        const r = await this.repo.update(id, { title:title, content:content })
        return (r.affected!=undefined && r.affected>0)
    }

    public async Delete(id:number) : Promise<boolean>{
        const r = await this.repo.delete({id: id})
        return (r.affected!=undefined && r.affected>0)
    }

    public async SelectAll():Promise<DailyEvent[]> {
        const dailyEvent: DailyEvent[] = await this.repo.find({});
        return dailyEvent
    }
}
