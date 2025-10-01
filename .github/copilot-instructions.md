# AI Agent Instructions - Wedding Website

This document provides guidance for AI coding agents working in this wedding website project.

## Project Overview

This is a Flask-based wedding website project that includes features such as:
- Password protected access for guests
- Event details and schedule
- Countdown timer to the wedding day
- RSVP management with dietary requirements tracking
- Photo gallery
- Guest authentication and profiles
- Gift registry

## Repository Structure

```
wedding-website/
├── .github/          # GitHub configuration and workflows
│   └── copilot-instructions.md  # This file
├── app/             # Main application package
│   ├── __init__.py  # Application factory
│   ├── models/      # SQLAlchemy models
│   ├── blueprints/  # Feature modules (RSVP, gallery, etc.)
│   ├── templates/   # Jinja2 HTML templates
│   └── static/      # CSS, JavaScript, images
├── config.py        # Configuration settings
└── requirements.txt # Project dependencies
```

## Key Development Practices

### Technology Stack
- Python 3.13+ with Flask web framework
- Flask extensions:
  - Flask-SQLAlchemy for database ORM
  - Flask-Login for user authentication
  - Flask-WTF for forms and CSRF protection
- SQLite for development (configurable for other databases in production)
- Jinja2 templates for frontend
- Custom CSS/JavaScript for styling and interactivity

### Development Workflow
To set up the development environment:
1. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set environment variables:
   ```bash
   export FLASK_APP=app
   export FLASK_DEBUG=1
   ```
4. Run the development server:
   ```bash
   flask run
   ```

### Code Organization Patterns
- Blueprints for feature modules:
  - main: Core pages (home, schedule, location)
  - rsvp: RSVP form and management
  - gallery: Photo gallery features
- Models in app/models/:
  - guest.py: User/guest management
  - (additional models to be added)
- Templates follow a base.html pattern with block inheritance
- Static files organized by type (css/, js/, images/)

### Common Tasks
- Adding a new page: Create route in blueprint, add template, update nav
- Database operations: Use SQLAlchemy models and migrations
- Form handling: Create WTForms classes, validate in routes
- Authentication: Requires @login_required decorator for protected routes

## Integration Points
- Database configuration in config.py
- File upload handling for gallery
- Email integration for notifications (to be added)
- Environment variables for sensitive configuration

---

Note: This is an initial template that will evolve with the project. As patterns and practices emerge during development, they will be documented here to guide AI agents in maintaining consistency with the project's conventions.