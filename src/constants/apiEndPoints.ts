const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login/',
    FORGOT_PASSWORD: '/api/auth/forgot-password/',
    VERIFY_PASSWORD: '/api/auth/verify-password/',
  },
  ATTENDANCE: {
    LIST: '/api/attendance/list',
    MY: '/api/attendance/my/',
    STATS: (groupId: number) => `/api/attendance/stats/${groupId}/`,
    UPDATE: (id: number) => `/api/attendance/update/${id}/`,
  },
  USER: {
    USER_ME: '/user',
  },
}
export const { AUTH, ATTENDANCE, USER } = API_ENDPOINTS
