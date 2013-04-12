create role erosion_admin with login password 'quemeerosionoadmin';
create role erosion_user with login password 'quemeerosiono';

create database erosion with owner erosion_admin encoding 'UTF8';
