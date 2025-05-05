const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------
// RUTAS DE VENTAS
// ------------------------------

// Obtener todas las ventas
app.get('/api/ventas', (req, res) => {
  db.query('SELECT * FROM ventas ORDER BY fecha DESC', (err, results) => {
    if (err) {
      console.error('Error al obtener ventas:', err);
      res.status(500).send('Error al obtener ventas');
    } else {
      res.json(results);
    }
  });
});

// Crear una nueva venta
app.post('/api/ventas', (req, res) => {
  const venta = req.body;
  db.query('INSERT INTO ventas SET ?', venta, (err) => {
    if (err) {
      console.error('Error al agregar venta:', err);
      res.status(500).send('Error al agregar venta');
    } else {
      res.status(201).send('Venta agregada exitosamente');
    }
  });
});

// Eliminar una venta
app.delete('/api/ventas/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM ventas WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error al eliminar venta:', err);
      res.status(500).send('Error al eliminar venta');
    } else {
      res.send('Venta eliminada exitosamente');
    }
  });
});

// Actualizar estado de una venta (por ejemplo: pendiente -> pagado)
app.patch('/api/ventas/:id/estado', (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  db.query('UPDATE ventas SET estado = ? WHERE id = ?', [estado, id], (err) => {
    if (err) {
      console.error('Error al actualizar estado de venta:', err);
      res.status(500).send('Error al actualizar estado de venta');
    } else {
      res.send('Estado de venta actualizado exitosamente');
    }
  });
});

// ------------------------------
// RUTAS DE PEDIDOS
// ------------------------------

// Obtener todos los pedidos
app.get('/api/pedidos', (req, res) => {
  db.query('SELECT * FROM pedidos ORDER BY fecha DESC', (err, results) => {
    if (err) {
      console.error('Error al obtener pedidos:', err);
      res.status(500).send('Error al obtener pedidos');
    } else {
      res.json(results);
    }
  });
});

// Crear un nuevo pedido
app.post('/api/pedidos', (req, res) => {
  const pedido = req.body;
  db.query('INSERT INTO pedidos SET ?', pedido, (err) => {
    if (err) {
      console.error('Error al agregar pedido:', err);
      res.status(500).send('Error al agregar pedido');
    } else {
      res.status(201).send('Pedido agregado exitosamente');
    }
  });
});

// Eliminar un pedido
app.delete('/api/pedidos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM pedidos WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error al eliminar pedido:', err);
      res.status(500).send('Error al eliminar pedido');
    } else {
      res.send('Pedido eliminado exitosamente');
    }
  });
});

// Actualizar estado de un pedido (por ejemplo: pendiente -> entregado)
app.patch('/api/pedidos/:id/estado', (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  db.query('UPDATE pedidos SET estado = ? WHERE id = ?', [estado, id], (err) => {
    if (err) {
      console.error('Error al actualizar estado de pedido:', err);
      res.status(500).send('Error al actualizar estado de pedido');
    } else {
      res.send('Estado de pedido actualizado exitosamente');
    }
  });
});

// ------------------------------
// SERVIDOR
// ------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
