import { PublicPatient, Patient, NewPatient, NewEntry, Entry } from '../types';
import patients from '../../data/patient';
import { v4 as uuid } from 'uuid';

const getPatientsPublic = (): PublicPatient[] => {
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

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error('Patient cannot be found');
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient) {
    throw new Error('Patient cannot be found');
  }
  const entryId: string = uuid();
  const newEntry = {
    id: entryId,
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatientsPublic,
  addPatient,
  getPatient,
  getPatients,
  addEntry,
};
