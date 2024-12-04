function Registration() {
    return (

      <section class="white">
      <div class="purple">
          <h1> Créée ton compte, l'ami </h1>

          <form>

              <div class="input-field white">
                  <label for="username" class="bold"> Nom d'utilisateur </label>
                  <input type="text" name="username" placeholder="grosQdu59"
                  class="field-text" />
              </div>

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
  </section>

    );
  }
  
  export default Registration;