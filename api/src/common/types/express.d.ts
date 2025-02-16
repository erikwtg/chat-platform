import { User } from "../../config/database/schema";

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
} 