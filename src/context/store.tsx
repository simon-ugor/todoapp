import { createContext, useContext, ReactNode, useState, useEffect } from "react";

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

type warningType = {
    message: string
    hidden: string
}

type toDeleteType = {
    whatToDelete: string
    id: string
}

type alertType = {
    text: string
    hidden: string
}

type warningContextType = {
    warning: warningType
    ulHidden: string
    allLists: List[]
    allItems: Item[]
    allItemsInitial: Item[]
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
    setItemsInitial: (data: Item[]) => void
    setChosenLiId: (listId: number) => void
    setAlert: (text: string) => void
    closeAlert: () => void
}

const warningDefaultValues: warningContextType = {
    warning: {"message": "", "hidden": "hidden"},
    ulHidden: "hidden",
    allLists: [],
    allItems: [],
    allItemsInitial: [],
    toDelete: {"whatToDelete": "", id: ""},
    chosenListId: 1,
    alertData: {"text": "", "hidden": "hidden"},
    showDeleteListWarning: () => {},
    closeDeleteListWarning: () => {},
    toggleUlHidden: () => {},
    showDeleteItemWarning: () => {},
    setLists: (data: List[]) => {},
    appendList: (data: List) => {},
    setWhatToDelete: (type: string, id: string) => {},
    setItems: (data: Item[]) => {},
    setItemsInitial: (data: Item[]) => {},
    setChosenLiId: (listId: number) => {},
    setAlert: (text: string) => {},
    closeAlert: () => {},
}

const WarningContext = createContext<warningContextType>(warningDefaultValues);

export function useWarning() {
    return useContext(WarningContext);
}

type Props = {
    children: ReactNode
}

export function WarningProvider({ children }: Props) {

    const [warning, setWarning] = useState({"message": "", "hidden": "hidden"});
    const [ulHidden, setUlHidden] = useState("hidden");
    const [allLists, setAllLists] = useState<List[]>([]);
    const [allItems, setAllItems] = useState<Item[]>([]);
    const [allItemsInitial, setAllItemsInitial] = useState<Item[]>([]);
    const [toDelete, setToDelete] = useState({"whatToDelete": "", "id": ""});
    const [chosenListId, setChosenListId] = useState(1);
    const [alertData, setAlertData] = useState({"text": "", "hidden": "hidden"});

    const showDeleteListWarning = () => {
        setWarning({"message": "Táto akcia vymaže celý zoznam spolu so všetkými to-dos v danom zozname", "hidden": ""});
        setUlHidden("hidden");
    }

    const setAlert = (text: string) => { setAlertData({"text": text, "hidden": ""}) }

    const closeAlert = () => { setAlertData({"text": "", "hidden": "hidden" }) }

    const closeDeleteListWarning = () => { setWarning({"message": "", "hidden": "hidden" }) }

    const showDeleteItemWarning = () => {
        setWarning({"message": "Táto akcia vymaže zvolené to-do", "hidden": ""});
        setUlHidden("hidden");
    }

    const toggleUlHidden = () => {
        if (ulHidden == "hidden") {
            setUlHidden("");
        } else {
            setUlHidden("hidden");
        }
    }

    const setLists = (data: List[]) => { setAllLists([...data]) }

    const appendList = (data: List) => { setAllLists([...allLists, data]) }

    const setItems = (data: Item[]) => { setAllItems([...data]) }

    const setItemsInitial = (data: Item[]) => { setAllItemsInitial([...data]) }

    const setWhatToDelete = (type: string, id: string) => { setToDelete({"whatToDelete": type, "id": id}) }

    const setChosenLiId = (listId: number) => { setChosenListId(listId) }

    const value = {
        warning,
        ulHidden,
        allLists,
        allItems,
        toDelete,
        chosenListId,
        alertData,
        allItemsInitial,
        toggleUlHidden,
        showDeleteListWarning,
        closeDeleteListWarning,
        showDeleteItemWarning,
        setLists,
        appendList,
        setWhatToDelete,
        setItems,
        setChosenLiId,
        setAlert,
        closeAlert,
        setItemsInitial
    }

    return (
        <>
            <WarningContext.Provider value={value}>
                {children}
            </WarningContext.Provider>
        </>
    )

}