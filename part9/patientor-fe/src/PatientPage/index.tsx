import { useStateValue, updatePatient, setShownPatient } from "../state";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

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

  return (
    <div>
      <h3>{shownPatient.name}</h3>
      <div>Gender: {shownPatient.gender}</div>
      <div>Occupation: {shownPatient.occupation}</div>
      <div>Date of birth: {shownPatient.dateOfBirth}</div>
      <div>ssn: {shownPatient.ssn}</div>
    </div>
  );
};

export default PatientPage;
