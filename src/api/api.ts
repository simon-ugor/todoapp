export async function submitList(newListName: string) {
    const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists", {
        method: "POST",
        body: JSON.stringify({"name": newListName}),
        headers: {
            "Content-Type": "application/json"
        }
      })
      const data = await res.json();
      return data;
}

export async function deleteListApi(id: string) {
    const resList = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists/" + id, {
        method: "DELETE"
    })
    const dataList = await resList.json();
    return dataList
}

export async function deleteItemApi(id: string) {
    const resItem = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items/" + id, {
        method: "DELETE"
    })
    const dataItem = await resItem.json();
    return dataItem;
}

export async function submitToDo(name: string, desc: string, deadline: string, reference: string) {
    const resItem = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items", {
        method: "POST",
        body: JSON.stringify({"name": name, "deadline": deadline, "listReferenceId": reference, "description": desc, "completed": false}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const dataItem = await resItem.json();
    return dataItem;
}