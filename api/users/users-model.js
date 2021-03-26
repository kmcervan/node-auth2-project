const db = require('../../data/config');

module.exports = { 
    find,
    findBy,
    findById,
    add
}

function find(){
    return db('users')
}
function findBy(filter){
    return db('users').where(filter)
}
async function add(user){
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
}
function findById(id){
    return db('users').where('id', id).first();
}