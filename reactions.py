import discord

def processMessage(message):

    if message.content.startswith('§test'):
        message.channel.send(" ")
        message.channel.send(message.author + ": " + message.content)
        print(message.author + ": " + message.content)

    if message.content.startswith("emoji"):
        message.channel.send("cringe")
