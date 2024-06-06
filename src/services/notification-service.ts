import { toast } from 'react-toastify'
type Action = 'CREATE' | 'EDIT' | 'UPLOAD' | 'DELETE'

class NotificationService {
  static showError(message: string) {
    return toast.error(message)
  }
  static showSuccess(action: Action) {
    return toast.success(NotificationService.generateMessage(action))
  }

  static generateMessage(action: Action): string {
    switch (action) {
      case 'CREATE':
        return 'Create successfully'
      case 'EDIT':
        return 'Edit successfully'
      case 'DELETE':
        return 'Delete successfully'
      case 'UPLOAD':
        return 'Upload successfully'
      default:
        return 'Internal system error'
    }
  }

  static generateMessageFailed(action: Action): string {
    switch (action) {
      case 'CREATE':
        return 'Failed to create'
      case 'EDIT':
        return 'Failed to edit'
      case 'DELETE':
        return 'Failed to delete'
      case 'UPLOAD':
        return 'Failed to upload'
      default:
        return 'Internal system error'
    }
  }
}

export default NotificationService
