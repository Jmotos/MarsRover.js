const COMMANDS = require('./commands').COMMANDS,
	Command = require('./commands').Command;

class CommandTranslator {
	/**
	 * @param {any} commands
	 */
	translate(commands) {
		return [];
	}
}

/**
 * @param {String} name
 */
function findCommandByName(name) {
	//funciona, pero no le gusta al compilador
	// return Object.values(COMMANDS).find((command) => command.name === name);

	function values(items) {
		return Object.keys(items).map(function(key) {
			return items[key];
		});
	}

	return values(COMMANDS).find((command) => command.name === name);
}

class CommandStringTranslator extends CommandTranslator {
	/**
	 * @param {String} commands
	 */
	translate(commands) {
		let commandList = commands.split('');
		return commandList.map(findCommandByName);
	}
}

module.exports = {
	CommandTranslator: CommandTranslator,
	CommandStringTranslator: CommandStringTranslator
};
