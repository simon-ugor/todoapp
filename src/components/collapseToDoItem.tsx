import React, { useEffect } from 'react'
import { useState } from 'react';

interface ToDoItem {
    toDoTitle: string
    toDoText: string
    deadline: string
    toDoId: string
    toDoCompleted: boolean
    deleteTodo: (toDoTitle: string) => void
    updateTodo: (toDoId: string) => void
}

const CollapseToDoItem = ({ toDoTitle, toDoText, deadline, toDoId, toDoCompleted, deleteTodo, updateTodo }: ToDoItem) => {

    useEffect(() => {
        if (toDoCompleted == true) {
            setCompleteButtonHidden("hidden");
        }
    }, [])

    const [collapse, setCollapse] = useState("collapse collapse-close collapse-arrow border border-primary rounded-box w-10/12 mt-2");
    const [isOpen, setIsOpen] = useState(false);
    const [completeButtonHidden, setCompleteButtonHidden] = useState("");

    const deadlineDate = new Date(deadline);

    const toggleCollapse = () => {
        if (isOpen == false) {
            setCollapse("collapse collapse-open collapse-arrow border border-base-300 bg-primary rounded-box w-10/12 mt-2");
            setIsOpen(true)
        } else {
            setCollapse("collapse collapse-close collapse-arrow border border-base-300 bg-primary rounded-box w-10/12 mt-2");
            setIsOpen(false)
        }  
    }

    const deleteClick = () => {
        deleteTodo(toDoId);
    }

    const completeClick = async () => {
        const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items/" + toDoId, {
            method: "PUT",
            body: JSON.stringify({
                "id": toDoId,
                "completed": true
            }),      
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        setCollapse("collapse collapse-close collapse-arrow border border-base-300 bg-primary rounded-box w-10/12 mt-2");
        setIsOpen(false);
        setCompleteButtonHidden("hidden");
        updateTodo(toDoId);
    }

  return (
    <div tabIndex={0} className={collapse}>
        <div onClick={toggleCollapse} className="collapse-title font-medium rounded-xl bg-primary-focus flex flex-row items-center justify-between">
            <p className='text-xl'>{toDoTitle}</p>
            {toDoCompleted ? <p className='text-xs ml-2 text-neutral-content'>{"(" + "dokončené" + ")"}</p> 
            : <p className='text-xs ml-2 text-neutral-content'>{"(" + "nedokončené" + ")"}</p>} 
        </div>
        <div className="collapse-content overflow-scroll">
            
            <p>{toDoText}</p>
            <p>{deadlineDate.getDate().toString() + "-" + deadlineDate.getMonth().toString() + "-" + deadlineDate.getFullYear().toString()}</p>

            <div className='w-full flex justify-center h-content mt-4'>
                <button onClick={completeClick} className={"btn bg-base-300 border-base-content ml-1 " + completeButtonHidden}>DOKONČIŤ</button>
                <button onClick={deleteClick} className="btn bg-base-300 border-base-content ml-1">VYMAZAŤ</button>
            </div>
        </div>
    </div>
  )
}

export default CollapseToDoItem