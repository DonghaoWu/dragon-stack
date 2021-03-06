#!/bin/bash

export PGPASSWORD='12345'

echo "Configuring dragonstackdb..."

dropdb -U noah dragonstackdb
createdb -U noah dragonstackdb

psql -U noah dragonstackdb < ./bin/sql/account.sql
psql -U noah dragonstackdb < ./bin/sql/generation.sql
psql -U noah dragonstackdb < ./bin/sql/dragon.sql
psql -U noah dragonstackdb < ./bin/sql/trait.sql
psql -U noah dragonstackdb < ./bin/sql/dragonTrait.sql
psql -U noah dragonstackdb < ./bin/sql/accountDragon.sql

node ./bin/insertTraits.js

echo "dragonstackdb configured!"
