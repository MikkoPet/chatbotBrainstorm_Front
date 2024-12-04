import ChatroomField from "../components/ChatroomField";

function Home() {
    return (
      <section class="purple screen">
        <h1> Bonjour, usernameVariable </h1>
        <div>
          <h3> Mes chats: </h3>

          <div class="table">
          <button class="green"> + Nouvelle Xatroom </button>
            iterate buttons for chatrooms
            <ChatroomField />
            <ChatroomField />
            <ChatroomField />
          </div>
        </div>
      </section>
    );
  }
  
  export default Home;