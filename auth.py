import sys
import os
import sqlite3
sys.path.append(os.path.dirname(sys.argv[0])+'//lib')
import serial
#from bottle.ext import beaker
from bottle import route, run ,template ,static_file,view,request, response ,redirect
from os.path import dirname, realpath, sep, pardir
import sys
import bottle
from bottle_log import LoggingPlugin
from gpio import GPIO, GPIOError
import sched
import threading
import time
bottle.TEMPLATE_PATH.insert(0, os.path.dirname(sys.argv[0])+'/views')
@route('/gethouseholdslist')
def getHouseholdslist():
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT * FROM householdslist ")
    result = c.fetchall()
    return dict(data=result)    
@route('/makehouseholdslist')
def makehouseholdslist():
    householdname=request.query['householdname']
    householddesc=request.query['householddesc']
    uiicon=request.query['uiicon']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO householdslist(householdname,householddesc,uiicon) VALUES (?,?,?)", (householdname,householddesc,uiicon))
    new_id = c.lastrowid
    conn.commit()    
    return dict(data=new_id)
@route('/deletehouseholdslist')
def deleteHouseholds():
    id=request.query['id']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("DELETE  FROM householdslist where id= ?" , (id,))
    conn.commit()  
    result = c.fetchall()
    return dict(data=result)
@route('/edithouseholdslist')
def edithouseholdslist():
    id=request.query['id']
    householdname=request.query['householdname']
    householddesc=request.query['householddesc']
    uiicon=request.query['uiicon']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("update  householdslist SET householdname=? , householddesc=? , uiicon =?  where id =? ", (householdname,householddesc,uiicon ,id ))
    new_id = c.lastrowid
    conn.commit()    
    return dict(data=new_id)
@route('/getusers')
def getusers():
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT * FROM user ")
    result = c.fetchall()
    return dict(data=result)    
@route('/makeuser')
def makeuser():
    name=request.query['name']
    password=request.query['password']
    email=request.query['email']
    phoneno=request.query['phoneno']
    address=request.query['address']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO user(name,password,email,address,phoneno) VALUES (?,?,?,?,?)", (name,password,email,address,phoneno))
    new_id = c.lastrowid
    conn.commit()    
    return dict(data=new_id)
@route('/deleteuser')
def deleteHouseholds():
    id=request.query['id']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("DELETE  FROM user where id= ?" , (id,))
    conn.commit()  
    result = c.fetchall()
    return dict(data=result)
@route('/edituser')
def edithouseholdslist():
    id=request.query['id']
    name=request.query['name']
    password=request.query['password']
    email=request.query['email']
    address=request.query['address']
    phoneno=request.query['phoneno']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("update  user SET password=? , name=? , email =? , address =? , phoneno=?  where id =?  ", (password,name  ,email,address,phoneno,id ))
    new_id = c.lastrowid
    conn.commit()    
    return dict(data=new_id)
@route('/getCommonBootGrid', method='POST')
def getCommonBootGrid():
    conn = sqlite3.connect('HomeAutomation.db')
    table=request.query['table']
    c = conn.cursor()
    c.execute("PRAGMA table_info("+table+")")
    columns =  c.fetchall()
    c.execute("SELECT * FROM "+table)
    result = c.fetchall()
    rows=[];
    print(result) 
    for i in range(len(result)):
        x={}
        for k in range(len(columns)):
         x.update({columns[k][1]:result[i][k]})
        rows.append(x)
        print (rows)
         
    json={
     "current": 1,
     "rowCount": 10,
    "rows":rows ,
     "total":  getRowCount(table)}
    return json
def getRowCount(tablename):
    con = sqlite3.connect('HomeAutomation.db')
    cursor = con.cursor()
    cursor.execute("select count(*) from "+tablename) #returns array of tupples
    result = cursor.fetchall()
  
    return result[0][0]
#@route('/server')
#def server():
#     s = bottle.request.environ.get('beaker.session')
#     s['test'] = 'session'
#     s.save()
#     return request.query_string 
#@route('/serversession')
#def serversession():
#    s = bottle.request.environ.get('beaker.session')
     
#    return s['test']
@route('/measureDistance')
def measureDistance():
    from i2c import I2C 
    i2c = I2C("/dev/i2c-0")
    msgs = [I2C.Message([0xFF, 0xFF]), read=False)]
    i2c.transfer(0x20, msgs)
    i2c.close()
    return msgs[1].data[0]
    