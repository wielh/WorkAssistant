
const TimeRegex = /^\d{2}:\d{2}$/
export function MatchTime(time:string): boolean {
    if(!TimeRegex.test(time)) {
        return false
    }

    const timeArray = time.split(":")
    const hour: number = parseInt(timeArray[0], 10)
    const minute: number = parseInt(timeArray[1], 10)
    return hour >= 0 && hour<24 && minute >= 0 && minute<60
}
