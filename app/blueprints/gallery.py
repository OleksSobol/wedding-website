from flask import Blueprint, render_template, send_from_directory
from app import password_required
import os

bp = Blueprint('gallery', __name__)

@bp.route('/')
@password_required
def index():
    # Add logic to list photos from the uploads directory
    return render_template('gallery/index.html')