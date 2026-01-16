"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import axios from 'axios';

interface AuthContextType {
    user: any | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const token = await firebaseUser.getIdToken();
                    // Sync with MongoDB (Optional for now)
                    if (process.env.NEXT_PUBLIC_API_URL) {
                        try {
                            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sync`, { token });
                            // Add backend data to Firebase user
                            const userData = Object.assign({}, firebaseUser, {
                                role: response.data.role || 'user',
                                _id: response.data._id,
                                name: response.data.name || firebaseUser.displayName
                            });
                            setUser(userData);
                        } catch (syncError) {
                            console.warn("Auth sync failed, using firebase user with default role:", syncError);
                            // Just add role property to Firebase user
                            const userData = Object.assign({}, firebaseUser, { role: 'user' });
                            setUser(userData);
                        }
                    } else {
                        // Just add role property to Firebase user
                        const userData = Object.assign({}, firebaseUser, { role: 'user' });
                        setUser(userData);
                    }
                } catch (error) {
                    console.error("Auth error:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
