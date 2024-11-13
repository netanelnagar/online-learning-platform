class ErrorModel{
    constructor(public message:string,public code:number){};
}


export class ValidationError extends ErrorModel{
    constructor(public message:string){
        super(message, 400);
    };
};

export class SourceNotFoundError extends ErrorModel{
    constructor(public message:string){
        super(message, 404);
    };
};

export class AuthorizationError extends ErrorModel{
    constructor(public message:string){
        super(message, 401);
    };
};