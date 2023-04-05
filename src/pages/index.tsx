import Navbar from '@/components/navbar'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import DeleteWarning from '@/components/deleteWarning'
import { deleteListApi, submitList, deleteItemApi } from "../api/api"
import Alert from '@/components/alert'
import ListSelector from '@/components/listSelector'
import ItemsSection from '@/components/itemsSection'
import { useWarning } from '@/context/store'

interface Item {
  id: string
  listReferenceId: string
  name: string
  description: string
  deadline: string
  completed: boolean
}

interface List {
  id: number
  name: string
}

export default function Home() {

  const { allLists, setLists, setItems, allItemsInitial, allItems, setItemsInitial } = useWarning();

  useEffect(() => {

    Promise.all([
      fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items"),
      fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists"),
    ])
    .then (([resItems, resLists]) => 
      Promise.all([resItems.json(), resLists.json()])
    )
    .then (([dataItems, dataLists]) => {
      setItems(dataItems);
      setLists(dataLists);
      setLoading(false);
    })
  }, []);

  const [toDoItems, setToDoItems] = useState<Item[]>([]);
  const [searchHidden, setSearchHidden] = useState("hidden");
  const [filterHidden, setFilterHidden] = useState("hidden");
  const [toDoItemsFilter, setToDoItemsFilter] = useState<Item[]>([]);

  //double check if this is working correctly
  const [loading, setLoading] = useState(true);

  // ------- SEARCH AND FILTER -------

  const displaySearch = () => {
    setItemsInitial(allItems)
    if (searchHidden == "hidden") {
      setSearchHidden("");
      setFilterHidden("hidden");
    } else {
      setSearchHidden("hidden");
    }
  }

  const searchTodos = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    //setToDoItemsFilter([...toDoItems]);
    //setToDoItemsFilter((toDoItemsFilter) => toDoItemsFilter.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase())));
    let arr = allItems.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()));
    console.log(arr);
    //setItems(arr);
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

  return (
    <>
    
      <Head>
        <title>ToDo App</title>
        <meta name="description" content="ToDo Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeleteWarning />
      <Alert />

      <div className='h-screen w-screen grid grid-rows-5 bg-neutral-content'>
        <Navbar searchClick={displaySearch} filterClick={displayFilter} searchFilterHidden={false} />
        
        <ListSelector />
        

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

        <ItemsSection toDoItemsFilter={toDoItemsFilter} loading={loading} />
      </div>
    </>
  )
}
