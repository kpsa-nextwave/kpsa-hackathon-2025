from .auth import auth_bp
from .report import report_bp
from .booking import booking_bp

def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(report_bp)
    app.register_blueprint(booking_bp)