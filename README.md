# django-react-chat
Chat Python Challenge

## Requirements for the project
1. Python 3.6+
2. NodeJS 15.11
3. Redis

## Check Redis
After install redis, check if is active,

`redis-cli ping`

the response must be "PONG".

## Python mandatory dependencies
We need to create a Virtual Environment

`python3 -m venv venv && source venv/bin/activate`

### Install requirements
`pip3 install -r requirements.txt`

This will install:
1. Django
2. Django Channels
3. Redis for Channels
4. Django cors-headers
5. Django environ
6. Graphene
7. PyJWT, Django GraphQL JWT
8. Invoke
9. Factory boy
10. Flake8
11. Black

## Nodejs mandatory dependencies
### Install Yarn
`npm install --global yarn`

### Install react dependencies
`cd react_chat && yarn install`
or
`invoke frontend-install`

## After install
### Create superuser
`invoke create-superuser`

### Create default rooms
`invoke create-rooms`.
Django admin has been activated to create more rooms.

## Invoke available tasks:
*  **black**:              Runs black to auto-format the Python code.
*  **create-rooms**:       Creates default rooms for testing.
*  **create-superuser**:   Creates the superuser account 'admin' with password 'admin'.
*  **flake8**:             Runs flake8 to ensure Python code matches our style guide.
*  **frontend-install**:   Install all frontend dependencies.
*  **frontend-start**:     Runs the frontend react app.
*  **makemigrations**:     Creates new migrations based on any model changes.
*  **migrate**:            Runs all the migrations.
*  **run**:                Runs the monolith.
*  **shell**:              Runs the command shell in iPython.
