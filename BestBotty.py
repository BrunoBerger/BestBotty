from apscheduler.schedulers.asyncio import AsyncIOScheduler
import json
import discord

from reactions import appointments as ap

TOKEN = ""
RE_CHAN = ""

with open("config.json") as f:
    config = json.load(f)
    TOKEN = config["TOKEN"]
    RE_CHAN = config["RE_CHANNEL"]

client = discord.Client()

@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))

@client.event
async def on_connect():
    await client.change_presence(activity=discord.Activity(
        type=discord.ActivityType.watching,
        name="§help for list of cmds"))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('§help'):
        await message.channel.send("Hi, I respond to §test, §event\n use -h for command info")

    if message.content.startswith('§events'):
        await message.channel.send("Current Events: "+ str(sched.get_jobs()))

    if message.content.startswith('§deleteAll'):
        apList = []
        ap.deleteAll()

    if message.content.startswith("§event"):
        if message.content=="§event":
            await message.channel.send("Please provide all necassary details")
            return
        if ("-h") in message.content:
            await message.channel.send("§event usage:\n - tmp")
        ap.newAppointment(client, message, apList, sched)

apList = []
sched = AsyncIOScheduler(daemon=True)
sched.start()
ap.initCalendar(client, apList, sched)

# TODO sort this mess out
try:
    client.run(TOKEN)
except (KeyboardInterrupt, SystemExit):
    pass
sched.shutdown()
