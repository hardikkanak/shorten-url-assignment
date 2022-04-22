# shorten-url-assignment

Set Up Backend (Django)
1. Create blank database "url_shortener_db" in MySQL.

2. Set up datasbase connection in settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'url_shortener_db',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

3. Run bellow command to create migration file
python manage.py makemigrations

4. Run bellow command to apply change in database (Create Table generated_url)
python manage.py migrate

5. Run project 
python manage.py runserver

Note : Project run on http://127.0.0.1:8000/

------------------------------------------------------------------------
Set Up frontend (ReactJS)
1. Run bellow command to install basic library
npm install

2. Run bellow command to start project
npm start
