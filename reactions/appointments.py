from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
import os
import pickle

import discord

# TODO: switch from lists to objects
# class Appointment(object):
#     def __init__(self, apAuthor, apName, apDate, apTime):
#         self.apAuthor = apAuthor
#         self.apName = apName
#         self.apDate = apDate
#         self.apTime = apTime


def initCalendar(apList, sched):
    print("initing calendar")
    if os.path.getsize("apStorage") > 0:
        with open('apStorage', 'rb') as f:
            apList = pickle.load(f)
            print("apStorage loaded:")
            print(apList)

        for item in apList:
            addJob(item, apList, sched)

def newAppointment(message, apList, sched):
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

        addJob(appointment, apList, sched)
        with open('apStorage', 'wb') as f:
            pickle.dump(apList, f)

def addJob(appointment, apList, sched):
    schDate = datetime.now() + timedelta(seconds=5)
    print(schDate)
    sched.add_job(remind, trigger="date", run_date=schDate)


async def remind():
    print("reminding")
    await message.channel.send("TERMIN!!!!")


def test_populateCalendar():
    return
