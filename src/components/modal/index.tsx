import React, { useState } from "react";
import Button from '@mui/material/Button';
import "./index.css"

function Modal(){

    const [modal, setModal] = useState(true)

    const handleModal = () =>{
        setModal(!modal)
    }

    return <div>
        <Button onClick={handleModal} variant="contained"  > Fechar</Button>

        <div className="modal"></div>
    </div>
}
export default Modal;