import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import './xatroom.css';
import Message from '../components/Message';
import { fetchMessages } from '../services/MessageService';

function auto_grow(e) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
}

function Xatroom() {
    const {id} = useParams();

    const [messages, setMessages] = useState(null);
    
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
    
    let navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (

        <section>
            <div>

                <button class="purple bold"
                    onClick={handleRedirect}> &#60; </button >

                <h1> Chatroom name variable </h1>

                <section class="chat-area">
                    { messages ? messages.map((message) => (
                        <Message data={message} />
                    )) : ''}
                </section>
                <section class="type-area">
                    <form>
                        <textarea type="text" name="message" placeholder="Salut, Xi.X@ !"
                            class="input-field white field-text"
                            onInput={auto_grow} />
                        <input type="submit" name=">"
                            class="black bold" value="^" />
                    </form>
                    <button class="green bold"> Recap </button>
                    <button class="red bold"> Critique </button>
                    <button class="yellow bold"> Propal </button>
                </section>

            </div>
        </section>

    );
}

export default Xatroom;