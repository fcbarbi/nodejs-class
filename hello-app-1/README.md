# Hello API in NodeJS
This code provides an API that generates a hello message in English (default) or German, depending on the parameter passed in the URL as the language of choice. The port is initially set at `2222` but this can be changed by editing the file `config.js`.
## Usage
First check that you have Node Js installed
```
node -v
```
If you need to install it, please visit http://nodejs.org/ for more details.
Once node is installed with version 8 or higher to run the application follow these steps:
```
mkdir nodejs-lab
cd nodejs-lab
git clone git@github.com:fcbarbi/nodejs-class.git
node index.js   
```
Now open the browser and point it to:
```
http://localhost:2222/hello
```
This is equivalent to the following url:
```
http://localhost:2222/hello?lang=en
```
To get a greeting in german you must specify the language as in:
```
http://localhost:2222/hello?lang=de
```
NOTE: This is a simple project for educational purposes only.
