export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  message: string
  user: UserProfile
  tokens: TokenPair
}

export interface UserProfile {
  id: number
  role: string
  username: string
  phone: string | null
  avatar: string | null
  timezone: string
  bio: string
  learning_goal: string
  created_at: string
  updated_at: string
}

export interface TokenPair {
  refresh: string
  access: string
}
