import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  DiagnosisSelection,
  RatingSelectOption,
  SelectField,
} from "../components/FormField";
import { EntryType, HealthCheckRating, NewEntry } from "../types";
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

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.name = requiredError;
        }
        if (!values.date) {
          errors.ssn = requiredError;
        }
        if (!values.specialist) {
          errors.dateOfBirth = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
            <SelectField
              label="Health Rating"
              name="healthCheckRating"
              options={ratingOptions}
            />
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
