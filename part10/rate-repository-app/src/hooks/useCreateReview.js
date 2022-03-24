import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/queries";

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await mutate({
      variables: { review: { repositoryName, ownerName, rating, text } },
    });
    return data;
  };

  return [createReview, result];
};
