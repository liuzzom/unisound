function User(id, first_name, last_name, email, password, online) {
    Object.defineProperties(this, {
        'id' : {
            value : id,
            writable : false
        }
    });
    this._first_name = first_name;
    this._last_name = last_name;
    this._email = email;
    this._password = password;
    this._online = online;
}

Object.defineProperty(User.prototype, 'first_name', {
    set : function(first_name){
        if(typeof first_name === 'string'){
            this._first_name = first_name;
        }else{
            throw new Error("Inserire nome valdo");
        }
    },
    get : function(){
        return this._first_name;
    }
});

Object.defineProperty(User.prototype, 'last_name', {
    set : function(last_name){
        if(typeof last_name === 'string'){
            this._last_name = last_name;
        }else{
            throw new Error("Inserire nome valdo");
        }
    },
    get : function(){
        return this._last_name;
    }
});

Object.defineProperty(User.prototype, 'email', {
    set : function(email){
        if(typeof email === 'string'){
            this._email = email;
        }else{
            throw new Error("Inserire nome valdo");
        }
    },
    get : function(){
        return this._email;
    }
});

Object.defineProperty(User.prototype, 'password', {
    set : function(password){
        if(typeof password === 'string'){
            this._password = password;
        }else{
            throw new Error("Inserire nome valdo");
        }
    },
    get : function(){
        return this._password;
    }
});

Object.defineProperty(User.prototype, 'online', {
    set : function(online){
        if(typeof online === 'boolean'){
            this._online = online;
        }else{
            throw new Error("Inserire nome valdo");
        }
    },
    get : function(){
        return this._online;
    }
});
