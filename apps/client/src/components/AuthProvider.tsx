import React, { createContext, useState } from 'react';

type Credentials = {
  email: string;
  password: string;
};

export enum Role {
  GUEST = 'GUEST',
  REGISTERED_USER = 'REGISTERED_USER',
  ADMIN = 'ADMIN',
}

export type ArticleType = {
  id: number;
  title: string;
  content: string;
  author: Record<string, number | string | unknown[]>;
  createdAt: string;
};

type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  articles: ArticleType[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (credentials: Credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { user, token } = await response.json();

      setUser(user);
      setToken(token);
      setIsAdmin(user?.role === Role.ADMIN);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
