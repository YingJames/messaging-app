import './_chat-room.scss';
import { CurrentUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { CurrentRoomContext } from "../Dashboard/Dashboard";
import { FindMessages } from "../../requests/messages";

const ChatRoom = () => {
    // user variable from firebase
    const { user } = useContext(CurrentUserContext);
    const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
    }, [currentRoom]);
    // TODO: messages do not refresh if clicking same room because useEffect does not run
    // TODO: render the message on the screen
    // TODO how to update the message thread when a new message is sent
    async function getMessages() {
        if (currentRoom) {
            const messages = await FindMessages(currentRoom.messageThread);
            setMessages(messages || []);
        }
    }

    return (
        <div className="chat-room">
            {currentRoom ? <h1>{currentRoom.name}</h1> : <h1>Choose a chat room to start messaging</h1>}
        </div>
    )
};

export default ChatRoom;