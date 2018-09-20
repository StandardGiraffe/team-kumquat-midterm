HTTP                  VERB        What?

/                     GET         If logged in, homepage, else redirect to login
                                  Show user's resources + .
/login                GET         Login form, option to redirect to register
/login                POST        Check user credentials against database, redirect to root
/logout               POST        Destroys session cookie
/register             GET         Form for user information (email, password)
/register             POST        Send registration credentials to db, redirect to /

<!-- /:id/profile          GET         Displays public user profile, tack on /:id below -->
/users/:userid

<!-- /:id/profile/edit     PUT         Edit your own profile page if you are the user. -->
/users/:userid

<!-- /:id                  GET         Shows all resources of given person's collection. -->
/users/:userid/resources

<!-- /search/:tag          PUT         Searches database for resources matching tag -->
/search/:tag          GET

<!-- /:id/add              POST        Submit url, title, tags, date, rating to resource db -->
/users/:userid/resources   POST        Submit url, title, tags, date, rating to resource db


<!-- /:resource            GET         Shows comments, description, sharing options, like/rating/promote tog -->
/users/:userid/resources/:resourceid       GET         Shows comments, description, sharing options, like/rating/promote tog



<!-- /:resource            PUT         Toggle like, rating, promotion -->
/users/:userid/resources/:resourceid         PUT         Toggle like, rating, promotion
