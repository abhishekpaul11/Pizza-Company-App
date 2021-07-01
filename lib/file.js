/*
 * File system services for the API
 *
 */ 

//dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

//conatiner
var file = {}

//Base directory for data folder
file.dataPath = path.join(__dirname + '/../.data/');

//create a new file, throw an error if that file already exists
file.create = function(_path, name, data, callback){
    fs.open(file.dataPath+_path+'/'+name+'.json','wx',function(err, fileDescriptor){
        if(!err && fileDescriptor){
            //convert data to string
            var d = JSON.stringify(data);
            fs.writeFile(fileDescriptor, d, function(err){
                if(!err){
                    fs.close(fileDescriptor, function(err){
                        if(!err){
                            callback(false);
                        }
                        else{
                            callback('Error closing file');
                        }
                    });
                }
                else{
                    callback('Error writing to file')
                }
            });
        }
        else{
            callback('Error creating file. File already exists')
        }
    });
}

//update a new file, throw an error if that file does not exist
file.update = function(_path, name, data, callback){
    fs.open(file.dataPath+_path+'/'+name+'.json','r+',function(err, fileDescriptor){
        if(!err && fileDescriptor){
            //convert data to string
            var d = JSON.stringify(data);
            //truncate the file
            fs.truncate(fileDescriptor, function(err){
                if(!err){
                    fs.writeFile(fileDescriptor, d, function(err){
                        if(!err){
                            fs.close(fileDescriptor, function(err){
                                if(!err){
                                    callback(false);
                                }
                                else{
                                    callback('Error closing file');
                                }
                            });
                        }
                        else{
                            callback('Error writing to file')
                        }
                    });
                }
                else{
                    callback('File could not be truncated')
                }
            })
        }
        else{
            callback('Could not create file. It may already exist.')
        }
    });
}

//delete an existing file, throw an error if that file does not exist
file.delete = function(_path, name, callback){
    fs.unlink(file.dataPath+_path+'/'+name+'.json',function(err){
        callback(err);
    });
}

//read an existing file, throw an error if that file does not exist
file.read = function(_path, name, callback){
    fs.readFile(file.dataPath+_path+'/'+name+'.json','utf8',function(err, data){
        if(!err && data){
            //convert data to JSON
            var jsonData = helpers.parseJsonToObject(data);
            callback(false, jsonData);
        }
        else{
            callback(err, data)
        }
    });
}

//list all the items in a directory
file.list = function(dir,callback){
    fs.readdir(file.dataPath+dir+'/', function(err,data){
      if(!err && data && data.length > 0){
        var trimmedFileNames = [];
        data.forEach(function(fileName){
          trimmedFileNames.push(fileName.replace('.json',''));
        });
        callback(false,trimmedFileNames);
      } else {
        callback(err,data);
      }
    });
  };

//export
module.exports = file;