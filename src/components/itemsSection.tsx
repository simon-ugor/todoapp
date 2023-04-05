import React from 'react'
import { useState } from 'react'
import CollapseToDoItem from './collapseToDoItem'
import CollapseToDoItemNew from './collapseToDoItemNew'
import { useWarning } from '@/context/store'

interface Item {
    id: string
    listReferenceId: string
    name: string
    description: string
    deadline: string
    completed: boolean
}

interface Props {
    toDoItemsFilter: Item[]
    loading: boolean
}

const ItemsSection = ({ toDoItemsFilter, loading }: Props) => {

  const { allItems, chosenListId } = useWarning();

    const [newToDoHidden, setNewToDoHidden] = useState("hidden");

    const updateItem = () => {
        alert("update item");
    }

  return (
    <div className='w-screen h-min flex flex-col items-center bg-neutral-content'>
    { 
      loading ?
      <p>načítavanie...</p>
      : allItems.map((item: Item) => {
        if (item.listReferenceId == chosenListId.toString()) {
          return <CollapseToDoItem key={item.id} toDoTitle={item.name} toDoText={item.description} deadline={item.deadline} toDoId={item.id} toDoCompleted={item.completed} />
        } 
      })

    }
    <CollapseToDoItemNew hidden={newToDoHidden} hide={() => {setNewToDoHidden("hidden")}} referenceId={chosenListId.toString()} />
    <button onClick={() => {setNewToDoHidden("")}} className="btn btn-primary mt-4 mb-4">Pridať To-Do</button>
  </div>
  )
}

export default ItemsSection