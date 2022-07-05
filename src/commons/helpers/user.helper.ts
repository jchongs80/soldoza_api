import { User } from 'src/user/entities';

export const getUsersByType = (users: User[], type: string) => {
  return users.filter((x) => x.tipoUsuario.descripcionTipo === type);
};

export const getUsersByRole = (userS: User[], role: string) => {
  return userS.filter((x) => x.rol.descripcionRol === role);
};
