create database tasksdb
create table task(
    id serial primaty key,
    title varchar(255) unique,
    description varchar(255)
);