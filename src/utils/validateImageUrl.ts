export const isValidImageUrl = (url: string): boolean => {
  return /\.(jpeg|jpg|gif|png|svg)$/i.test(url);
};
