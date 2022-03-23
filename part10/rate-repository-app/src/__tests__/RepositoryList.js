import { RepositoryListContainer } from "../components/RepositoryList";
import { render, within } from "@testing-library/react-native";
import { parseStat } from "../utils/parseState";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      // Add your test code here
      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      let innerEl;
      for (const [key, value] of Object.entries(repositories.edges[0].node)) {
        switch (key) {
          case "fullName":
          case "description":
          case "language":
            innerEl = within(firstRepositoryItem).getByText(value);
            break;
          case "forksCount":
          case "stargazersCount":
          case "ratingAverage":
          case "reviewCount":
            innerEl = within(firstRepositoryItem).getByText(parseStat(value));
            break;
          default:
            continue;
        }
        expect(innerEl).toBeDefined();
      }
      for (const [key, value] of Object.entries(repositories.edges[1].node)) {
        switch (key) {
          case "fullName":
          case "description":
          case "language":
            innerEl = within(secondRepositoryItem).getByText(value);
            break;
          case "forksCount":
          case "stargazersCount":
          case "ratingAverage":
          case "reviewCount":
            innerEl = within(secondRepositoryItem).getByText(parseStat(value));
            break;
          default:
            continue;
        }
        expect(innerEl).toBeDefined();
      }
      // const language = within(firstRepositoryItem).getByText("TypeScript");
      // const language2 = within(secondRepositoryItem).getByText("TypeScript");
      // expect(language).toBeDefined();
      // expect(language2).toBeDefined();
    });
  });
});
