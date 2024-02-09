
import { FormEvent, useEffect, useState } from "react";
import { remult } from "remult";
import { Task } from "../shared/Task";
import { Content } from "../shared/Content";
import {data} from "../../db/tasks.json"


const taskRepo = remult.repo(Task);
const contentRepo = remult.repo(Content);
const RemultTesk = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
  
    const addTask = async (e: FormEvent) => {
      e.preventDefault();
      try {
        // const newTask = await taskRepo.insert({ title: newTaskTitle }) <- Delete this line
        await taskRepo.insert({ title: newTaskTitle }); // <- replace with this line
        // setTasks([...tasks, newTask])   <-- this line is no longer needed
        setNewTaskTitle("");
      } catch (error) {
        alert((error as { message: string }).message);
      }
    };
    // const addcon = async (e: FormEvent) => {
    //   e.preventDefault();
    //   try {
    //     const c=data.content.map(async (item: { title: any; description: any; img: any; imgTitle: any; imgThumb: any; imgVertical: any; trailer: any; movie: any; duration: any; year: any; limit: any; genre: any; isSeries: any; }) =>{
    //     await contentRepo.insert({ title: item.title,
    //         description: item.description,
    //         img: item.img,
    //         imgTitle: item.imgTitle,
    //         imgThumb: item.imgThumb,
    //         imgVertical: item.imgVertical,
    //         trailer: item.trailer,
    //         movie: item.movie,
    //         duration: item.duration,
    //         year: item.year,
    //         limit: item.limit,
    //         genre: item.genre,
    //         isSeries: item.isSeries, });}) // <- replace with this line
        
    //   } catch (error) {
    //     alert((error as { message: string }).message);
    //   }
    // };
  
    useEffect(() => {
        
      
        return taskRepo
        .liveQuery({
          limit: 20,
          orderBy: { createdAt: "asc" },
          //where: { completed: true },
        })
        .subscribe((info) => setTasks(info.applyChanges));
    }, []);
   
    
  
    return (
      <div>
        <h1>Todos</h1>
        <main>
          <form onSubmit={addTask}>
            <input
              value={newTaskTitle}
              placeholder="What needs to be done?"
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button>Add</button>
          </form>
          {tasks.map((task) => {
            const setTask = (value: Task) =>
              setTasks((tasks) => tasks.map((t) => (t === task ? value : t)));
  
            const setCompleted = async (completed: boolean) =>
              // setTask(await taskRepo.save({ ...task, completed })) <- Delete this line
              await taskRepo.save({ ...task, completed }); // <- replace with this line
  
            const setTitle = (title: string) => setTask({ ...task, title });
  
            const saveTask = async () => {
              try {
                // setTask(await taskRepo.save(task)) <- Delete this line
                await taskRepo.save(task); // <- replace with this line
              } catch (error) {
                alert((error as { message: string }).message);
              }
            };
   
            const deleteTask = async () => {
                try {
                  await taskRepo.delete(task);
                  //setTasks(tasks.filter((t) => t !== task));
                } catch (error) {
                  alert((error as { message: string }).message);
                }
              };
            
  
           
            return (
              <div key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
                <input
                  value={task.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={saveTask}>Save</button>
                <button onClick={deleteTask} >Delete</button>
              </div>
            );
          })}
        </main>
      </div>
    );
  }
  

export default RemultTesk