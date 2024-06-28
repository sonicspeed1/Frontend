const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const assetsPath = path.join(__dirname, '../frontend/src/assets');

app.use(bodyParser.json());
app.use(cors());

let pedidos = [];
let meseros = [];

// Cargar datos iniciales desde los archivos JSON
const cargarDatosIniciales = () => {
  try {
    const pedidosData = fs.readFileSync(path.join(assetsPath, 'pedidos.json'), 'utf8');
    pedidos = JSON.parse(pedidosData);

    const meserosData = fs.readFileSync(path.join(assetsPath, 'meseros.json'), 'utf8');
    meseros = JSON.parse(meserosData);
  } catch (error) {
    console.error('Error al cargar los datos iniciales:', error);
  }
};

// Guardar datos en los archivos JSON
const guardarDatos = () => {
  try {
    fs.writeFileSync(path.join(assetsPath, 'pedidos.json'), JSON.stringify(pedidos, null, 2));
    fs.writeFileSync(path.join(assetsPath, 'meseros.json'), JSON.stringify(meseros, null, 2));
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  }
};

// Cargar datos iniciales al iniciar el servidor
cargarDatosIniciales();

// Endpoint para manejar la creación de pedidos
app.post('/pedidos', (req, res) => {
  const pedido = req.body;
  pedidos.push(pedido);
  guardarDatos(); // Guardar los pedidos actualizados en el archivo
  res.status(201).json(pedido);
});


app.put('/calificaciones/:Nombre', (req, res) => {
  const nombre = req.params.Nombre;
  const nuevaCalificacion = req.body.calificacion;

  const mesero = meseros.find(m => m.Nombre === nombre);
  if (mesero) {
    mesero.Participación += 1;
    mesero.Calificación = ((mesero.Calificación * (mesero.Participación - 1)) + nuevaCalificacion) / mesero.Participación;
    guardarDatos(); 
    res.status(200).json(mesero);
  } else {
    res.status(404).send('Mesero no encontrado');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});