// Chat interference page component
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Chat() {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, []);

    const handleChat = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/chat",
                {
                    prompt
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessages([
                ...messages,
                {
                    user: prompt,
                    bot: response.data.reply
                }
            ]);

            setPrompt("");

        } catch (error) {
            alert("Chat failed");
        }
    };

    return (
        <div>
            <h2>Chatbot</h2>

            <input
                value={prompt}
                placeholder="Enter prompt"
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button onClick={handleChat}>
                Send
            </button>

            <button onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
            }}>
                Logout
            </button>

            {messages.map((msg, index) => (
                <div key={index}>
                    <p><b>You:</b> {msg.user}</p>
                    <p><b>Bot:</b> {msg.bot}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Chat;
