import styles from './Task.module.css';

export interface TaskType {
    id: number;
    tittle: string;
    isCompleted: false;
}

interface TaskProps{
    task: TaskType
}

export function Task({ task }: TaskProps) {
    return (
        <div className={styles.task}>
            <input type="checkbox" checked={task.isCompleted} readOnly/>
            <span>{task.tittle}</span>
            <button>Excluir</button>
        </div>
    );
}