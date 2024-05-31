import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  
  // Log the error if not in production
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.json({
    message: err.message,
    // Include the stack trace only if not in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

export default errorHandler;
