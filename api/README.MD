# HOW TO RUN
## Requirements
- You should have python 9.10+
- You must have pip installed
- You must have a postgres server running

## Extract zip
- Extract the zip file and cd into the backend folder

## Install the requirements

- activate the virtual environment
 $ source .venv/bin/activate

 Once the virtual environment is actiave, install the requirements
 - pip install -r requirements.txt

## UPDATE STTINGS
# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "careerconnect",
        "USER": "careeradmin",
        "PASSWORD": "SimpleApp@2023",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}

Use your correct credentials

## RUN MIGRATIONS
 $ python manage.py migrations
 $ python manage.py migrate

## Run the app
- Once all the requirements are installed run the app
 $ python manage.py runserver 8080

 NOTE:
   - This is a restful API, test it using any services like postman or curl.

EXAMPLE:
curl -X POST -H "Content-Type: application/json" -d '{"username": "user1", "password": "password22", "email": "tukl@example.com", "role": "student", "pantehrid": "123457", "first_name": "Luke", "last_name": "Ann", "degree": "Computer Science", "major": "Software Engineering", "grad_year": "2024"}' http://127.0.0.1:8080/signup/student/

curl -X POST -H "Content-Type: application/json" -d '{"username": "user1", "password": "password22"}' http://127.0.0.1:8080/login/