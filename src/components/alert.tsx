import React, { useState } from 'react'
import { RxCrossCircled } from "react-icons/rx"

interface Props {
    alertText: AlertText
    alertFunc: () => void
}

interface AlertText {
    text: string
    hidden: string
}

const Alert = ({ alertText, alertFunc }: Props) => {


  return (
    <div className={"alert alert-error shadow-lg absolute top-0 left-0 z-50 flex flex-row justify-between content-center " + alertText.hidden}>
    <div>
        <span>{alertText.text}</span>
    </div>
    <div className="flex-none">
        <button onClick={alertFunc} className="btn btn-sm btn-ghost h-full"><RxCrossCircled /></button>
    </div>
    </div>
  )
}

export default Alert