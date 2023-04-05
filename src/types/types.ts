export interface Item {
    id: string
    listReferenceId: string
    name: string
    description: string
    deadline: string
    completed: boolean
}

export interface List {
    id: number
    name: string
}

export type warningType = {
    message: string
    hidden: string
}

export type toDeleteType = {
    whatToDelete: string
    id: string
}

export type alertType = {
    text: string
    hidden: string
}

export type warningContextType = {
    warning: warningType
    ulHidden: string
    allLists: List[]
    allItems: Item[]
    toDelete: toDeleteType
    chosenListId: number
    alertData: alertType
    showDeleteListWarning: () => void
    closeDeleteListWarning: () => void
    toggleUlHidden: () => void
    showDeleteItemWarning: () => void
    setLists: (data: List[]) => void
    appendList: (data: List) => void
    setWhatToDelete: (type: string, id: string) => void
    setItems: (data: Item[]) => void
    setChosenLiId: (listId: number) => void
    setAlert: (text: string) => void
    closeAlert: () => void
}