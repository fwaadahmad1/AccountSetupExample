export type SignUpRequestType = {
  username: string;
  password: string;
  email: string;
  phone: string;
};

export type SignUpFieldsState = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  phone?: string;
};
