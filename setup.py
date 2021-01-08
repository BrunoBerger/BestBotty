import json

token = input("Paste your token here:\n")

data = {
    "TOKEN": token
    }


with open('config.json', 'w') as outfile:
    json.dump(data, outfile)
