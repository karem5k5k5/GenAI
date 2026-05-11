"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ConflictException = exports.NotFoundException = exports.ForbiddenException = exports.UnAuthorizedException = exports.BadRequestException = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    errDetails;
    constructor(message, statusCode, errDetails) {
        super(message);
        this.statusCode = statusCode;
        this.errDetails = errDetails;
    }
}
exports.AppError = AppError;
class BadRequestException extends AppError {
    errDetails;
    constructor(message, errDetails) {
        super(message, 400);
        this.errDetails = errDetails;
    }
}
exports.BadRequestException = BadRequestException;
class UnAuthorizedException extends AppError {
    errDetails;
    constructor(message, errDetails) {
        super(message, 401);
        this.errDetails = errDetails;
    }
}
exports.UnAuthorizedException = UnAuthorizedException;
class ForbiddenException extends AppError {
    errDetails;
    constructor(message, errDetails) {
        super(message, 403);
        this.errDetails = errDetails;
    }
}
exports.ForbiddenException = ForbiddenException;
class NotFoundException extends AppError {
    errDetails;
    constructor(message, errDetails) {
        super(message, 404);
        this.errDetails = errDetails;
    }
}
exports.NotFoundException = NotFoundException;
class ConflictException extends AppError {
    errDetails;
    constructor(message, errDetails) {
        super(message, 409);
        this.errDetails = errDetails;
    }
}
exports.ConflictException = ConflictException;
class InternalServerError extends AppError {
    errDetails;
    constructor(message, errDetails) {
        super(message, 500);
        this.errDetails = errDetails;
    }
}
exports.InternalServerError = InternalServerError;
