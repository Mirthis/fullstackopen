import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  DiagnosisSelection,
  RatingSelectOption,
  TypeSelectOption,
  SelectField,
} from "../components/FormField";
import { EntryType, HealthCheckRating, NewEntry, NewEntryType } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const ratingOptions: RatingSelectOption[] = [
  { type: "rating", value: HealthCheckRating.Healthy, label: "Healthy" },
  { type: "rating", value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { type: "rating", value: HealthCheckRating.HighRisk, label: "High Risk" },
  {
    type: "rating",
    value: HealthCheckRating.CriticalRisk,
    label: "Critical Risk",
  },
];

const typeOtions: TypeSelectOption[] = [
  { type: "type", value: NewEntryType.Merged, label: "Select an entry type" },
  { type: "type", value: NewEntryType.HealthCheck, label: "Health Check" },
  { type: "type", value: NewEntryType.Hospital, label: "Hospital" },
  {
    type: "type",
    value: NewEntryType.OccupationalHealthcare,
    label: "Occupational Health Care",
  },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: NewEntryType.Merged,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        //healthCheckRating: HealthCheckRating.Healthy,
        employerName: "",
        healthCheckRating: 0,
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (
          !/^\d{4}-\d{2}-\d{2}$/.test(values.date) ||
          !Date.parse(values.date)
        ) {
          errors.date = "Invalid date format. Format: YYYY-MM-DD";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === NewEntryType.Merged) {
          errors.type = "Select an entry type";
        }
        switch (values.type) {
          case EntryType.OccupationalHealthcare:
            if (!values.employerName) errors.employerName = requiredError;
            if (
              values.sickLeave?.startDate &&
              (!/^\d{4}-\d{2}-\d{2}$/.test(values.sickLeave.startDate) ||
                !Date.parse(values.sickLeave.startDate))
            ) {
              // Error is not shown. Haven't been able to fidn a fix
              errors["sickLeave.startDate"] =
                "Invalid start date format. Format: YYYY-MM-DD";
            }
            if (
              values.sickLeave?.endDate &&
              (!/^\d{4}-\d{2}-\d{2}$/.test(values.sickLeave.endDate) ||
                !Date.parse(values.sickLeave.endDate))
            ) {
              // Error is not shown. Haven't been able to fidn a fix
              errors["sickLeave.endDate"] =
                "Invalid end date format. Format: YYYY-MM-DD";
            }
            break;
          case EntryType.Hospital:
            if (!values.discharge.criteria)
              // Error is not shown. Haven't been able to fidn a fix
              errors["discharge.criteria"] = requiredError;
            if (!values.discharge.date) {
              // Error is not shown. Haven't been able to fidn a fix
              errors["discharge.date"] = requiredError;
            } else if (
              !/^\d{4}-\d{2}-\d{2}$/.test(values.discharge.date) ||
              !Date.parse(values.discharge.date)
            ) {
              errors["discharge.date"] =
                "Invalid discharge date format. Format: YYYY-MM-DD";
            }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Enty Type" name="type" options={typeOtions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === EntryType.HealthCheck && (
              <SelectField
                label="Health Rating"
                name="healthCheckRating"
                options={ratingOptions}
              />
            )}
            {values.type === EntryType.OccupationalHealthcare && (
              <>
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}
            {values.type === EntryType.Hospital && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
