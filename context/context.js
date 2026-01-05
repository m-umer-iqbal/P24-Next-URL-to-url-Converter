"use client"
import React, { createContext, useState } from "react";

export const signInUserContext = createContext({
    signInUser: {
        status: false,
        method: null
    },
    setSignInUser: () => { }
});

export const SignInUserContextUpdate = ({ children }) => {
    const [signInUser, setSignInUser] = useState({
        status: false,
        method: null
    });

    return (
        <signInUserContext.Provider value={{ signInUser, setSignInUser }}>
            {children}
        </signInUserContext.Provider>
    );
};