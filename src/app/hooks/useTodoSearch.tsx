import { type ChangeEvent, useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { todoActions } from "@/lib/features/todoSlice";

export default function useTodoSearch() {
  const dispatch = useAppDispatch();

  const search = useAppSelector((state) => state.todoReducer.search);
  const todos = useAppSelector((state) => state.todoReducer.todos);
  const viewTodos = useAppSelector((state) => state.todoReducer.viewTodos);

  useEffect(() => {
    dispatch(todoActions.setViewTodos(todos.filter((c) => c.text.includes(search))));
  }, [dispatch, search, todos]);

  const searchChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => dispatch(todoActions.searchTodo(event.target.value)),
    [dispatch]
  );

  return { viewTodos, searchChangeHandler };
}
