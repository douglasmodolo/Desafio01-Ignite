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

    // const newTaskObject: TaskType = {
    //   id: tasks.length + 1,
    //   title: newTask,
    //   isChecked: false,
    // }

    // setTasks([...tasks, newTaskObject]);
    // setNewTask('');

    // handleUpdateCompletedInfo(tasks);

    setTasks((prevTasks) => {
      const newTaskObject: TaskType = {
        id: prevTasks.length + 1,
        title: newTask,
        isChecked: false,
      };
  
      const updatedTasks = [...prevTasks, newTaskObject];
  
      handleUpdateCompletedInfo(updatedTasks); // Chama com a lista atualizada
      return updatedTasks;
    });
  
    setNewTask('');    
  }

  function handleCountTask() {
    const newTaskCount = taskCount + 1;
    setTaskCount(newTaskCount);
    handleUpdateCompletedInfo(tasks);
  }

  // function handleUpdateCompletedInfo(taskCount: number) {
  //   const totalCompletedTasks = tasks.filter(task => task.isChecked).length;
  //   setCompletedTaskCount(`${totalCompletedTasks} de ${taskCount}`);
  // }

  function handleUpdateCompletedInfo(tasksList: TaskType[]) {
    const totalCompletedTasks = tasksList.filter(task => task.isChecked).length;
    setCompletedTaskCount(`${totalCompletedTasks} de ${tasksList.length}`);
  }

  function deleteTask(taskToDelete: TaskType) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete.id;
    });

    setTasks(tasksWithoutDeletedOne);
    const newTaskCount = taskCount - 1;
    setTaskCount(newTaskCount);
    handleUpdateCompletedInfo(tasksWithoutDeletedOne);
  }

  function handleToggleTask({ id, value }: { id: number, value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value };
      }
  
      return task;
    });
  
    setTasks(updatedTasks); 
    handleUpdateCompletedInfo(updatedTasks);

    // const totalCompletedTasks = updatedTasks.filter(task => task.isChecked).length;
    // setCompletedTaskCount(`${totalCompletedTasks} de ${taskCount}`);
  }

  const isNewTaskEmpty = newTask.length == 0;

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

        <button type='submit' disabled={isNewTaskEmpty} onClick={handleCountTask}>
          Criar
        </button>
      </form>

      <main className={styles.main}>        
        <div className={styles.wrapper}>
          <div className={styles.tasksHeader}>
            <div className={styles.createdTasks}>
              <span>Tarefas criadas </span>
              <span className={styles.count}>{taskCount}</span>              
            </div>
            <div className={styles.completedTasks}>
              <span>Concluídas </span>
              <span className={styles.count}>{completedTaskCount}</span>
            </div>
          </div>

          {tasks.map(task => {
            return (
              <Task 
                key={task.id} 
                task={task}
                onDeleteTask={deleteTask}
                toggleTaskStatus={handleToggleTask}
              />
            )
          })}
        </div>
      </main>
    </>
  );
}