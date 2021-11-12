import { BandDatabase } from "../../src/data/BandDatabase"
import { Band } from "../../src/model/Band";

export class BandDatabaseMock extends BandDatabase{
    public registerBand:(band:Band)=>Promise<void> = jest.fn()


}