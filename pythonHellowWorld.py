from bottle import route, run

@route('/hello')
def hello():
    return "Hello World!"
@route('/switch/<number>/<action>')
def switchProcessing(number='number',action='action'):

   return  'the switch '+number+' undergoes action '+action

run(host='localhost', port=8080, debug=True)