import { BadRequestException } from "./bad-request-exception";

export class MissingParamException extends BadRequestException{
    constructor(parameter: string){
        super(`Missing param ${parameter}`);
    }
}