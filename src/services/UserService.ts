import db from "../lib/db.js";
import bcrypt from "bcrypt";

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
    return "login";
  }

  async register({ id, password, name }: RegisterParams) {
    try {
      const user = await db.user.findUnique({
        where: {
          id,
        },
      });

      if (user) {
        throw new Error("");
      }

      const hash = await bcrypt.hash(password, this.saltRounds);

      return await db.user.create({
        data: {
          id,
          hash,
          name,
        },
      });
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
