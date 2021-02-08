from apscheduler.schedulers.background import BackgroundScheduler
import json
import discord

from reactions import appointments as ap

TOKEN = ""

with open("config.json") as f:
    config = json.load(f)
    TOKEN = config["TOKEN"]

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
        await message.channel.send("Hi, I respond to §test, §termin\n use -h for command info")

    if message.content.startswith('§test'):
        await message.channel.send("lmao: " + str(message.author) + ": " + message.content)

    if message.content.startswith("§termin"):
        if ("-h") in message.content:
            await message.channel.send("§termin usage:\n - tmp")

        await ap.newAppointment(message, apList, sched)

apList = []
sched = BackgroundScheduler(daemon=True)
ap.initCalendar(apList, sched)


client.run(TOKEN)

# ap.shutdown()
