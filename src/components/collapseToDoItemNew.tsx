import React from 'react'
import { useState } from 'react';

interface Item {
    id: string
    listReferenceId: string
    name: string
    description: string
    deadline: string
    completed: boolean
}

interface Props {
    hidden: string
    referenceId: string
    hide: () => void
    newItemUpdateState: (data: Item) => void
}

const CollapseToDoItemNew = ({ hidden, hide, referenceId, newItemUpdateState }: Props) => {

    const [collapse, setCollapse] = useState("collapse collapse-open collapse-arrow border border-base-300 bg-base-100 rounded-box w-10/12 mt-4");

    const [toDoName, setToDoName] = useState("");
    const [toDoDescription, setToDoDescription] = useState("");
    const [toDoDeadline, setToDoDeadline] = useState("");

    const submitApi = async () => {
        const resItem = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items", {
            method: "POST",
            body: JSON.stringify({"name": toDoName, "deadline": toDoDeadline, "listReferenceId": referenceId, "description": toDoDescription, "completed": false}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const dataItem = await resItem.json();
        setToDoName("");
        setToDoDescription("");
        setToDoDeadline("");
        newItemUpdateState(dataItem);
    }

    const discardClick = () => {
        setToDoName("");
        setToDoDescription("");
        setToDoDeadline("");
        hide();
    }

    const toDoNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setToDoName(e.currentTarget.value);
    }

    const descriptionChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setToDoDescription(e.currentTarget.value);
    }

    const deadlineChange = (e: React.FormEvent<HTMLInputElement>) => {
        setToDoDeadline(e.currentTarget.value);
    }

  return (
    <div tabIndex={1} className={collapse + " " + hidden}>
        <div className="collapse-title text-xl font-medium bg-primary-focus">
            <input onChange={toDoNameChange} value={toDoName} type="text" placeholder="Názov to-do" className="input border-0 w-full max-w-xs" />
        </div>
        <div className="collapse-content bg-primary">
                {/* Add here functionality if user starts typing in first to do automatically display second to do */}
                <label className="label cursor-pointer justify-start items-center flex-col">
                    <textarea onChange={descriptionChange} value={toDoDescription} className="textarea textarea-primary w-full mb-2" placeholder="Popis"></textarea>
                    <input onChange={deadlineChange} value={toDoDeadline} type="text" placeholder="Deadline" className="input border-0 w-full max-w-xs" />
                </label>
            <div className='w-full flex justify-center h-content mt-4'>
                <button onClick={submitApi} className="btn btn-primary bg-base-100 mr-1">SAVE</button>
                <button onClick={discardClick} className="btn btn-primary bg-base-100 ml-1">DISCARD</button>
            </div>
        </div>
    </div>
  )
}

export default CollapseToDoItemNew