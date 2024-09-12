[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/0302N4UV)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12856539&assignment_repo_type=AssignmentRepo)

# Individual Project Phase 2

> Deployed Server: https://projectforthub.my.id/

> Deployed Client: https://iproject-forthub.web.app/

> Github Repository: https://github.com/alderrr/FSJS-individual-project

Fortnite Skin Tracker and Wishlist Manager

Description:

A website that allows Fortnite players to track their collected skins and manage their wishlist of skins they want to acquire. Users can log in, add their skins to a collection, and create a wishlist of skins they desire. The website will use the Fortnite API to fetch data on available skins and keep the user's collection and wishlist up-to-date.

CRUD Operations:

Create: Users can add new skins to their collection and wishlist.

Read: Display a list of all available Fortnite skins, including details and images.

Update: Users can edit their collection or wishlist by adding or removing items.

Delete: Allow users to remove skins from their collection or wishlist.

# API Documentation - FORTHUB

## Models :

_User_

```
- id : primary
- username : string, required
- email : string, required, unique, email format
- password : string, required, length min 8
- imageUrl : string
```

_Wishlist_

```
- id : primary
- ItemId : string, required
- name: string, required
- image: string, required
- UserId : integer, required
```

&nbsp;

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign`
- `GET /items`
- `GET /shops`

Routes below need authentication:

- `POST /wishlist`
- `GET /wishlist`
- `GET /wishlist/:id`
- `PUT /wishlist/:id`
- `DELETE /wishlist/:id`

&nbsp;

## 1. POST /register

Request:

- body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password must have at least 8 characters"
}
```

&nbsp;

## 2. POST /login

Request:

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Invalid email/password"
}
```

## README IN-PROGRESS
