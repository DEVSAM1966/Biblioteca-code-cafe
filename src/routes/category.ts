import { Router } from 'express';
import { getCategoryById } from '../services/categoryService';

const router = Router();

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  const category = await getCategoryById(id);
  if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });

  res.json(category);
});

export default router;