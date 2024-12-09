import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUser } from "../services/UserService";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    let navigate = useNavigate();

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const email = formData.email;
            const password = formData.password;
            const result = await postUser("login", { email, password });
            navigate("/");
        } catch (error) {
            console.error("Error posting data:", error);
        }
    }

    return (
        <section className='white'>
            <div className='purple'>
                <h1> Bienvenue sur XI.X@ </h1>

                <form onSubmit={handleSubmit}>
                    <div className='input-field white'>
                        <label htmlFor='email' className='bold'>
                            {" "}
                            Courriel{" "}
                        </label>
                        <input
                            type='text'
                            name='email'
                            placeholder='grosQdu59@gmail.com'
                            value={formData.email}
                            onChange={handleChange}
                            className='field-text'
                        />
                    </div>

                    <div className='input-field white'>
                        <label htmlFor='password' className='bold'>
                            {" "}
                            Mot de passe{" "}
                        </label>
                        <input
                            type='text'
                            name='password'
                            placeholder='********'
                            value={formData.password}
                            onChange={handleChange}
                            className='field-text'
                        />
                    </div>
                    <input type='submit' name='submit' onSubmit={handleSubmit} className='black' />
                </form>
            </div>
            <button className='green'> Créer un compte </button>
        </section>
    );
}

export default Login;
