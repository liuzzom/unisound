function User(id, first_name, last_name, email, password, online) {
    Object.defineProperties(this, {
        'id' : {
            value : id,
            writable : false
        },

        'first_name' : {
            value : first_name,
            writable : false
        },

        'last_name' : {
            value : last_name,
            writable : false
        },

        'email' : {
            value : email,
            writable : false
        },

        'password' : {
            value : password,
            writable : false
        },

        // valore booleano che verifica se l'utente è online o meno
        'online' : {
            value : online,
            writable : false
        }
    });
}