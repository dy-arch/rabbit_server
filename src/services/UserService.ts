import db from "../lib/db.js";
import bcrypt from "bcrypt";
import FastifyError from "../lib/FastifyError.js";

class UserService {
  private static instance: UserService;
  private saltRounds: number = 10;

  static getInstance() {
    if (UserService.instance) {
      return UserService.instance;
    }

    UserService.instance = new UserService();
    return UserService.instance;
  }

  async login({ id, password }: LoginParams) {
    try {
      const user = await db.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new FastifyError("AuthenticError");
      }

      await bcrypt.compare(password, user.hash);
      return {
        id: user.id,
        name: user.name,
        isAllowed: user.isAllowed,
      };
    } catch (err) {
      return err;
    }
  }

  async register({ id, password, name }: RegisterParams) {
    try {
      const exist = await db.user.findUnique({
        where: {
          id,
        },
      });

      if (exist) {
        throw new FastifyError("AlreadyExists");
      }

      const hash = await bcrypt.hash(password, this.saltRounds);
      const user = await db.user.create({
        data: {
          id,
          hash,
          name,
        },
      });

      return {
        id: user.id,
        name: user.name,
        isAllowed: user.isAllowed,
      };
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

export default UserService;

interface LoginParams {
  id: string;
  password: string;
}

interface RegisterParams {
  id: string;
  password: string;
  name: string;
}
