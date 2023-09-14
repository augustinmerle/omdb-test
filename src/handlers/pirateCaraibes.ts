import {NextFunction, Request, Response} from 'express';

export default async(req: Request, res: Response, next: NextFunction ) => {
    req.body.search = 'pirates of the caribbean';
    req.body.format = "gsheet";
    next();
};


