import { Incidence } from '../entities/incidence.entity';

export const handlerIncidence = (incidence: Incidence) => {
  if (incidence.usuarioCreador) {
    delete incidence.usuarioCreador.passwordUsuario;
  }

  return incidence;
};
