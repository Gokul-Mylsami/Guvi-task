
  <h2>Installation process for Linux :</h2>
  <h2>Php Installation :</h2>

  <p>1. Update the packages by using cmd :</p>
  <pre><code>sudo apt-get update</code></pre>
  <p>2. Install the php and the extensions :</p>

  <pre><code> sudo apt-get install php libapache2-mod-php php-mysql php-mongodb php-redis php-mysqli </code></pre>

  <p>
    3. Check the PHP version: After installation, you can check the version of
    PHP by running the following command:
  </p>
  <pre><code>php -v</code></pre>

  <p>4. Then move to the app directory and execute the command :</p>
  <pre><code>php -S localhost:8000</code></pre>
  <p>Then you can see the result page in the web browser in the http://localhost:8000</p>

<h2>Features</h2>
<ul>
<li>Create User: Users can sign up for the web application by providing their email address, and a password. The application will validate the email address and ensure that it is unique before creating a new user.</li> <br/>
<li>Login User: Users can log in to the web application using their email address and password. The application will validate the credentials and create a session for the user.</li> <br />
<li>Edit User: Users can edit their profile information, including their name and email address. The application will validate the email address and ensure that it is unique before updating the user's information.</li> <br/>
<li>Redis for session management: The application uses Redis to store session data. This allows the application to easily manage and scale user sessions across multiple servers.</li> <br/>
<li>Storing session ID in local storage: The application stores the session ID in the browser's local storage. This ensures that the user remains logged in even if they close the browser or navigate away from the application.</li>
</ul>
