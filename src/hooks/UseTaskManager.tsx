import { useState } from "react";
import { nanoid } from "nanoid";

interface Task {
  id: string;
  title: string;
}

interface TaskManager {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
  filterTasks: (keyword: string) => Task[];
}

export const useTaskManager = (): TaskManager => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    if (title.trim() !== "") {
      const newTask: Task = { id: nanoid(), title };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, newTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const filterTasks = (keyword: string) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  return { tasks, addTask, deleteTask, updateTask, filterTasks };
};
