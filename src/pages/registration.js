import React, { useState } from 'react';
import { postData } from "../services/PostService";

function Registration() {

    const [formData, setFormData] = useState({
        'username': "",
        'email': "",
        'password': ""
    });

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });

    }

    async function handleSubmit() {
        try {
            const result = await postData('endpoint', formData);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (

        <section class="white">
            <div class="purple">
                <h1> Créée ton compte, l'ami </h1>

                <form onSubmit={handleSubmit}>

                    <div class="input-field white">
                        <label for="username" class="bold"> Nom d'utilisateur </label>
                        <input type="text" name="username" placeholder="grosQdu59"
                            value={formData.username}
                            onChange={handleChange}
                            class="field-text" />
                    </div>

                    <div class="input-field white">
                        <label for="email" class="bold"> Courriel </label>
                        <input type="text" name="email" placeholder="grosQdu59@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            class="field-text" />
                    </div>

                    <div class="input-field white">
                        <label for="password" class="bold"> Mot de passe </label>
                        <input type="text" name="password" placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                            class="field-text" />
                    </div>
                    <input type="submit" name="submit"
                        class="black" />

                </form>
            </div>
        </section>

    );
}

export default Registration;