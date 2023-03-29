import React, { useState } from 'react'

interface Props {
    hidden: string
    deleteClick: (id:string) => void
    cancelClick: () => void
    idToDelete: string
    text: string
}

const DeleteWarning = ({ hidden, text ,deleteClick, cancelClick, idToDelete }: Props) => {

    const setHidden = () => {
        cancelClick();
    }

    const deleteList = () => {
        deleteClick(idToDelete);
    }

  return (
    <div className={"card w-11/12 h-min bg-neutral text-neutral-content absolute z-50 top-0 left-0 bottom-0 right-0 m-auto " + hidden}>
        <div className="card-body items-center text-center">
            <h2 className="card-title">Varovanie!</h2>
            <p>{text}</p>
            <div className="card-actions justify-end">
                <button onClick={deleteList} className="btn btn-primary">Vymazať</button>
                <button onClick={setHidden} className="btn btn-primary">Zrušiť</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteWarning