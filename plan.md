**Todo**:
change post route name from /name/ -> /name/:id
reason: passing or retrieving id from front end to back end will be easier
//

then -> intergrate authentication with jwt token

//
then -> writing tests with authentication

**Notes**:

How to determine if a user is online or not?
-> storing new online date for each user everytime users interact with backend API

-> compare online date with current date on the front end
if duration = current date - online date >= 300s
-> the user is online
else -> the user is offline

having a groupChat called 'All' that let any user spam message inside of it ->
everyTime a new user is sign Up or log in -> calling

groupAllUpdate.
const users = Users.find();

allGroup.members = users

how to let user send message as an image?
-> operate local file storing that image by fs.read... when user input an image.
-> serve static images
-> storing images' link inside message instance
**Problems**:

how to pass an array through req.body
