CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Andrea','http://first.test.me','First postgres blog');
insert into blogs (author, url, title) values ('Andrea','http://second.test.me','second postgres blog');