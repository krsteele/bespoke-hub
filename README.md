# Welcome to Bespoke Hub

<b style="font-size: 20px;"><i>Project Manager and Progress Tracker</i></b>

### Application Overview

Bespoke Hub is a custom app built for FassēCo, a small marine restoration company who buys and restores vintage Boston Whaler power boats from the 1970s and 80s. They were looking for a way to keep track of the details of each boat throughout the restoration process, which parts they need to order, and where they are in the project’s process. Since a restoration can take months to complete, they also wanted a hassle-free way to keep their clients apprised of their boat’s progress. It was important to my client that the app be easy to use on a phone on the go. 


This appilication was built in a two-week sprint. My goals were to incorporate full CRUD functionality, gain a deeper understanding of React Hooks, and learn about CSS library usage. Other objectives were to experience working with a client to create something with real-world usefulness. 

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

![HTML5](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Git](https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white) ![JSON Server](https://img.shields.io/badge/JSON_Server%20-%232a2e2a.svg?&style=for-the-badge&logo=JSON&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/VSCode%20-%23007ACC.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Running This Application

#### About authentication....

This application uses mock authentication which is purely for demonstration purposes. Therefore the login an registration code written here is completely insecure and would never be implemented in a professional application.

#### Back to the task at hand

1. Clone this repository and change to the directory in teh terminal

```sh
git clone git@github.com:jaynaleitze/Pupdate.git
cd Pupdate
```

2. Access the data

```sh
cd pupdate/src/api
json-server -p 8088 -w database.json
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

#### Created by Jayna Leitze
