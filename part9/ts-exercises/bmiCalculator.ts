// interface BmiArgs {
//   height: number;
//   weight: number;
// }

// const parseArguments = (args: Array<string>): BmiArgs => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
//     throw new Error('Provided values were not numbers!');
//   }
//   const height = Number(args[2]);
//   const weight = Number(args[3]);
//   if (height <= 0 || weight <= 0)
//     throw new Error('Height and weight must be positive numbers');
//   return {
//     height,
//     weight,
//   };
// };

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight / height / height) * 10_000;
  let bmiRange = '';
  if (bmi < 18.5) bmiRange = 'Underweight';
  if (bmi >= 18.5 && bmi < 25) bmiRange = 'Normal (healthy weight)';
  if (bmi >= 25 && bmi < 30) bmiRange = 'Overweight';
  if (bmi >= 30 && bmi < 35) bmiRange = 'Obesity class I';
  if (bmi >= 35 && bmi < 40) bmiRange = 'Obesity class II';
  if (bmi >= 40) bmiRange = 'Obesity class II';
  return bmiRange;
};

// try {
//   const { height, weight } = parseArguments(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }

export default calculateBmi;
