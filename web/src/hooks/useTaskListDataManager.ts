import { useState } from "react";
import type { TaskFormData } from "@interfaces";

const useTaskListDataManager = () => {
  const [tasksData, setTasksData] = useState<TaskFormData[]>([]);

  // Only used in NoteCreator
  const removeCreatedTask = (
    tasks: TaskFormData[],
    id: string | number
  ): TaskFormData[] => {
    const result = tasks.filter((task) => task.id !== id);
    setTasksData(result);
    return result;
  };

  const removeTask = (
    tasks: TaskFormData[],
    id: string | number
  ): TaskFormData[] => {
    const result = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, deleted: true };
      }
      return task;
    });
    return result;
  };

  const changeChecked = (
    tasks: TaskFormData[],
    id: string | number
  ): TaskFormData[] => {
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
    id: string | number,
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
    id: string | number,
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

  const getLinkUrl = (
    tasks: TaskFormData[],
    id: string | number
  ): string | null | undefined => {
    return tasks.find((task) => task.id === id)?.linkUrl;
  };

  return {
    tasksData,
    setTasksData,
    removeCreatedTask,
    removeTask,
    changeChecked,
    changeContent,
    changeLinkUrl,
    getLinkUrl
  };
};

export default useTaskListDataManager;
