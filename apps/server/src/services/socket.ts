import { Redis } from "ioredis";
import { Server } from "socket.io";

const pub = new Redis({
    host: "localhost",
    port: 6379,
    username: "default",
    password: "default",
})

const sub = new Redis({
    host: "localhost",
    port: 6379,
    username: "default",
    password: "default",
})

class SocketService {
    private _io: Server;
    constructor () {
        console.log("SocketService initialized");
        this._io = new Server({
            cors: {
                origin: "*",
                allowedHeaders: ["*"]
            }
        });
        sub.subscribe("MESSAGES")
    }

    public initListener() {
        const io = this._io;
        console.log("Init Socket Init...");
        
        io.on("connect", async (socket)=>{
            console.log("Socket connected", socket.id);
            socket.on("event:message", async ({message}:{message: string})=>{
                console.log("New message", message);
                // Publish this msg to redis
                pub.publish("MESSAGES", JSON.stringify({message}))
            })
        })
        sub.on("message", (channel,message)=>{
            if (channel==='MESSAGES') {
                io.emit("message", message)
            }
        })
    }

    get io() {
        return this._io
    }
}

export default SocketService;