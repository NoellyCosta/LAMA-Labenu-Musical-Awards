import { UserDatabase } from "../../src/data/UserDatabase";


export class UserDataBaseMock extends UserDatabase {
    public createUser:(id: string,
        email: string,
        name: string,
        password: string,
        role: string)=>Promise<void> = jest.fn()

}
