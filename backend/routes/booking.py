from flask import Blueprint, request, jsonify, make_response
from utils.security import generate_jwt, token_required
from sqlalchemy import select
from db.models import db, Booking
from datetime import datetime, timedelta


booking_bp = Blueprint("booking", __name__, url_prefix="/booking")


@booking_bp.route("/available", methods=['GET'])
def available_slots():
    date_str = request.args.get("date", datetime.now().strftime("%Y-%m-%d"))
    pharmacy_id = int(request.args.get("pharmacy_id"))
    
    start_time = datetime.strptime(f"{date_str} 09:00", "%Y-%m-%d %H:%M")
    end_time = datetime.strptime(f"{date_str} 17:00", "%Y-%m-%d %H:%M")
    
    all_slots = []
    current_time = start_time
    while current_time < end_time:
        all_slots.append(current_time)
        current_time += timedelta(minutes=30)

    booked_slots = (
        db.session.query(Booking.booked_time)
        .filter(
            Booking.pharmacy_id == pharmacy_id,
            Booking.booked_time >= start_time,
            Booking.booked_time < end_time
        )
        .all()
    )
    booked_times = {time for (time,) in booked_slots}
    
    available = [slot.strftime("%H:%M") for slot in all_slots if slot not in booked_times]
    
    return jsonify({"date": date_str, "available_slots": available})

