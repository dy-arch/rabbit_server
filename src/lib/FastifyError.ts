const error: Record<ErrorType, ErrorStructure> = {
  AuthenticError: {
    status: 401,
    message: "User not exists",
  },
  UnAuthorizedError: {
    status: 401,
    message: "UnAuthorized",
  },
  AlreadyExists: {
    status: 409,
    message: "Already Exists",
  },
  UnknownError: {
    status: 500,
    message: "Unknown Error",
  },
};

class FastifyError extends Error {
  status: number;
  constructor(name: ErrorType) {
    super(error[name].message);
    this.name = name;
    this.status = error[name].status;
  }
}

export default FastifyError;

type ErrorType =
  | "UnknownError"
  | "AuthenticError"
  | "UnAuthorizedError"
  | "AlreadyExists";

type ErrorStructure = {
  status: number;
  message: string;
};
