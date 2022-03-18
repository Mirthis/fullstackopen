import { useStateValue, updatePatient, setShownPatient } from "../state";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Gender, NewEntry, Entry } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";
import PatientEntry from "./PatientEntry";
import { addEntry } from "../state";

const PatientPage = () => {
  const [{ patients, shownPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

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

  if (!shownPatient) {
    return <div>Patient not found</div>;
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${shownPatient.id}/entries`,
        values
      );
      dispatch(addEntry(shownPatient, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
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
      <div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
    </div>
  );
};

export default PatientPage;
