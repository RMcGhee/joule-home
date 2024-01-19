import { Box, Modal, SxProps } from "@mui/material";
import { LeftGrow } from "./Basic";
import theme from "../base-theme";

export type HelpPopoverProps = {
    helpText: string;
    isOpen: boolean;
    onClose: () => void;
};

export const HelpPopover: React.FC<HelpPopoverProps> = ({
    helpText,
    isOpen,
    onClose,
  }) => {
    const popoverSx: SxProps = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'background.paper',
      border: `2px solid ${theme.palette.secondary.main}`,
      boxShadow: 24,
      p: 2,
      borderRadius: '7px',
      maxWidth: '400px',
      overflow: 'auto',
    };

    return (
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box padding={2} sx={popoverSx}>
          Hellow my darling.
          {helpText}
          <br/>
          asdfkjkasdfkjalsdkf aklsdjf alsdkfj asldfkj asdlfkj asdlkfj asdlfkj asdlkfj asdlkfj sdfkj sdkfj sdkfj sdkfj sdkfj sdkfj 
        </Box>
      </Modal>
    );
  };