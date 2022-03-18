import { useStateValue } from "../state";
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
  EntryType,
} from "../types";
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

export default PatientEntry;
