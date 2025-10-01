from flask import Flask
from config import Config
from functools import wraps
from flask import session, redirect, url_for, request

def password_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('authenticated'):
            return redirect(url_for('main.password', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Register blueprints
    from app.blueprints.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.blueprints.rsvp import bp as rsvp_bp
    app.register_blueprint(rsvp_bp, url_prefix='/rsvp')

    from app.blueprints.gallery import bp as gallery_bp
    app.register_blueprint(gallery_bp, url_prefix='/gallery')

    return app