const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const config = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
    myRecoomendations: [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        filter.author = { $in: [args.author] }
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      return Book.find(filter)
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const books = await Book.find({})
      return [...new Set(Object.values(books).flatMap(book => book.genres))]
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    myRecoomendations: async (root, args, context) => {
      const myGenre = context.currentUser.favoriteGenre
      return Book.find({ genres: { $in: [myGenre] } })
    },
  },
  Author: {
    bookCount: async root =>
      Book.collection.countDocuments({ author: root._id }),
  },
  Book: {
    author: async root => Author.findById(root.author),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
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
    editAuthor: async (rot, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) return null
        author.born = args.setBornTo
        const newAuthor = await author.save()
        return newAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, config.SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
