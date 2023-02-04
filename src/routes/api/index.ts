import { FastifyPluginAsync } from "fastify";
import auth from "./auth/index.js";

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(auth, {prefix: "/auth"})
}

export default api