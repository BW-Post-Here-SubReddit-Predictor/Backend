const db = require("../database/dbConfig");

module.exports = {
  find,
  findById,
  findByList,
  add,
  remove,
  update
};

function find() {
  return db("lists").select("id", "name");
}

function findById(id) {
  return db("lists")
    .select("id", "name")
    .orderBy("id")
    .where({ id })
    .first();
}

function findByList(id) {
  return db("lists")
    .select(
      "lists.id",
      "lists.name",
      "lists.user_id",
      "users.username"
    )
    .join("users", function() {
      this.on({ "users.id": "lists.user_id" });
    })
    .orderBy("lists.id")
    .where({ "users.id": id });
}

function add(list) {
  return db("lists")
    .insert(list, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function remove(id) {
  return db("lists")
    .where({ id })
    .del();
}

function update(changes, id) {
  return db("lists")
    .where({ id })
    .update(changes);
}

