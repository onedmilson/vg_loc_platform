-- Usuários (admin)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL, -- hash
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Equipamentos
CREATE TABLE equipments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  total_stock INT NOT NULL,
  available INT NOT NULL
);

-- Alugueis (pedidos confirmados manualmente)
CREATE TABLE rentals (
  id SERIAL PRIMARY KEY,
  equipment_id INT REFERENCES equipments(id),
  quantity INT NOT NULL,
  client_name VARCHAR(100),
  contact VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pendente', -- pendente | confirmado | devolvido
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
