<p align="center">
<a href="https://forkwell-covnect.netlify.com/">
COVNEXT
</a>
</p>

<h1 align="center" style="border-bottom: none !important; margin-bottom: 5px !important;"><a href="https://designrevision.com/downloads/shards-dashboard-lite-react/">Integrated Design Project</a></h1>
<p align="center">
  <a href="#">
    <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg" />
  </a>
</p>

<p align="center">
This is the proposed project for EEET 4002 Integrated Design Project. The project is a smoker detection system that alerts authorities or premise owners when an offence has been made on a non-smoking zone. 
</p>

<p align="center">
  <a href="https://idp-app-70f95.firebaseapp.com">
    <img height="55px" src="assets/btn-live-preview.png" />
  </a>
</p>

<br />


![Output sample](https://github.com/mcoscon/integrated-design-project/blob/master/ProgressDemo.gif)


<br />

### Dashboard Quick Start 
* Nodejs, Firebase and Firebase Command Line Interface (CLI) should be first installed on your system.
* Install dependencies by running `yarn` or `npm install` on the root folder.
* Run `npm run start` to start the local development server.
* Run `npm run build` to deploy all static files into the build folder and then run `firebase deploy` to deploy the dashboard to Firebase Hosting.

<br />

### Raspberry PI Quick Start 
* Python 3.6 or greater should be installed in your system.
* Pyrebase should be installed in your system.
* Start the raspberrySend.py script by `python -m raspberrySend`

<br />

### Project Structure

- The project contains two parts, a machine learning model is run on edge and executes inferences on the captured frames from the camera. Once detected, relevant data (i.e time, date, location) is sent to the database where it can be displayed on a Dashboard. Moreover, an alert can be sent to an email once an offence has been detected.

- The index.js file under the Functions folder contains the cloud function that sends an alert to the specified email recipient once a detection occurs.
<br />

### Built using
- [Reactjs](https://reactjs.org/)
- [Material UI](https://material-ui.com/)
- [Firebase](https://firebase.google.com/)
- [Raspberry PI 3B+](https://www.raspberrypi.org/)
- [Intel Neural Compute Stick](https://software.intel.com/en-us/articles/intel-movidius-neural-compute-stick)
- [Nodejs](https://nodejs.org/en/)
- [Pyrebase](https://github.com/thisbejim/Pyrebase)

<br />

