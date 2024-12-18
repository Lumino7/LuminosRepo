# Rostr
#### Video Demo:  <https://www.youtube.com/watch?v=hgRVHa2ZaJs>
#### Description:

Rostr is a web app for creating, editing and viewing employees' daily work schedule. with notification features.

Conflicts in work schedule can be a problem, especially in healthcare. There are times when employees show up at work, only to find out that they are off because there has been some changes and they were just not informed. Rostr aims to minimize these problems by ensuring that staff are notified of every change in their shift. It also allows employees to view their schedule in real time, also eliminating the dependency for paper rosters.

The app currently uses CS50 Codespace, so at the moment it can be run through a "flask run" command in the same. Upon opening the site, the user will land on the login/register page. Upon registration, the system automatically assigns the user as "staff". Once the user logs in, the app will generate a staff page or a manager page, depending on his/her "position" in the database.

The staff page will show the user's schedule after choosing a specific week from the calendar on top of the screen. Changes in schedule cannot be made on this page.

The manager page will show the schedule of all the staff, including the managers. Here, the user can edit the roster by inputting new schedule in the text boxes. After hitting submit, the system will automaticaly generate and send an email to the staff involved, notifying them of the changes.

The app was created using HTML, bootstrap, CSS, Flask with Python, Jinja, and SQL.

#### Files:

    static folder contains the logo and the CSS file.

    templates folder:

        login.html - The login/register page.
        register.html - page for registering a new user's details.
        mgrpage.html - page shown after a "manager" user logs in. A date-type html input is used to prompt the user to enter a week start date, which is limited to Mondays. This date is sent to the URL parameters, which is then used by app.py. This is iterated through to create a week-long table, wherein Jinja loops are used to iterate through users' saved schedules and display them on the table. Each of the schedule cells can be edited, and upon clicking submit, these data is sent as a form to app.py.

        staffpage.html - page shown after a "staff" user logs in. It is mostly similar to mgrpage.html except schedule editing is not implemented and the only the current session user's schedule can be shown.

        app.py - the script that runs the wep app.
            -Python's flash function is used to display errors in login/registration.
            -The "Week Starting on" date taken from either mgrpage or staffpage templates are used to generate dates for the tables in the html. The isoformat function of the date object is used so the dates are displayed in the webpage in iso format.
            -For the mgrpage route, GET request method will generate the schedule of all users to be iterated on by mgrpage.html. Once the user clicks submit button on the schedule table, POST request method will be undertaken, which will either create or edit the schedules of each of the users. Python's SMTP library is used for the email functionality.
            -The staffpage route is almost the same with mgrpage except it doesnt include the implementation for the POST request method.


        rostr.db - SQL database that stores all the user info and schedule. Two tables are used, users and schedule. Changes in the users' position can only be made in the SQL database.