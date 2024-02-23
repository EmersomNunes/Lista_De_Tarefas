import { TaskList } from "@/types/TaskList";

type AddAction = {
  type: 'add';
  payload: {
    
  }
}

type listActions = ;

export const listReducer = (list: TaskList[], action: listActions) => {
  return list;
}