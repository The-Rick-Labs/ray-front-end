<h4 align='center'>
    <b>The Rick Labs</b> presents:
</h4>
<h1 align='center'>
    Project Rayside • 🤖
</h1>

<div align='center'>
    <img src="./src/Components/ray_images/ray_happy.png" />
</div>

<div align='center'>
    <a href='https://www.youtube.com/watch?v=Trj9amXsCf8'>Demo</a> •
    <a href='https://github.com/The-Rick-Labs/ray-front-end'>Frontend</a> •
    <a href='https://github.com/The-Rick-Labs/ray-backend'>Backend</a>
</div>

<div align='center'>
    Built by:
    <a href='https://github.com/abdurj'>Abdur</a> •
    <a href='https://github.com/AKhan-20'>Aishah</a> •
    <a href='https://github.com/bkkaggle'>Bilal</a> •
    <a href='https://github.com/HannahGuo'>Hannah</a> •
    <a href='https://github.com/j985chen'>Janet</a>
</div>

# Ray

As students who started university in the midst of a global pandemic, we’ve found it especially difficult to stay on task while studying from home. That was what motivated our initial project idea: a robotic, interactive desk pet named Ray who could help us track our assignment due dates and remember to take study breaks, all while encouraging us using motivational quotes. Throughout the development process, we made sure that we had successive deadlines so that we could put our project together in an organized fashion: one week, we finalized the prototype for the UI on Figma, and the next, we moved onto developing the various components of the app in React, for example. All in all, our project represents the culmination of around ten weeks of planning and hard work, and we’re very proud of it!

# Background Research

Ray was initially inspired by the Japanese [Tamagotchi](https://tamagotchi.com/), a digital handheld pet on a small device. The Tamagotchi pet is made to be more personable than a boring robot by having status conditions such as food and health, as well as several minigames that can also be played on the device. Since we were all struggling with school-work to some degree, we decided to create a virtual desk pet.

We decided to use an Arduino for hardware since one of our group members already had access to one, and we all had some experience using it. Given that we wanted to make the desk pet fun and user-friendly, we decided that our primary hardware component would be an LED grid that changed based on Ray's conditions (hunger/stress).

Since we were all unable to work together in person, we decided that the easiest way for us to collaborate was for one person (Abdur) to have Ray's hardware. In contrast, the rest of us collaborated on a React application. We opted to use [React](https://reactjs.org/docs/getting-started.html) due to its popularity, meaning we'd be more likely to use it during co-op. We were all familiar with JavaScript, though we did consistently since none of us had previously worked with React.

We decided to use [Firebase](https://firebase.google.com) to store Ray’s hunger and stress bar, which decrease over time. Another feature we chose to include was a Google Calendar integration for a tasks list.

# Implementation

Ray is split into three main screens, a home screen, a food screen, and a tasklist screen, all built as a React web application. Ray also has a face, which is given by a LED Grid connected to an Arduino. The design for each screen was taken directly from the Figma prototype developed earlier in the project timeline, and styled using CSS. Ray is also connected to a Real-Time Firebase Database, used to store the values for the amount of food, hunger levels, and happiness levels.

In the tasklist screen, Ray is connected to the user’s Google account, where it pulls data from the user’s google calendar. Through this, Ray reads the assignments of the user. Ray's happiness is dictated by how close to the assignment deadline the user is, and if the user has done the assignment. These values are updated in the database through a React.js component. In the food screen, Ray is given food as another React component. Ray also gets hungrier over time using a Javascript and React timer, forcing the user to feed Ray and take breaks every hour. The home screen has another React component that generates a motivational quote or a sad quote depending on Ray’s happiness level.

Implementing the integration between the frontend web-app and the LED Grid on an arduino was a challenge. One of our initial design philosophies was to have Ray working on a mobile device. However, our LED grid was independent of the device we were running Ray on, as such we needed a way to control the LED grid no matter where the webapp for Ray was running. We chose to tackle this problem by connecting the React frontend to a node backend server, and sending HTTP requests to connect the two. The node backend server communicates with the arduino using a npm library called serialport. The Arduino is connected to a laptop running both servers, and any device can access the frontend for Ray by simply connecting to the server. The laptop could easily be replaced with a Raspberry Pi to untether Ray’s face from a laptop.
