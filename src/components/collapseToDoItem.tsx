import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAppContext } from '@/context/store';

interface Props {
    toDoTitle: string
    toDoText: string
    deadline: string
    toDoId: string
    toDoCompleted: boolean
}

const CollapseToDoItem = ({ toDoTitle, toDoText, deadline, toDoId, toDoCompleted }: Props) => {

    const { showDeleteItemWarning, setWhatToDelete, allItems, setItems } = useAppContext();

    useEffect(() => {
        if (toDoCompleted == true) {
            setCompleteButtonHidden("hidden");
        }
    }, [])

    const [collapse, setCollapse] = useState("collapse collapse-close collapse-arrow border border-primary rounded-box w-10/12 mt-2");
    const [isOpen, setIsOpen] = useState(false);
    const [completeButtonHidden, setCompleteButtonHidden] = useState("");

    const deadlineSplit = deadline.replace("T", " ").replace(":00Z", "").split(" ");
    const deadlineDate = deadlineSplit[0].split("-");

    const deleteItem = () => {
        showDeleteItemWarning()
        setWhatToDelete("item", toDoId)
    }

    const toggleCollapse = () => {
        if (isOpen == false) {
            setCollapse("collapse collapse-open collapse-arrow border border-base-300 bg-primary rounded-box w-10/12 mt-2");
            setIsOpen(true)
        } else {
            setCollapse("collapse collapse-close collapse-arrow border border-base-300 bg-primary rounded-box w-10/12 mt-2");
            setIsOpen(false)
        }  
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
        const newItems = allItems.map((item) => {
            if (data.id == item.id) {
                item.completed = true;
                return item
            } else {
                return item
            }
        })
        setItems(newItems);
    }

  return (
    <div tabIndex={0} className={collapse}>
        <div onClick={toggleCollapse} className="collapse-title font-medium rounded-xl bg-primary-focus flex flex-row items-center justify-between cursor-pointer">
            <p className='text-xl'>{toDoTitle}</p>
            {toDoCompleted ? <p className='text-xs ml-2 text-neutral-content'>{"(" + "dokončené" + ")"}</p> 
            : <p className='text-xs ml-2 text-neutral-content'>{"(" + "nedokončené" + ")"}</p>} 
        </div>
        <div className="collapse-content">
            
            <p className='mt-1'>{"Popis: " + toDoText}</p>
            <p className='mt-1'>{"Deadline: " + deadlineDate[2] + "." + deadlineDate[1] + "." + deadlineDate[0] + " " + deadlineSplit[1]}</p>

            <div className='w-full flex justify-center h-content mt-4'>
                <button onClick={completeClick} className={"btn bg-base-300 border-base-content ml-1 " + completeButtonHidden}>DOKONČIŤ</button>
                <button onClick={deleteItem} className="btn bg-base-300 border-base-content ml-1">VYMAZAŤ</button>
            </div>
        </div>
    </div>
  )
}

export default CollapseToDoItem