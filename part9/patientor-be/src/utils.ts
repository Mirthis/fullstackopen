import { Gender, NewPatient } from './types';

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const isString = (field: unknown): field is string => {
  return typeof field === 'string' || field instanceof String;
};

const parseStringField = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field)) {
    throw new Error(
      `Incorrect or missing value for field ${fieldName}: ${field}`
    );
  }

  return field;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatient = {
    name: parseStringField(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringField(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringField(occupation, 'occupation'),
    entries: [],
  };
  return newPatient;
};
