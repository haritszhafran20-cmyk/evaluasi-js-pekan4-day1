const Auth = {
    register(username, password) {
        let users = DB.get('users') || [];
        if (users.some(u=>u.username === username)) {
            return false;
        }
        users.push({username, password});
        DB.set('users', users);
        return true;
    },
    login(username, password) {
        let users = DB.get('users') || [];
        const match = users.find(u=>u.username === username && u.password === password);
        if (!match) return false;
        DB.set('username', username);
        return true;
    },
    check() {
        return !!DB.get("session");
    },
    logout() {
        DB.remove("session");
    
    }
}