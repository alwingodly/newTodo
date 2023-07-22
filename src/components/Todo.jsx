import React from 'react'
import {useState , useRef , useEffect} from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';
import {IoMdDoneAll } from 'react-icons/io';
function Todo() {
    let [input , setInput] = useState('')
    const [data , setdata] = useState([])
    const inputref = useRef('null')
    const [editid, seteditid] = useState(0)

    useEffect(()=>{
        inputref.current.focus();
    })

const addTodo = ()=>{
  if(input!==''){
    setdata([...data,{todolist:input , id:Date.now(), status:false}])
    setInput('')
  }
  else{
    setdata([...data])
    setInput('')
  }
    if(editid){
    setdata(data.map((to)=>to.id === editid ? (to = {id: to.id , todolist:input}) : (to = {id: to.id , todolist:to.todolist})))
    seteditid('')
    }

    // if(editid){
    //   setdata(data.map((to)=>{
    //     if(to.id === editid){
    //       to.todolist = input
    //     }
    //     return to
    //   } ))
    //   seteditid('')
    //   }
}

const onDelete = (id)=>{
  setdata(data.filter((to)=>{
    return to.id !== id
  }))
}

const doneAll = (id)=>{
 setdata(data.map((tolist)=>{
 if(tolist.id===id ){
  tolist.status = !tolist.status
 }
 return tolist
 }))
}


const editdata = (id) =>{
const editTodo = data.find((to)=>{
  return to.id === id
}

)
setInput(editTodo.todolist)
seteditid(editTodo.id)
}

const handleSubmit = (e)=>{
  e.preventDefault();
}

  return (
    <div className='container'>
      <h2>TODO APP 😉</h2>
      <form className='form-group' onSubmit={handleSubmit}>

        <input value = {input}  onChange={(e)=>{
            setInput(e.target.value)
        }} 
        type='text' placeholder='Enter your todo' ref={inputref}/>

        <button onClick={addTodo} >{editid ? 'EDIT' : 'ADD'}</button>
      </form>

      {
       data.map((obj)=>{
        return(
            <div className='list'>
            <ul>
              <li className='form-group' >
              <span id={obj.status ? 'cut': ''} >{obj.todolist}</span>
              <span>
              <IoMdDoneAll id='done' className='todo-icon done-icon' title='Done' onClick={()=>doneAll(obj.id)}/>
              <AiFillDelete id='delete' className='todo-icon delete-icon' title='Delete' onClick={()=>onDelete(obj.id)} />
              <AiFillEdit id='edit' className='todo-icon edit-icon' title='Edit' onClick={()=>editdata(obj.id)}/>
              </span>
              </li>
            </ul>
          </div>  
        )
      })
        }
    </div>
  )
}

export default Todo
