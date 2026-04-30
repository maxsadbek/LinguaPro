export interface UserData {
  id: number
  username: string
  full_name: string
  role: string
  phone: string | null
  is_active: boolean
  created_at: string
}

export type ProfileResponse = UserData[]

export interface UpdateProfileRequest {
  username?: string
  avatar?: string
  timezone?: string
  bio?: string
  learning_goal?: string
}
