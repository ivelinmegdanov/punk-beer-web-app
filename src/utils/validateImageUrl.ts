export const isValidImageUrl = (url: string): boolean => {
  const hasImageExtension = /\.(jpeg|jpg|gif|png|svg)$/i.test(url);

  return hasImageExtension;
};
