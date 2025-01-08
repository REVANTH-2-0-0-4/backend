import socket from "socket.io-client";

let socketinstance = null;
export const initializesocket = ()=>{
    socketinstance  = socket(import.meta.env.VITE_API_URL,{
        auth : {
            token : localStorage.getItem('token')
        }
    });
    return socketinstance;

}