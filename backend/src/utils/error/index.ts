export class AppError extends Error {
    constructor(message: string, public statusCode: number, public errDetails?: Object[]) {
        super(message)
    }
}

export class BadRequestException extends AppError {
    constructor(message: string, public errDetails?: Object[]) {
        super(message, 400)
    }
}

export class UnAuthorizedException extends AppError {
    constructor(message: string, public errDetails?: Object[]) {
        super(message, 401)
    }
}

export class ForbiddenException extends AppError {
    constructor(message: string, public errDetails?: Object[]) {
        super(message, 403)
    }
}

export class NotFoundException extends AppError {
    constructor(message: string, public errDetails?: Object[]) {
        super(message, 404)
    }
}

export class ConflictException extends AppError {
    constructor(message: string, public errDetails?: Object[]) {
        super(message, 409)
    }
}

export class InternalServerError extends AppError {
    constructor(message: string, public errDetails?: Object[]) {
        super(message, 500)
    }
}

