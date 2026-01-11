"use client"
import React, { createContext, useState } from "react";

export const signInUserContext = createContext({
    signInUser: {
        status: false,
        provider: null,
        openId: null
    },
    setSignInUser: () => { }
});

export const SignInUserContextUpdate = ({ children }) => {
    const [signInUser, setSignInUser] = useState({
        status: false,
        provider: null,
        openId: null
    });

    return (
        <signInUserContext.Provider value={{ signInUser, setSignInUser }}>
            {children}
        </signInUserContext.Provider>
    );
};