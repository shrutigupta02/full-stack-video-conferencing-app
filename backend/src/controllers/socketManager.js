import { Server } from "socket.io"


let connections = {}  // tracks which users (by socket.id) are in which room by path.
let messages = {}     // stores chat messages for each room (by path).
let timeOnline = {}   // tracks when each user joined (by socket.id).

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });


    io.on("connection", (socket) => {

        //listens for new socket connections
        console.log("SOMETHING CONNECTED")

        socket.on("join-call", (path) => {

            if (connections[path] === undefined) {
                connections[path] = []
            }
            connections[path].push(socket.id) //adds user in room i.e. path

            timeOnline[socket.id] = new Date();

            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]) //notifies all people in room that user joined
            }

            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            } //used to send all old messages to newly joined user

        })

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => {

            const [matchingRoom, found] = Object.entries(connections) //finds room that user is in
                .reduce(([room, isFound], [roomKey, roomValue]) => {


                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) { //checks if there are any messages in the room, if not it initialises an empty array
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id }) //sends message
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => { //notifies every person in room of new message
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }

        })

        socket.on("disconnect", () => {

            var diffTime = Math.abs(timeOnline[socket.id] - new Date()) //calculate online time

            var key

            //k = all rooms, v = all persons
            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k //find the room of user

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        } // notify everyone in room that user left

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1) //remove user from room


                        if (connections[key].length === 0) {
                            delete connections[key] //if room is empty then delete room
                        }
                    }
                }

            }


        })


    })


    return io;
}
