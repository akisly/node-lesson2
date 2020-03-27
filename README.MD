### Validation

```
    https://hapi.dev/family/joi/
```

# Auth

### Register User

```
    curl --location --request POST 'localhost:3000/v1/auth/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password": "12345678"
    }'
```

### Delete User

```
    curl --location --request POST 'localhost:3000/v1/auth/delete' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "_id": "..."
    }'
```

### Login

```
    curl --location --request POST 'localhost:3000/v1/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password": "12345678"
    }'
```

### Logout

```
    curl --location --request POST 'localhost:3000/v1/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "refreshToken": "..."
    }'
```

### Refresh tokens

```
    curl --location --request POST 'localhost:3000/v1/auth/refresh-tokens' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "refreshToken": "..."
    }'
```

# User

### Find User

```
    curl --location --request GET 'localhost:3000/v1/users/find' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com"
    }'
```

### Create User

```
    curl --location --request POST 'localhost:3000/v1/users/create' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "fullName": "Test User"
    }'
```

### Update User

```
    curl --location --request PUT 'localhost:3000/v1/users/update' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "fullName": "Update User"
    }'
```

### Delete User

```
    curl --location --request DELETE 'localhost:3000/v1/users/delete' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com"
    }'
```
