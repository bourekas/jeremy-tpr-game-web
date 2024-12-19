import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export default function ActionButton({ name, children, onClick }) {
  return (
    <Tooltip title={name}>
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
}
