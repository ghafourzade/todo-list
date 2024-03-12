import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { todoActions } from "@/lib/features/todoSlice";

export default function useTodoLocalStorage() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todoReducer.todos);
  const initialRender = useRef(true);

  useEffect(() => {
    const todosJson = localStorage.getItem("todos");
    if (!todosJson) return;
    const todosTmp = JSON.parse(todosJson);
    dispatch(todoActions.setTodos(todosTmp));
  }, [dispatch]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const todosJson = JSON.stringify(todos);
    localStorage.setItem("todos", todosJson);
  }, [todos]);
}
