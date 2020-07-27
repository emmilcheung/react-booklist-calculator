from flask import render_template, logging, request, jsonify, make_response, session
from flask_cors import CORS, cross_origin
from passlib.hash import sha256_crypt
from Module import app, mysql
import uuid
import jwt
import datetime
from functools import wraps
"""

"""


# pass user object fetched from mysql to lower function when authorized
# return 401 to client for unauthorized
def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        token = None
        jwt_data = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
            # print(token)
        if not token:
            return jsonify({'message' : 'Required token information'})
        
        try:
            jwt_data = jwt.decode(token, app.secret_key)
        except Exception as err:
            return jsonify({'message' : str(err)}), 401
        cur = mysql.connection.cursor()
        res = cur.execute("select users.*, if(admin.user_id is null, false, true) as is_admin from users left join admin ON admin.user_id=users.id where users.username='{}'".format(jwt_data['username']))
        current_user = cur.fetchone()
        cur.close()

        return f(current_user, *args, **kwargs)
    
    return wrap

# def is_logged_in(func):
#     @wraps(func)
#     def wrap(*args, **kwargs):
#         if 'logged_in' in session:
#             return func(*args, **kwargs)
#         else:
#             # flash('Unauthorized, Please login', 'danger')
#             return jsonify({'message' : 'Required token information'})
#     return wrap

@app.route('/auth')
# @cross_origin()
def auth():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        print('no auth')
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    #create mysql curser and fetch user info for checking
    cur = mysql.connection.cursor()
    res = cur.execute("select users.*, if(admin.user_id is null, false, true) as is_admin from users left join admin on users.id=admin.user_id where users.username='{}';".format(auth.username))
    if res <= 0:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
    user = cur.fetchone()
    username = user['username']
    password = user['password']
    cur.close()

    if sha256_crypt.verify(auth.password, password):
        app.logger.info('User [{}] is logged in ({})'.format(username, datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")))
        session['logged_in'] = True
        session['username'] = username
        session['user_type'] = 'admin' if user['is_admin'] else 'normal'
        token = jwt.encode({'username' : username, 'admin' : True if user['is_admin'] else False,'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.secret_key,algorithm='HS256')
        # print(app.secret_key)
        # return jsonify({'token' : token.decode('UTF-8')})
        respone =  make_response(jsonify({'token': token.decode('UTF-8')}), 200)
        # respone.set_cookie(key='jwt-token', value=token.decode('UTF-8'), expires=datetime.datetime.utcnow()+datetime.timedelta(minutes=30))
        return respone
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

@app.route('/logout')
# @cross_origin()
@is_logged_in
def logout(current_user):
    
    respone =  make_response(jsonify({"message": "logged out"}), 200)
    # respone.set_cookie(key='-token', expires=0, httponly=True)
    return respone

@app.route('/repurchase', methods=['GET'])
@is_logged_in
def get_all_repurchase(current_user):
    
    # mysql sql fetch
    cur = mysql.connection.cursor()
    query_string = "select * \
                    from repurchase_list \
                    order by list_id asc;"
    result = cur.execute(query_string)
    try:
        if result > 0:
            dataArray= []
            data = cur.fetchall()
            cur.close()
            for order_detail in data:
                for key in order_detail.keys():
                    # string the dateime.datetime for client javascript import
                    if isinstance(order_detail[key], datetime.datetime):
                        order_detail[key] = order_detail[key].__str__()
                dataArray.append(order_detail)
            return jsonify({'dataArray': dataArray} )
    except Exception as err:
        return {'message' : str(err)}

    return {'message' : 'No order found'}

class RepurchaseOrder():
    def __init__(self, data):
        self.student_name = data['student_name'] if data['student_name'] else ""
        self.phone_no = data['phone_no'] if data['phone_no'] else "" 
        self.school = data['school'] if data['school'] else ""
        self.grade =  data['grade'] if data['grade'] else ""
        self.remarks = data['remarks'] if data['remarks'] else ""
        self.record_date = 'CURRENT_TIMESTAMP' if data['record_date'] else None
        self.arrived_date = data['arrived_date'] if data['arrived_date'] else None
        self.finish_date = data['finish_date'] if data['finish_date'] else None
        self.public_id = str(uuid.uuid4())

@app.route('/repurchase', methods=['POST'])
@is_logged_in
def create_repurchase(current_user):
    
    # mysql sql fetch
    data = request.get_json()
    print(data)
    try:
        if(data):
            # construct insert order class
            order = RepurchaseOrder(data)
            for key in data.keys():
                print(key)
            print(order.student_name, order.phone_no, order.school, order.grade)
            
            cur = mysql.connection.cursor()
            query_string = "INSERT INTO repurchase_list (student_name, phone_no, school, grade, remarks, arrived_date, finish_date, public_id) \
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            print(query_string)
            result = cur.execute(query_string,(order.student_name, order.phone_no, order.school, order.grade, order.remarks, order.arrived_date, order.finish_date, order.public_id))
            mysql.connection.commit()
            cur.close()
            return jsonify({'message': "Successful"})

        return {'message' : 'Unsuccessful'}
    except Exception as err:
        return jsonify({'message': str(err)})

@app.route('/repurchase/<order_id>', methods=['PUT'])
@is_logged_in
def update_repurchase(current_user, order_id):

    data = request.get_json()
    print(data)

    try:
        if (data):
            cur = mysql.connection.cursor()
            query_string = "select * from repurchase_list where public_id=%s"
            result = cur.execute(query_string,(order_id,))
            if result > 0 :
                order = RepurchaseOrder(data)
                update_string = "update repurchase_list set \
                    student_name=%s, \
                        phone_no=%s, \
                        school=%s, \
                        grade=%s, \
                        remarks=%s, \
                        arrived_date=%s, \
                        finish_date=%s \
                        where public_id=%s"
                cur.execute(update_string,(order.student_name, order.phone_no, order.school, order.grade, order.remarks, order.arrived_date, order.finish_date, order_id))
                mysql.connection.commit()
                cur.close()
                return jsonify({'message': "Update successful"})
            return jsonify({'message': "Invalid order id"})
        return jsonify({'message': 'Onchange error, please try again'})
    except Exception as err:
        return jsonify({'message': str(err)})

@app.route('/repurchase/<order_id>', methods=['DELETE'])
@is_logged_in
def delete_repurchase(current_user, order_id):
    
    if not current_user['is_admin'] :
        return jsonify({'message': 'Unauthorized'})

    try:
        cur = mysql.connection.cursor()
        query_string = "select * from repurchase_list where public_id=%s"
        result = cur.execute(query_string,(order_id,))
        if result > 0 :
            delete_string = "delete from repurchase_list where public_id=%s" 
            cur.execute( delete_string,(order_id,))
            mysql.connection.commit()
            cur.close()
            return jsonify({'message': "Delete successful"})
        return jsonify({'message': "Invalid order id"})
    except Exception as err:
        return jsonify({'message': str(err)})