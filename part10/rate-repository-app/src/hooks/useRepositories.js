import { useState, useEffect } from "react";
//import { useQuery } from "@apollo/client";
//import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);
    //const { data } = useQuery(GET_REPOSITORIES);
    const data = {};
    // Replace the IP address part with your own IP address!
    //const response = await fetch("http://172.22.167.128:5000/api/repositories");
    //const json = await response.json();

    setLoading(false);
    console.log(data.repositories.edges);
    setRepositories(data.repositories.edges);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
