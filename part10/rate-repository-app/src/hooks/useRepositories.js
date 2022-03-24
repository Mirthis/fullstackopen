import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({
  orderDirection = "DESC",
  orderBy = "CREATED_AT",
  searchKeyword = "",
}) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderDirection, orderBy, searchKeyword },
  });
  return { repositories: data, loading, searchKeyword };
};

export default useRepositories;
