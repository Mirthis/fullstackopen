import { useStateValue, updatePatient, setShownPatient } from "../state";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {
  Patient,
  Entry,
  Gender,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
  EntryType,
} from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WorkIcon from "@mui/icons-material/Work";
import { assertNever } from "../utils";
import FavoriteIcon from "@mui/icons-material/Favorite";

const PatientEntry = ({ entry }: { entry: Entry }) => {
  return (
    <div style={{ border: "1px solid black" }}>
      <div>
        {entry.date} {renderEntryIcon(entry)}
      </div>
      <div>{entry.description}</div>
      <div>Diagnose by: {entry.specialist}</div>
      <EntryDetails entry={entry} />
      <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
    </div>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <PatientHospitalEntry entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <PatientOccupationalEntry entry={entry} />;
    case EntryType.HealthCheck:
      return <PatientHealthEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientHospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      Discharge: {entry.discharge.date} - {entry.discharge.criteria}
    </div>
  );
};

const PatientOccupationalEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <>
      <div>Employer name: {entry.employerName}</div>
      <div>
        Sick leave- start: {entry.sickLeave?.startDate} end:{" "}
        {entry.sickLeave?.endDate}
      </div>
    </>
  );
};

const PatientHealthEntry = ({ entry }: { entry: HealthCheckEntry }) => {
  switch (entry.healthCheckRating) {
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "Red" }} />;
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "Green" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "DarkOrange" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "Yellow" }} />;
    default:
      return assertNever(entry.healthCheckRating);
  }
};

const renderEntryIcon = (entry: Entry) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <LocalHospitalIcon />;
    case EntryType.HealthCheck:
      return <HealthAndSafetyIcon />;
    case EntryType.OccupationalHealthcare:
      return <WorkIcon />;
    default:
      return assertNever(entry);
  }
};

const DiagnosesList = ({
  diagnosisCodes,
}: {
  diagnosisCodes: string[] | undefined;
}) => {
  const [{ diagnoses }] = useStateValue();
  const patientDiagnoses = !diagnosisCodes
    ? []
    : diagnosisCodes.map((code) => diagnoses.find((d) => d.code === code));
  return (
    <div>
      <h4>Diagnoses</h4>
      <ul>
        {patientDiagnoses.map((diagnosis) => {
          if (!diagnosis) return null;
          return (
            <li key={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const PatientPage = () => {
  const [{ patients, shownPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;

    if (patients[id]) {
      dispatch(setShownPatient(patients[id]));
    } else {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(patientFromApi));
          dispatch(setShownPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }
  }, [dispatch]);

  if (!shownPatient) {
    return <div>Patient not found</div>;
  }

  const renderGender = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3>{shownPatient.name}</h3>
      <div>Gender: {renderGender(shownPatient.gender)}</div>
      <div>Occupation: {shownPatient.occupation}</div>
      <div>Date of birth: {shownPatient.dateOfBirth}</div>
      <div>ssn: {shownPatient.ssn}</div>
      <h3>Entries</h3>
      {shownPatient.entries.map((entry) => {
        return <PatientEntry key={entry.id} entry={entry} />;
      })}
    </div>
  );
};

export default PatientPage;
