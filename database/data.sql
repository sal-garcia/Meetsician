insert into "users"
("name", "instrument", "country", "state", "city", "about", "email", "hashedPassword", "photoUrl")
values
('john', 'guitar', 'usa', 'california', 'la', 'testing the about', 'thisemailisnotreal@gmail.com', 'hashedPassword', 'fakeurl');

insert into "comments"
( "comments","userId")
values
( 'cool guy','1')
