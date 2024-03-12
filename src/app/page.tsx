import { Container } from "@mui/material";

import TodoModal from "./components/TodoModal";
import TodoList from "./components/TodoList";
import TodoHeader from "./components/TodoHeader";

export default function Home() {
  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 3 }}>
      <TodoHeader />
      <TodoList />
      <TodoModal />
    </Container>
  );
}
