insert into "users"
("name", "instrument", "country", "state", "city", "about", "email", "hashed_password", "photo_url")
values
('john', 'guitar', 'usa', 'california', 'la', 'testing the about', 'thisemailisnotreal@gmail.com', 'hashedPassword', 'fakeurl');

insert into "comments"
( "comments","user_id")
values
( 'cool guy','1')
