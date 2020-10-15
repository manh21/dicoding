class IDB {
    constructor() {
        this.db = new Dexie("friend_database");
            db.version(1).stores({
            friends: 'name,shoeSize'
        });
    }

    static getData(){

    }
}

export default IDB;