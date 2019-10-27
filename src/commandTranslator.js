class CommandTranslator {
	/**
	 * @param {any} commands
	 */
	translate(commands) {
		return [];
	}
}
class CommandStringTranslator extends CommandTranslator {
	/**
	 * @param {String} commands
	 */
	translate(commands) {
		return commands.split('');
	}
}

module.exports = {
	CommandTranslator: CommandTranslator,
	CommandStringTranslator: CommandStringTranslator
};
