const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login/',
    FORGOT_PASSWORD: '/api/auth/forgot-password/',
    VERIFY_PASSWORD: '/api/auth/verify-password/',
    USER_LIST: '/api/auth/user-list/',
    PROFILE_GET: '/api/auth/my-profile-list/',
    PROFILE_UPDATE: '/api/auth/my-profile-update-delete/',
  },
  ATTENDANCE: {
    LIST: '/api/attendance/list',
    MY: '/api/attendance/my/',
    BULK_UPDATE: '/api/attendance/bulk-update/',
    GROUP_ATTENDANCE: (groupId: number) => `/api/attendance/stats/${groupId}/`,
  },
  GROUP: {
    MY: '/api/groups/my/',
    STUDENTS_LIST: '/api/groups/students-list/',
    AVAILABLE_STUDENTS: (groupId: number) =>
      `/api/groups/${groupId}/available-students/`,
    ADD_STUDENT: (groupId: number) => `/api/groups/${groupId}/add-student/`,
    REMOVE_STUDENT: (groupId: number, studentId: number) =>
      `/api/groups/${groupId}/remove-student/${studentId}/`,
  },
  NOTIFICATIONS: {
    MY: '/api/notifications/my/',
    MARK_READ: (id: number) => `/api/notifications/${id}/read/`,
    MARK_ALL_READ: '/api/notifications/read-all/',
    UNREAD_COUNT: '/api/notifications/unread-count/',
  },
  USER: {
    USER_ME: '/user',
  },
}
export const { AUTH, ATTENDANCE, GROUP, NOTIFICATIONS, USER } = API_ENDPOINTS
