import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

const URL = import.meta.env.VITE_URL

console.log('URL', URL)

export const socket = io(URL, { transports : ['websocket'] });

socket.on("connect", () => {
    state.connected = true;
});

socket.on("disconnect", () => {
    state.connected = false;
});

