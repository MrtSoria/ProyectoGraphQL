import { gql } from "@apollo/client"

export const ALL_BOOKS = gql`
    query {
      allBooks {
        name
        autor
        publishing
        year
        genre
        id
      }
    }
`
export const ADD_BOOK = gql`
  mutation createBook($name: String!, $autor: String!, $publishing: String!, $year: String!, $genre: String!) {
    addBook(
    name: $name
    autor: $autor
    publishing: $publishing
    year: $year
    genre: $genre
  ) 
    {
      name
      autor
      publishing
      year
      genre
      id
    }
  }
`

export const DEL_BOOK = gql`
  mutation remBook($id: String!){
      deleteBook(
      id: $id 
  )
    {
      name
      autor
      publishing
      year
      genre
      id
    }
  }
`

export const MOD_BOOK = gql `
    mutation modBook($name: String!, $autor: String!, $publishing: String!, $year: String!, $genre: String!, $id: String!){
  modifyBook(
    name: $name
    autor: $autor 
    publishing: $publishing 
    year: $year
    genre: $genre
    id: $id
) {
    name
    autor
    publishing
    year
    genre
    id
  }
}
`

export const FIND_BOOK = gql `
    query findBook($name: String!){
      findBook(
        name: $name
    ) {
        name
        autor
        publishing
        year
        genre
        id  
      }  
    }
`