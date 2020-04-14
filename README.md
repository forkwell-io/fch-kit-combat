# Team Holmes &#8211; Submission for Forkwell Coronavirus Hackathon

## Team Members
Hi! We are a team of 5 members consisting of:
* [Chang Yang Loong](https://github.com/changyangloong)
* [Chan Teck Wei](https://github.com/chantw)
* [Danish Ezwan](https://github.com/coffeestains1908)
* [Teoh Shu Hong](https://github.com/Harlley7289)
* [Sophia Anak Chulif @ Douglas Chulip](https://github.com/sophiadouglas)

## Topic Chosen
Topic 2 &#8211; Virus Combat

## Solution: Web-based Application
A medical resource sharing platform: [Sharing is Caring](https://neuon-hackathon-holmes.web.app/)

### Motivation Behind the Solution
In this period of movement control order (MCO), we have seen all frontline authoritative personnel requesting us to 
stay at home while they try their best to keep us safe. We see the sacrifices of doctors and nurses putting their lives at risk 
as proper masks, gowns, eye gear or personal protective equipments are running low. The shortage of these medical supplies
are allowing our frontliners and patients to be more vulnerable to this virus and we do not want that to happen. Thus, the idea 
of Sharing is Caring is formed. Sharing is Caring acts as a platform for medical agencies, government, social as well as non-governmental organisations (NGOs) to request and share medical resources within our communities. By reaching out to the public, the 
collective contribution down to a single individual no matter how small, might greatly resolve the shortage of our medical agency's supplies. 

### Problem Statement
With the rising shortage of medical supplies amidst this COVID-19 pandemic, various efforts have been carried out 
to coordinate the funding and collection of medical supplies. However, 
* these efforts may be hard to follow as needs are rapidly changing,
* the channels to address them are not enough,
* our communities may have the resources to offer but do not know who needs them or which nearest institution they 
can donate to. 

Do you know what items are lacking at your local general hospital? We believe we require a platform to make these 
items publicly known. Our solution is a web-based application whereby medical agencies can make known their 
medical supply needs and allow anyone to tap into it. A collective and centralised effort involving the public 
is required to source these items to those in need as soon as possible.

### Target Users
* Medical agencies (hospitals, clinics)
* Suppliers / donors (industries, NGOs, individuals)

### Features
* Request for medical supplies
* Contribute medical supplies
* Track progress of requested supplies
* Provide exchange of contacts between different parties

## Repository Content
This repo contains 2 source code:
1. Firebase Functions -> `./functions`
2. Angular Web App -> `./hosting`

## Getting started

#### Tools used
* Firebase
  * Firebase Hosting (deployment)
  * Cloud Firestore (database)
  * Cloud Functions (backend logics)
* Node.js
* AngularJS
* express.js

#### Motivation
* Rapid development
* Free development quota 
* Free web hosting
* Enable building SPA
* Loosely coupled component
* Two way data binding
* Reducing boilerplate code
* Support Firebase libraries

### Configuring Firebase Functions (inside `./functions`)
To run the functions, a Firebase project is required as described in [here](https://firebase.google.com/docs/functions/get-started).

### Building Angular project (inside `./hosting`)
Change the content of class variable `firebaseConfig` to your own Firebase project web config (explained [here](https://support.google.com/firebase/answer/7015592?hl=en)). Assuming Node.js and [Angular CLI](https://angular.io/guide/setup-local) has been installed on a development PC, run `ng build --prod` to build the project as deployable web.

