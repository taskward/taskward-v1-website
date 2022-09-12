import { useState } from "react";
import type { TaskFormData } from "@interfaces";

// Manage the task list data logic
const useTaskCreator = () => {
  const [tasksData, setTasksData] = useState<TaskFormData[]>([]);

  const removeTask = (tasks: TaskFormData[], id: string): TaskFormData[] => {
    const result = tasks.filter((task) => task.id !== id);
    setTasksData(result);
    return result;
  };

  const changeChecked = (tasks: TaskFormData[], id: string): TaskFormData[] => {
    const result = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, finished: !task.finished };
      }
      return task;
    });
    setTasksData(result);
    return result;
  };

  const changeContent = (
    tasks: TaskFormData[],
    id: string,
    content: string | null
  ): TaskFormData[] => {
    const result = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, content: content };
      }
      return task;
    });
    return result;
  };

  const changeLinkUrl = (
    tasks: TaskFormData[],
    id: string,
    linkUrl: string | null
  ): TaskFormData[] => {
    const result = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, linkUrl: linkUrl };
      }
      return task;
    });
    return result;
  };

  return {
    tasksData,
    setTasksData,
    removeTask,
    changeChecked,
    changeContent,
    changeLinkUrl,
  };
};

export default useTaskCreator;
