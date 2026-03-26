import path from "path";

export const getSafePath = (baseDir: string, requestedPath: string): string => {
  const safeBase = path.resolve(baseDir);
  const safePath = path.resolve(path.join(baseDir, requestedPath));

  if (!safePath.startsWith(safeBase)) {
    throw new Error("Invalid path access");
  }

  return safePath;
};
