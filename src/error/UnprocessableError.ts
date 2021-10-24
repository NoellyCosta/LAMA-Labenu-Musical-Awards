import {BaseError} from "../error/BaseError"

export class UnprocessableError extends BaseError {
    constructor(message: string){
        super(message, 422)
    }
}