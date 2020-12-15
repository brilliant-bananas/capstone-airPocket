# AirPocket
AirPocket is a PWA (Progressive Web App). Our app helps users keep track of expenses and stay within budget.

The user can set up expense categories, monthly budgets under different categories and add expenses via taking pictures of receipts, uploading receipts or filling in the transaction form.

Our app will calculate the totals of budgets and expenses and generate progress bar charts and donut charts for users to better visualize their monthly spending. 

Our app is built from several powerful and current technologies. We integrated Tesseract.js with our app to detect text on receipt pictures. We used React, Redux for our front-end, Bootstrap for styling, D3.js to visualize users’ spending history, and Passport for user authentication. Our back-end server is deployed on Heroku and uses Express to handle HTTP requests, featuring Sequelize queries to a PostgreSQL database of highly connected models.

## Project URL

 https://air-pocket.herokuapp.com/

## Start

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.


