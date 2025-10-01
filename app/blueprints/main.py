from flask import Blueprint, render_template, redirect, url_for, flash, request, session, current_app
from app import password_required

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    if not session.get('authenticated'):
        return redirect(url_for('main.password'))
    return render_template('index.html')

@bp.route('/password', methods=['GET', 'POST'])
def password():
    if request.method == 'POST':
        if request.form.get('password') == current_app.config['WEBSITE_PASSWORD']:
            session['authenticated'] = True
            next_page = request.args.get('next')
            if next_page:
                return redirect(next_page)
            return redirect(url_for('main.index'))
        flash('Incorrect password')
    return render_template('password.html')

@bp.route('/schedule')
@password_required
def schedule():
    return render_template('schedule.html')

@bp.route('/location')
@password_required
def location():
    return render_template('location.html')