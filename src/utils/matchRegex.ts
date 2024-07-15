export const matchRegex = (file: string) => {
  return file.match(/^(?!_)(?!.*(?:\.spec|\.test))(.*\.(ts|js))$/);
};
