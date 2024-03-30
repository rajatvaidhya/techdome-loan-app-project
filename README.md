
# Loanplus+ : Your Mini Loan App!

Welcome to the Loanplus+, your one-stop solution for applying for loans and managing them seamlessly. Built on the MERN (MongoDB, Express.js, React.js, Node.js) stack, our web application offers a user-friendly interface and powerful features to streamline the loan application process and ensure efficient management


This web app's frontend is hosted on vercel and backend is hosted on render. 

Check backend folder here : https://github.com/rajatvaidhya/loan-app-backend


## Tech Stack

**Client:** React.js, HTML, CSS, JavaScript

**Server:** Node.js, Express.js

**Database:** MongoDB


## Installation

Clone frontend repo through:
```bash
git clone https://github.com/rajatvaidhya/techdome-loan-app-project
```

Clone backend repo through:
```bash
git clone https://github.com/rajatvaidhya/loan-app-backend
```

Install dependencies in frontend folder:

```bash
  cd .\techdome-loan-app-project\
  npm install
```

Install dependencies in backend folder:

```bash
  cd .\loan-app-backend\
  npm install
```

Start the frontend through following commands:

```bash
  cd .\techdome-loan-app-project\
  npm start
```

Start the backend through following commands:

```bash
  cd .\loan-app-backend\
  node index.js
```
## Required changes in both folders

1. Change all API requests in frontend folder to `http://localhost:5000` format as our backend is running on 5000 port locally.

2. Introduce your own .env data in the backend folder for `process.env.MONGOURI` & `process.env.JWT_SECRET`



## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Body Color | ![#EEEDEB](https://via.placeholder.com/10/EEEDEBf?text=+) #EEEDEB |
| Buttons and Containers Color | ![#747264](https://via.placeholder.com/10/747264?text=+) #747264 |
| Navbar BG Color | ![##e0ccbe](https://via.placeholder.com/10/#e0ccbe?text=+) ##e0ccbe |


## Typography

`font-family:'Mukta', sans-serif`
