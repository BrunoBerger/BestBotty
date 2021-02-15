from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
import os
import pickle

import discord

# TODO switch from lists to objects
# class Appointment(object):
#     def __init__(self, apAuthor, apName, apDate, apTime):
#         self.apAuthor = apAuthor
#         self.apName = apName
#         self.apDate = apDate
#         self.apTime = apTime


def initCalendar(client, apList, sched):
    print("initing calendar")
    if os.path.getsize("apStorage") > 0:
        with open('apStorage', 'rb') as f:
            apList = pickle.load(f)
            print("apStorage loaded:")
            print(apList)

        for item in apList:
            addJob(client, item, apList, sched)

def newAppointment(client, message, apList, sched):
        msg = message.content.split(" ")
        apAuthor = message.author.display_name
        apName = msg[1]
        apDate = msg[2]
        apTime = msg[3]
        appointment = [apAuthor, apName, apDate, apTime]

        print("New Appointment:")
        print(appointment)
        apList.append(appointment)
        print("Current Ap-List:")
        print(apList)

        addJob(client, appointment, apList, sched)
        with open('apStorage', 'wb') as f:
            pickle.dump(apList, f)

def calcDueDay(wd):
    today = datetime.now()
    dueDay = today + timedelta( (wd-today.weekday()) % 7 )
    print("DueDay of new Job is: ",dueDay)
    return dueDay

def addJob(client, appointment, apList, sched):
    wd = str(appointment[2].lower()) # weekday specified by user
    dd = 0                           # dueDay (converting wd to 0-7 range)

    # I know this is ugly, show me a better way if you can
    if wd == "heute":
        dd = datetime.now()
    elif wd == "morgen":
        dd = datetime.now() + timedelta(days=1)
    elif wd == "montag":
        dd = calcDueDay(wd=0)
    elif wd == "dienstag":
        dd = calcDueDay(wd=1)
    elif wd == "mittwoch":
        dd = calcDueDay(wd=2)
    elif wd == "donnerstag":
        dd = calcDueDay(wd=3)
    elif wd == "freitag":
        dd = calcDueDay(wd=4)
    elif wd == "samstag":
        dd = calcDueDay(wd=5)
    elif wd == "sonntag":
        dd = calcDueDay(wd=6)
    else:
        print("Incorrect Day")

    exactDueDate = dd.replace(hour=int(appointment[3]),
                              minute=0, second=0)
    print("Now: ",datetime.now())
    print("AP-Date: ", exactDueDate)
    # exactDueDate = datetime.now() + timedelta(seconds=4)
    sched.add_job(lambda: remind(client, appointment, apList),
                  trigger="date", run_date=exactDueDate)


# TODO add ping to members who reacted to the §event
# TODO connect config.py to channelId
def remind(client, appointment, apList):
    channel = client.get_channel(289049167806988288)
    print("Reminding in "+str(channel))
    client.loop.create_task(channel.send(appointment[1]+ " now!"))

    apList.remove(appointment)
    with open('apStorage', 'wb') as f:
        pickle.dump(apList, f)


def deleteAll():
    open("apStorage", "w").close()

# TODO test-populate calendar with jobs due immediately after
def test_populateCalendar():
    return
