import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
        throw new Error("Unable to Login");
    }

    const data = await res.data;
    return data;
}

export const SignUpUser = async (name: string, email: string, password: string) => {
    const res = await axios.post(`/user/register`, { name, email, password });
    if (res.status !== 200) {
        throw new Error("Unable to Register");
    }

    const data = await res.data;
    return data;
}

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
        throw new Error("Unable to Authenticate");
    }

    const data = await res.data;
    return data;
}

export const sendChatRequest = async (message: string) => {
    console.log(message);

    const res = await axios.post("/chat/new", { message });
    console.log(res);

    if (res.status !== 200) {
        throw new Error("Unable to send Message");
    }

    const data = await res.data;
    return data;
}

export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");
    if (res.status !== 200) {
        throw new Error("Unable to get chats");
    }

    const data = await res.data;
    return data;
}

export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");
    if (res.status !== 200) {
        throw new Error("Unable to delete chats");
    }

    const data = await res.data;
    return data;
}

export const logoutUser = async () => {
    const res = await axios.delete("/user/logout");
    if (res.status !== 200) {
        throw new Error("Unable to logout chats");
    }
    const data = await res.data;
    return data;
}