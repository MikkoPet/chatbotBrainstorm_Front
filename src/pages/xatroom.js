import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import './xatroom.css';
import Message from '../components/Message';
import { fetchMessages } from '../services/MessageService';
import { postData } from '../services/PostService';

function auto_grow(e) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
}

function Xatroom() {
    const id = useParams().id;
    
    let navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    const [messages, setMessages] = useState(null);

    const url = new URL('http://localhost:3000/.well-known/mercure');
    url.searchParams.append('topic', 'https://xixat.cn/rooms/' + id);
    
    const eventSource = new EventSource(url);
    
    eventSource.onmessage = (event) => {
      console.log(JSON.parse(event.data))
      const message = JSON.parse(event.data).status
      const messageElement = document.createElement('p')
      messageElement.textContent = message
      document.getElementById('mercure-content').appendChild(messageElement)
    }
    
    async function fetchData() {
        try {
            const result = await fetchMessages(id);
            setMessages(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const userId = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        'content' : "",
        'room' : "https://localhost:8000/api/rooms/" + {id},
        'user': {userId},
    });
    
    function handleChange(event) {

        const { name, value } = event.target;
      
        setFormData({ ...formData, [name]: value });
      
      }

    async function handleSubmit() {
        try {
            const result = await postData('Messages', formData);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (

        <section>
            <div>

                <button className="purple bold"
                    onClick={handleRedirect}> &#60; </button >

                <h1> Chatroom name variable </h1>

                <section className="chat-area">
                    { messages ? messages.map((message) => (
                        <Message data={message} />
                    )) : ''}
                </section>
                <section className="type-area">
                    <form onSubmit={handleSubmit}>
                        <textarea type="text" name="message" placeholder="Salut, Xi.X@ !"
                            className="input-field white field-text"
                            onInput={auto_grow} 
                            onChange={handleChange} />
                        <input type="submit" name=">"
                            className="black bold" value="^" />
                    </form>
                    <button className="green bold"> Recap </button>
                    <button className="red bold"> Critique </button>
                    <button className="yellow bold"> Propal </button>
                </section>

            </div>
        </section>

    );
}

export default Xatroom;