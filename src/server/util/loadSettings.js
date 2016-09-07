var fs = require('fs');
var path = require('path');

module.exports = function(parsedArgs) {
	var settingsFile;

	if (parsedArgs.settings) {
	    settingsFile = parsedArgs.settings;
	} else {
	    var userDir = parsedArgs.userDir || path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, ".clooca");
	    var userSettingsFile = path.join(userDir, "settings.js");
	    if (fs.existsSync(userSettingsFile)) {
	        settingsFile = userSettingsFile;
	    } else {
	        var defaultSettings = path.join(__dirname, "../../../settings.js");
	        var settingsStat = fs.statSync(defaultSettings);
	        if (settingsStat.mtime.getTime() < settingsStat.ctime.getTime()) {
	            fs.copySync(defaultSettings,userSettingsFile);
	            settingsFile = userSettingsFile;
	        } else {
	            settingsFile = defaultSettings;
	        }
	    }
	}

	try {
	    var settings = require(settingsFile);
	    settings.settingsFile = settingsFile;
	} catch(err) {
	    console.log("Loading Error: ", settingsFile, err);
	    process.exit();
	}

	return settings;
}
