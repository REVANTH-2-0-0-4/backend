import { query } from "express-validator";
import socket from "socket.io-client";

let socketinstance = null;
export const initializesocket = (projectid) => {        
    socketinstance = socket(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        query : {
           projectid :  projectid
        }
    });
    return socketinstance;
}
export const recievemessage = (eventname, cb) => {
    socketinstance.on(eventname, cb);
}
export const sendmessage = (eventname, data) => {
        socketinstance.emit(eventname,data);
}