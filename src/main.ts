import Fastify from "fastify";
import FastifyError from "./lib/FastifyError.js";
import routes from "./routes/index.js";
const server = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

server.setErrorHandler((err, req, reply) => {
  console.error(err);
  if (err instanceof FastifyError) {
    const { status, message, name: error } = err;
    reply.statusCode = err.status;
    return {
      error,
      status,
      message,
    };
  }

  const { status, message, name: error } = new FastifyError("UnknownError");
  reply.statusCode = status;
  return {
    error,
    status,
    message,
  };
});

server.register(routes);

server.listen({ port: 4000 });
