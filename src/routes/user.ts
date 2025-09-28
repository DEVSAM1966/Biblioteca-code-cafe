import { Router } from 'express';
import { getUserByName } from '../services/userService';

const router = Router();

router.get('/:name', async (req, res) => {
  const name = req.params.name;
  if (!name) return res.status(400).json({ error: 'Nombre requerido' });

  const user = await getUserByName(name);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  res.json(user);
});

export default router;