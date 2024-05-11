
# QuickFix Project

# Introduction
This application is designed to help users discover and connect with various local services in their area. Whether you're in need of a plumber, electrician, or just looking for a good nail technician, this app has got you covered.

# Features
- Service Search: Easily search for local services based on your location and specific needs.
- User Profile: Create and customize your user profile to save and handle your own services. 

# Client
## Routes
* / - Homepage
* /about-us - About us 
* /post/:postId - Post Detail 
* /user/:userId - User Details 
* /signup - Signup form
* /login - Login form
* /user/:userId/profile - User profile
* /user/:userId/post/create - Create post 
* /user/:userId/profile/edit - Edit user´s profile
* /user/:userId/post/:postId - User´s post details
* /user/:userId/post/:postId/edit - Edit post

## Pages

Home Page (public)
About us Page (public)
One Post Details Page (public)
User Details Page (public)
Sign up Page (anon)
Log in Page (anon)
My profile Page (private)
Post Create Page (private)
Edit User´s information Page (private)
Edit Post (private)

## Components

-Navbar
-Footer
-Search bar
-Filter by location
-Post card

# Server
## Models

User model: 
-email: String, required   
-password: String, required
-imageUrl: String
-name: String, required
-location: String, required
-rating: Number
-posts: ObjectId: "Post" 
-service: ObjectId: "Service"

Post model:
-title:String, required
-service: ObjectId: "Service"
-description: String, required
-price: Number
-user:ObjectId: "User"

Services model:
-category: String, enum, required
-subcategory: String, enum, required
-posts: ObjectId: "Post" 

# API Endpoints

| Route                    | HTTP Verb | Description                            |
|--------------------------|-----------|----------------------------------------|
| /post                    | GET       | Show all posts                         |
| /post/location           | GET       | Filter post by its user´s location     |
| /post/:postId            | GET       | Show one post details                  |
| /post                    | POST      | Create new post                       |
| /post/:postId            | PUT       | Updates one specific post              |
| /post/:postId            | DELETE    | Deletes a specific post                |
| /user                    | POST      | Creates a new user                    |
| /user/post/:postId       | GET       | Shows one post that belong to user    |
| /user/:userId            | GET       | Shows one user details                |
| /user/:userId            | PUT       | Updates one user                      |
| /user/:userId            | DELETE    | Deletes an user                       |
| /:userId/profile/posts/:postId | GET   | Shows one post from user profile      |


# Links

## Git
[Link to my backend repository](https://github.com/Natpinper/quickFix-backend)

[Link to my frontend repository](https://github.com/Natpinper/quickFix-frontend)

[Link to deployed site](https://quickfixer.netlify.app)


## Slides
[Link to my presentation slides](https://www.canva.com/design/DAGE16C2IF8/Koy3T_rEq-A9iEMzFh3-cA/view?utm_content=DAGE16C2IF8&utm_campaign=designshare&utm_medium=link&utm_source=editor)
