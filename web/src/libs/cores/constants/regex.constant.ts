// export const EMAIL_REG_EXP = new RegExp(
//   '^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$'
// );
export const EMAIL_REG_EXP = new RegExp(
  '^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,10}$'
);
export const PASSWORD_REG_EXP = new RegExp(
  '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.)(?!.* ).{8,16}'
);
export const USER_REG_EXP = new RegExp('^[a-zA-Z0-9-]{6,}$');
