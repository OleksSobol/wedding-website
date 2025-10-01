from flask import Blueprint, render_template, redirect, url_for, flash, request, session
from app import password_required

bp = Blueprint('rsvp', __name__)

@bp.route('/submit', methods=['GET', 'POST'])
@password_required
def submit():
    if request.method == 'POST':
        name = request.form.get('name')
        guests = request.form.get('guests', type=int)
        dietary = request.form.get('dietary')
        attending = request.form.get('attending') == 'yes'
        
        # Here you could save RSVP data to a file or simple database
        # For now, just show a success message
        flash(f'Thank you for your RSVP, {name}!')
        return redirect(url_for('main.index'))
        
    return render_template('rsvp/submit.html')