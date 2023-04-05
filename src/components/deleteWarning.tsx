import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/context/store'
import { deleteListApi, deleteItemApi } from '@/api/api'

const DeleteWarning = () => {

    const {warning, closeDeleteListWarning, toDelete, setItems,allItems, chosenListId, setChosenLiId, setLists, allLists} = useAppContext();

    const deleteApi = async () => {
        
        if (toDelete.whatToDelete == "list") {
    
          const dataList = await deleteListApi(toDelete.id);
    
          let itemsToDeleteWithList:string[] = []
          allItems.map((item) => {
            if (item.listReferenceId == toDelete.id) {
              itemsToDeleteWithList.push(item.id)
            }
          })
      
          //If currently selected list is deleted reset chosen list id as it cannot be rendered anymore
          if (chosenListId.toString() == toDelete.id) {
            setChosenLiId(1);
          }
          //Filter lists state and remove list with given id
          //let newLists = allLists.filter((list) => list.id.toString() != toDelete.id)
          setLists(allLists.filter((list) => list.id.toString() != toDelete.id));
          
          
          //Delete all todos referenced to deleted list
          deleteItemsWithList(itemsToDeleteWithList);

        } else {

          const dataItem = await deleteItemApi(toDelete.id)
          //filter items state and rmeove item with given id
          setItems(allItems.filter((item) => item.id.toString() != toDelete.id))

        }

        closeDeleteListWarning();
        
    }

    const deleteItemsWithList = async (itemsToDelete: string[]) => {
        for (let i = 0; i < itemsToDelete.length; i++) {
          const data = await deleteItemApi(itemsToDelete[i]);
          setItems(allItems.filter((item) => item.id.toString() != itemsToDelete[i]))
        }
    }

  return (
    <div className={"card w-11/12 h-min bg-neutral text-neutral-content absolute z-50 top-0 left-0 bottom-0 right-0 m-auto " + warning.hidden}>
        <div className="card-body items-center text-center">
            <h2 className="card-title">Varovanie!</h2>
            <p>{warning.message}</p>
            <div className="card-actions justify-end">
                <button onClick={deleteApi} className="btn btn-primary">Vymazať</button>
                <button onClick={closeDeleteListWarning} className="btn btn-primary">Zrušiť</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteWarning