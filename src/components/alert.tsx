import React from 'react'
import { RxCrossCircled } from "react-icons/rx"
import { useAppContext } from '@/context/store'

const Alert = () => {

  const { alertData, closeAlert } = useAppContext()

  return (
    <div className={"alert alert-error shadow-lg absolute top-0 left-0 z-50 flex flex-row justify-between content-center " + alertData.hidden}>
    <div>
        <span>{alertData.text}</span>
    </div>
    <div className="flex-none">
        <button onClick={closeAlert} className="btn btn-sm btn-ghost h-full"><RxCrossCircled /></button>
    </div>
    </div>
  )
}

export default Alert