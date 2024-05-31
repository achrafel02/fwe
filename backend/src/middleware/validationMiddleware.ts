import { Request, Response, NextFunction } from 'express';
import { validationResult, checkSchema } from 'express-validator';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateSearchParams = (req: Request, res: Response, next: NextFunction) => {
  const { startDate, endDate } = req.query;

  if (startDate && isNaN(Date.parse(startDate as string))) {
    return res.status(400).json({ message: 'Invalid startDate format' });
  }

  if (endDate && isNaN(Date.parse(endDate as string))) {
    return res.status(400).json({ message: 'Invalid endDate format' });
  }

  next();
};

// Additional validation schemas
export const travelValidationSchema = checkSchema({
  name: {
    in: ['body'],
    exists: {
      errorMessage: 'Name is required'
    },
    isString: {
      errorMessage: 'Name must be a string'
    }
  },
  description: {
    in: ['body'],
    exists: {
      errorMessage: 'Description is required'
    },
    isString: {
      errorMessage: 'Description must be a string'
    }
  },
  startDate: {
    in: ['body'],
    exists: {
      errorMessage: 'Start date is required'
    },
    isDate: {
      errorMessage: 'Start date must be a valid date'
    }
  },
  endDate: {
    in: ['body'],
    exists: {
      errorMessage: 'End date is required'
    },
    isDate: {
      errorMessage: 'End date must be a valid date'
    }
  },
  participants: {
    in: ['body'],
    exists: {
      errorMessage: 'Participants are required'
    },
    isArray: {
      errorMessage: 'Participants must be an array of strings'
    }
  },
  image: {
    in: ['body'],
    exists: {
      errorMessage: 'Image is required'
    },
    isString: {
      errorMessage: 'Image must be a string'
    }
  }
});

export default validateRequest;
