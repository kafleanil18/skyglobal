import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiLogin, apiFetchUsers, apiAddUser, apiDeleteUser } from '../services/api';

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

function safeStorageGet(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved || saved === 'undefined' || saved === 'null') return fallback;
    return JSON.parse(saved);
  } catch (e) {
    console.warn('Error reading ' + key + ' from localStorage, falling back to default:', e);
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Unable to persist ' + key + ' to localStorage:', e);
  }
}

function safeStorageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('Unable to remove ' + key + ' from localStorage:', e);
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => safeStorageGet('skyglobal_cms_users', INITIAL_USERS));
  const [currentUser, setCurrentUser] = useState(() => safeStorageGet('skyglobal_cms_auth_user', null));

  // Sync users from MongoDB when online
  useEffect(() => {
    let isMounted = true;
    async function loadRemoteUsers() {
      const remoteUsers = await apiFetchUsers();
      if (isMounted && Array.isArray(remoteUsers) && remoteUsers.length > 0) {
        setUsers(prev => {
          const map = new Map(prev.map(u => [u.id, u]));
          remoteUsers.forEach(ru => {
            const existing = map.get(ru.id) || {};
            map.set(ru.id, { ...existing, ...ru });
          });
          return Array.from(map.values());
        });
      }
    }
    loadRemoteUsers();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    safeStorageSet('skyglobal_cms_users', users);
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      safeStorageSet('skyglobal_cms_auth_user', currentUser);
    } else {
      safeStorageRemove('skyglobal_cms_auth_user');
    }
  }, [currentUser]);

  const login = async (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();

    // 1. Try remote MongoDB authentication
    try {
      const apiRes = await apiLogin(trimmedEmail, password);
      if (apiRes && apiRes.success && apiRes.user) {
        setCurrentUser(apiRes.user);
        return { success: true, user: apiRes.user, source: 'mongodb' };
      }
    } catch (e) {
      // Fall through to local fallback
    }

    // 2. Hybrid fallback: check local storage users
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
      return { success: true, user: sessionUser, source: 'local' };
    }

    return { 
      success: false, 
      message: 'Invalid email address or password. Try superadmin@skyglobalhr.com / admin123' 
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addAdminUser = async (newUserData) => {
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

    // Persist to MongoDB
    apiAddUser(newUser).catch(err => console.warn('[Auth] Remote user persist error:', err));

    return { success: true, user: newUser };
  };

  const deleteAdminUser = async (userId) => {
    if (currentUser?.role !== 'super_admin') {
      return { success: false, message: 'Only Super Admins can remove accounts.' };
    }
    if (userId === currentUser.id) {
      return { success: false, message: 'You cannot delete your own active account.' };
    }
    setUsers(prev => prev.filter(u => u.id !== userId));

    // Delete from MongoDB
    apiDeleteUser(userId).catch(err => console.warn('[Auth] Remote user delete error:', err));

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
