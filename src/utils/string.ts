export const replaceAll = (
  str: string,
  replaceTarget: string,
  replaceWith: string,
): string => {
  return str.replaceAll(replaceTarget, replaceWith);
};

export const replaceAllAndSplit = (
  str: string,
  replaceTarget: string,
  replaceWith: string,
  splitChar: string,
): string[] => {
  return replaceAll(str, replaceTarget, replaceWith).split(splitChar);
};

export const mergeAndReplaceAll = (
  strArray: (string | React.ReactNode)[],
  replaceTarget: string,
  replaceWith: string,
  joinChar: string,
): string => {
  return strArray.join(joinChar).replaceAll(replaceTarget, replaceWith);
};
