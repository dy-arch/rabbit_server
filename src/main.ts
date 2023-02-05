import Fastify from "fastify";
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
  return err;
});

server.register(routes);

server.listen({ port: 4000 });
