const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db'); // Configuração do pool do PG
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = userResult.rows[0];

    // SENHA EM TEXTO PURO (NÃO RECOMENDADO, só para teste)
    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Middleware de autenticação
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// READ - Lista todos os equipamentos
app.get('/api/equipamentos', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipments');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar equipamentos:', err);
    res.status(500).json({ message: 'Erro ao buscar equipamentos' });
  }
});

// CREATE - Adiciona novo equipamento
app.post('/api/equipamentos', verifyToken, async (req, res) => {
  const { name, total_stock, available } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO equipments (name, total_stock, available) VALUES ($1, $2, $3) RETURNING *',
      [name, total_stock, available]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar equipamento:', err);
    res.status(500).json({ message: 'Erro ao adicionar equipamento' });
  }
});

// UPDATE - Edita equipamento por ID
app.put('/api/equipamentos/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, total_stock, available } = req.body;

  try {
    const result = await pool.query(
      'UPDATE equipments SET name = $1, total_stock = $2, available = $3 WHERE id = $4 RETURNING *',
      [name, total_stock, available, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar equipamento:', err);
    res.status(500).json({ message: 'Erro ao atualizar equipamento' });
  }
});

// DELETE - Remove equipamento por ID
app.delete('/api/equipamentos/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM equipments WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }

    res.json({ message: 'Equipamento deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar equipamento:', err);
    res.status(500).json({ message: 'Erro ao deletar equipamento' });
  }
});

// ROTA PÚBLICA - lista nome e quantidade disponível (sem token)
app.get('/api/equipamentos-publicos', async (req, res) => {
  try {
    const result = await pool.query('SELECT name, available FROM equipments');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar equipamentos públicos:', err);
    res.status(500).json({ message: 'Erro ao buscar equipamentos públicos' });
  }
});


// Exibe segredo JWT no console (somente para debug, remova em produção)
console.log('JWT_SECRET:', process.env.JWT_SECRET);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
