import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const INITIAL_USERS = [
  {
    id: 'user-super-1',
    name: 'Chief Administrator',
    email: 'superadmin@skyglobalhr.com',
    password: 'admin123',
    role: 'super_admin',
    department: 'Executive Management',
    createdAt: '2025-01-10'
  },
  {
    id: 'user-admin-1',
    name: 'Recruitment Manager (Dubai)',
    email: 'admin@skyglobalhr.com',
    password: 'admin123',
    role: 'admin',
    department: 'Overseas Talent Operations',
    createdAt: '2025-03-15'
  }
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('skyglobal_cms_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('skyglobal_cms_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('skyglobal_cms_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('skyglobal_cms_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('skyglobal_cms_auth_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const found = users.find(
      u => u.email.toLowerCase() === trimmedEmail && u.password === password
    );

    if (found) {
      const sessionUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        department: found.department
      };
      setCurrentUser(sessionUser);
      return { success: true, user: sessionUser };
    }

    return { 
      success: false, 
      message: 'Invalid email address or password. Try superadmin@skyglobalhr.com / admin123' 
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addAdminUser = (newUserData) => {
    if (currentUser?.role !== 'super_admin') {
      return { success: false, message: 'Only Super Admins can create administrative accounts.' };
    }

    const emailExists = users.some(u => u.email.toLowerCase() === newUserData.email.trim().toLowerCase());
    if (emailExists) {
      return { success: false, message: 'A user with this email address already exists.' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: newUserData.name,
      email: newUserData.email.trim().toLowerCase(),
      password: newUserData.password || 'admin123',
      role: newUserData.role || 'admin',
      department: newUserData.department || 'General Administration',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newUser]);
    return { success: true, user: newUser };
  };

  const deleteAdminUser = (userId) => {
    if (currentUser?.role !== 'super_admin') {
      return { success: false, message: 'Only Super Admins can remove accounts.' };
    }
    if (userId === currentUser.id) {
      return { success: false, message: 'You cannot delete your own active account.' };
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    return { success: true };
  };

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isAdmin = currentUser?.role === 'admin' || isSuperAdmin;

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      logout,
      addAdminUser,
      deleteAdminUser,
      isSuperAdmin,
      isAdmin,
      isAuthenticated: !!currentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
