import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    
    
    private static TABLE_NAME = "Bands_list"

    public async createBand(band:Band): Promise<void>{
        try {
            await this.getConnection()
            .insert({
                id: band.getId(),
                name: band.getName(),
                music_genre: band.getMainGenre(),
                responsible: band.getResponsible()
            })
            .into(BandDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error. sqlMessage || error.message)
        }
    }
}