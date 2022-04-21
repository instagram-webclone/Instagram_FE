import socketIO from "socket.io-client";



export const socket = socketIO("http://52.79.69.255:4000", {
  extraHeaders: { authorization: localStorage.getItem("user") },
});

export const chatSocket = socketIO(`http://52.79.69.255:4000/chat`, {
  extraHeaders: {
    authorization: localStorage.getItem("info")},
  auth: {

  }
});

