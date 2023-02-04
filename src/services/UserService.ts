class UserService {
  private static instance: UserService;

  static getInstance() {
    if (UserService.instance) {
      return UserService.instance;
    }

    UserService.instance = new UserService();
    return UserService.instance;
  }

  async login({ id, password }: { id: string; password: string }) {
    return "login";
  }

  async register({
    id,
    password,
    name,
  }: {
    id: string;
    password: string;
    name: string;
  }) {
    return "register";
  }
}
