import { Check, Trash } from '@phosphor-icons/react';

import styles from './Task.module.css';

export interface TaskType {
    id: number;
    title: string;
    isChecked: boolean;
}

interface TaskProps{
    task: TaskType;
    onDeleteTask: (task: TaskType) => void;
    toggleTaskStatus: ({id, value}: { id: number; value: boolean}) => void;
}

export function Task({ task, onDeleteTask, toggleTaskStatus }: TaskProps) {
    const checkboxCheckedClassname = task.isChecked
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']

    function handleTaskToggle() {
        toggleTaskStatus({ id: task.id, value: !task.isChecked })
    }

    function handleDeleteTask() {
        onDeleteTask(task);
    }

    return (
        <div className={styles.task}>
            {/* <button onClick={handleCompleteTask} title='Completar task' className={styles.buttonCompleteTask}>
                <RadioButton size={24}/>
            </button> */}
            
            <label htmlFor="checkbox" onClick={handleTaskToggle}>
                <input readOnly type="checkbox" checked={task.isChecked} />
                <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
                    {task.isChecked && <Check size={12} />}
                </span>
            </label>
            
            <span>{task.title}</span>
            <button onClick={handleDeleteTask} title='Deletar task' className={styles.buttonDeleteTask}>
                <Trash size={20} />
            </button>
        </div>
    );
}