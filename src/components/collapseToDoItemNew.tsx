import React from 'react'
import { useState } from 'react';
import { toDoSchema } from '@/zodSchemas/zodSchemas';

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
    showAlert: (text: string) => void
}

const CollapseToDoItemNew = ({ hidden, hide, referenceId, newItemUpdateState, showAlert }: Props) => {

    const [collapse, setCollapse] = useState("collapse collapse-open collapse-arrow border border-base-300 bg-base-100 rounded-box w-10/12 mt-4");

    const [toDoName, setToDoName] = useState("");
    const [toDoDescription, setToDoDescription] = useState("");
    const [toDoDeadline, setToDoDeadline] = useState({"day": "", "month": "", "year": "", "hours": "", "minutes": ""});

    const submitApi = async () => {
        let deadlineParsed = toDoDeadline.year + "-" + toDoDeadline.month + "-" + toDoDeadline.day + "T" + toDoDeadline.hours + ":" + toDoDeadline.minutes + ":00Z";
        
        const zodTest = toDoSchema.safeParse({name: toDoName, desc: toDoDescription, datetime: deadlineParsed});
        if (!zodTest.success) {
          const err = Object.values(zodTest.error.formErrors.fieldErrors)[0];
          showAlert(Object.values(err)[0].toString());
        } else {
            const resItem = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items", {
                method: "POST",
                body: JSON.stringify({"name": toDoName, "deadline": deadlineParsed, "listReferenceId": referenceId, "description": toDoDescription, "completed": false}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const dataItem = await resItem.json();
            setToDoName("");
            setToDoDescription("");
            setToDoDeadline({"day": "", "month": "", "year": "", "hours": "", "minutes": ""});
            newItemUpdateState(dataItem);
        }
    }

    const discardClick = () => {
        setToDoName("");
        setToDoDescription("");
        setToDoDeadline({"day": "", "month": "", "year": "", "hours": "", "minutes": ""});
        hide();
    }

    const toDoNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setToDoName(e.currentTarget.value);
    }

    const descriptionChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setToDoDescription(e.currentTarget.value);
    }

  return (
    <div tabIndex={1} className={collapse + " " + hidden}>
        <div className="collapse-title text-xl font-medium bg-primary-focus">
            <input onChange={toDoNameChange} value={toDoName} type="text" placeholder="Názov to-do" className="input border-0 w-full" />
        </div>
        <div className="collapse-content bg-primary">
                <label className="label cursor-pointer justify-start items-start flex-col">
                    <textarea onChange={descriptionChange} value={toDoDescription} className="textarea textarea-primary w-full mb-2" placeholder="Popis"></textarea>
                    <label className='mb-2'>Deadline</label>
                    <div className='w-full'>
                        <input onChange={(e) => {setToDoDeadline({...toDoDeadline, "day": e.currentTarget.value})}} value={toDoDeadline.day} type="text" placeholder="DD" className="input border-0 w-3/12 placeholder:text-center text-center" />
                        <label> . </label>
                        <input onChange={(e) => {setToDoDeadline({...toDoDeadline, "month": e.currentTarget.value})}} value={toDoDeadline.month} type="text" placeholder="MM" className="input border-0 w-3/12 placeholder:text-center text-center" />
                        <label> . </label>
                        <input onChange={(e) => {setToDoDeadline({...toDoDeadline, "year": e.currentTarget.value})}} value={toDoDeadline.year} type="text" placeholder="YYYY" className="input border-0 w-4/12 placeholder:text-center text-center" />
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input onChange={(e) => {setToDoDeadline({...toDoDeadline, "hours": e.currentTarget.value})}} value={toDoDeadline.hours} type="text" placeholder="HH" className="input border-0 w-3/12 placeholder:text-center mt-2 text-center" />
                        <label> : </label>
                        <input onChange={(e) => {setToDoDeadline({...toDoDeadline, "minutes": e.currentTarget.value})}} value={toDoDeadline.minutes} type="text" placeholder="MM" className="input border-0 w-3/12 placeholder:text-center text-center" />
                    </div>  
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