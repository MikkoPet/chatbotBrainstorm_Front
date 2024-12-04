import './ChatroomField.css';

function ChatroomButton() {
    return (
        <button class="white"> Chatroom Name </button>
    );
}

export default function ChatroomField() {
    return (
        <div class="item">
            <ChatroomButton />
            <button class="red"> X </button>
        </div>
    );
}