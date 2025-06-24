export interface User {
  id: string;
  email: string;
  name: string;
  avatar:string;
  role: "super_admin" | "admin" | "staff";
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
}


export interface LoginCredentials {
  email: string;
  password: string;
}

// Auth Store State Type
export interface AuthState {
  user: User | null;
  token: string | null;
  refresh_token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  permissions: string[]; // Flattened permission codes
}
