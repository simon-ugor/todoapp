import Navbar from '@/components/navbar'
import CollapseToDoItemNew from '@/components/collapseToDoItemNew'
import CollapseToDoItem from '@/components/collapseToDoItem'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai';
import DeleteWarning from '@/components/deleteWarning'
import * as z from 'zod';
import { deleteListApi, submitList, deleteItemApi } from "../api/api"
import { listNameSchema } from '@/zodSchemas/zodSchemas'
import Alert from '@/components/alert'

interface List {
    id: number
    name: string
}

interface Item {
  id: string
  listReferenceId: string
  name: string
  description: string
  deadline: string
  completed: boolean
}

export default function Home() {

  useEffect(() => {

    Promise.all([
      fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items"),
      fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists"),
    ])
    .then (([resItems, resLists]) => 
      Promise.all([resItems.json(), resLists.json()])
    )
    .then (([dataItems, dataLists]) => {
      setToDoItems([...dataItems]);
      setAllLists([...dataLists]);
      setLoading(false);
    })
  }, []);

  const [allLists, setAllLists] = useState<List[]>([]);
  const [toDoItems, setToDoItems] = useState<Item[]>([]);
  const [newToDoHidden, setNewToDoHidden] = useState("hidden");
  const [newListName, setNewListName] = useState("");
  const [ulHidden, setUlHidden] = useState("hidden");
  const [toggleNewList, setToggleNewList] = useState({"button": "", "input": "hidden"});
  const [deleteWarningHidden, setDeleteWarningHidden] = useState("hidden");
  const [listIdToDelete, setListIdToDelete] = useState("");
  const [searchHidden, setSearchHidden] = useState("hidden");
  const [filterHidden, setFilterHidden] = useState("hidden");

  //new edits
  const [chosenListId, setChosenListId] = useState(1);
  const [toDelete, setToDelete] = useState({"whatToDelete": "", "id": ""});
  const [toDoItemsFilter, setToDoItemsFilter] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertText, setAlertText] = useState({"text": "", "hidden": "hidden"});

  useEffect(() => {
    setToDoItemsFilter([...toDoItems])
  }, [toDoItems])

  const toggleHidden = () => {
    if (ulHidden == "hidden") {
      setUlHidden("");
    } else {
      setUlHidden("hidden");
      setToggleNewList({"button": "", "input": "hidden"})
      setNewListName("");
    }
  }

  const toggleNewListButton = () => {
    if (toggleNewList.button == "") {
      setToggleNewList({"button": "hidden", "input": ""})
    }
  }

  const submitNewList = async () => {

    const zodTest = listNameSchema.safeParse(newListName);
    if (!zodTest.success) {
      //display error banner here
      setAlertText({"text": zodTest.error.formErrors.formErrors[0], "hidden": ""})
    } else {
      const data = await submitList(newListName);

      setAllLists([...allLists, {id: data.id, name: data.name}]);
  
      setToggleNewList({"button": "", "input": "hidden"})
      setNewListName("");
    }
  }

  const newItem = (data: Item) => {
    setToDoItems([...toDoItems, {id: data.id, name: data.name, description: data.description, deadline: data.deadline, listReferenceId: data.listReferenceId, completed: data.completed}])
    setNewToDoHidden("hidden");
  }

  const hideNewToDo = () => {
    setNewToDoHidden("hidden");
  }

  const listSwitch = (e: React.FormEvent<HTMLButtonElement>) => {
    setChosenListId(parseInt(e.currentTarget.id));
    setUlHidden("hidden");
  }

  const cancelDelete = () => {
    setDeleteWarningHidden("hidden");
  }

  // ------- DELETE -------

  const deleteList = (e: React.FormEvent<HTMLButtonElement>) => {
    setToDelete({"whatToDelete": "list", "id": e.currentTarget.id})
    setUlHidden("hidden");
    setDeleteWarningHidden("");
  }

  const deleteTodo = (toDoId: string) => {
    setToDelete({"whatToDelete": "todo", "id": toDoId});
    setDeleteWarningHidden("");
  }

  const deleteApi = async () => {
    if (toDelete.whatToDelete == "list") {

      const dataList = await deleteListApi(toDelete.id);

      let itemsToDeleteWithList:string[] = []
      toDoItems.map((item) => {
        if (item.listReferenceId == toDelete.id) {
          itemsToDeleteWithList.push(item.id)
        }
      })
  
      //If currently selected list is deleted reset chosen list id as it cannot be rendered anymore
      if (chosenListId.toString() == toDelete.id) {
        setChosenListId(1);
      }
      //filter lists state and remove list with given id
      setAllLists((allLists) => allLists.filter((list) => list.id.toString() != toDelete.id));
      //DELETE ALL TODOS REFERENCED TO THE LIST
      deleteItemsWithList(itemsToDeleteWithList);
      
    } else {

      const dataItem = await deleteItemApi(toDelete.id)

      //filter items state and rmeove item with given id
      setToDoItems((toDoItems) => toDoItems.filter((item) => item.id.toString() != toDelete.id))
    }
    //hide delete warning popup
    setDeleteWarningHidden("hidden");
  }

  const deleteItemsWithList = async (itemsToDelete: string[]) => {
    for (let i = 0; i < itemsToDelete.length; i++) {
      const data = await deleteItemApi(itemsToDelete[i]);
      setToDoItems((toDoItems) => toDoItems.filter((item) => item.id.toString() != itemsToDelete[i]))
    }
  }

  // ------- UPDATE -------

  const updateItem = (itemId: string) => {
    const newItems = toDoItems.map((item) => {
      if (item.id == itemId) {
        item.completed = true;
        return item
      } else {
        return item
      }
    })
    setToDoItems([...newItems]);
  }

  // ------- SEARCH AND FILTER -------

  const displaySearch = () => {
    setToDoItemsFilter([...toDoItems]);
    if (searchHidden == "hidden") {
      setSearchHidden("");
      setFilterHidden("hidden");
    } else {
      setSearchHidden("hidden");
    }
  }

  const searchTodos = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setToDoItemsFilter([...toDoItems]);
    setToDoItemsFilter((toDoItemsFilter) => toDoItemsFilter.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase())));
  }

  const displayFilter = () => {
    setToDoItemsFilter([...toDoItems]);
    if (filterHidden == "hidden") {
      setFilterHidden("");
      setSearchHidden("hidden");
    } else {
      setFilterHidden("hidden");
    }
  }

  const filterTodos = (e: React.FormEvent<HTMLButtonElement>) => {
    const val = e.currentTarget.value;

    if (val == "completed") {
      setToDoItemsFilter([...toDoItems]);
      setToDoItemsFilter((toDoItemsFilter) => toDoItemsFilter.filter((item) => item.completed == true));
    } else if (val == "noncompleted") {
      setToDoItemsFilter([...toDoItems]);
      setToDoItemsFilter((toDoItemsFilter) => toDoItemsFilter.filter((item) => item.completed == false));
    } else if (val == "all") {
      setToDoItemsFilter([...toDoItems]);
    }
    
  }

  const closeAlert = () => {
    setAlertText({"text": "", "hidden": "hidden"});
  }

  const showAlert = (text: string) => {
    setAlertText({"text": text, "hidden": ""});
  }

  return (
    <>
      <Head>
        <title>ToDo App</title>
        <meta name="description" content="ToDo Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DeleteWarning hidden={deleteWarningHidden} cancelClick={cancelDelete} deleteClick={deleteApi} idToDelete={listIdToDelete} />
      <Alert alertText={alertText} alertFunc={closeAlert} />

      <div className='h-screen w-screen grid grid-rows-5 bg-neutral-content'>
        <Navbar searchClick={displaySearch} filterClick={displayFilter} searchFilterHidden={false} />
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
        

        <div className={'flex justify-center items-center ' + searchHidden}>
            <input onChange={searchTodos} type="text" placeholder="Hľadať to-do" className="input w-11/12" />
        </div>
        <div className={"dropdown w-11/12 flex justify-center items-center m-auto " + filterHidden}>
          <label tabIndex={0} className="btn m-1 w-full">Vybrať filter &#x2193;</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button onClick={filterTodos} value="completed">Dokončené</button></li>
            <li><button onClick={filterTodos} value="noncompleted">Nedokončené</button></li>
            <li><button onClick={filterTodos} value="all">Všetky</button></li>
          </ul>
        </div>

        <div className='w-screen h-min flex flex-col items-center bg-neutral-content'>
          { 
            loading ?
            <p>načítavanie...</p>
            : toDoItemsFilter.map((item: Item) => {
              if (item.listReferenceId == chosenListId.toString()) {
                return <CollapseToDoItem key={item.id} toDoTitle={item.name} toDoText={item.description} deadline={item.deadline} toDoId={item.id} toDoCompleted={item.completed} deleteTodo={deleteTodo} updateTodo={updateItem} />
              } 
            })

          }
          <CollapseToDoItemNew hidden={newToDoHidden} hide={hideNewToDo} referenceId={chosenListId.toString()} newItemUpdateState={newItem} showAlert={showAlert} />
          <button onClick={() => {setNewToDoHidden("")}} className="btn btn-primary mt-4 mb-4">Pridať To-Do</button>
        </div>
      </div>
    </>
  )
}
