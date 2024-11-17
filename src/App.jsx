import './styles/App.css'
import { useQuery } from '@apollo/client'
import { AddModal } from './components/AddModal'
import { Card } from './components/Card'
import { ALL_BOOKS } from './components/Queries'
import { Filter } from './components/Filter'

export function App() {

  const { data, error } = useQuery(ALL_BOOKS)

  if (error) return <span style='color: red'>{error}</span>
  console.log(data)

  return (
    <>
      <header className='gp-header'>
          <h1>Proyecto GraphQL - Interfaces y Tecnologias Web</h1>
          <Filter/>
      </header>

      <main className='gp-main'>
        {
          data &&
          data.allBooks.map(({name, autor, publishing, year, genre, id}) => (
            <Card
              name={name}
              autor={autor}
              publishing={publishing}
              year={year}
              genre={genre}
              id={id}
              key={id}
            >
            </Card>
          ))
        }
        <AddModal/>
      </main>
    </>
  )
}
