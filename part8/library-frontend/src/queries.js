import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genreFilter: String) {
    allBooks(genre: $genreFilter) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const MY_RECCOMENDATIONS = gql`
  query {
    myRecoomendations {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const GET_LOGGED_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const EDIT_BORN = gql`
  mutation changeBorn($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
