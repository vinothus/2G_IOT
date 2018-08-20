import sys
import os
import sqlite3
sys.path.append(os.path.dirname(sys.argv[0])+'//lib')
import serial
from bottle import route, run ,template ,static_file,view,request, response
from os.path import dirname, realpath, sep, pardir
import sys
import bottle
from bottle_log import LoggingPlugin
from gpio import GPIO, GPIOError
#app = bottle.Bottle()
#app.install(LoggingPlugin(app.config))
#path = 'C:\Users\511517\Desktop\bottle'
#sys.path.append(r"C:\Users\511517\Desktop\bottle")
bottle.TEMPLATE_PATH.insert(0, os.path.dirname(sys.argv[0])+'/views')
  
def str2bool(v):
  return v.lower() in ("yes", "true", "t", "1","on")
  
def printme(pinnum,boolval):
   "This prints a passed string into this function"
   gpio_out = GPIO(pinnum, "out")
   value =boolval  
   gpio_out.write(value)
   gpio_out.close()
   return	True


def getVal(pinnum):
   "This prints a passed string into this function"
   gpio_in = GPIO(pinnum, "preserve")
   value =gpio_in.read()
   gpio_in.close()
   
   return	value
def getValOut(pinnum):
   "This prints a passed string into this function"
   gpio_in = GPIO(pinnum, "out")
   value =gpio_in.read()
   gpio_in.close()
   
   return	value
def initDB():
  conn = sqlite3.connect('HomeAutomation.db')
  conn.execute("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name char(100) NOT NULL, password char(100) NOT NULL , email char(100), phoneno char(12) ,address char(100))")
  print('database initiated')
  
def _init_():
  try:
     print('init script')
     print( {"gpio56":getValOut(56),"gpio122":getValOut(122),"gpio123":getValOut(123),"gpio124":getValOut(124),"gpio125":getValOut(125),"gpio126":getValOut(126),"gpio121":getValOut(121),"gpio101":getValOut(101)})
  except:
     print('exception occur on initilize smart device')
_init_() 
initDB()

@route('/hello')
def hello():
# path = 'C:\Users\511517\Desktop\bottle';
#os.environ['PATH'] += ':'+path;
#response.charset = 'ISO-8859-15'
#path ="C:\Users\511517\Desktop\bottle"
     #logger.warning('This is only a test')
    return  printme(56,True)
	#+"Hello World!"+ os.getcwd() + str(sys.path)[1:-1]  +os.environ['PATH'] +os.path.realpath(__file__) +os.path.dirname(sys.argv[0])
	

@route('/switch/<number>/<action>')
def switchProcessing(number='number',action='action'):
    #ActionBool = str2bool(action)
    # logger.warning('the switch '+number+' undergoes action '+action)
  return  printme(int(number),  str2bool(action))

@route('/getSwitchStatus/<number>')
def switchProcessing(number='number'):
     
  return  getVal(int(number))
 

@route('/')
@view('index')
def index():
   # logger.warning('index')
    return { 'get_url': '' } 
	
@route('/')
@view('index')
def js():
 
    return { 'get_url': '' } 
	

@route('/static/:path#.+#', name='static')
def static(path):
    #logger.warning('static')
    return static_file(path, root=os.path.dirname(sys.argv[0])+'/static')

@route('/counter')
def counter():
    count = int( request.cookies.get('counter', '0') )
    count += 1
    response.set_cookie('counter', str(count))
    return 'You visited this page %d times' % count

@route('/getGPIO')
def getGPIO():

   return {"gpio56":getVal(56),"gpio122":getVal(122),"gpio123":getVal(123),"gpio124":getVal(124),"gpio125":getVal(125),"gpio126":getVal(126),"gpio121":getVal(121),"gpio101":getVal(101)}
@route('/runs')
def runs():
 arg=request.query['arg']
 return os.popen(arg).read()

@route('/CheckModem')
def CheckModem():
   path=request.query['path']
   ser = serial.Serial(path, 115200, timeout=5)
   ser.write("AT\r")
   response =  ser.read(2)
   ser.close()
   return response

run(host='0.0.0.0', port=8080, debug=True)