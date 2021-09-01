json = require "json"

local cmds = require('commands')

local command
local decoded_command

repeat
	io.flush()

	command=io.read()
	io.write(json.decode(command)['name'])
until command=="exit"
