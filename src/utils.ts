export const unique = (arr: string[]): string[] => Array.from(new Set(arr));

export const validateUrl = (url: string): string => {
  try {
    new URL(url);
    return url;
     // eslint-disable-next-line 
  } catch (_) {
    throw new Error('Invalid url')
  }
}

export const getMaxTen = (arr: string[]): string[] => arr.sort((a, b) => b.length - a.length).slice(0, 10);