**Todo**:
creating mock data inside the database models
testing all routes manually and see if it work before implement authentications
-> writing test for routes
**Routes**:
how many routes that the app needs:
get:
/users
/messages
/groupChats
/users/:id

post:
/users/:id
/messages/:id
/groupChats/:id

delete:
/messages/:id for user
/users/:id for user
/groupChats/:id for admin user
update:
/users/:id for user
/groupChats/:id for admin user
**Notes**:
having a channel called 'All' that let any user spam message inside of it

How to determine if a user is online or not?
how to let user send message as an image?
-> operate local file storing that image by fs.read... when user input an image.
-> serve static images
-> storing images' link inside message instance
**Problems**:
need to have ids from react to operate Crud on the database.
