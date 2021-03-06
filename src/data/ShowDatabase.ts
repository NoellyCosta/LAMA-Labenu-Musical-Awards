import { NotFoundError } from "../error/NotFoundError";
import { Show, ShowOutputDTO, WeekDay } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {


    public async createShow(show: Show): Promise<void> {
        await this.getConnection()
            .insert({
                id: show.getId(),
                band_id: show.getBandId(),
                start_time: show.getStartTime(),
                end_time: show.getEndTime(),
                week_day: show.getWeekDay()
            })
            .into(this.tableNames.shows)

    }

    public async getShowsByTimes(
        weekDay: WeekDay,
        startTime: number,
        endTime: number
    ): Promise<ShowOutputDTO[]> {
        const shows = await this.getConnection()
            .select("*")
            .where("end_time", ">", `${startTime}`)
            .andWhere("start_time", "<", `${endTime}`)
            .from(this.tableNames.shows)



        return shows.map((show: any) => {
            return {
                id: show.id,
                bandId: show.bandId,
                startTime: show.startTime,
                endTime: show.endTime,
                weekDay: show.weekDay

            }
        })
    }

    public async getShowsByWeekDayOrFail(weekDay: WeekDay): Promise<ShowOutputDTO[]> {
        const shows = await this.getConnection().raw(`
        SELECT s.id as id,
        s.id as bandId,
        s.start_time as startTime,
        s.end_time as endTime,
        s.week_day as weekDay,
        b.music_genre as mainGenre
        FROM ${this.tableNames.shows} s
        LEFT JOIN ${this.tableNames.bands} b ON b.id = s.band_id
        ORDER BY startTIME ASC 


`)

        if (!shows.length) {
            throw new NotFoundError(`Unable to shows found at ${weekDay}`)
        }

        return shows[0].map((data: any) => ({
            id: data.id,
            bandId: data.bandId,
            startTime: data.startTime,
            endTime: data.endTime

        }))
    }

}