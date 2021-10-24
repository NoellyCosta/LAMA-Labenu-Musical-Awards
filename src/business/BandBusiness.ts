import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { Band, BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { InvalidInputError } from "../error/InvalidInputError";
import { BandDatabase } from "../data/BandDatabase";


export class BandBusiness {
    constructor(
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async registerBand(input: BandInputDTO, token: string) {
        const tokenData = this.authenticator.getData(token)

        if (tokenData.role !== UserRole.ADMIN) {
            throw new UnauthorizedError("Only admin can acess this feature ")
        }

        if (!input.name || !input.mainGenre || !input.responsible) {
            throw new InvalidInputError("Invalid input")
        }

        await this.bandDatabase.createBand(
            Band.toBand({
                ...input,
                id: this.idGenerator.generate()
            })
        )
    }


    async getBandDetailByIdOrName(input: string): Promise<Band> {
        if (!input) {
            throw new InvalidInputError("Invalid input to getBandDetails")
        }

        return this.bandDatabase.getBandByIdOrNameOrFail(input)


    }



}