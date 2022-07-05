import { Photo } from 'src/photo/entities';
import { Incidence } from '../entities/incidence.entity';

export const handlerIncidence = (incidence: Incidence) => {
  if (incidence.usuarioCreador) {
    delete incidence.usuarioCreador.passwordUsuario;
  }

  if (incidence.usuarioCreador) {
    delete incidence.usuarioCreador.passwordUsuario;
  }

  if (incidence.fotos) {
    incidence.fotos = handlerPhotosIncidence(incidence.fotos);
  }

  return incidence;
};

const handlerPhotosIncidence = (photos: Photo[]) => {
  const newPhotos = [];

  photos.forEach((x) => {
    delete x.usuario.passwordUsuario;
    newPhotos.push(x);
  });

  return newPhotos;
};
