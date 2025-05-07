import {auth} from "./firebase";

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

export const register = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};