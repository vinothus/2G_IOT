import sys
import os
import sqlite3
sys.path.append(os.path.dirname(sys.argv[0])+'//lib')
import serial
from bottle import route, run ,template ,static_file,view,request, response ,redirect
from os.path import dirname, realpath, sep, pardir
import sys
import bottle
from bottle_log import LoggingPlugin
from gpio import GPIO, GPIOError
bottle.TEMPLATE_PATH.insert(0, os.path.dirname(sys.argv[0])+'/views')

@route('/gethouseholdslist')
def getHouseholds():
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
