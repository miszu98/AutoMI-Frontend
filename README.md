# AutoMi - Web application 
 Portal with automotive announcements

This repository is responsible for frontend

## Table of contents 
1. [Login page](#login-page)
2. [Register page](#register-page)
3. [Main page](#main-page)
4. [Add offer](#add-offer)
5. [Offer details](#offer-details)
6. [My offers](#my-offers)
7. [Filter usage](#filter-usage)

## Technologies and Dependecies

* HTML/CSS
* Typescript
* Angular
  * Angular Material 
  * HttpClientModule
  * RouterModule
  * Interceptor

Link to repository with backend: https://github.com/miszu98/AutoMI-Backend

## Images 
### Login page
Login is possible by provided email and password.
<p align="left">
  <img src="https://i.imgur.com/bpZm4wb.png" width="1100px" height="400px">
</p>

### Register page
Register is possible by provided email, password and retype password everything is validated from both side, frontend and backend.
<p align="left">
  <img src="https://i.imgur.com/putKcnL.png" width="1100px" height="50%">
</p>

### Main page
Main page is divided by 5 parts: First one is a left navigation bar which allow user you sign-in (only when user is not logged in), if user is logged in can add offer, delete or update existing offer if he created one. Everything is possbile with refference to 'My offers'. Second one is a filters located on top of the screen. This section have 11 fields to filter offers. Filters works dynamically, that means every action from user send request to backend and reload new offers. Next section is the most interesting part of this page. Here user can find all offers from database but data is download partialy. That section is connected with section below - paginator. Paginator specify how many and which page want see. Last one section is named 'Offers of the day' this section display offers which were added current day. This helps users find newests offers.
<p align="left">
  <img src="https://i.imgur.com/Jtp0PtM.png" width="1100px" height="50%">
</p>

### Add offer
<p align="left">
  <img src="https://i.imgur.com/KsOHDni.png" width="1100px" height="50%">
</p>
<p align="left">
  <img src="https://i.imgur.com/j8YSbsC.png" width="1100px" height="50%">
</p>

### Offer details
<p align="left">
  <img src="https://i.imgur.com/B0Cbb6Z.png" width="1100px" height="50%">
</p>

### My offers
Every offer is a drop down list with details about clicked offer
<p align="left">
  <img src="https://i.imgur.com/HAv7tJy.png" width="1100px">
</p>

### Filter usage
<p align="left">
  <img src="https://i.imgur.com/NwugLeK.png" width="1100px" height="50%">
</p>


## Status of project: 
```diff 
+ COMPLETE
```
