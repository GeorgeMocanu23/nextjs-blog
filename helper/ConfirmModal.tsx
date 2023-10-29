import { Box, Button, Modal, Paper, Typography } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CancelIcon from '@mui/icons-material/Cancel'

function ConfirmModal({ open, onClose, message, onConfirm, onCancel }) {

  return (
    <Modal open={open} onClose={onClose} id='modal-confirm'>
      <Paper sx={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '40%',
        left: '50%',
        padding: 3
      }}>
        <Typography id='confirm-action-message'>{message}</Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: 2
        }}>
          <Button
            sx={{ marginRight: 2, textTransform: 'none' }}
            id='confirm-action'
            variant='contained'
            color='error'
            onClick={onConfirm}
          >
            <DoneIcon fontSize="small" sx={{ marginRight: 1 }} />
            Delete
          </Button>
          <Button
            sx={{ textTransform: 'none' }}
            id='cancel-action'
            variant='contained'
            onClick={onCancel}
          >
            <CancelIcon fontSize="small" sx={{ marginRight: 1 }} />
            Cancel
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}

export default ConfirmModal