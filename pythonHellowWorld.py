import sys
import os
sys.path.append(os.path.dirname(sys.argv[0])+'//lib')
from bottle import route, run ,template ,static_file,view,request, response
from os.path import dirname, realpath, sep, pardir
import sys
import bottle
from bottle_log import LoggingPlugin

#app = bottle.Bottle()
#app.install(LoggingPlugin(app.config))
#path = 'C:\Users\511517\Desktop\bottle'
#sys.path.append(r"C:\Users\511517\Desktop\bottle")
def printme( str ):
   "This prints a passed string into this function"
   print (str)
   # Open spidev1.0 with mode 0 and max speed 1MHz
   spi = SPI("/dev/spidev1.0", 0, 1000000)

   data_out = [0xaa, 0xbb, 0xcc, 0xdd]
   data_in = spi.transfer(data_out)

   print("shifted out [0x%02x, 0x%02x, 0x%02x, 0x%02x]" % tuple(data_out))
   print("shifted in  [0x%02x, 0x%02x, 0x%02x, 0x%02x]" % tuple(data_in))

   spi.close()
   return	

@route('/hello')
def hello():
# path = 'C:\Users\511517\Desktop\bottle';
#os.environ['PATH'] += ':'+path;
#response.charset = 'ISO-8859-15'
#path ="C:\Users\511517\Desktop\bottle"
     
    #logger.warning('This is only a test')
    return "Hello World!"+ os.getcwd() + str(sys.path)[1:-1]  +os.environ['PATH'] +os.path.realpath(__file__) +os.path.dirname(sys.argv[0])
	

@route('/switch/<number>/<action>')
def switchProcessing(number='number',action='action'):

# logger.warning('the switch '+number+' undergoes action '+action)
 return  'the switch '+number+' undergoes action '+action

 

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
    return static_file(path, root='static')

@route('/counter')
def counter():
    count = int( request.cookies.get('counter', '0') )
    count += 1
    response.set_cookie('counter', str(count))
    return 'You visited this page %d times' % count


run(host='0.0.0.0', port=8080, debug=True)