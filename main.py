"""
webserver.py

File that is the central location of code for your webserver.
"""

from flask import Flask, render_template, request
import os
import requests
import json
import sqlite3


"""def get_connection():
    return sqlite3.connect('projects.db')

def create_shifts_table():
    conn = get_connection()
    c = conn.cursor()

    c.execute("CREATE TABLE IF NOT EXISTS shifts (shift_id integer PRIMARY KEY, slug text, shift_date text, shift_type text, quantity integer )")

    conn.commit()
    conn.close()"""


app = Flask(__name__)
#create_shifts_table()
  
"""@app.route('/')
def load_default():
    return render_template("home.html")

@app.route('/index')
def load_index():
    return render_template("home.html") # Render the template located in "templates/index.html"""

@app.route('/')
def load_home():
    return render_template("home.html")

"""@app.route('/contact')
def load_contact():
    return render_template("contact.html")

@app.route('/volunteer', methods=['GET'])
def load_volunteer():
    return render_template("volunteer.html")


@app.route('/verify', methods=['POST'])
def verify_volunteer():
    npi = request.form.get("npi")

    api_response = requests.get(
        "https://api.betterdoctor.com/2016-03-01/doctors/npi/%s" % npi,
            params={"user_key": "0342b083731a904a7a774bb1b5b5a7a5", 
            "fields": "licenses"})
    print(api_response)

    licenses = api_response.json()
    print (licenses['data'])

    if npi == "yes":
        return render_template("EligibleVolunteer.html")
    else:
        return render_template("NotEligibleVolunteer.html")



@app.route('/shift',methods=['GET','POST'])
def volunteer_confirmed():
    return render_template("VolunteerConfirmation.html")

@app.route('/organization')
def load_organizer():
    return render_template("organizer.html")

@app.route('/orgconfirm', methods=['GET','POST'])
def organization_confirmed():
    return render_template("OrganizationConfirmation.html")

@app.route('/schedule', methods=['POST'])
def load_schedule():
    print ('Parsing Request to JSON')
    request_data = request.get_json()
    print ('Sucessfully parsed JSON')

    shift_id = request_data["shift_id"]
    slug = request_data["slug"]
    shift_date = request_data["shift_date"]
    shift_type = request_data["shift_type"]
    quantity = request_data["quantity"]

    conn = get_connection()
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO shifts (shift_id, slug, shift_date, shift_type, quantity) VALUES (?, ?, ?, ?, ?)", [ shift_id, slug, shift_date, shift_type, quantity ])
    conn.commit()
    conn.close()

    response_text = dict()
    response_text['message'] = "Success"
    return json.dumps(response_text)

@app.route('/schedule', methods=['GET'])
def get_schedule():
    print ('received', request)
    conn = get_connection()
    c = conn.cursor()
    
    c.execute("SELECT shift_id, slug, shift_date, shift_type, quantity FROM shifts")

    blogs = c.fetchall()

    return_data = list()
    for blog in blogs:
        blog_dict = dict()

        blog_dict["shift_id"] = blog[0]
        blog_dict["slug"] = blog[1]
        blog_dict["shift_date"] = blog[2]
        blog_dict["shift_type"] = blog[3]
        blog_dict["quantity"] = blog[4]


        return_data.append(blog_dict)

    return json.dumps(return_data)"""
if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)


