/**
 * This is just a workaround for not being able to explicitly reference the
 * global scope.
 */
declare class GlobalError extends Error {}

declare module 'node-common-errors' {
    export function log(err: Error, message?: string): Error
    export function logError(err: Error, cb: Function): void
    export function prependCurrentStack(err: Error): Error

    namespace helpers {
        export function generateClass(name: string, options?: {extends: Error, globalize: boolean, args: string[], generateMessage: () => string}): Function
    }

    namespace middleware {
        export function crashProtector(errorHandler: (err: Error, req: Express.Request, res: Express.Response) => void): void
        export function errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Function): void
    }

    export class Error extends GlobalError {
        constructor(entityName: string, inner_error?: Error)
    }

    /**
     * Applicable when a resource is already in use, for example unique key
     * constraints like a username.
     *
     * @example throw new errors.AlreadyInUseError('user', 'username')
     */
    export class AlreadyInUseError extends Error {
        /*
         * @param entityName the entity that owns the protected resource
         * @param args       the fields or attributes that are already in use
         */
        constructor(entityName: string, ...args: string[])
    }

    /**
     * Applicable when there's a generic problem with an argument received by a
     * function call.
     *
     * @example throw new errors.ArgumentError('username', err)
     */
    export class ArgumentError extends Error {
        /*
         * @param argumentName the name of the argument that has a problem
         * @param inner_error  the Error instance that caused the current error.
         *                     Stack trace will be appended.
         */
        constructor (argumentName: string, inner_error?: Error)
    }

    export class ArgumentNullError extends Error {
        constructor(argumentName: string, inner_error?: Error)
    }

    export class AuthenticationRequiredError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class ConnectionError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class HttpStatusError extends Error {
        constructor(status_code: number, message?: string)
        constructor(err: Error, req?: Express.Request)
    }

    export class InvalidOperationError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class SocketError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class NotFoundError extends Error {
        constructor(entity_name: string, inner_error?: Error)
    }

    export class NotImplementedError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class NotPermittedError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class NotSupportedError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class OutOfMemoryError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class RangeError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class ReferenceError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class StackOverflowError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class SyntaxError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class TimeoutError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class TypeError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class URIError extends Error {
        constructor(message: string, inner_error?: Error)
    }

    export class ValidationError extends Error {
        constructor(message: string, code?: string, field?: string)
        addError(error: Error): this
        addErrors(errors: Error[]): this
    }

    namespace data {
        export class DataError extends Error {
            constructor(message: string, inner_error?: Error)
        }

        export class MemcachedError extends DataError {
            constructor(message: string, inner_error?: Error)
        }

        export class MongoDBError extends DataError {
            constructor(message: string, inner_error?: Error)
        }

        export class RedisError extends DataError {
            constructor(message: string, inner_error?: Error)
        }

        export class RollbackError extends DataError {
            constructor(message: string, inner_error?: Error)
        }

        export class SQLError extends DataError {
            constructor(message: string, inner_error?: Error)
        }

        export class TransactionError extends DataError {
            constructor(message: string, inner_error?: Error)
        }
    }

    namespace io {
        export class IOError extends Error {
            constructor(message: string, inner_error?: Error)
        }

        export class DirectoryNotFoundError extends IOError {
            constructor(message: string, inner_error?: Error)
        }

        export class DriveNotFoundError extends IOError {
            constructor(message: string, inner_error?: Error)
        }

        export class EndOfStreamError extends IOError {
            constructor(message: string, inner_error?: Error)
        }

        export class FileLoadError extends IOError {
            constructor(file_name: string, inner_error?: Error)
        }

        export class FileNotFoundError extends IOError {
            constructor(file_name: string, inner_error?: Error)
        }
    }
}
