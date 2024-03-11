import { Box, Card, Checkbox, IconButton, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function TodoCard() {
  return (
    <Card variant="outlined" sx={{ display: "flex", alignItems: "start", gap: 1, p: 1 }}>
      <Checkbox />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body1" py={1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
          in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginInlineEnd: "auto" }}>
            <CalendarTodayIcon color="primary" sx={{ fontSize: 20 }} />
            <Typography variant="body2" color="primary" py={1}>
              Mar 11, 2024
            </Typography>
          </Box>
          <Box>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
