local json = require('json')

local cmds = require('commands')

local command
local decoded_command

io.write('{"type":"started"}')

repeat
	io.flush()

	command=json.decode(io.read())

	if command['type'] == 'command' then
		io.write(command['command'])

		core.console(command['command'])

		local response = {}

		response.type = "command_end"

		io.write(json.encode(response))
	end
until command['type'] == 'exit'
