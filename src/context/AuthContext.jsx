import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Tu función auxiliar (se mantiene igual)
function parseJwt(token) {
    try {
        if (!token) return null; // Validación extra
        const parts = token.split('.');
        if (parts.length < 2) return null;
        const payload = parts[1];
        // add padding if needed
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
        const json = atob(padded);
        return JSON.parse(json);
    } catch (e) {
        console.error('Failed to parse JWT', e);
        return null;
    }
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                // CORRECCIÓN: Usamos parseJwt en lugar de jwtDecode
                const decodedUser = parseJwt(storedToken); 
                
                // Verificamos si decodificó bien y si tiene expiración
                if (decodedUser && decodedUser.exp) {
                    if (decodedUser.exp * 1000 > Date.now()) {
                        setToken(storedToken);
                        setUser(decodedUser);
                    } else {
                        console.warn("Token expirado");
                        localStorage.removeItem('token');
                    }
                } else if (decodedUser) {
                    // Si el token no tiene fecha de exp, lo aceptamos (opcional)
                    setToken(storedToken);
                    setUser(decodedUser);
                }
            } catch (error) {
                console.error("Token inválido en localStorage", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    // CORRECCIÓN: Aceptamos el parámetro 'remember' (opcional) si quieres usarlo en el futuro
    const login = (newToken, remember = true) => {
        if (!newToken) {
            console.error("Se intentó iniciar sesión sin token");
            return;
        }

        try {
            // CORRECCIÓN: Usamos parseJwt aquí también
            const decodedUser = parseJwt(newToken);
            
            // Lógica de persistencia
            if (remember) {
                localStorage.setItem('token', newToken);
            } else {
                // Si quisieras que no persista al cerrar el navegador, usarías sessionStorage
                // sessionStorage.setItem('token', newToken);
                localStorage.setItem('token', newToken); // Mantengo tu lógica original
            }

            setToken(newToken);
            setUser(decodedUser);
        } catch (error) {
            console.error("Error decodificando el nuevo token al hacer login", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        // sessionStorage.removeItem('token'); // Limpiar también si usaras session
        setToken(null);
        setUser(null);
    };

    const value = { token, user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export default AuthContext;