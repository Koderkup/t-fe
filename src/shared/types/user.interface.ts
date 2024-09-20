export type User = {
  id: string;
  email: string;
  telegramId: string;
  password: string;
  firstname: string;
  lastname: string;
  role: "user";
  mediaId: string;
};

export type CreateUserDTO = {
  firstname: string;
  lastname: string;
  telegramId: string;
};
