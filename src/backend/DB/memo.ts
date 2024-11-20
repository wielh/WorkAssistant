import { Memo, MemoOperatorInterface } from "../../interface/tableDefintion"
import { AppDataSource } from "../../interface/init"
import { Repository } from "typeorm";

export class MemoOperator implements MemoOperatorInterface{
    repo: Repository<Memo>
    constructor() {
        this.repo = AppDataSource.getRepository(Memo);
    }

    public async Update(id: number, subtitle: string, content: string): Promise<boolean> {
        var r = await this.repo.update(id, { subtitle:subtitle, content:content})
        return r.affected!=undefined && r.affected>0
    }

    public async InsertOne(title:string, subtitle:string, content:string):Promise<Memo> {
        let memo = new Memo();
        memo.title = title
        memo.subtitle = subtitle
        memo.content = content
        return await this.repo.save(memo)
    }

    public async Delete(id:number) : Promise<boolean>{
        const result = await this.repo.delete({id: id})
        return result.affected != undefined && result.affected > 0
    } 

    public async SelectByTitle(title:string):Promise<Memo[]> {
        return  await this.repo.find({ where:{title:title}, order:{title:"ASC", subtitle:"ASC"}});
    }

    public async SelectBySubtitle(title:string, subtitle:string):Promise<Memo[]> {
        return await this.repo.find({ where:{title:title, subtitle:subtitle}, order:{title:"ASC", subtitle:"ASC"}});
    }

    public async SelectAll(): Promise<Map<string, Memo[]>> {
        const memos = await this.repo.find({ order:{title:"ASC", subtitle:"ASC"}} );
        const answer: Map<string, Memo[]> = new Map()
        for(let memo of memos) {
            if (!answer.has(memo.title)) {
                answer.set(memo.title, [])
            } 
            answer.get(memo.title)!.push(memo)
        }
        return answer
    }
}
