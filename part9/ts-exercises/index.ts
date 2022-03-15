import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(Number(req.query.height)) ||
    isNaN(Number(req.query.weight))
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);
  return res.send({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameter missing' });
  }
  if (isNaN(Number(target)) || Number(target) <= 0) {
    return res.status(400).json({
      error: 'malformatted parameters: target must be a positive number.',
    });
  }
  if (!Array.isArray(daily_exercises) || daily_exercises.length === 0) {
    return res.status(400).json({
      error:
        'malformatted parameters: daily_exercises must be a non-empty array',
    });
  }
  daily_exercises.forEach(day => {
    if (isNaN(Number(day)) || Number(day) < 0) {
      return res.status(400).json({
        error:
          'malformatted parameters: daily_exercises must only contain non negative numbers',
      });
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
