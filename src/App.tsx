import { Header } from './components/Header';
import { FormEvent, useState } from 'react';

import './global.css';
import styles from './App.module.css';
import { Task, TaskType } from './components/Task';

export function App() {

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState('');
  const [taskCount, setTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState('0 de 0');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (newTask.trim() === '') return; 

    const newTaskObject: TaskType = {
      id: tasks.length + 1,
      tittle: newTask,
      isCompleted: false,
    }

    setTasks([...tasks, newTaskObject]);
    setNewTask('');
  }

  function handleCountTask() {
    setTaskCount(taskCount + 1);
  }

  return (
    <>
      <Header />


      <form onSubmit={handleCreateNewTask} className={styles.inputArea}>
        <textarea           
          name="taskInput" 
          placeholder='Adicione uma nova tarefa'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button type='submit' onClick={handleCountTask}>
          Criar
        </button>
      </form>

      <main className={styles.main}>        
        <div className={styles.wrapper}>
          <div className={styles.tasksHeader}>
            <span>
              Tarefas criadas <span className={styles.count}>{taskCount}</span>
            </span>
            <span>
              Concluídas <span className={styles.count}>{completedTaskCount}</span>
            </span>
          </div>

          {tasks.map(task => {
            return (
              <Task key={task.id} task={task}/>
            )
          })}
        </div>
      </main>
    </>
  );
}