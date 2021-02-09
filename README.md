# Welcome to Bespoke Hub

<b style="font-size: 20px;"><i>Project Manager and Progress Tracker</i></b>

### Application Overview

Bespoke Hub is a custom app built for FassēCo, a small marine restoration company who buys and restores vintage Boston Whaler power boats from the 1970s and 80s. They were looking for a way to keep track of the details of each boat throughout the restoration process, which parts they need to order, and where they are in the project’s process. Since a restoration can take months to complete, they also wanted a hassle-free way to keep their clients apprised of their boat’s progress. It was important to my client that the app be easy to use on a phone on the go. 


This application was built in a two-week sprint. My goals were to incorporate full CRUD functionality, gain a deeper understanding of React Hooks, and learn about CSS library usage. Other objectives were to experience working with a client to create something with real-world usefulness. 

### Features

<p>
When signed in as a maker:
- Users can create, read, update, delete client records
- Users can create read and delete projects
- Based on options chosen on the project form during creation, a project management checklist is generated and displayed on the project dashboard, along with project details and a link to client information.
When signed in as a client:
- User is shown a dashboard with details of their boat and a progress doughnut, which is populated based on the project checklist.
</p>

### Technologies Used

This application was built using the [React](https://reactjs.org/) JavaScript library, and was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app). Also used in the production of the site, are [react-hook-form](https://react-hook-form.com/), [react-confetti](https://github.com/alampros/react-confetti), and [react-router-dom](https://www.npmjs.com/package/react-router-dom).  [React-Bootstrap](https://react-bootstrap.github.io/) was used for styling components. The progress doughnut was made using [Grommet](https://v2.grommet.io/).

The API server is powered by [json-server](https://www.npmjs.com/package/json-server).  


### Running This Application

#### About authentication....

This application uses mock authentication which is purely for demonstration purposes. Therefore the login an registration code written here is completely insecure and would never be implemented in a professional application.

#### Back to the task at hand

1. Clone this repository and change to the directory in the terminal

```sh
git clone git@github.com:krsteele/bespoke-hub.git
cd bespoke-hub
```

2. Access the data

```sh
cd src/api
json-server -p 8088 database.json
```

3. Launch the client

```sh
    npm install
    npm start
```

#### Demo User Credentials

<p>
Username: <i>demo</i>
<br>
Password: <i>demo</i>
</p>

#### Created by Kristen Steele
[LinkedIn](https://www.linkedin.com/in/kristenraesteele/)
