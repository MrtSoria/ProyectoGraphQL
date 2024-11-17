import { useState, useEffect } from "react"

export function ErrorDialog({message, onClose}){
    const [closed, setClosed] = useState(false)

    useEffect(() => {
        const timer = setTimeout(()=>{
            handleClose()
        }, 5000)

        return () => clearTimeout(timer)
    })
    
    const handleClose = () => {
        setClosed(true)
        setTimeout(() => {
            onClose()
        }, 500)
    }

    return (
        <section className={`gp-error-dialog ${closed ? 'closed':''}`}>
            <h2>Error: {message}</h2>
            <h3>Por favor inténtelo de nuevo</h3>
        </section>
    )
}