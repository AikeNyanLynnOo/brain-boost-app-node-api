### Topics & Best Practices covered

- ✅ ExpressJS (Service, Module, Controller architecture) 
- ✅ Mongoose, MongoDB
- ✅ JWT authentication, access token, refresh token
- ✅ Student authentication (Sign Up, Sign In)
- ✅ CRUD for courses


## To improve

- To add google authentication
- To develop test cases for maintainance & debugging


## How To Test

- HTTP requests can be tested with HTTP request type in [PostMan HTTP Request](https://learning.postman.com/docs/sending-requests/create-requests/request-basics/)


## How to run with NODE


## Development Server
```bash
npm run dev
```

## Production
```bash
npm run build
npm run start
```

## HTTP routes

### Auth routes

(POST) Register
    ```{{base_url}}/auth/register```

(POST) Log In
    ```{{base_url}}/auth/login```

(POST) Log Out
Authorization : Bear{SPACE}JWT
    ```{{base_url}}/auth/logout```

(POST) Refresh Token
Authorization : Bear{SPACE}JWT
    ```{{base_url}}/auth/token```

(GET) Get User Info
Authorization : Bear{SPACE}JWT
    ```{{base_url}}/user```


### Course routes

{GET} Get Courses
    ```{{base_url}}/courses```

### Coming routes

- Enroll courses
- Cancel enroll courses
- Make payment