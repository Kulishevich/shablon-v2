export const extractScriptContent = (scriptString: string) => {
  const match = scriptString.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  return match ? match[1] : '';
};
