import { FastifyPluginAsync } from "fastify";
import UserService from "../../../services/UserService.js";

const auth: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance();

  fastify.post<{ Body: { id: string; password: string } }>(
    "/login",
    async (req) => {
      return userService.login(req.body);
    }
  );

  fastify.post<{ Body: { id: string; password: string; name: string } }>(
    "/register",
    async (req) => {
      return userService.register(req.body);
    }
  );
};

export default auth;
