#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

	CREATE USER careeradmin WITH PASSWORD 'SimpleApp@2023';

	CREATE DATABASE careerconnect;

	GRANT ALL PRIVILEGES ON DATABASE careerconnect TO careeradmin;

	ALTER DATABASE careerconnect OWNER TO careeradmin;

EOSQL

