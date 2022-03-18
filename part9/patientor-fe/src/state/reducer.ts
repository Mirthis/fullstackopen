import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_SHOWN PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { patient: Patient; entry: Entry };
    };

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: "UPDATE PATIENT",
    payload: patient,
  };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList,
  };
};

export const setShownPatient = (patient: Patient): Action => {
  return {
    type: "SET_SHOWN PATIENT",
    payload: patient,
  };
};

export const addEntry = (patient: Patient, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { patient, entry },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      const newState = {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
      return newState;
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_SHOWN PATIENT":
      return {
        ...state,
        shownPatient: action.payload,
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload,
      };
    case "ADD_ENTRY":
      const { patient, entry } = action.payload;
      const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(entry),
      };
      return {
        ...state,
        patients: {
          ...state.patients,
          [patient.id]: updatedPatient,
          shownPatient: updatedPatient,
        },
      };
    default:
      return state;
  }
};
