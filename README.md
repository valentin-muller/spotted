# # Project Name

<br>



## Description

In-house Gossip platform for BCN-Ironhackers. 
Users can semi-anonymously sign up by enlisting them into categories: Sex and Course.
Upon login, the user will have access to a newsfeed, where he/she can access to a board of gossips and have the possibility to up/downvote ‘Gossips’ as well as being able to create his own.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage to see ‘Gossips’ and be able to write my own. 
- **sign up** - As a user I want to sign up on the web page so that I can use the service
- **login** - As a user I want to be able to log in on the web page so that I can get to my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorites** - As a user I want to be able to access the bookmarked ‘Gossips’


-


<br>



## API Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ————— | ————————————————— | —————————————————————————————— | ———————————————————————————— |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |

| `GET`      | `/private/bookmarks`               | Private route. Render the `bookmarks` view.                  |                                                          |
| `POST`     | `/private/bookmarks/`              | Private route. Adds a new favourite ‘Gossip’ for the current user.     |                                  |
| `DELETE`   | `/private/favorites/:gossipId` | Private route. Deletes the existing bookmarked ‘Gossip’ from the current user. |                                                          |



## Models

USER model

```javascript
{
    firstName: String,
    userName: String,
    password: String,
    sex = String,
    course = String,
    favouritesArr = []
    gossipArr = []

}


```



Favorites model

```javascript
{
  headerMessage: String, (An anonimous Girl / Guy 		from WEBDEV / DATA / UX - UI),
  gossipMessage: String,  
  upvote / downvote: Boolean
  isFavourite: Boolean
}


```



<br>



## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link](.)
