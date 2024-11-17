import { useState, useEffect } from "react";
import { ADD_BOOK, ALL_BOOKS } from "./Queries";
import { useMutation } from "@apollo/client";
import { ErrorDialog } from "./ErrorDialog";
///////////////////////////////////////////////////////
export function AddModal() {

    const [modal, setModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const toggleModal = () => {
        setNewBook({
            name: '',
            autor: '',
            publishing: '',
            year: '',
            genre: ''
        })

        setModal(!modal)
        setErrorMessage(null)
    }

    const [newBook, setNewBook] = useState({
        name: '',
        autor: '',
        publishing: '',
        year: '',
        genre: ''
    })

    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }]
    })

    const handleAddBook = async e => {
        e.preventDefault()

        try {
            const variables = { ...newBook }
            await addBook({ variables })

            toggleModal()

            setNewBook({
                name: '',
                autor: '',
                publishing: '',
                year: '',
                genre: ''
            })

        } catch (error) {
            if (error.graphQLErrors.length > 0) {
                const gqlError = error.graphQLErrors[0]
                if (gqlError.extensions.code === 'BAD_USER_INPUT') {
                    setErrorMessage(gqlError.message)
                }
            }
        }
    }

    useEffect(() => {
        if (modal) {
            setErrorMessage(null)
        }
    }, [modal])

    return (
        <>
            <button className='gp-add' onClick={toggleModal}>
                <h1>
                    +
                </h1>
            </button>
            {
                modal && (
                    <>
                        <div className={`gp-modal-overlay ${modal ? '' : 'closed'}`} onClick={toggleModal}></div>

                        <section className={`gp-modal-content ${modal ? '' : 'closed'}`}>
                            <h2>Añadir Libro</h2>

                            <form onSubmit={handleAddBook}>
                                <input className='gp-modal-field'
                                    placeholder="Titulo"
                                    value={newBook.name}
                                    onChange={e => setNewBook({ ...newBook, name: e.target.value })}
                                />
                                <input className='gp-modal-field'
                                    placeholder="Autor"
                                    value={newBook.autor}
                                    onChange={e => setNewBook({ ...newBook, autor: e.target.value })}
                                />
                                <input className='gp-modal-field'
                                    placeholder="Editorial"
                                    value={newBook.publishing}
                                    onChange={e => setNewBook({ ...newBook, publishing: e.target.value })}
                                />
                                <input className='gp-modal-field'
                                    placeholder="Año"
                                    value={newBook.year}
                                    onChange={e => setNewBook({ ...newBook, year: e.target.value })}
                                />
                                <input className='gp-modal-field'
                                    placeholder="Género"
                                    value={newBook.genre}
                                    onChange={e => setNewBook({ ...newBook, genre: e.target.value })}
                                />

                                <button className='gp-modal-confirm'>
                                    ✅
                                </button>
                            </form>
                        </section>
                        {errorMessage && (
                            <ErrorDialog message={errorMessage} onClose={() => setErrorMessage(null)} />
                        )}
                    </>
                )
            }
        </>
    )
}

