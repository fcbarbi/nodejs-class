/*
config.js
create and export configuration variables
fcbarbi@gmail.com - Sep 17, 2018
*/

// Containe for all environments 
var environments = {};

// staging (default)
environments.staging = {
    'httpPort' : 2222,
    'httpsPort' : 2223,
    'envName' : 'staging' 
};

environments.production = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envName' : 'production' 
};

// Determine which environmnet passed on the command line 
var currentEnvironemnet = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : "";

// check current env is one of the above 
var environmentToExport = 
  typeof(environments[currentEnvironemnet]) == 'object' ? environments[currentEnvironemnet] : environments.staging;

// export the env
module.exports = environmentToExport;
