import Fastify from "fastify";
import routes from "./routes/index.js";
const server = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

server.register(routes);

server.listen({ port: 4000 });
