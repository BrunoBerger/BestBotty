from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
import pickle

import discord



def stopScheduler():
    sched.shutdown()

def initCalendar(apList, sched):
    print("initing calendar")
    try:
        with open ('apStorage', 'w') as f:
            apList = pickle.load(f)
            print("eventStorage loaded")

        for item in apList:
            newAppointment(item)
    except:
        print("file empty?")

async def newAppointment(message, apList, sched):
    if message.content=="§termin":
        await message.channel.send("Please provide all necassary details")
        return

    msg = message.content.split(" ")
    apAuthor = message.author.display_name
    apName = msg[1]
    apDate = msg[2]
    apTime = msg[3]
    appointment = [apAuthor, apName, apDate, apTime]
    print("New Appointment of type")
    print(appointment)

    schDate = datetime.now() + timedelta(seconds=3)
    sched.add_job(remind, "date", run_date=schDate, args="" )
    # print(sched.get_jobs())


    apList.append(appointment)
    print("Current Ap-List:")
    print(apList)

    with open('apStorage', 'wb') as f:
        pickle.dump(apList, f)

async def remind():
    print(reminding)
    await message.channel.send("TERMIN!!!!")

def test_populateCalendar():
    return
