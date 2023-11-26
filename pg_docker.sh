docker run -d \
    --name pg-db \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=password2023 \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v pgdata:/var/lib/postgresql/data \
    -v $(pwd)/init-user-db.sh:/docker-entrypoint-initdb.d/init-user-db.sh \
    postgres

