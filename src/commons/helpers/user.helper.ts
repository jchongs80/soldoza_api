import { User } from 'src/user/entities';

export const getUsersByType = (users: User[], id: number) => {
  return users.filter((x) => x.tipoUsuario.id === id);
};

export const getUsersByRole = (userS: User[], id: number) => {
  return userS.filter((x) => x.rol.id === id);
};
