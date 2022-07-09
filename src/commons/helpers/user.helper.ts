import { User } from 'src/user/entities';

export const getUsersByType = (users: User[], id: number) => {
  return users.filter((x) => x.tipoUsuario.id === id);
};

export const getUsersByRoles = (users: User[], ids: number[]) => {
  return users.filter((x) => ids.includes(x.rol.id));
};
