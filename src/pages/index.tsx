import Navbar from '@/components/navbar'
import CollapseToDoItemNew from '@/components/collapseToDoItemNew'
import CollapseToDoItem from '@/components/collapseToDoItem'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai';
import DeleteWarning from '@/components/deleteWarning'

export const getStaticProps = async () => {
  const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists");
  const data = await res.json();

  return {
      props: { lists: data }
  };
}

interface List {
    id: number
    name: string
}

interface HomeProps {
  lists: Array<List>
}

interface Item {
  id: string
  listReferenceId: string
  name: string
  description: string
  deadline: string
}

export default function Home({ lists }: HomeProps) {

  useEffect(() => {
    try {
      fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items")
      .then(res => res.json())
      .then(data => setToDoItems([...data]))
    } catch {
      //solve this better!
      //make it somehow so it does not render "no to dos text" until this fetch is done either with 200 or 400
    }


  }, []);

  const [allLists, setAllLists] = useState([...lists])
  const [toDoItems, setToDoItems] = useState<Item[]>([]);
  const [listName, setListName] = useState({"name": lists[0].name, "id": lists[0].id.toString()});
  const [newToDoHidden, setNewToDoHidden] = useState("hidden");
  const [newListName, setNewListName] = useState("");
  const [ulHidden, setUlHidden] = useState("hidden");
  const [toggleNewList, setToggleNewList] = useState({"button": "", "input": "hidden"});
  const [deleteWarningHidden, setDeleteWarningHidden] = useState("hidden");
  const [listIdToDelete, setListIdToDelete] = useState("");

  //new edits
  const [chosenListId, setChosenListId] = useState(1);
  const [toDelete, setToDelete] = useState({"whatToDelete": "", "id": ""});

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
    const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists", {
      method: "POST",
      body: JSON.stringify({"name": newListName}),
      headers: {
          "Content-Type": "application/json"
      }
    })
    const data = await res.json();

    setAllLists([...allLists, {id: data.id, name: data.name}]);

    setToggleNewList({"button": "", "input": "hidden"})
    setNewListName("");

  }

  const newItem = (data: Item) => {
    setToDoItems([...toDoItems, {id: data.id, name: data.name, description: data.description, deadline: data.deadline, listReferenceId: data.listReferenceId}])
    setNewToDoHidden("hidden");
  }

  const hideNewToDo = () => {
    setNewToDoHidden("hidden");
  }

  const listSwitch = (e: React.FormEvent<HTMLButtonElement>) => {
    setListName({"name": e.currentTarget.value, "id": e.currentTarget.id.toString()});
    setChosenListId(parseInt(e.currentTarget.id));
    setUlHidden("hidden");
  }

  const cancelDelete = () => {
    setDeleteWarningHidden("hidden");
  }

  // ------- DELETE -------

  const deleteList = (e: React.FormEvent<HTMLButtonElement>) => {
    //setListIdToDelete(e.currentTarget.id);
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
      const resList = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists/" + toDelete.id, {
        method: "DELETE"
      })
      const dataList = await resList.json();

      let itemsToDeleteWithList = [""]
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
      const resItem = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items/" + toDelete.id, {
        method: "DELETE"
      })
      const dataItem = await resItem.json();

      //filter items state and rmeove item with given id
      setToDoItems((toDoItems) => toDoItems.filter((item) => item.id.toString() != toDelete.id))
    }
    //hide delete warning popup
    setDeleteWarningHidden("hidden");
  }

  const deleteItemsWithList = async (itemsToDelete: string[]) => {
    console.log(itemsToDelete)
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

      <div className='grid grid-rows-5 h-screen overflow-scroll w-full bg-neutral-content'>
        <Navbar />
        <div className="navbar bg-base-300 rounded-box w-11/12 m-auto mt-1">
          <div className="flex-1 px-2 lg:flex-none">
            <a className="text-lg font-bold">{allLists[chosenListId-1].name}</a>
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
        

        <div className='flex justify-center items-start hidden'>
            <input type="text" placeholder="Search toDo" className="input w-11/12" />
        </div>

        <div className='w-full h-min flex flex-col items-center overflow-scroll'>
          { 
            toDoItems.length > 0 ?
            toDoItems.map((item: Item) => {
              if (item.listReferenceId == chosenListId.toString()) {
                return <CollapseToDoItem key={item.id} toDoTitle={item.name} toDoText={item.description} deadline={item.deadline} toDoId={item.id} deleteTodo={deleteTodo} />
              } 
            })
          : <p className='text-primary-content'>Zatiaľ neboli pridané žiadne ToDos</p>
          }
          <CollapseToDoItemNew hidden={newToDoHidden} hide={hideNewToDo} referenceId={chosenListId.toString()} newItemUpdateState={newItem} />
          <button onClick={() => {setNewToDoHidden("")}} className="btn btn-primary mt-4 mb-4">Pridať ToDo</button>
        </div>
      </div>
    </>
  )
}
