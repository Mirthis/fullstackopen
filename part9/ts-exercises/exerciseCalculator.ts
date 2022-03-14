interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface calcArgs {
  target: number;
  trainingData: Array<number>;
}

const parseCalcArguments = (args: Array<string>): calcArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  args.slice(2).forEach(arg => {
    if (!isNaN(Number(arg)) || Number(arg) < 0) {
      Error('All parameters must be numbers greater or equal to 0');
    }
  });

  const [target, ...trainingData] = args.slice(2).map(arg => Number(arg));

  return {
    target,
    trainingData,
  };
};

const calculateExercises = (
  target: number,
  trainingData: Array<number>
): Result => {
  const periodLength = trainingData.length;
  const trainingDays = trainingData.filter(d => d > 0).length;
  const average =
    trainingData.reduce((prev, curr) => prev + curr, 0) / trainingData.length;
  const success = average >= target;
  let rating, ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = 'Great job!';
  } else if (average > target - 0.5) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Not great, more work needed';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, trainingData } = parseCalcArguments(process.argv);
  console.log(calculateExercises(target, trainingData));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
