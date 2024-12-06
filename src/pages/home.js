import ChatroomField from "../components/ChatroomField";
import { fetchRooms } from "../services/RoomService";
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function Home() {

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [rooms, setRooms] = useState(null);

  async function fetchData() {
    try {
      const result = await fetchRooms();
      setRooms(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <section className="purple screen">
      <h1> Bonjour, {user.username} </h1>
      <div>
        <h3> Mes chats: </h3>

        <div className="table">
          {rooms? rooms.map((room) => (
            <ChatroomField data={room} />
          )) : ''
          }
        </div>
      </div>
    </section>
  );
}

export default Home;