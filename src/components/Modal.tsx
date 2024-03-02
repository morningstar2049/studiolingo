import { SxProps, Theme } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type TCustomModalProps = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sx?: SxProps<Theme>;
};

function Modal({ children, title, open, setOpen, sx }: TCustomModalProps) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontFamily: "'FiraGO', sans-serif",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{
            fontFamily: "'FiraGO', sans-serif",
            ...sx,
          }}
        >
          {children}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
