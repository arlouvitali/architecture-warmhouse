const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

app.get('/temperature', (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: 'Location parameter is required' });
  }

  const temperature = (Math.random() * 50 - 10).toFixed(2);

  const response = {
    value: parseFloat(temperature),
    unit: 'Celsius',
    timestamp: new Date().toISOString(),
    location: location,
    status: 'active',
    sensor_id: `temp-sensor-${location}`,
    sensor_type: 'temperature',
    description: `Temperature reading for ${location}`
  };

  res.json(response);
});

app.get('/temperature/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'Sensor ID is required' });
  }

  const temperature = (Math.random() * 50 - 10).toFixed(2);

  const response = {
    value: parseFloat(temperature),
    unit: 'Celsius',
    timestamp: new Date().toISOString(),
    location: `sensor-${id}`,
    status: 'active',
    sensor_id: id,
    sensor_type: 'temperature',
    description: `Temperature reading for sensor ${id}`
  };

  res.json(response);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Temperature API listening on port ${port}`);
});
