import { Server } from "socket.io";

class SocketService {
    private _io: Server;
    constructor () {
        console.log("SocketService initialized");
        this._io = new Server();
    }

    public initListener() {
        const io = this._io;
        console.log("Init Socket Init...");
        
        io.on("connect", async (socket)=>{
            console.log("Socket connected", socket.id);
            socket.on("event:message", async ({message}:{message: string})=>{
                console.log("New message", message);
                
            })
        })
    }

    get io() {
        return this._io
    }
}

export default SocketService;