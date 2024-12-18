import os
import smtplib

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash
from functools import wraps
from datetime import timedelta, date

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///rostr.db")

def get_shift_from_records(_records, _user, _date):
    record = next((item for item in _records if item["username"] == _user.get('username') and item["date"] == _date), None)

    if not record:
        return None

    return record['shift']

def login_required(f):
    """
    Decorate routes to require login.

    https://flask.palletsprojects.com/en/1.1.x/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    if request.method == "POST":
        name = request.form.get("username")
        lastname = request.form.get("lastname")
        firstname = request.form.get("firstname")
        email = request.form.get("email")
        password = request.form.get("password")
        users = db.execute("SELECT * FROM users")
        for user in users:
            if user["username"] == name:
                flash("username already exists")
                return render_template("register.html")
            elif user["last_name"] == lastname and user["first_name"] == firstname:
                flash("user is already registered")
                return render_template("register.html")
        else:
            hash = generate_password_hash(password)
            db.execute( "INSERT INTO users (username, last_name, first_name, hash, email) VALUES (?, ?, ?, ?, ?)", name, lastname, firstname, hash, email)
            flash("You are successfully registered.")
            return render_template("login.html")
    else:
        return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            flash("please type in username.")
            return render_template("login.html")

        # Ensure password was submitted
        elif not request.form.get("password"):
            flash("please type in password")
            return render_template("login.html")

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            flash("invalid username or password")
            return render_template("login.html")

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")

@app.route("/logout")

def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/login")

@app.route("/")
@login_required
def index():
    position = db.execute("SELECT position FROM users WHERE id = ?", session["user_id"])
    position = position[0]["position"]
    if position == "manager":
        return redirect("/mgrpage")
    else:
        return redirect("/staffpage")

@app.route("/mgrpage", methods=["GET", "POST"])
@login_required
def mgrpage():
    if request.method == "GET":
        weekstart = request.args.get("weekstart")
        if not weekstart:
            return render_template("mgrpage.html", weekstart=weekstart)

        start_date = date.fromisoformat(weekstart)

        date1 = start_date.isoformat()
        date2 = (start_date + timedelta(days=1)).isoformat()
        date3 = (start_date + timedelta(days=2)).isoformat()
        date4 = (start_date + timedelta(days=3)).isoformat()
        date5 = (start_date + timedelta(days=4)).isoformat()
        date6 = (start_date + timedelta(days=5)).isoformat()
        date7 = (start_date + timedelta(days=6)).isoformat()

        users = db.execute("SELECT * FROM users")

        records = db.execute("SELECT * FROM schedule WHERE date >= date(?) AND date < date(?, '+7 days') ORDER BY username, date", date1, date1)

        rows = []

        for user in users:
            rows.append([
                user,
                get_shift_from_records(records, user, date1) or "",
                get_shift_from_records(records, user, date2) or "",
                get_shift_from_records(records, user, date3) or "",
                get_shift_from_records(records, user, date4) or "",
                get_shift_from_records(records, user, date5) or "",
                get_shift_from_records(records, user, date6) or "",
                get_shift_from_records(records, user, date7) or "",
            ])

        return render_template("mgrpage.html", weekstart=request.args.get("weekstart"), rows=rows, date1=date1, date2=date2, date3=date3, date4=date4, date5=date5, date6=date6, date7=date7)

    if request.method == "POST":
        weekstart = request.form.get("weekstart")
        start_date = date.fromisoformat(weekstart)

        date1 = start_date.isoformat()
        date2 = (start_date + timedelta(days=1)).isoformat()
        date3 = (start_date + timedelta(days=2)).isoformat()
        date4 = (start_date + timedelta(days=3)).isoformat()
        date5 = (start_date + timedelta(days=4)).isoformat()
        date6 = (start_date + timedelta(days=5)).isoformat()
        date7 = (start_date + timedelta(days=6)).isoformat()

        sched1 = request.form.get("sched1")
        sched2 = request.form.get("sched2")
        sched3 = request.form.get("sched3")
        sched4 = request.form.get("sched4")
        sched5 = request.form.get("sched5")
        sched6 = request.form.get("sched6")
        sched7 = request.form.get("sched7")

        users = db.execute("SELECT * FROM users")
        username = request.form.get("username")

        if sched1:
            record1 = db.execute("SELECT shift FROM schedule WHERE date = ? AND username = ?", date1, username)
            if not record1:
                db.execute("INSERT INTO schedule (username, date, shift) VALUES (?, ?, ?)", username, date1, sched1)
            else:
                db.execute("UPDATE schedule SET shift = ? WHERE date = ? AND username = ?", sched1, date1, username)

        if sched2:
            record2 = db.execute("SELECT * FROM schedule WHERE date = ? AND username = ?", date2, username)
            if not record2:
                db.execute("INSERT INTO schedule (username, date, shift) VALUES (?, ?, ?)", username, date2, sched2)
            else:
                db.execute("UPDATE schedule SET shift = ? WHERE date = ? AND username = ?", sched2, date2, username)

        if sched3:
            record3 = db.execute("SELECT * FROM schedule WHERE date = ? AND username = ?", date3, username)
            if not record3:
                db.execute("INSERT INTO schedule (username, date, shift) VALUES (?, ?, ?)", username, date3, sched3)
            else:
                db.execute("UPDATE schedule SET shift = ? WHERE date = ? AND username = ?", sched3, date3, username)

        if sched4:
            record4 = db.execute("SELECT * FROM schedule WHERE date = ? AND username = ?", date4, username)
            if not record4:
                db.execute("INSERT INTO schedule (username, date, shift) VALUES (?, ?, ?)", username, date4, sched4)
            else:
                db.execute("UPDATE schedule SET shift = ? WHERE date = ? AND username = ?", sched4, date4, username)

        if sched5:
            record5 = db.execute("SELECT * FROM schedule WHERE date = ? AND username = ?", date5, username)
            if not record5:
                db.execute("INSERT INTO schedule (username, date, shift) VALUES (?, ?, ?)", username, date5, sched5)
            else:
                db.execute("UPDATE schedule SET shift = ? WHERE date = ? AND username = ?", sched5, date5, username)

        if sched6:
            record6 = db.execute("SELECT * FROM schedule WHERE date = ? AND username = ?", date6, username)
            if not record6:
                db.execute("INSERT INTO schedule (username, date, shift) VALUES (?, ?, ?)", username, date6, sched6)
            else:
                db.execute("UPDATE schedule SET shift = ? WHERE date = ? AND username = ?", sched6, date6, username)

        if sched7:
            record7 = db.execute("SELECT * FROM schedule WHERE date = ? AND username = ?", date7, username)
            if not record7:
                db.execute("INSERT INTO schedule (username, date, shift) VALUES (?, ?, ?)", username, date7, sched7)
            else:
                db.execute("UPDATE schedule SET shift = ? WHERE date = ? AND username = ?", sched7, date7, username)



        sender = "rostrnotifications@gmail.com"
        to_addr_list = str(request.form.get("email"))
        cc_addr_list = []
        subject = "Changes in Roster"
        password = "pfdwszxttyxeqqzf"

        header = 'From: %s\n' % sender
        header += 'To: %s\n' % ','.join(to_addr_list)
        header += 'Cc: %s\n' % ','.join(cc_addr_list)
        header += 'Subject: %s\n\n' % subject
        message = "Hi. There has been changes in your roster for the week commencing %s. Kindly check the Rostr website. Thank you." % date1
        message = header + message

        try:
            server = smtplib.SMTP('smtp.gmail.com', '587')
            server.starttls()
            server.login(sender, password)
            server.sendmail(sender, to_addr_list, message)
            print ("Successfully sent email")
        except smtplib.SMTPException as e:
            print ("Error: unable to send email")
            print(e)

        return redirect('/mgrpage?weekstart=' + weekstart)
    else:
        return render_template("staffpage.html")

@app.route("/staffpage", methods=["GET", "POST"])
@login_required
def staffpage():
    if request.method == "GET":
        weekstart = request.args.get("weekstart")
        if not weekstart:
            return render_template("staffpage.html", weekstart=weekstart)

        start_date = date.fromisoformat(weekstart)

        date1 = start_date.isoformat()
        date2 = (start_date + timedelta(days=1)).isoformat()
        date3 = (start_date + timedelta(days=2)).isoformat()
        date4 = (start_date + timedelta(days=3)).isoformat()
        date5 = (start_date + timedelta(days=4)).isoformat()
        date6 = (start_date + timedelta(days=5)).isoformat()
        date7 = (start_date + timedelta(days=6)).isoformat()

        users = db.execute("SELECT * FROM users WHERE id = ?", session["user_id"])
        name = users[0]["username"]

        records = db.execute("SELECT * FROM schedule WHERE date >= date(?) AND date < date(?, '+7 days') AND username = ? ORDER BY username, date", date1, date1, name)

        rows = []

        for user in users:
            rows.append([
                user,
                get_shift_from_records(records, user, date1) or "",
                get_shift_from_records(records, user, date2) or "",
                get_shift_from_records(records, user, date3) or "",
                get_shift_from_records(records, user, date4) or "",
                get_shift_from_records(records, user, date5) or "",
                get_shift_from_records(records, user, date6) or "",
                get_shift_from_records(records, user, date7) or "",
            ])

        return render_template("staffpage.html", weekstart=request.args.get("weekstart"), rows=rows, date1=date1, date2=date2, date3=date3, date4=date4, date5=date5, date6=date6, date7=date7)