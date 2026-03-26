import { Router, Request, Response, NextFunction } from "express";
import mime from "mime-types";
import fs from "fs";

import { getSafePath } from "../utils/pathUtils.js";

const router = Router();

// ✅ Use REGEX instead of "*"
router.get(/.*/, (req: Request, res: Response, next: NextFunction) => {
  try {
    const baseDir = process.env.BASE_DIR || "src/public";

    const requestedPath = req.path === "/" ? "index.html" : req.path.slice(1);

    const filePath = getSafePath(baseDir, requestedPath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    if (fs.statSync(filePath).isDirectory()) {
      return res.status(403).json({ message: "Directory access forbidden" });
    }

    const contentType = mime.lookup(filePath) || "application/octet-stream";
    res.setHeader("Content-Type", contentType);

    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    next(err);
  }
});

export default router;
