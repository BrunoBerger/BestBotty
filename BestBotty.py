import json
import discord

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
    discord.CustomActivity("§hellp")

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('§help'):
        await message.channel.send('lmao get fucked')

    if message.content.startswith("emoji"):
        await message.channel.send("cringe")


client.run(TOKEN)
