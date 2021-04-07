
const completeTask = document.querySelectorAll('.completed-task')
const uncompletedTask = document.querySelectorAll('.undo-task')
const deleteTask = document.querySelectorAll('.delete-task')



Array.from(deleteTask).forEach((element) =>{
    element.addEventListener('click', delTask)
})
Array.from(completeTask).forEach((element) =>{
    element.addEventListener('click', completedTask)
})
Array.from(uncompletedTask).forEach((element) =>{
    element.addEventListener('click', undoTask)
})


async function delTask(){
    const task = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('delTask', {
            method: 'delete', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'todoS': task
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function completedTask(){
    const task = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('completedTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': task
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function undoTask(){
    const task = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('undoTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': task
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
        
    }catch(err){
        console.log(err)
    }
}