import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', total_stock: '', available: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipamentos();
  }, []);

  const fetchEquipamentos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Usuário não autenticado');

      const res = await fetch('http://localhost:8000/api/equipamentos', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao buscar equipamentos');

      setEquipamentos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const openFormCreate = () => {
    setFormData({ id: null, name: '', total_stock: '', available: '' });
    setShowForm(true);
  };

  const openFormEdit = (eq) => {
    setFormData(eq);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este equipamento?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8000/api/equipamentos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Erro ao excluir equipamento');
      fetchEquipamentos();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id
      ? `http://localhost:8000/api/equipamentos/${formData.id}`
      : 'http://localhost:8000/api/equipamentos';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          total_stock: Number(formData.total_stock),
          available: Number(formData.available),
        }),
      });

      if (!res.ok) throw new Error('Erro ao salvar equipamento');

      setShowForm(false);
      fetchEquipamentos();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Painel de Equipamentos</h2>
        <div>
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
          <button className="create-button" onClick={openFormCreate}>
            + Criar equipamento
          </button>
        </div>
      </header>

      {error && <p className="error-msg">{error}</p>}

      <ul className="equipamentos-list">
        {equipamentos.map((eq) => (
          <li key={eq.id} className="equipamento-item">
            <span className="equipamento-nome">{eq.name}</span> Total: {eq.total_stock} | Disponível: {eq.available}
            <div className="actions">
              <button className="edit-button" onClick={() => openFormEdit(eq)}>Editar</button>
              <button className="delete-button" onClick={() => handleDelete(eq.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      {showForm && (
        <div className="modal">
          <form className="form" onSubmit={handleFormSubmit}>
            <h3>{formData.id ? 'Editar Equipamento' : 'Criar Equipamento'}</h3>

            <label>Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <label>Total em Estoque</label>
            <input
              type="number"
              value={formData.total_stock}
              onChange={(e) => setFormData({ ...formData, total_stock: e.target.value })}
              required
              min={0}
            />

            <label>Disponível</label>
            <input
              type="number"
              value={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.value })}
              required
              min={0}
            />

            <div className="form-buttons">
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
