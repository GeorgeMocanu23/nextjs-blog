import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Rating
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import ConfirmModal from '../../helper/ConfirmModal'
import CustomReactQuill from '../common/CustomReactQuill'
import EditMessageModal from '../../helper/EditMessageModal'

function MessageList({ messageList }) {
  const { data: session } = useSession()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState(null)
  const [editingMessage, setEditingMessage] = useState(null)
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false)
  const [originalMessage, setOriginalMessage] = useState(null)

  const handleOpenDeleteModal = (messageObj) => {
    setMessageToDelete(messageObj)
    setDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setMessageToDelete(null)
    setDeleteModalOpen(false)
  }

  const handleDelete = (messageObj) => {
    handleOpenDeleteModal(messageObj)
  }

  const handleOpenEditModal = (messageObj) => {
    setEditingMessage(messageObj)
    setOriginalMessage(messageObj.message)
    setIsEditingModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setEditingMessage(null)
    setIsEditingModalOpen(false)
  }

  const handleEdit = (messageObj) => {
    handleOpenEditModal(messageObj)
  }

  function formatDateTime(dateTime) {
    const date = new Date(dateTime).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const time = new Date(dateTime).toLocaleTimeString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    return `${date}, ${time}`
  }

  const canEditOrDelete = (userId) => {
    return session?.user?.id === userId;
  }

  const handleEditConfirmed = async () => {
    try {
      await fetch('api/user/crud-messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          messageId: editingMessage.id,
          message: editingMessage.value,
        }),
      })
    } catch (error) {
      console.error('Error updating message:', error)
    } finally {
      setIsEditingModalOpen(false);
      handleCloseEditModal();
    }
  }

  const handleDeleteConfirmed = async () => {
    try {
      if (messageToDelete) {
        await fetch('api/user/crud-messages', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user.id,
            messageId: messageToDelete.id,
          }),
        })
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    } finally {
      handleCloseDeleteModal()
    }
  }

  return (
    <>
      {messageList.map((messageObj, index) => (
        <div key={index} style={{ marginBottom: '8px' }}>
          <Card sx={{ maxWidth: 'auto', width: '100%', borderRadius: '25px' }} elevation={4}>
            <CardContent>
              <Typography sx={{ display: 'inline' }}>
                <span
                  style={{
                    fontWeight: 'bold'
                  }}
                >
                  {messageObj.user.username}
                </span> {" "}
                <span
                  style={{
                    fontStyle: 'italic'
                  }}
                >
                  {formatDateTime(messageObj.createdAt)}
                </span> {" "}
                {formatDateTime(messageObj.createdAt) !==
                  formatDateTime(messageObj.updatedAt) && 
                  <span
                    style={{
                      fontStyle: 'italic'
                    }}
                  >
                    {"edited at: " + formatDateTime(messageObj.updatedAt)}
                  </span>
                }
              </Typography>
              <br />
              <Rating value={messageObj.rating} precision={0.5} readOnly />
              <Divider />
              <Typography
                sx={{ p: 1 }}
                dangerouslySetInnerHTML={{ __html: messageObj.message }} />
              {canEditOrDelete(messageObj.user.id) && (
                <div>
                  <Button
                    style={{ textTransform: 'none' }}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(messageObj)}>
                    <EditIcon fontSize="small" />
                    Edit
                  </Button>{" "}
                  <Button
                    style={{ textTransform: 'none' }}
                    variant="contained"
                    color="error"
                    size="small" 
                    onClick={() => handleDelete(messageObj)}>
                    <DeleteIcon fontSize="small" />
                    Delete
                  </Button>
                </div>
              )}
              <EditMessageModal
                open={isEditingModalOpen}
                onClose={handleCloseEditModal}
                onConfirm={handleEditConfirmed}
                onCancel={handleCloseEditModal}
              >
                <CustomReactQuill
                  value={editingMessage?.value || originalMessage}
                  onChange={(value) =>
                    setEditingMessage(prevState => ({ ...prevState, value }))}
                />
              </EditMessageModal>
            </CardContent>
          </Card>
        </div>
      ))}
      <ConfirmModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        message="Are you sure you want to delete this message?"
        onConfirm={handleDeleteConfirmed}
        onCancel={handleCloseDeleteModal}
      />
    </>
  )
}

export default MessageList