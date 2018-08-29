import sched
import threading
import time
from datetime import datetime
from datetime import timedelta
def calculateDelay(scheduleType,ScheduledTime):
    print(scheduleType)
    print(ScheduledTime)
    if scheduleType is 'daily':
      parts = ScheduledTime.split(":")
      print(parts)
      return timedelta(hours=int(parts[0]),minutes=int(parts[1])).total_seconds()
    else : 
       return 'not daily '
def isToday(ScheduledTime): 
    print(ScheduledTime)
    return True
delay = timedelta(minutes=1).total_seconds()

scheduler = sched.scheduler(time.time, time.sleep)

# Set up a global to be modified by the threads
counter = 0

def increment_counter(name):
    global counter
    print ('EVENT:', time.time(), name)
    counter += 1
    print ('NOW:', counter)
    print(calculateDelay('daily','00:01'))

print ('START:', time.time())
e1 = scheduler.enter(2, 1, increment_counter, ('E1',))
e2 = scheduler.enter(3, 1, increment_counter, ('E2',))
e3 = scheduler.enter(delay, 1, increment_counter, ('E3',))
e4 = scheduler.enter(calculateDelay('daily','00:01'), 1, increment_counter, ('E3',))
# Start a thread to run the events
t = threading.Thread(target=scheduler.run)
t.start()
e4 = scheduler.enter(3, 1, increment_counter, ('E4',))
# Back in the main thread, cancel the first scheduled event.
scheduler.cancel(e1)
print(scheduler.queue)
# Wait for the scheduler to finish running in the thread
t.join()
print ('FINAL:', counter)

