#!/bin/bash

echo "Configuring heroku postgre database..."

heroku pg:reset DATABASE

heroku pg:psql < ./backend/bin/sql/account.sql
heroku pg:psql < ./backend/bin/sql/generation.sql
heroku pg:psql < ./backend/bin/sql/dragon.sql
heroku pg:psql < ./backend/bin/sql/trait.sql
heroku pg:psql < ./backend/bin/sql/dragonTrait.sql
heroku pg:psql < ./backend/bin/sql/accountDragon.sql

heroku run node ./backend/bin/insertTraits_client.js

echo "Heroku postgre database configured!"