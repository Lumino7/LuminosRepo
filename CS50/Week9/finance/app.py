import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

#db.execute("DROP TABLE IF EXISTS `transactions`")
#db.execute("CREATE TABLE `transactions` (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, symbol TEXT NOT NULL, shares NUMERIC NOT NULL, price NUMERIC NOT NULL, user_id TEXT NOT NULL, `when` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")

# Make sure API key is set
if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")

def get_user_cash():
    rows = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])
    if len(rows) != 1:
        return None
    return rows[0]["cash"]

def get_user_stocks():
    stocks = db.execute("SELECT symbol, SUM(shares_bought) AS shares_bought, SUM(shares_sold) AS shares_sold FROM transactions WHERE user_id = (?) GROUP BY symbol", session["user_id"])
    for stock in stocks:
        quote = lookup(stock["symbol"])
        stock["price"] = quote["price"]
        stock["current_shares"] = stock["shares_bought"] - stock["shares_sold"]
        stock["value"] = stock["current_shares"] * stock["price"]
        stock["name"] = quote["name"]
    return stocks

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/", methods=["GET", "POST"])
@login_required
def index():
    """Show portfolio of stocks"""
    if request.method == "POST":
        addcash = int(request.form.get("addcash"))
        cash = get_user_cash()
        if not addcash:
            return render_template("apology.html")
        else:
            newcash = cash + addcash
            db.execute("UPDATE users SET cash = (?) WHERE id = (?)", newcash, session["user_id"])
            return redirect("/")

    else:
        stocks = get_user_stocks()
        value = 0
        for stock in stocks:
            value = value + stock["value"]
        cash = get_user_cash()
        gtotal = cash + value
        return render_template("index.html", stocks=stocks, cash=cash, gtotal=gtotal)



@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        shares = request.form.get("shares")
        if not str.isdigit(shares):
            return apology("invalid order")
        shares = float(shares)
        if not symbol or shares <= 0 or not float.is_integer(shares):
            return apology("invalid order")
        realstock = lookup(symbol)
        if not realstock:
            return apology("invalid symbol")
        totalprice = realstock["price"] * shares
        avcash = get_user_cash()
        if not avcash or avcash < totalprice:
            return render_template("apology.html")
        else:
            avcash = avcash - totalprice
            db.execute("INSERT INTO transactions (type, symbol, shares_bought, shares_sold, price, user_id) VALUES (?, ?, ?, ?, ?, ?)", "BUY", symbol, shares, 0, realstock["price"], session["user_id"])
            db.execute("UPDATE users SET cash = (?) WHERE id = (?)", avcash, session["user_id"])
            return redirect("/")

    else:
        return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    transactions = db.execute("SELECT * FROM transactions where user_id = (?)", session["user_id"])
    return render_template("history.html", transactions=transactions)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
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

@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    if request.method == "POST":
        quote = lookup(request.form.get("symbol"))
        if not quote:
            return apology("invalid symbol")

        return render_template("quoted.html", quote=quote)
    else:
        return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register(): # TODO
    """Register user"""

    if request.method == "POST":
        name = request.form.get("username")
        if not name:
            return apology("invalid username")
        users = db.execute("SELECT username FROM users")
        for user in users:
            if user["username"] == name:
                return apology("username already exists")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        if not password or password != confirmation:
            return apology("invalid password")
        else:
            hash = generate_password_hash(password)
            db.execute( "INSERT INTO users (username, hash) VALUES (?, ?)", name, hash)
            return render_template("login.html")
    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    stocks = get_user_stocks()

    if request.method == "POST":
        symbol = request.form.get("symbol")
        shares = int(request.form.get("shares"))

        if not symbol or shares <= 0:
            return apology("invalid order")

        # Find the target stock in our list of user stocks
        targetStock = None
        for stock in stocks:
            if stock["symbol"] == symbol:
                targetStock = stock
                break

        if not targetStock:
            return apology("invalid symbol")

        if shares > targetStock["current_shares"]:
            return apology("insufficient shares")

        totalprice = targetStock["price"] * shares

        print("hello")

        db.execute("INSERT INTO transactions (type, symbol, shares_bought, shares_sold, price, user_id) VALUES (?,?, ?, ?, ?, ?)", "SELL", symbol, 0, shares, stock["price"], session["user_id"])
        cash = get_user_cash()
        newcash = cash + totalprice
        db.execute("UPDATE users SET cash = (?) WHERE id = (?)", newcash, session["user_id"])
        return redirect("/")
    else:
        return render_template("sell.html", stocks=stocks)
