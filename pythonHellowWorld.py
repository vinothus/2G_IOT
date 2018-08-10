from bottle import route, run ,template ,static_file,view
import sys
import os


@route('/hello')
def hello():
 
    return "Hello World!"
@route('/switch/<number>/<action>')
def switchProcessing(number='number',action='action'):

 
 return  'the switch '+number+' undergoes action '+action

 

@route('/')
@view('index')
def index():
 
    return { 'get_url': '' } 
	
@route('/')
@view('index')
def js():
 
    return { 'get_url': '' } 
	
	
@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')
	
run(host='localhost', port=8080, debug=True)