import json
import discord
import reactions

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
        name="§help"))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('§help'):
        await message.channel.send("Hi, I respond to §help and §test")

    if message.content.startswith('§test'):
        await message.channel.send("lmao: " + str(message.author) + ": " + message.content)

    if message.content.startswith("emoji"):
        await message.channel.send("cringe")

client.run(TOKEN)
