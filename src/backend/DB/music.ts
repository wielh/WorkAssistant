import { Music, MusicSetting ,isValidMusic,getFileTypeRole, MusicOperatorInterface } from  "../../interface/tableDefintion"
import * as fs from 'fs';
import * as path from 'path';

import { Repository } from "typeorm";
import { AppDataSource } from "../../interface/init"

export class MusicOperator implements MusicOperatorInterface {
    rootDir :string 
    repo: Repository<MusicSetting>

    constructor(rootDir: string) {
        this.repo = AppDataSource.getRepository(MusicSetting);
        this.rootDir = rootDir
    }

    static async new(): Promise<MusicOperator> {
       const rootDir = ''
       const answer = new MusicOperator(rootDir)
       await answer.GetRootFolder()
       return answer
    }
    
    public async SetRootFolder(p:string): Promise<boolean> {
        const fullPath = path.resolve(p); 
        if(!fs.statSync(fullPath).isDirectory()) {
            return false
        }

        const settings = await this.repo.find({});
        if (settings.length == 0) {
            await this.repo.insert({rootFolder: p})
            this.rootDir = p
            return true
        } else {
            const s = settings[0]
            const r = await this.repo.update(s.id, { rootFolder: fullPath })
            this.rootDir = p
            return (r.affected!=undefined && r.affected>0)
        }
    }

    public async GetRootFolder(): Promise<string> {
        if (this.rootDir !== '') {
            return this.rootDir
        }

        const settings = await this.repo.find({});
        if (settings.length > 0) {
           return settings[0].rootFolder
        } else {
            return path.join(process.cwd(), "music")
        }
    }

    public async SelectByTitle(title: string): Promise<Music[]> {
        this.rootDir = await this.GetRootFolder()
        return getMusicFromFolder(this.rootDir, title)
    }

    public async SelectAll(): Promise<Map<string, Music[]>> {
        this.rootDir = await this.GetRootFolder()
        let musicMap = new Map<string, Music[]>()
        const folders = fs.readdirSync(this.rootDir)
        folders.forEach((folder) => {
            const musics = getMusicFromFolder(this.rootDir, folder)
            if(musics.length > 0) {
                musicMap.set(folder, musics)
            }
        })
        return musicMap
    }

}

function getMusicFromFolder(rootDir:string, folder:string): Music[] {
    const fullPath = path.join(rootDir, folder)
    if (!fs.statSync(fullPath).isDirectory()) {
        return []
    }
    const files = fs.readdirSync(fullPath);
    const musics: Music[] = [];
    files.forEach((file:string) => {
        if (!isValidMusic(file)) {
            return
        }
        let m = new Music()
        m.name = file
        m.type = folder
        m.fullPath = path.join(fullPath, file)
        m.format = getFileTypeRole(file)!
        musics.push(m)
    })
    return musics
}