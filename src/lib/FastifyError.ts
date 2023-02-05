const error: Record<ErrorType, ErrorStructure> = {
  AuthenticError: {
    status: 401,
    message: "User not exists",
  },
  UnAuthorizedError: {
    status: 401,
    message: "UnAuthorized",
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
    this.status = 200;
  }
}

export default FastifyError;

type ErrorType = "UnknownError" | "AuthenticError" | "UnAuthorizedError";

type ErrorStructure = {
  status: number;
  message: string;
};
