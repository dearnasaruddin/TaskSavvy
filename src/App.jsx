import { useEffect, useRef, useState } from "react"
import { getDatabase, push, ref, set, onValue, remove, update } from "firebase/database";
import { MdDeleteOutline, MdOutlineEdit, MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";


function App() {

  const db = getDatabase();



  // ===================== useState Hooks =====================
  let [inputText, setInputText] = useState("")
  let [editInputText, setEditInputText] = useState("")
  let [taskError, setTaskError] = useState("")
  let [allTask, setAllTask] = useState([])
  let [editTaskKey, setEditTaskKey] = useState(null)
  let [editableIndex, setEditableIndex] = useState(null)



  // ===================== useRef Hooks =====================
  let inputRef = useRef()
  let editInputRef = useRef()




  // ===================== useEffect Hooks =====================
  useEffect(() => {
    const toDoRef = ref(db, "tasks/");
    onValue(toDoRef, (snapshot) => {
      let taskArr = []

      snapshot.forEach((item) => {
        taskArr.push({ ...item.val(), id: item.key })
      })
      setAllTask(taskArr)
    });
  }, [])


  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  useEffect(() => {
    if (editableIndex !== null) {
      editInputRef.current?.focus();
    }
  }, [editableIndex]);




  // ===================== event related functions =====================
  let handleInput = (e) => {
    setInputText(e.target.value)
    setTaskError("")
  }

  let handleSubmit = () => {
    if (!inputText) {
      inputRef.current.focus()
      setTaskError("Task is required!")
    } else {
      set(push(ref(db, "tasks/")), {
        name: inputText,
      }).then(() => {
        setInputText("")
      }).catch((err) => {
        console.log(err)
      });
    }
  }


  let handleEdit = (index, editTaskKey) => {
    setEditableIndex(index)
    setEditTaskKey(editTaskKey)
  }


  let handleUpdate = () => {
    update(ref(db, "tasks/" + editTaskKey), {
      name: editInputText
    }).then(() => setEditableIndex(null))
  }


  let handleDelete = (taskKey) => {
    remove(ref(db, "tasks/" + taskKey))
  }




  return (

    <>
      <div className="h-screen flex justify-center items-center px-2.5 bg-[#f1f1f1]">
        <div>
          {/* ===================== Heading & SubHeading ===================== */}
          <h1 className="text-3xl text-center uppercase">TaskSavvy</h1>
          <p className="max-w-80 mx-auto text-center mb-7 mt-2 text-gray-600">A complete ToDo project with CRUD oparetions in Firebase using React & Tailwind</p>
          <div className="flex gap-3">

            {/* ===================== Task Input & Add Button ===================== */}
            <input type="text" name="" id="" placeholder="Write your task" ref={inputRef} onChange={handleInput} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} value={inputText} className={`w-full rounded-lg px-3 py-1.5 text-xl border ${taskError && "focus:border-2 focus:border-red-500 focus:outline-none"}`} />
            <button type="submit" onClick={handleSubmit} className="text-xl bg-linear-[90deg,#4065ae_0%,#00aab7_100%] py-1.5 px-4 rounded-lg text-white cursor-pointer">Add</button>
          </div>

          {taskError && <p className="text-red-500 my-2">{taskError}</p>}
          <ul className="h-85 overflow-auto mt-4 pr-2">

            {allTask.map((item, index) =>
              <li key={index} className="text-xl pl-3 pr-1 py-1.5 mb-1 border rounded-lg flex gap-x-7 justify-between items-center hover:bg-gray-200">

                {/* ===================== Edit Input, Update & Cancel Buttons ===================== */}
                {editableIndex === index ?
                  <span className="flex gap-2 justify-between items-center w-full ">
                    <input type="text" ref={editInputRef} onChange={(e) => setEditInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleUpdate()} className="w-full border border-gray-500 py-0.5 px-2"></input>
                    <span onClick={handleUpdate} className="p-1 hover:text-green-400 cursor-pointer">
                      <MdDone />
                    </span>
                    <span onClick={() => setEditableIndex(null)} className="p-1 hover:text-red-500 cursor-pointer">
                      <RxCross2 />
                    </span>
                  </span>
                  :
                  <>
                    {/* ===================== Task Items, Edit & Delete Buttons ===================== */}
                    <span>
                      <span className="mr-2">{index + 1}.</span>{item.name}
                    </span>

                    <div className="flex gap-2 items-center">
                      <span onClick={() => handleEdit(index, item.id)} className="text-2xl hover:text-green-500 cursor-pointer">
                        <MdOutlineEdit />
                      </span>

                      <span onClick={() => handleDelete(item.id)} className="text-3xl hover:text-red-500 cursor-pointer">
                        <MdDeleteOutline />
                      </span>
                    </div>

                  </>}


              </li>)}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
