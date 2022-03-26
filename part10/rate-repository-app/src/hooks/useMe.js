import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useMe = (variables) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { ...variables },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { me: data?.me, loading, error, fetchMore: handleFetchMore, refetch };
};

export default useMe;
