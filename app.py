from flask import Flask, render_template,request,make_response,redirect
import json # Importing json to handle file i/o

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/testimonials')
def testimonials():
    return render_template('testimonials.html')

@app.route('/reservations')
def reservations():
    return render_template('reservations.html')

@app.route('/login-page')
def loginpage():
    return render_template('login.html')

@app.route('/registration')
def regestration():
    return render_template('register.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')


# Login verification system
@app.route('/login-credencials', methods=['POST'])
def verifyLogin():
   
    name = request.form.get('name')  # Get the 'name' field
    password = request.form.get('password')  # Get the 'email' field


    # Now accessing our dummy database
    database = ""
    with open("database.txt", "r") as file:
        content = file.read()
        database = content

    databaseObject = json.loads(database)

    for value in databaseObject:
        if((value["name"] == name or value["email"] == name ) and value["password"]== password):
            # Create a response object
            response = make_response(redirect('/'))


            # Set a cookie (key, value, and optional parameters)
            response.set_cookie(
                "username",  # Cookie name
                value["name"],   # Cookie value
                max_age=60*60*24,  # Optional: Cookie expiry in seconds (1 day here)
                secure=False,  # Set this to True for HTTPS
                path="/",  # Make the cookie available across all routes
            )
            return response
    return redirect('/login-page?resp=failed')

# Registration system
@app.route('/registration-keys', methods=['POST'])
def registrationKeys():
   
    name = request.form.get('name')  # Get the 'name' field
    email = request.form.get('email')  # Get the 'name' field
    password = request.form.get('password')  # Get the 'email' field


    # Now accessing our dummy database
    database = ""
    with open("database.txt", "r") as file:
        content = file.read()
        database = content

    databaseObject = json.loads(database)

    #Adding the user to the database
    databaseObject.append({
        "name": name,
        "email": email,
        "password": password
    })


    #Now updating the database
    # Open the file in write mode (it will overwrite the content)
    with open('database.txt', 'w') as file:
        file.write(json.dumps(databaseObject))

    # Sedning the user to the login page
    return redirect('/login-page')
    
# Login verification system
@app.route('/logout')
def logout():

    # Set a cookie (key, value, and optional parameters)
    response = make_response(redirect('/'))
    response.set_cookie(
        "username",  # Cookie name
        '0',   # Cookie value
        max_age=0,  # Optional: Cookie expiry in seconds
        secure=False,  # Set this to True for HTTPS
        path="/",  # Make the cookie available across all routes
    )
    return response

if __name__ == '__main__':
    app.run(debug=True)
