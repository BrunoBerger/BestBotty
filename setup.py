import json

token = input("Paste your token here:\n")
reminderChannel = input("ID of channel where reminders will be posted:\n")

data = {
    "TOKEN": token,
    "RE_CHANNEL": reminderChannel
    }


with open('config.json', 'w') as outfile:
    json.dump(data, outfile)
