import React from 'react'
import { useState } from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { submitList } from "../api/api"
import { listNameSchema } from '@/zodSchemas/zodSchemas'
import { useWarning } from '@/context/store';

const ListSelector = () => {

  const {showDeleteListWarning, ulHidden, toggleUlHidden, allLists, appendList, setWhatToDelete, setChosenLiId, chosenListId, setAlert} = useWarning();

    const [toggleNewList, setToggleNewList] = useState({"button": "", "input": "hidden"});
    const [newListName, setNewListName] = useState("");

    const toggleHidden = () => {
        toggleUlHidden();
      }

    const listSwitch = (e: React.FormEvent<HTMLButtonElement>) => {
        setChosenLiId(parseInt(e.currentTarget.id));
        toggleUlHidden();
    }

    const deleteList = (e: React.FormEvent<HTMLButtonElement>) => {
        showDeleteListWarning();
        setWhatToDelete("list", e.currentTarget.id);
    }

    const toggleNewListButton = () => {
        if (toggleNewList.button == "") {
          setToggleNewList({"button": "hidden", "input": ""})
        }
    }

    const submitNewList = async () => {

        const zodTest = listNameSchema.safeParse(newListName);
        if (!zodTest.success) {
          setAlert(zodTest.error.formErrors.formErrors[0]);
        } else {
          const data = await submitList(newListName);
    
          appendList(data);
      
          setToggleNewList({"button": "", "input": "hidden"})
          setNewListName("");
        }
      }


  return (
    <div className="navbar bg-base-300 rounded-box w-11/12 m-auto mt-1">
          <div className="flex-1 px-2 lg:flex-none">
            <p className="text-lg font-bold">{allLists.map((list) => {
              if (chosenListId == list.id) {
                return list.name;
              }
            })}</p>
          </div>
          <div className="flex justify-end flex-1 px-2">
            <div className="flex items-stretch">
              <div className="dropdown dropdown-end dropdown-open">
                <button onClick={toggleHidden} className="btn btn-primary rounded-btn">&#x2193;</button>
                <ul tabIndex={0} className={"menu dropdown-content p-2 shadow bg-base-100 rounded-box w-64 mt-4 " + ulHidden}>
                  {allLists.map((list) => {
                    return <li className='border-b-2 border-neutral-content w-full flex flex-row justify-between items-center' key={list.id}>
                              <button className='w-9/12 h-min' onClick={listSwitch} value={list.name} id={list.id.toString()}>{list.name}</button>
                              <button className='w-3/12 h-min' onClick={deleteList} id={list.id.toString()}><AiOutlineMinusCircle className='text-red-500 m-auto' /></button>
                            </li>
                    })} 
                    <li>
                      <button onClick={toggleNewListButton} className={"btn btn-primary w-full mt-3 " + toggleNewList.button}>Nový zoznam</button>
                      <div className={'w-full ' + toggleNewList.input}>
                        <input onChange={(e) => {setNewListName(e.currentTarget.value)}} value={newListName} type="text" placeholder="Názov zoznamu" className="input input-bordered w-full max-w-xs" />
                        <button onClick={submitNewList} className="btn btn-primary w-min">+</button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
  )
}

export default ListSelector