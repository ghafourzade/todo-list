import { Box, Button, Container, Divider, Grid, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import TodoCard from "./components/TodoCard";

export default function Home() {
  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 3 }}>
      <Typography variant="h4" component="h1">
        Todo List
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ textTransform: "none" }}>
          New Task
        </Button>
        <Button variant="outlined" startIcon={<FilterAltIcon />} sx={{ textTransform: "none" }}>
          Filter
        </Button>
      </Box>
      <TextField id="search-input" label="Search" variant="outlined" sx={{ width: "100%" }} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <TodoCard />
        </Grid>
      </Grid>
    </Container>
  );
}
