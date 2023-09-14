import express, { Request, Response } from 'express';

export default async(req: Request, res: Response) => {
    res.send('Bonjour Root !')
};
