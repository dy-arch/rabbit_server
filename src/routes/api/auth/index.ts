import { FastifyPluginAsync } from "fastify";

const auth: FastifyPluginAsync = async (fastify) => {
  fastify.post("/login", async () => {
    return "login";
  });

  fastify.post("/register", async (req) => {
    return "register";
  });
};

export default auth;
