import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import './xatroom.css';
import Message from '../components/Message';
import { fetchMessages } from '../services/MessageService';
import { postData } from '../services/PostService';
import { jwtDecode } from 'jwt-decode';
import { decodeToken } from "../services/TokenDecodeService";

function auto_grow(e) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
}

function Xatroom() {
    const id = useParams().id;
    const title = useParams().title;

    let navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    const [messages, setMessages] = useState(null);

    const url = new URL('http://localhost:3000/.well-known/mercure');
    url.searchParams.append('topic', 'https://xixat.cn/rooms/' + id);

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
        console.log(event);
        const message = JSON.parse(event.data).status;
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        document.getElementById('type-area').appendChild(messageElement);
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

    let user;

    decodeToken(user, navigate);

    const [formData, setFormData] = useState({
        'content': "",
        'room': "https://localhost:8000/api/rooms/" + id,
        'user': "https://localhost:8000/api/users/" + user.id,
    });

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });

    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const result = await postData('messages', formData);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (

        <section>
            <div>

                <button className="purple bold"
                    onClick={handleRedirect}> &#60; </button >

                <h1> Mon xat: </h1>

                <section className="chat-area">
                    {messages ? messages.map((message) => (
                        <Message data={message} />
                    )) : ''}
                </section>
                <section className="type-area" id="type-area">
                    <form onSubmit={handleSubmit}>
                        <textarea type="text" name="content" placeholder="Salut, Xi.X@ !"
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