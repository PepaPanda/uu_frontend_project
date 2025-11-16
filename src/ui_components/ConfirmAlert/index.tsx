import { Overlay, Box, ButtonRow, Button } from "./styles";

interface ConfirmDeleteProps {
  open: boolean;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDelete({
  open,
  itemName = "this item",
  onConfirm,
  onCancel,
}: ConfirmDeleteProps) {
  if (!open) return null;

  return (
    <Overlay>
      <Box>
        <p>Are you sure you want to delete {itemName}?</p>
        <ButtonRow>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            style={{ background: "#e53935", color: "white" }}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </ButtonRow>
      </Box>
    </Overlay>
  );
}
