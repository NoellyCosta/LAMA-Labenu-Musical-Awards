import { UserBusiness } from "../src/business/UserBusiness"
import { UserInputDTO } from "../src/model/User"
import { AuthenticatorMock} from "./mocks/services/AuthenticatorMock"
import EmailValidationMock from "./mocks/EmailValidationMock"
import { HashManager } from "./mocks/services/HashManager"
import { IdGeneratorMock } from "./mocks/services/IdGenerator"
import { UserDataBaseMock } from "./mocks/userDataMock"


describe("Cadastro", () => {


    test("Sucesso ao criar usuario", async () => {

        expect.assertions(1)

        const userDataMock = new UserDataBaseMock()
        const hashManager = new HashManager()
        const authenticator = new AuthenticatorMock()
        const idGenerator = new IdGeneratorMock()
        const emailValidation = new EmailValidationMock()
        const userBusiness = new UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation)

        try {

            const result: any = await userBusiness.createUser({
                name: "Noelly",
                email: "noellycosta@gmail.com",
                password: "5657564",
                role: "ADMIN"
            })

            expect(result).toBeDefined()

        } catch (error) {
            console.error(error)
        }

    })


    test("Return error when email is empty", async () => {

        expect.assertions(1)

        const userDataMock = new UserDataBaseMock()
        const hashManager = new HashManager()
        const authenticator = new AuthenticatorMock()
        const idGenerator = new IdGeneratorMock()
        const emailValidation = new EmailValidationMock()

        try {
            const userBusiness = new UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation)
            await userBusiness.createUser({
                name: "Noelly",
                email: "",
                password: "657483",
                role: "ADMIN"
            })

        } catch (error) {
            expect(error.message).toEqual("Empty 'Email'")
        }
    })


    test("Return error when email is not valid ", async () => {

        expect.assertions(1)

        const userDataMock = new UserDataBaseMock()
        const hashManager = new HashManager()
        const authenticator = new AuthenticatorMock()
        const idGenerator = new IdGeneratorMock()
        const emailValidation = new EmailValidationMock()
        const userBusiness = new UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation)

        try {

            const result: any = await userBusiness.createUser({
                name: "Noelly",
                email: "noelly@sss",
                password: "6545352",
                role: "ADMIN"
            })

        } catch (error) {
            expect(error.message).toEqual("Invalid 'Email'")
        }

    })


    test("Return error when 'role' is diferent as 'ADMIN' or 'NORMAL'", async () => {

        expect.assertions(1)

        const userDataMock = new UserDataBaseMock()
        const hashManager = new HashManager()
        const authenticator = new AuthenticatorMock()
        const idGenerator = new IdGeneratorMock()
        const emailValidation = new EmailValidationMock()
        const userBusiness = new UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation)

        try {

            const result: any = await userBusiness.createUser({
                name: "Noelly",
                email: "noellycosta@gmail.com",
                password: "656373",
                role: "AAAA"
            } as UserInputDTO)

        } catch (error) {
            expect(error.message).toEqual("'Role' must be 'admin' or 'normal'")
        }

    })

    test("Return error when 'password' as empty", async () => {

        expect.assertions(2)

        const userDataMock = new UserDataBaseMock()
        const hashManager = new HashManager()
        const authenticator = new AuthenticatorMock()
        const idGenerator = new IdGeneratorMock()
        const emailValidation = new EmailValidationMock()
        const userBusiness = new UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation)

        try {

            const result: any = await userBusiness.createUser({
                name: "Noelly",
                email: "noelly@gmail.com",
                role: "ADMIN"
            } as UserInputDTO)

        } catch (error) {
            expect(error.message).toEqual("Empty 'Password'")
        }

        try {

            const result: any = await userBusiness.createUser({
                name: "Noelly",
                email: "noellycosta@gmail.com",
                password: "",
                role: "ADMIN"
            } as UserInputDTO)

        } catch (error) {
            expect(error.message).toEqual("Empty 'Password'")
        }

    })

})
