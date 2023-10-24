import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{

  res.send(`
  <div style="display:flex; flex-direction:column; gap:10px;">

    <a href="${req.baseUrl}/products"> productos</a>
    <a href="${req.baseUrl}/categories"> categorias</a>
    <a href="${req.baseUrl}/users"> usuarios</a>

  </div>
  `);

});

export default router;
