import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { ALL_BOOKS, MOD_BOOK, DEL_BOOK } from "./Queries"
import { ErrorDialog } from "./ErrorDialog"

export function Card({ name, autor, publishing, year, genre, id }) {

    const [modal, setModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    /* MODIFY BOOK */

    //MODAL
    const toggleModal = () => {
        setUpdatedBook({
            name,
            autor,
            publishing,
            year,
            genre,
            id
        })
        setModal(!modal)
    }

    const [updatedBook, setUpdatedBook] = useState({
        name: '',
        autor: '',
        publishing: '',
        year: '',
        genre: ''
    })

    const [modBook] = useMutation(MOD_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }]
    })

    const handleModBook = async e => {
        e.preventDefault()

        try {
            const variables = { ...updatedBook, id}
            await modBook({variables})

            setModal(false)
            setUpdatedBook({
                name: '',
                autor: '',
                publishing: '',
                year: '',
                genre: ''
            })

        } catch (error) {
            if(error.graphQLErrors.length > 0){
                const gqlError = error.graphQLErrors[0]
                if(gqlError.extensions.code === 'BAD_USER_INPUT'){
                    setErrorMessage(gqlError.message)
                }
            }
        }
    }


    /* DELETE BOOK */

    const [deletedBook, setDeletedBook] = useState({
        name: '',
        autor: '',
        publishing: '',
        year: '',
        genre: ''
    })

    const [delBook] = useMutation(DEL_BOOK, {
        refetchQueries: [{query: ALL_BOOKS}]
    })

    const handleDelBook = e => {
        e.preventDefault()

        delBook({ variables: {...deletedBook, id}})

        setDeletedBook({
            name: '',
            autor: '',
            publishing: '',
            year: '',
            genre: ''
        })
    }    

    useEffect(() => {
        if(modal){
            setErrorMessage(null)
        }
    }, [modal])

    return (
        <>
            <article className="gp-card">
                <h1 className="gp-card-title">
                    {name}
                </h1>
                <h2 className="gp-card-autor">
                    {autor}
                </h2>
                <p className="gp-card-publishing">
                    <strong>Editorial:</strong> {publishing}
                </p>
                <p className="gp-card-year">
                    <strong>Año:</strong> {year}
                </p>
                <p className="gp-card-genre">
                    <strong>Género:</strong> {genre}
                </p>

                <section className="gp-card-buttons">
                    <button className="gp-card-modify" onClick={toggleModal}>
                        <img src="/src/assets/edit_icon.svg" alt="Modificar" />
                    </button>
                    <button className="gp-card-delete" onClick={handleDelBook}>
                        <img src="/src/assets/trash_icon.svg" alt="Eliminar" />
                    </button>
                </section>
            </article>
            {
                modal && (
                    <>
                        <div className={`gp-modal-overlay ${closed ? 'closed' : ''}`} onClick={toggleModal}></div>

                        <section className={`gp-modal-content ${closed ? 'closed' : ''}`}>
                            <h2>Modificar Libro</h2>
                            <form onSubmit={handleModBook}>
                                <input className='gp-modal-field' placeholder="Titulo" value={updatedBook.name} onChange={e => setUpdatedBook({ ...updatedBook, name: e.target.value })} />
                                <input className='gp-modal-field' placeholder="Autor" value={updatedBook.autor} onChange={e => setUpdatedBook({ ...updatedBook, autor: e.target.value })} />
                                <input className='gp-modal-field' placeholder="Editorial" value={updatedBook.publishing} onChange={e => setUpdatedBook({ ...updatedBook, publishing: e.target.value })} />
                                <input className='gp-modal-field' placeholder="Año" value={updatedBook.year} onChange={e => setUpdatedBook({ ...updatedBook, year: e.target.value })} />
                                <input className='gp-modal-field' placeholder="Género" value={updatedBook.genre} onChange={e => setUpdatedBook({ ...updatedBook, genre: e.target.value })} />

                                <button className='gp-modal-confirm'>
                                    ✅
                                </button>
                            </form>
                        </section>
                        {errorMessage && (
                            <ErrorDialog message={errorMessage} onClose={ () => setErrorMessage(null)}/>
                        )}
                    </>
                )
            }
        </>
    )
}