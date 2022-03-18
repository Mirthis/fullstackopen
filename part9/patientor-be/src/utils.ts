import {
  Gender,
  NewPatient,
  NewEntry,
  EntryType,
  NewBaseEntry,
  Discharge,
  SickLeave,
  HealthCheckRating,
} from './types';

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

interface BaseEntryFields {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
}

interface EntryFields extends BaseEntryFields {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  healthCheckRating: unknown;
  discharge: unknown;
  employerName: unknown;
  sickLeave: unknown;
  type: unknown;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealtchCheckRatin = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealtchCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    healthCheckRating === undefined ||
    isNaN(Number(healthCheckRating)) ||
    !isHealtchCheckRatin(Number(healthCheckRating))
  ) {
    throw new Error(
      'Incorrect or missing health check reating: ' + healthCheckRating
    );
  }
  return Number(healthCheckRating);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const isStringArray = (param: unknown[]): param is string[] => {
  return param.every(el => isString(el));
};

const parseDiagnosisCodes = (codes: unknown): Array<string> | undefined => {
  if (!codes) return undefined;
  if (!Array.isArray(codes) || !isStringArray(codes)) {
    throw new Error('Incorrect diagnosis codes value: ' + codes);
  }

  return codes;
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields): NewPatient => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDischarge(override: any): override is Discharge {
  return (
    typeof parseDate(override.date) === 'string' &&
    typeof parseStringField(override.criteria, 'criteria') === 'string'
  );
}

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isSickLeave(override: any): override is SickLeave {
  return (
    typeof parseStringField(override.startDate, 'startDate') === 'string' &&
    typeof parseStringField(override.endDate, 'startDate') === 'string'
  );
}

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickDate: ' + sickLeave);
  }
  return sickLeave;
};

const parseBaseEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
}: BaseEntryFields): NewBaseEntry => {
  return {
    description: parseStringField(description, 'description'),
    specialist: parseStringField(specialist, 'specialist'),
    date: parseDate(date),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };
};

export const toNewEntry = ({
  // id,
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave,
  type,
}: EntryFields): NewEntry => {
  const entryType = parseEntryType(type);
  let newEntry: NewEntry;
  switch (entryType) {
    case EntryType.HealthCheck:
      newEntry = {
        type: entryType,
        ...parseBaseEntry({ description, specialist, date, diagnosisCodes }),
        healthCheckRating: parseHealtchCheckRating(healthCheckRating),
      };
      break;
    case EntryType.Hospital:
      newEntry = {
        type: entryType,
        ...parseBaseEntry({ description, specialist, date, diagnosisCodes }),
        discharge: parseDischarge(discharge),
      };
      break;
    case EntryType.OccupationalHealthcare:
      newEntry = {
        type: entryType,
        ...parseBaseEntry({ description, specialist, date, diagnosisCodes }),
        employerName: parseStringField(employerName, 'employername'),
        sickLeave: parseSickLeave(sickLeave),
      };
      break;
    default:
      return assertNever(entryType);
  }
  return newEntry;
};
