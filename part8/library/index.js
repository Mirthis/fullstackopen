const { ApolloServer, gql, UserInputError } = require('apollo-server')
const config = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = []
let books = []

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async () => Book.find({}),
    // let result = books
    // if (args.author) {
    //   result = result.filter(b => b.author === args.author)
    // }
    // if (args.genre) {
    //   result = result.filter(b => b.genres.includes(args.genre))
    // }
    // return result,
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: root => books.filter(b => b.author === root.name).length,
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        console.log(args)
        let author = await Author.findOne({ name: args.author })
        console.log(author)
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
          console.log(author)
        }
        const newBook = new Book({ ...args, author: author._id })
        await newBook.save()
        return newBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: (rot, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) return null
      const newAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => (a.id === author.id ? newAuthor : a))
      return newAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
