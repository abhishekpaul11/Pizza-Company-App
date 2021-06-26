A full stack Pizza Company Enterprise Application coded purely in Node JS for the backend HTTP/HTTPS server and RESTful API, and HTML, CSS and Vanilla Javascript for the front end web pages.
It fulfils the following functions:
- Create a new user account
- Login/Logout from an existing account
- Delete an existing account
- View the Pizza menu
- Add/Remove items to/from the cart
- Place an order
- Charge the credit from a registered Credit Card using Stripe.com
- Send the cash receipt via mail using Mailgun.com

To run the server, navigate to this directory and just type the following command in your terminal. This starts the server in the default 'staging' mode (HTTP on port 3000, and HTTPS on port 3001).
````
node index.js
````

In order to explicitly specify the runtime modes as 'production' (HTTP on port 5000, HTTPS on port 5001) or 'staging', you need to provide the environment variable NODE_ENV as shown,  

For 'staging' mode:
````
NODE_ENV=staging node index.js
````
For 'production' mode:
````
NODE_ENV=production node index.js
````
Once the server successfully starts up, the application portal can be accessed on http://localhost:3000 (for staging) or http://localhost:5000 (for production).

If Node is not installed, it can be downloaded from https://nodejs.org/
