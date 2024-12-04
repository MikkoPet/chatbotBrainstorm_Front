function Login() {
    return (
        <section class="white">
            <div class="purple">
                <h1> Bienvenue sur XI.X@ </h1>

                <form>
                    <div class="input-field white">
                        <label for="email" class="bold"> Courriel </label>
                        <input type="text" name="email" placeholder="grosQdu59@gmail.com"
                        class="field-text" />
                    </div>

                    <div class="input-field white">
                        <label for="password" class="bold"> Mot de passe </label>
                        <input type="text" name="password" placeholder="********" 
                        class="field-text" />
                    </div>
                    <input type="submit" name="submit" 
                        class="black" />

                </form>
            </div>
            <button class="green"> Créer un compte </button>
        </section>
    );
}

export default Login;