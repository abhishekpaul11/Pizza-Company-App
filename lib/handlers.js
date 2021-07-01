/*
 * Router handling modules for the API
 *
 */ 

//dependencies
var file = require('./file');
var helpers = require('./helpers')

//container
var handlers = {}

//email regex
var emailRegex = /\S+@\S+\.\S+/;

/*
 * HTML Handlers
 *
 */

// Index
handlers.index = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Prepare data for interpolation
		var templateData = {
			'head.title': 'Pizza Pizza - Best Pizzas In Town',
			'head.description': 'Please sign in to order our delicious pizzas',
			'body.class': 'index'
		};
		// Read in a template as a string
		helpers.getTemplate('index', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal header and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						// Return that page as HTML
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};


// Create Account
handlers.accountCreate = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Prepare data for interpolation
		var templateData = {
			'head.title': 'Create an Account',
			'head.description': 'Signup is easy and only takes a few seconds.',
			'body.class': 'accountCreate'
		};
		// Read in a template as a string
		helpers.getTemplate('accountCreate', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal header and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						// Return that page as HTML
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};

// Create New Session
handlers.sessionCreate = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Prepare data for interpolation
		var templateData = {
			'head.title': 'Login to your account.',
			'head.description': 'Please enter your email and password to access your account.',
			'body.class': 'sessionCreate'
		};
		// Read in a template as a string
		helpers.getTemplate('sessionCreate', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal header and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						// Return that page as HTML
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};

// Edit Your Account
handlers.accountEdit = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Prepare data for interpolation
		var templateData = {
			'head.title': 'Account Settings',
			'body.class': 'accountEdit'
		};
		// Read in a template as a string
		helpers.getTemplate('accountEdit', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal header and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						// Return that page as HTML
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};

// Session has been deleted
handlers.sessionDeleted = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Prepare data for interpolation
		var templateData = {
			'head.title': 'Logged Out',
			'head.description': 'You have been logged out of your account.',
			'body.class': 'sessionDeleted'
		};
		// Read in a template as a string
		helpers.getTemplate('sessionDeleted', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal header and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						// Return that page as HTML
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};

// Account has been deleted
handlers.accountDeleted = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Prepare data for interpolation
		var templateData = {
			'head.title': 'Account Deleted',
			'head.description': 'Your account has been deleted.',
			'body.class': 'accountDeleted'
		};
		// Read in a template as a string
		helpers.getTemplate('accountDeleted', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal header and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						// Return that page as HTML
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};

// menu
handlers.pizzas = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Prepare data for interpolation
		var templateData = {
			'head.title': 'Pizza Menu',
			'head.description': 'All our delicious pizzas',
			'body.class': 'pizzas'
		};
		// Read in a template as a string
		helpers.getTemplate('menu', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal header and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						// Return that page as HTML
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
}

handlers.orderComplete = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Prepare data for interpolation
		var templateData = {
			'head.title': 'Order',
			'head.description': 'Thank you for doing business with us',
			'body.class': 'order'
		};
		// Read in a template as a string
		helpers.getTemplate('order', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal header and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						// Return that page as HTML
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
}

// Favicon
handlers.favicon = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Read in the favicon's data
		helpers.getStaticAsset('favicon.ico', function (err, data) {
			if (!err && data) {
				// Callback the data
				callback(200, data, 'favicon');
			} else {
				callback(500);
			}
		});
	} else {
		callback(405);
	}
};

// Public assets
handlers.public = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Get the filename being requested
		var trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
		if (trimmedAssetName.length > 0) {
			// Read in the asset's data
			helpers.getStaticAsset(trimmedAssetName, function (err, data) {
				if (!err && data) {

					// Determine the content type (default to plain text)
					var contentType = 'plain';

					if (trimmedAssetName.indexOf('.css') > -1) {
						contentType = 'css';
					}

					if (trimmedAssetName.indexOf('.png') > -1) {
						contentType = 'png';
					}

					if (trimmedAssetName.indexOf('.jpg') > -1) {
						contentType = 'jpg';
					}

					if (trimmedAssetName.indexOf('.ico') > -1) {
						contentType = 'favicon';
					}

					// Callback the data
					callback(200, data, contentType);
				} else {
					callback(404);
				}
			});
		} else {
			callback(404);
		}

	} else {
		callback(405);
	}
};

/*
 * JSON API Handlers 
 * 
 */

//sub containers
handlers._user = {}
handlers._tokens = {}
handlers._menu = {}
handlers._cart = {}
handlers._order = {}

//ping
handlers.ping = function(data, callback){
    setTimeout(function(){
        callback(200)
    },5000)
}

//not found
handlers.notFound = function(data,callback){
    callback(404);
}

//users
handlers.user = function(data, callback){
    var methods = ['post','get', 'put', 'delete']
    if(methods.indexOf(data.method) > -1){
        handlers._user[data.method](data,callback);
    }
    else{
        callback(405);
    }
} 

//POST an user
//Required data: name, password, email, address
//Optional data: none
handlers._user.post = function(data, callback){
    var name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0? data.payload.name.trim() : false
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0? data.payload.password.trim() : false
    var email = typeof(data.payload.email) == 'string' && emailRegex.test(data.payload.email)? data.payload.email.trim() : false
    var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0? data.payload.address.trim() : false
    if(name && password && email && address){
        file.read('users',email, function(err,data){
            if(err){
                var hashedPassword = helpers.hash(password)
                var dataObject = {
                    'name': name,
                    'password': hashedPassword,
                    'email': email,
                    'address': address,
                    'time': Date.now()
                }
                if(hashedPassword){
                    file.create('users', email, dataObject, function(err){
                        if(!err){
                            callback(200)
                        }
                        else{
                            callback(500, {'Error':'Error creating file'})
                        }
                    })
                }
                else{
                    callback(500, {'Error':'Could not hash the password'})
                }
            }
            else{
                callback(403, {'Error': 'User with same email already exists'})
            }
        })
    }
    else{
        callback(400, {'Error':'Invalid payload'})
    }
}

//GET an user
//Required data: email (query) and token (header)
//Optional data: none
handlers._user.get = function(data, callback){
    var email = typeof(data.queryObject['email']) == 'string' && emailRegex.test(data.queryObject.email) ? data.queryObject['email'] : false;
    if(email){
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false
        handlers._tokens.verifyToken(email, token, function(isValid){
            if(isValid){
                file.read('users',email,function(err, data){
                    if(!err && data){
                        delete data.hashedPassword
                        callback(200, data)
                    }else{
                        callback(404, {'Error':'File not found'})
                    }
                })
            }
            else{
                callback(403, {'Error': 'Invalid token in header'})
            }
        })
    }
    else{
        callback(400, {'Error': 'Invalid query'})
    }
}

//UPDATE an user
//Required data: email (payload) and token (header)
//Optional data: name, address, password (atleast ONE must be specified)
handlers._user.put = function(data,callback){
    var name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0? data.payload.name.trim() : false
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0? data.payload.password.trim() : false
    var email = typeof(data.payload.email) == 'string' && emailRegex.test(data.payload.email) ? data.payload.email.trim() : false
    var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0? data.payload.address.trim() : false
    if(email && (password || name || address)){
        var token = typeof(data.headers.token) == 'string' ? data.headers.token.trim() : false
        handlers._tokens.verifyToken(email, token, function(isValid){
            if(isValid){
                file.read('users',email, function(err,data){
                    if(!err && data){
                        if(name) data.name = name
                        if(address) data.address = address
                        if(password) data.password = helpers.hash(password)
                        file.update('users',email, data,function(err){
                            if(!err){
                                callback(200)
                            }
                            else{
                                callback(500, {'Error':'Could not update the user'})
                            }
                        })
                    }
                    else{
                        callback(500, {'Error':'Specified user does not exist'})
                    }
                })
            }
            else{
                callback (403, {'Error': 'Invalid token'})
            }
        })
    }
    else{
        callback (400, {'Error':'Missing required fields'})
    }
}

//DELETE an user
//Required field: email (query) and token (header)
//Optional data: none
handlers._user.delete = function(data, callback){
    var email = typeof(data.queryObject['email']) == 'string' && emailRegex.test(data.queryObject.email) ? data.queryObject['email'] : false;
    if(email){
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false
        handlers._tokens.verifyToken(email, token, function(isValid){
            if(isValid){
                file.delete('users',email,function(err){
                    if(!err){
                        callback(200)
                    }else{
                        callback(404, {'Error':'File not found'})
                    }
                })
            }
            else{
                callback(403, {'Error': 'Invalid token in header'})
            }
        })
    }
    else{
        callback(400, {'Error': 'Invalid query'})
    }
}

//tokens
handlers.tokens = function(data, callback){
    var methods = ['post','get', 'put', 'delete']
    if(methods.indexOf(data.method) > -1){
        handlers._tokens[data.method](data,callback);
    }
    else{
        callback(405);
    }
}

//POST a token
//Required Field: email, password
//Optional Field: none
handlers._tokens.post = function(data, callback){
    var email = typeof(data.payload['email']) == 'string' && emailRegex.test(data.payload.email) ? data.payload['email'] : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0? data.payload.password.trim() : false
    if(email && password){
        //lookup the user in the file system
        file.read('users', email, function(err, data){
            if(!err && data){
                var hashedPassword = data.password
                if(hashedPassword == helpers.hash(password)){
                    var tokenId = helpers.createRandomString(20);
                    var expires = Date.now() + 1000 * 60 * 60;
                    var tokenObject = {
                        'email' : email,
                        'id': tokenId,
                        'expires': expires
                    };

                    // Store the token
                    file.create('tokens', tokenId, tokenObject, function(err){
                        if (!err) {
                            callback(200, tokenObject);
                        } 
                        else{
                            callback(500, {'Error': 'Could not create the new token.'})
                        }
                    });                }
                else{
                    callback(403,{'Error':'Wrong password sent'})
                }
            }
            else{
                callback(404,{'Error':'User does not exist'})
            }
        });
    }
    else{
        callback(400,{'Error':'Invalid payload'})
    }
}

//GET a token
//Required fields: tokenID
//Optional field: none
handlers._tokens.get = function(data, callback){
    var tokenID = typeof(data.queryObject['id']) == 'string' && data.queryObject.id.trim().length > 0 ? data.queryObject['id'] : false;
    if(tokenID){
        file.read('tokens',tokenID,function(err,data){
            if(!err && data){
                callback(200, data)
            }else{
                callback(404,{'Error':'Token not found'})
            }
        });
    }else{
        callback(400,{'Error':'Invalid query'})
    }
}

//PUT a token (extend by an hour)
//Required fields: tokenID, extend(true)
//Optional field: none
handlers._tokens.put = function(data, callback){
    var tokenID = typeof(data.payload['id']) == 'string' && data.payload.id.trim().length > 0 ? data.payload['id'] : false;
    var extend = typeof(data.payload['extend']) == 'boolean' && data.payload.extend == true ? true : false;
    if(tokenID && extend){
        file.read('tokens',tokenID,function(err,data){
            if(!err && data){
                if(data.expires > Date.now()){
                    data.expires = Date.now() + 1000 * 60 * 60 //extending by 1 hour
                    file.update('tokens',tokenID,data,function(err){
                        if(!err){
                            callback(200)
                        }
                        else{
                            callback(500,{'Error':'Token could not be extended'})
                        }
                    })

                }else{
                    callback(405,{'Error':'Token already expired'})
                }

            }else{
                callback(404,{'Error':'Token not found'})
            }
        })
    }else{
        callback(400,{'Error':'Inavlid payload'})
    }
}

//DELETE a token 
//Required fields: tokenID
//Optional field: none
handlers._tokens.delete = function(data, callback){
    var tokenID = typeof(data.queryObject['id']) == 'string' && data.queryObject.id.trim().length > 0 ? data.queryObject['id'] : false;
    if(tokenID){
        file.read('tokens',tokenID,function(err,data){
            if(!err && data){
                file.delete('tokens',tokenID,function(err){
                    if(!err){
                        callback(200)
                    }
                    else{
                        callback(500,{'Error':'Token could not be deleted'})
                    }
                })
            }else{
                callback(404,{'Error':'Token not found'})
            }
        })
    }else{
        callback(400,{'Error':'Inavlid payload'})
    }
}

//verify a token
handlers._tokens.verifyToken = function(email, token, callback){
    file.read('tokens',token,function(err,data){
        if(!err && data){
            if(email == data.email && data.expires > Date.now()){
                callback(true)
            }else{
                callback(false)
            }
        }else{
            callback(false)
        }
    })
}

//menu 
handlers.menu = function(data, callback){
    var methods = ['get']
    if(methods.indexOf(data.method) > -1){
        handlers._menu[data.method](data,callback);
    }
    else{
        callback(405);
    }
} 

//GET the menu
//Required fields: email (query), tokenId (header)
//Optional fields: none
handlers._menu.get = function(data,callback){
    var email = typeof(data.queryObject['email']) == 'string' && data.queryObject.email.trim().length > 0 ? data.queryObject['email'] : false;
    if(email){
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        handlers._tokens.verifyToken(email, token, function(tokenIsValid){
            if(tokenIsValid){
                file.read('menu','basicMenu',function(err, data){
                    if(!err && data){
                        callback(200,data)
                    }else{
                        callback(405, {'Error':'Error fetching menu'})
                    }
                })
            }else{
                callback(403,{'Error':'Invalid Token'})
            }
        })
    }else{
        callback(403,{'Error':'Invalid query'})
    }
}

//cart 
handlers.cart = function(data, callback){
    var methods = ['put','get','delete']
    if(methods.indexOf(data.method) > -1){
        handlers._cart[data.method](data,callback);
    }
    else{
        callback(405);
    }
} 

//verify an item with the menu
handlers._cart.verifyItem = function(item, callback){
    file.read('menu','basicMenu',function(err,data){
        if(!err && data){
            if(typeof(data[item]) == 'object'){
                callback(true)
            }else{
                callback(false)
            }
        }else{
            callback(false)
        }
    })
}

//PUT an item in the cart
//Required field: Item ID (payload), quantity (payload) and token (header)
//Optional field: none
handlers._cart.put = function(data, callback){
    var item = typeof(data.payload['item']) == 'string' && data.payload.item.trim().length > 0 ? data.payload['item'] : false;
    var quantity = typeof(data.payload['quantity']) == 'number' && data.payload.quantity % 1 == 0 && data.payload['quantity'] > 0 ? data.payload['quantity'] : false;
    var price = typeof(data.payload['price']) == 'number' ? data.payload['price'] : false;
    handlers._cart.verifyItem(item, function(isValid){
        if(isValid && quantity){
            var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
            if(token){
                file.read('tokens',token,function(err, data){
                    if(!err && data){
                        if(data.expires > Date.now()){
                            var email = data.email
                            file.read('users',email, function(err, userData){
                                if(!err && data){
                                    //adding chosen item to cart
                                    userData.cart = (typeof(userData.cart) == 'object') ? userData.cart : {}
                                    userData.cart[item] = (typeof(userData.cart[item]) == 'number') && userData.cart[item] > 0 ? userData.cart[item] : 0
                                    userData.cart[item] += quantity
                                    userData.cart['total'] = typeof(userData.cart['total']) == 'number' ? userData.cart['total'] : 0
                                    userData.cart['total'] += price 
                                    file.update('users',email, userData, function(err){
                                        if(!err){
                                            callback(200)
                                        }
                                        else{
                                            callback(500,{'Error':'Could not add to cart'})
                                        }
                                    })
                                }else{
                                    callback(404, {'Error':'User does not exist'})
                                }
                            })
                        }else{
                            callback(405, {'Error':'Token has expired'})
                        }
                    }else{
                        callback(404, {'Error':'Token does not exist'})
                    }
                })
            }else{
                callback(403, {'Error':'Inavlid token in header'})
            }
        }else{
            callback(403, {'Error':'Invalid query data'})
        }
    })
}

//GET the cart
//Required field: token (header)
//Optional field: none
handlers._cart.get = function(data, callback){
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    if(token){
        file.read('tokens',token,function(err, data){
            if(!err && data){
                if(data.expires > Date.now()){
                    var email = data.email
                    file.read('users',email, function(err, userData){
                        if(!err && data){
                            callback(200, userData.cart)
                        }else{
                            callback(404, {'Error':'User does not exist'})
                        }
                    })
                }else{
                    callback(405, {'Error':'Token has expired'})
                }
            }else{
                callback(404, {'Error':'Token does not exist'})
            }
        })
    }else{
        callback(403, {'Error':'Inavlid token in header'})
    }
}

//DELETE an item from the cart
//Required field: Item ID (query) and token (header)
//Optional field: none
handlers._cart.delete = function(data, callback){
    var item = typeof(data.queryObject['item']) == 'string' && data.queryObject.item.trim().length > 0 ? data.queryObject['item'] : false;
    handlers._cart.verifyItem(item, function(isValid){
        if(isValid){
            var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
            if(token){
                file.read('tokens',token,function(err, data){
                    if(!err && data){
                        if(data.expires > Date.now()){
                            var email = data.email
                            file.read('users',email, function(err, userData){
                                if(!err && data){
                                    //deleting chosen item from cart
                                    userData.cart[item] = (typeof(userData.cart[item]) == 'number') && userData.cart[item] > 0 ? userData.cart[item] : 0
                                    if(userData.cart[item] > 0){
                                        delete userData.cart[item]
                                    }else{
                                        callback(404, {'Error':'Item to be deleted does not exist in the cart'})
                                    }
                                    file.update('users',email, userData, function(err){
                                        if(!err){
                                            callback(200)
                                        }
                                        else{
                                            callback(500,{'Error':'Could not be deleted'})
                                        }
                                    })
                                }else{
                                    callback(404, {'Error':'User does not exist'})
                                }
                            })
                        }else{
                            callback(405, {'Error':'Token has expired'})
                        }
                    }else{
                        callback(404, {'Error':'Token does not exist'})
                    }
                })
            }else{
                callback(403, {'Error':'Inavlid token in header'})
            }
        }else{
            callback(403, {'Error':'Invalid query data'})
        }
    })
}

//order
handlers.order = function(data, callback){
    var methods = ['post']
    if(methods.indexOf(data.method) > -1){
        handlers._order[data.method](data,callback);
    }
    else{
        callback(405);
    }
} 

//POST an order
//Required data: token (header)
//Optional data: none
handlers._order.post = function(data,callback){
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    if(token){
        file.read('tokens', token, function(err, data){
            if(!err && data){
                if(data.expires > Date.now()){
                    var email = data.email
                    file.read('users', email, function(err,userData){
                        if(!err && userData){
                            if(typeof(userData.cart) == 'object' && userData.cart != {}){
                                file.read('menu', 'basicMenu', function(err, menu){
                                    if(!err && menu){
                                        var total = 0
                                        orderResult = {}
                                        for (item in userData.cart){
                                            if(item != 'total'){
                                                total += menu[item]['price'] * userData.cart[item] //rate * quantity
                                                orderResult[item] = {
                                                    'name': menu[item]['name'],
                                                    'rate': menu[item]['price'],
                                                    'quantity': userData.cart[item],
                                                    'price': menu[item]['price'] * userData.cart[item]
                                                }
                                            }
                                        }
                                        orderResult.total = total
                                        file.create('orders',Date.now()+'',orderResult,function(err){
                                            if(err){
                                                console.log('Order could not be logged')
                                            }
                                        })
                                        helpers.stripeCharge(total, err => {
                                            if (!err) {
                                                // Clean user's cart
                                                userData.cart = {};
                                                // Save the new user data
                                                file.update('users', email, userData, err => {
                                                    if (!err) {
                                                        // Send e-mail with a receipt
                                                        var toEmail = userData.email;
                                                        var toName = userData.name; 
                                                        var subject = "Your Pizza Receipt"; 
                                                        var message = "Thank you "+toName+", you successfuly purchased $"+total.toFixed(2)+" in Pizza.";
                
                                                        helpers.mailgunSendEmail(toEmail, toName, subject, message, err => {
                                                            if (!err) {
                                                                callback(200, orderResult);
                                                            } else {
                                                                callback(500, {'Error' : err});        
                                                            }
                                                        });
                                                    } else {
                                                        callback(500, {'Error': 'Could not cleanup user\'s cart.'});
                                                    }
                                                });
                                            } else {
                                                callback(500, {'Error' : 'Unable to charge credit card in Stripe: '+ err});
                                            }
                                        });
                                    }
                                    else{
                                        callback(500, {'Error':'Internal server error'})
                                    }
                                })
                            }else{
                                callback(403, {'Error':'Cart is empty'})
                            }
                        }else{
                            callback(404, {'Error':'User does not exist'})
                        }
                    })
                }else{
                    callback(403, {'Error':'Token has expired'})
                }
            }
            else{
                callback(404, {'Error':'Token does not exist'})
            }
        })
    }else{
        callback(403, {'Error':'Inavlid token'})
    }
}

//exports
module.exports = handlers;