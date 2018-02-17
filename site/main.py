from flask import Flask, request, render_template
import logging
import requests
import os
app = Flask(__name__,static_url_path="/static")

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

@app.route('/')
@app.route('/index')
def home():
  return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html') 

@app.route('/contact')
def contact():
  return render_template('contact.html')

@app.route('/email', methods=['GET','POST'])
def send_email():
  message = request.form.get("message")
  name = request.form.get("name")
  subject = request.form.get("subject")
  notifications = []
  """data = {
        "from": os.environ["INFO253_MAILGUN_FROM_EMAIL"],
        "to": os.environ["INFO253_MAILGUN_TO_EMAIL"],
        "subject": "You just was sent a message",
        "text": message
  }""" 
  auth = (os.environ["INFO253_MAILGUN_USER"], os.environ["INFO253_MAILGUN_PASSWORD"])
  """requests.post(
        os.environ["INFO253_MAILGUN_DOMAIN"],
        auth=auth,
        data=data)"""
  if (message != None):
    requests.post(
        os.environ["INFO253_MAILGUN_DOMAIN"],
        #auth=("api", "key-5f903146264eae708f15db0113662706"),
        auth=auth,
        data={"from": "Mailgun Sandbox <postmaster@sandbox587f872de88f4507bb9d812476fbc7b6.mailgun.org>",
              "to": os.environ["INFO253_MAILGUN_TO_EMAIL"],
              "subject": subject,
              "text": "New message from " + name + ": " + message})
  """if r.status_code == requests.codes.ok:
    notifications.append("Your email was sent")
  else:
    notifications.append("You email was not sent. Please try again later")"""
  notifications.append("Hi " + name +", your message has been sent.")
  return render_template("contact.html", notifications=notifications)
  #return render_template("contact.html")


if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END app]