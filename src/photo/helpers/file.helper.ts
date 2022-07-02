import * as path from 'path';

export const updateFilename = (fileName: string, incidenceId: string) => {
  const newName = path.parse(fileName).name + '_' + incidenceId;
  return newName + path.parse(fileName).ext;
};
