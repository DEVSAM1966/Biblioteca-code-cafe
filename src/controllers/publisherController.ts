import { Request, Response, NextFunction } from 'express';
import { getPublisherById } from '../services/publisherService';

export async function getPublisher(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const publisher = await getPublisherById(id);
    if (!publisher) {
      return res.status(404).json({ error: `Publisher with id ${id} doesn't exist` });
    }

    return res.status(200).json(publisher);
  } catch (error) {
    next(error);
  }
}