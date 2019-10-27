const chai = require('chai'),
	should = chai.should(),
	CommandTranslator = require('../src/commandTranslator'),
	COMMANDS = require('../src/marsRover').COMMANDS;

describe('Unit test batery of Command Translator', () => {
	it('Translate String with one command to that command', () => {
		let commandTranslator = new CommandTranslator(),
			commandsList = commandTranslator.translate('L'),
			result = [COMMANDS.Left];
		commandsList.should.be.eql(result);
	});
	it('Translate String with some commands to those commands', () => {
		let commandTranslator = new CommandTranslator(),
			commandsList = commandTranslator.translate('LL'),
			result = [COMMANDS.Left, COMMANDS.Left];
		commandsList.should.be.eql(result);
	});
});
