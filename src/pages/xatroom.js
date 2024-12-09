import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./xatroom.css";
import Message from "../components/Message";
import { fetchMessages } from "../services/MessageService";
import { postData } from "../services/PostService";
import { decodeToken } from "../services/TokenDecodeService";

function auto_grow(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
}

function Xatroom() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/");
    };

    const [messages, setMessages] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const result = await fetchMessages(id);
            setMessages(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const MERCURE_HUB_URL ="http://localhost:3000/.well-known/mercure";
        const url = new URL(MERCURE_HUB_URL);
        url.searchParams.append("topic", `https://xixat.cn/rooms/${id}`);

        let eventSource;

        try {
            eventSource = new EventSource(url);

            eventSource.onopen = () => {
                console.log("Mercure connection opened");
            };

            eventSource.onmessage = (event) => {
                console.log("Received event:", event);
                const newMessage = JSON.parse(event.data)[0];
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            };

            eventSource.onerror = (error) => {
                console.error("Mercure connection error:", error);
                eventSource.close();
            };
        } catch (error) {
            console.error("Error setting up Mercure connection:", error);
        }
        return () => {
            if (eventSource) {
                console.log("Closing Mercure connection");
                eventSource.close();
            }
        };
    }, [id]);

    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        content: "",
        room: "",
        user: "",
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            navigate("/login"); // Redirect to login if no token
            return;
        }

        try {
            const decodedToken = decodeToken(storedToken);
            setToken(decodedToken);
            setFormData((prevData) => ({
                ...prevData,
                room: `https://localhost:8000/api/rooms/${id}`,
                user: `https://localhost:8000/api/users/${decodedToken.id}`,
            }));
        } catch (error) {
            console.error("Error decoding token:", error);
            navigate("/login"); // Redirect to login if token is invalid
        }
    }, [id, navigate]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await postData("messages", formData);
            // Clear the input content after successful submission
            setFormData((prevData) => ({ ...prevData, content: "" }));
        } catch (error) {
            console.error("Error posting data:", error);
        }
    }

    return (
        <section>
            <div>
                <button className='purple bold' onClick={handleRedirect}>
                    {" "}
                    &#60;{" "}
                </button>

                <h1> Mon xat: </h1>

                <section className='chat-area'>
                    {messages.map((message) => (
                        <Message key={message.id} data={message} />
                    ))}
                </section>
                <section className='type-area' id='type-area'>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            type='text'
                            name='content'
                            placeholder='Salut, Xi.X@ !'
                            className='input-field white field-text'
                            onInput={auto_grow}
                            onChange={handleChange}
                        />
                        <input type='submit' name='>' className='black bold' value='^' />
                    </form>
                    <button className='green bold'> Recap </button>
                    <button className='red bold'> Critique </button>
                    <button className='yellow bold'> Propal </button>
                </section>
            </div>
        </section>
    );
}

export default Xatroom;
