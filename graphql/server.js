import { ApolloServer, UserInputError, gql } from "apollo-server";
import { books } from "./const.js";
import { v1 as uuid } from "uuid";

const typeDefs = gql`
    type Book{
        name: String!
        autor: String!
        publishing: String!
        year: String!
        genre: String!
        id: String!
    }

    type Query{
        allBooks(
            name: String
            autor: String
            publishing: String
            year: String
            genre: String
        ): [Book]!
    }

    type Mutation{
        addBook(
            name: String!
            autor: String!
            publishing: String!
            year: String!
            genre: String!
        ): Book!

        deleteBook(
            id: String!
        ): [Book]!

        modifyBook(
            name: String!
            autor: String!
            publishing: String!
            year: String!
            genre: String!
            id: String!
        ): Book!
    }
`

const resolvers = {
    Query: {
        allBooks: (root, { name, autor, publishing, year, genre }) => {
            return books.filter(book => {
                return (
                    (!name || book.name.includes(name)) &&
                    (!publishing || book.publishing === publishing) &&
                    (!year || book.year === year) &&
                    (!genre || book.genre === genre) &&
                    (!autor || book.autor === autor)
                )
            })
        }
    },
    Mutation: {
        addBook: (root, args) => {
            if (books.find(book => book.name === args.name)) {
                throw new UserInputError('Name must be unique', { invalidArgs: args.name })
            }

            if(Object.values(args).some(arg => !arg)){
                throw new UserInputError('There cannot be null fields', { invalidArgs: args })
            }

            const book = { ...args, id: uuid() }

            books.push(book)
            return book
        },
        modifyBook: (root, args) => {
            const updatedBook = { ...args }

            if (books.find(book => book.name === args.name && book.id != args.id)) {
                throw new UserInputError('No puede haber un nombre repetido', { invalidArgs: args.name })
            }

            if(Object.values(args).some(arg => !arg)){
                throw new UserInputError('No puede haber campos vacíos', { invalidArgs: args })
            }

            const index = books.findIndex(
                book => book.id === args.id
            )

            books[index] = updatedBook
            return updatedBook
        },
        deleteBook: (root, args) => {
            const index = books.findIndex(
                book => book.id === args.id
            )

            books.splice(index, 1)
            return books
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Servidor está listo en ${url}`)
})
