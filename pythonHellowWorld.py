import sys
import os
import sqlite3
sys.path.append(os.path.dirname(os.path.abspath(sys.argv[0]))+'//lib')
sys.path.append(os.path.dirname(os.path.abspath(sys.argv[0])))
import serial
import auth
import schedule
from bottle import route, run ,template ,static_file,view,request, response ,redirect
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

import sched
import threading
import time
from datetime import datetime
from datetime import timedelta
scheduler = sched.scheduler(time.time, time.sleep)
isCloudDroidrun=False
#session_opts = {
#    'session.type': 'file',
#    'session.cookie_expires': 300,
#    'session.data_dir': './data',
#   'session.auto': True
#}

#app = beaker.middleware.SessionMiddleware(bottle.app(), session_opts) 
def str2bool(v):
  return v.lower() in ("yes", "true", "t", "1","on")
  
def printme(pinnum,boolval):
   "This prints a passed string into this function"
   gpio_out = GPIO(pinnum, "out")
   value =boolval  
   gpio_out.write(value)
   gpio_out.close()
   return	str(True)


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
def startCloudDroid():
     import datetime
     print('cloud droid try to start')
     global isCloudDroidrun
     print(isCloudDroidrun)
     if isCloudDroidrun == False :
        print('inside if')
        isCloudDroidrun=True
        e1 = scheduler.enter(2, 1, cloudDroid,'')
        t = threading.Thread(target=scheduler.run)
        t.daemon = True
        t.start()
        print('cloud droid started')
def printData(params):
    print('printData :'+params)
def MaskData(param1,param2):
    print(param1+' :'+param2 )     
def makeSchedular(type,cronExp,methodPar,taskName):
    print('type'+type+'methodPar :'+methodPar)
    if type == 'minute' :
       print('schedular starts'+methodPar.split(':')[0])
       MetArr=methodPar.split(':')
       MetArr.remove(methodPar.split(':')[0])
       str='schedule.every('+(cronExp)+').minutes.do(lambda:'+methodPar.split(':')[0]+'('
       for i in range(len(MetArr)):
           str=str+'\''+MetArr[i]+'\','
       str = str[:-1]    
       str=str+')).tag(\''+taskName+'\')';
       print(str)
       eval(str)
       #schedule.every(int(cronExp)).minutes.do(eval(methodPar.split(':')[0]),methodPar.split(':')[1])
       
def cloudDroid():
     import schedule
     import time
     import datetime
     conn = sqlite3.connect('HomeAutomation.db')
     c = conn.cursor()
     c.execute("SELECT * FROM schedule ")
     result = c.fetchall()
     for i in range(len(result)):
         makeSchedular(result[i][3],result[i][5],result[i][6],result[i][1])
     schedule.every(1).minutes.do(printData,'testparams')
     print ('schedule starts'+datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
     while(True):
      time.sleep(1)
      schedule.run_pending()
      #print (datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
      #print('wake after sleep 1 sec'+now.year+ ' '+now.month+' '+now.day+' '+now.hour+' '+now.minute)
def initDB():
  conn = sqlite3.connect('HomeAutomation.db')
  conn.execute("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name char(100) NOT NULL, password char(100) NOT NULL , email char(100), phoneno char(12) ,address char(100))")
  conn.execute("CREATE TABLE IF NOT EXISTS rooms (id INTEGER PRIMARY KEY, roomname char(100) NOT NULL, roomdesc char(100) NOT NULL ,uiicon char(100))")
  conn.execute("CREATE TABLE IF NOT EXISTS port (id INTEGER PRIMARY KEY, portnamename char(100) NOT NULL, portdesc char(100) NOT NULL,porttype char(100) NOT NULL ,porthdid char(100) NOT NULL)")
  conn.execute("CREATE TABLE IF NOT EXISTS households (id INTEGER PRIMARY KEY,roomid INTEGER, householdname char(100) NOT NULL, householddesc char(100) NOT NULL,householdport INTEGER NOT NULL ,uiicon char(100))")
  conn.execute("CREATE TABLE IF NOT EXISTS schedule (id INTEGER PRIMARY KEY, schedulename char(100) NOT NULL, scheduledesc char(100) NOT NULL,scheduletype char(100) ,scheduletime char(100),cronExp char(100),methodpar char(100))")
  conn.execute("CREATE TABLE IF NOT EXISTS householdslist (id INTEGER PRIMARY KEY,householdname char(100) NOT NULL, householddesc char(100) NOT NULL,uiicon char(100))")
  conn.execute("INSERT OR REPLACE INTO port(id, portnamename,portdesc,porttype,porthdid) VALUES(1, 'GPIO56','General purpose I/O port','GPIO','56')")
  conn.execute("INSERT OR REPLACE INTO port(id, portnamename,portdesc,porttype,porthdid) VALUES(2, 'GPIO122','General purpose I/O port','GPIO','122')")
  conn.execute("INSERT OR REPLACE INTO port(id, portnamename,portdesc,porttype,porthdid) VALUES(3, 'GPIO123','General purpose I/O port','GPIO','123')")
  conn.execute("INSERT OR REPLACE INTO port(id, portnamename,portdesc,porttype,porthdid) VALUES(4, 'GPIO124','General purpose I/O port','GPIO','124')")
  conn.execute("INSERT OR REPLACE INTO port(id, portnamename,portdesc,porttype,porthdid) VALUES(5, 'GPIO125','General purpose I/O port','GPIO','125')") 
  conn.execute("INSERT OR REPLACE INTO port(id, portnamename,portdesc,porttype,porthdid) VALUES(6, 'GPIO126','General purpose I/O port','GPIO','126')")  
  conn.execute("INSERT OR REPLACE INTO port(id, portnamename,portdesc,porttype,porthdid) VALUES(7, 'GPIO101','General purpose I/O port','GPIO','101')")
  conn.execute("INSERT OR REPLACE INTO port(id, portnamename,portdesc,porttype,porthdid) VALUES(8, 'GPIO121','General purpose I/O port','GPIO','121')")  
  conn.commit()
  print('database initiated')
  print(os.path.dirname(os.path.abspath(sys.argv[0])))
  startCloudDroid()
  
  
def deleteTable(tableName):
  conn = sqlite3.connect('HomeAutomation.db')  
  conn.execute("DROP TABLE "+tableName)
  print('Dropped Table : '+tableName)
  conn.commit()
  return 'done'
def _init_():
  try:
     print('init script')
     print( {"gpio56":getValOut(56),"gpio122":getValOut(122),"gpio123":getValOut(123),"gpio124":getValOut(124),"gpio125":getValOut(125),"gpio126":getValOut(126),"gpio121":getValOut(121),"gpio101":getValOut(101)})
  except:
     print('exception occur on initilize smart device')
_init_() 
initDB()
@route('/jobs')
def jobs():
    print(schedule.jobs)
    jobArray=schedule.jobs
    returnArray=[]
    for i in range(len(jobArray)):
        print(''+str(jobArray[i].interval))
        print(''+str(jobArray[i].latest))
        print(''+str(jobArray[i].job_func))
        print(''+str(jobArray[i].unit))
        print(''+str(jobArray[i].at_time))
        print(''+str(jobArray[i].last_run))
        print(''+str(jobArray[i].next_run))
        print(''+str(jobArray[i].period))
        print(''+str(jobArray[i].start_day))
        print(''+str(jobArray[i].tags))
        print(''+str(jobArray[i].scheduler))
        returnArray.append({'Interval':str(jobArray[i].interval),'Job':str(jobArray[i].job_func),'Next_Run':str(jobArray[i].next_run),'Unit':str(jobArray[i].unit),'Tag':str(jobArray[i].tags)})
    return dict(data=returnArray)
@route('/deljobs')
def deljobs():
    jobName=request.query['jobName']
    schedule.clear(jobName)
    return 'done'
@route('/dropTable')
def dropTable():
    tableName=request.query['tableName']
    return deleteTable(tableName)
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
def index():
   # logger.warning('index')
   return redirect("/static/index.htm")
@route('/houseHolds')
@view('houseHolds')
def houseHolds():
    roomid=request.query['roomid']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT h.* ,p.* FROM households h join  port p where h.roomid = ? and p.id=h.householdport ", (roomid,))
    result = c.fetchall()
    return {'roomname':'BathRoom','roomid':roomid ,'result':result}	
@route('/houseHoldsJson')
def houseHoldsJson():
    roomid=request.query['roomid']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT h.* ,p.* FROM households h join  port p where h.roomid = ? and p.id=h.householdport ", (roomid,))
    result = c.fetchall()
    c.execute("SELECT * FROM rooms where id= ? ", (roomid,))
    roomidresult=c.fetchall()
    return {'roomname':roomidresult[0][1],'roomid':roomid ,'result':result}	
@route('/')
def js():
 
    return redirect("/static/index.htm")
	

@route('/static/:path#.+#', name='static')
def static(path):
    #logger.warning('static')

    return static_file(path, root=os.path.dirname(os.path.abspath(sys.argv[0]))+'/static')

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
   ser = serial.Serial(path, 9600, timeout=5)
   ser.write(str.encode('ATE0\r'))
   response =  ser.read(4)
   ser.close()
   return response
@route('/getPorts')
def getPorts():
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT * FROM port ")
    result = c.fetchall()
    return dict(data=result)
@route('/deletePort')
def deletePort():
    id=request.query['id']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("DELETE  FROM port where id= ?" , (id,))
    conn.commit()  
    result = c.fetchall()
    return dict(data=result)
@route('/makePorts')
def makePorts():
    portnamename=request.query['portnamename']
    portdesc=request.query['portdesc']
    porttype=request.query['porttype']
    porthdid=request.query['porthdid']
    
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO port(portnamename,portdesc,porttype,porthdid) VALUES(?,?,?,?)", (portnamename,portdesc,porttype,porthdid))
    
    new_id = c.lastrowid

    conn.commit()    

    return dict(data=new_id)
@route('/getRooms')
def getRooms():
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT * FROM rooms ")
    result = c.fetchall()
    return dict(data=result)
def getRowCount(tablename):
    con = sqlite3.connect('HomeAutomation.db')
    cursor = con.cursor()
    cursor.execute("select count(*) from "+tablename) #returns array of tupples
    result = cursor.fetchall()
  
    return result[0][0]
@route('/getRoomBootGrid',method='POST')
def getRooms():
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT * FROM rooms ")
    result = c.fetchall()
    rows=[];
    print(result) 
    for i in range(len(result)):
         id=result[i][0]
         roomname=result[i][1]
         roomdesc=result[i][2]
         uiicon=result[i][3]
         rows.append({"id":id,"roomname":roomname,"roomdesc":roomdesc,"uiicon":"<span class='fa fa-"+uiicon+"'>  "+uiicon+"</span>"})
         for j in range(len(result[i])):
              print(result[i][j])
    json={
     "current": 1,
     "rowCount": 10,
    "rows":rows ,
     "total":  getRowCount('rooms')}
    return json
@route('/getHouseholdsBootGrid',method='POST')
def getHouseholdsBootGrid():
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT * FROM households ")
    result = c.fetchall()
    rows=[];
    print(result) 
    for i in range(len(result)):
         id=result[i][0]
         roomid=result[i][1]
         householdname=result[i][2]
         householddesc=result[i][3]
         householdport=result[i][4]
         uiicon=result[i][5]
         rows.append({"id":id,"roomid":roomid,"householdname":householdname,"householddesc":householddesc,"householdport":householdport,"uiicon":"<span class='fa fa-"+uiicon+"'>  "+uiicon+"</span>"})
         for j in range(len(result[i])):
              print(result[i][j])
    json={
     "current": 1,
     "rowCount": 10,
    "rows":rows ,
     "total":  getRowCount('households')}
    return json
@route('/getPortsBootGrid',method='POST')
def getPortsBootGrid():
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT * FROM port ")
    result = c.fetchall()
    rows=[];
    print(result) 
    for i in range(len(result)):
         id=result[i][0]
         portnamename=result[i][1]
         portdesc=result[i][2]
         porttype=result[i][3]
         porthdid=result[i][4]
         rows.append({"id":id,"portnamename":portnamename,"portdesc":portdesc,"porttype":porttype,"porthdid":porthdid})
         for j in range(len(result[i])):
              print(result[i][j])
    json={
     "current": 1,
     "rowCount": 10,
    "rows":rows ,
     "total":  getRowCount('port')}
    return json
@route('/makeRoom')
def makeRoom():
    roonname=request.query['roonname']
    roomdesc=request.query['roomdesc']
    uiicon=request.query['uiicon']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO rooms(roomname,roomdesc,uiicon) VALUES (?,?,?)", (roonname,roomdesc,uiicon))
    new_id = c.lastrowid

    conn.commit()    

    return dict(data=new_id)
@route('/modifyRoom')
def modifyRoom():
    id=request.query['id']
    roonname=request.query['roonname']
    roomdesc=request.query['roomdesc']
    uiicon=request.query['uiicon']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO rooms(id,roomname,roomdesc,uiicon) VALUES (?,?,?,?)", (id,roonname,roomdesc,uiicon))
    new_id = c.lastrowid

    conn.commit()    

    return dict(data=new_id)
@route('/deleteRoom')
def deleteRoom():
    id=request.query['id']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("DELETE  FROM rooms where id= ?" , (id,))
    conn.commit()  
    result = c.fetchall()
    return dict(data=result)
@route('/getHouseholds')
def getHouseholds():
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT * FROM households ")
    result = c.fetchall()
    return dict(data=result)    
@route('/makeHouseholds')
def makeHouseholds():
    roomid=request.query['roomid']
    householdname=request.query['householdname']
    householddesc=request.query['householddesc']
    householdport=request.query['householdport']
    uiicon=request.query['uiicon']
    
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO Households(roomid,householdname,householddesc,householdport,uiicon) VALUES (?,?,?,?,?)", (roomid,householdname,householddesc,householdport,uiicon))
    new_id = c.lastrowid

    conn.commit()    
    return dict(data=new_id)
@route('/deleteHouseholds')
def deleteHouseholds():
    id=request.query['id']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("DELETE  FROM Households where id= ?" , (id,))
    conn.commit()  
    result = c.fetchall()
    return dict(data=result)
@route('/getTableData')
def getHouseholds():
    tablename=request.query['tablename']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("SELECT * FROM "+tablename)
    result = c.fetchall()
    return dict(data=result)    
@route('/makeSchedule')
def makeSchedule():
    schedulename=request.query['schedulename']
    scheduledesc=request.query['scheduledesc']
    scheduletype=request.query['scheduletype']
    scheduletime=request.query['scheduletime']
    cronExp=request.query['cronExp']
    methodpar=request.query['methodpar']
    
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO Schedule(schedulename,scheduledesc,scheduletype,scheduletime,cronExp,methodpar) VALUES (?,?,?,?,?,?)", (schedulename,scheduledesc,scheduletype,scheduletime,cronExp,methodpar))
    new_id = c.lastrowid

    conn.commit()    
    return dict(data=new_id)
@route('/deleteTableData')
def deleteHouseholds():
    tablename=request.query['tablename']
    id=request.query['id']
    conn = sqlite3.connect('HomeAutomation.db')
    c = conn.cursor()
    c.execute("DELETE  FROM "+tablename+" where id= ?" , (id,))
    conn.commit()  
    result = c.fetchall()
    return dict(data=result)
@route('/listenSpeech')
def listenSpeech():
    import sl4a 
    import time
    droid = sl4a.Android()
    return droid.recognizeSpeech('Speak Now',None,None)[1]
    
@route('/CreateThread')
def CreateThread():
    startCloudDroid()
    return 'thread started'
run(host='0.0.0.0', port=8080, debug=True)
#run(app,host='0.0.0.0', port=8080, debug=True)