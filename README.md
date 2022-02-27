# BestBotty
js version of BestBotty

Meant for our private Discord server
#
### Install
- node 16 or higher needed
- run```npm install```
- create a ``` config.json```
```json
{
	"token": "your-token-goes-here",
	"clientId": "Get_ID_from_bot_in_server"
}
```
- (Optional:) Add a ```"guildId": "Get_ID_of_server"``` to the config, if you want to deploy guild-specific commands (Also helpfull for debugging, as it registers much faster)
- run ```node deploy-commands-global.js && node index.js```
#
### Goals
- [ ] Play youtube urls
- [ ] Queue management
- [ ] Support searching for videos
- [ ] Support soundcloud + spotify
- [ ] Appointments/Events
