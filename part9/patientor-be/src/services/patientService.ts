import { NonSensitivePatient, Patient, NewPatient } from '../types';
import patients from '../../data/patient';
import { v4 as uuid } from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitiveEntries, addPatient };
