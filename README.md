# NoSQL---Social-Network-API

## Description

This was created for a coding bootcamp.

The goal was to create social media application backend. We were to use javascript and mongodb to complete this task.

## Installation

This application requires a tool such as Postman and mongodb.  

To run, start the local server using "npm start" and use Postman or similar to interact with routes. 

### Routes
```
See all users
GET => /api/users

Create new user
POST => api/users
{
  "username": "",
  "email": ""
}

See specific user
GET => /api/users/:userID

Update user
PUT => /api/users/:userID
{
  "username": "",
  "email": ""
}

Delete user
DELETE = /api/users/:userId

Add friend to user
POST => /api/users/:userId/friends/:friendId

Remove friend from user
DELETE => /api/users/:userId/friends/:friendId

See all thoughts
GET => /api/thoughts

See specific thought
GET => /api/thoughts/:thoughtId

Create new thought
POST => /api/thoughts
{
  "thoughtText": "",
  "userName": "",
  "userId": ""
}

Update thought
PUT => /api/thoughts/:thoughtId
{
  "thoughtText": ""
}

Remove thought
DELETE => /api/thoughts/:thoughtId

Add reaction to thought
POST => /api/thoughts/:thoughtId/reactions
{
  "reactionBody": "",
  "userName": "",
  "userId": ""
}

Remove reaction
DELETE => /api/thoughts/:thoughtId/reactions
{
  "reactionId": ""
}
```

[GitHub Repo Link:](https://github.com/flying-tadpole/NoSQL---Social-Network-API)

[Video Walkthrough Link:](https://www.youtube.com/watch?v=uss52eh9enI)

## Credits

Extensive usage of library documentation and code snippets provided in prior bootcamp lessons.
