// import { useEffect, useState } from "react";
// import { ALL_BOOKS } from "./Queries";
// import { useLazyQuery } from "@apollo/client";
// import { Card } from "./Card";

export function Filter() {

    // const [getBooks, result] = useLazyQuery(ALL_BOOKS)
    // // const [books, setBooks] = useState(null)

    // const handleFilter = e => {
    //     e.preventDefault()

    //     const form = new FormData(e.target)
    //     const formData = Object.fromEntries(form.entries())

    //     // const field = formData.selector
    //     const value = formData.value

    //     getBooks({ variables: { autor: value } })
    // }

    // // useEffect(() => {
    // //     if (result.data) {
    // //         setBooks(result.data.allBooks)
    // //     }
    // // }, [result])

    // if (result.data) {
    //     return (
    //         result.data.allBooks.map(({ name, autor, publishing, year, genre, id }) => (
    //             <Card
    //                 name={name}
    //                 autor={autor}
    //                 publishing={publishing}
    //                 year={year}
    //                 genre={genre}
    //                 id={id}
    //                 key={id}
    //             >
    //             </Card>
    //         ))
    //     )
    // }

    // // if (books === null) return null

    return (
        <article className="gp-filter">
            <h2>
                Filtros
            </h2>
            <form className="gp-filter-inputs" onSubmit={e => e.preventDefault()}>
                <select className="gp-filter-selector" name="selector" defaultValue={'placeholder'}>
                    <option value="placeholder" disabled>Select...</option>
                    <option value="name">Titulo</option>
                    <option value="autor">Autor</option>
                    <option value="publishing">Editorial</option>
                    <option value="year">Año</option>
                    <option value="genre">Género</option>
                </select>
                <input className='gp-filter-text' name="value" placeholder="value..." />
                <button className='gp-filter-confirm' >
                    <img src="/src/assets/icons8-filtrar-50.png" alt="Filter Icon" />
                </button>
            </form>
        </article>
    )
}