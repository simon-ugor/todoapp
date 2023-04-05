import { createContext, useContext, ReactNode, useState } from "react";
import { Item, List, appContextType } from "@/types/types";

const appDefaultValues: appContextType = {
    warning: {"message": "", "hidden": "hidden"},
    ulHidden: "hidden",
    allLists: [],
    allItems: [],
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
    setChosenLiId: (listId: number) => {},
    setAlert: (text: string) => {},
    closeAlert: () => {},
}

const AppContext = createContext<appContextType>(appDefaultValues);

export function useAppContext() {
    return useContext(AppContext);
}

type Props = {
    children: ReactNode
}

export function WarningProvider({ children }: Props) {

    const [warning, setWarning] = useState({"message": "", "hidden": "hidden"});
    const [ulHidden, setUlHidden] = useState("hidden");
    const [allLists, setAllLists] = useState<List[]>([]);
    const [allItems, setAllItems] = useState<Item[]>([]);
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
    }

    return (
        <>
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        </>
    )

}