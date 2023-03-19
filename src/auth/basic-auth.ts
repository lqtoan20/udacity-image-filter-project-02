import basicAuth from "basic-auth";
import { Request, Response, NextFunction } from "express";

export const UNAUTHORIZED = 401;
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Idea here to create a middleware to check all request
  // const credentials = basicAuth(req);
  //   if (!credentials) {
  //     res.set("WWW-Authenticate", 'Basic realm="Restricted Access"');
  //     res.status(UNAUTHORIZED).send("Unauthorized");
  //     return;
  //   }
  next();
}
