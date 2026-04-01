# 🧑‍💻 Personal Portfolio — Django

## Quick Start in PyCharm

### 1. Install Django
Open the PyCharm **Terminal** (bottom toolbar) and run:
```
pip install django
```

### 2. Run the dev server
```
python manage.py runserver
```
Then open **http://127.0.0.1:8000** in your browser.

---

## Project Structure
```
portfolio/               ← project root (open THIS folder in PyCharm)
├── manage.py
├── requirements.txt
├── portfolio/           ← Django config package
│   ├── settings.py
│   ├── urls.py
│   ├── views.py         ← ✏️  EDIT YOUR PERSONAL DATA HERE
│   ├── wsgi.py
│   └── asgi.py
├── templates/
│   └── portfolio/
│       └── index.html   ← main page template
└── static/
    ├── css/style.css    ← all styling
    ├── js/main.js       ← interactivity
    └── images/          ← put your photos here
```

## Customise Your Content

1. **Open `portfolio/views.py`**
2. **Edit `PORTFOLIO_DATA`** — name, bio, skills, projects, education, links
3. **Add your photo** to `static/images/` and update the `<img src>` in the template

## Add Real Email (Contact Form)
See the comment block in `views.py` → `contact()` function.

## Deploy to Production
- Set `DEBUG = False` in `settings.py`
- Set a real `SECRET_KEY` via environment variable
- Run `python manage.py collectstatic`
- Use Gunicorn + Nginx, or deploy to Railway / Render / Heroku
