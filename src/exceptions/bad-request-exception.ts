import { AppException } from "./app-exception";

export class BadRequestException extends AppException {
    constructor(entity: string){
        super(entity, 400);
    }
}