/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zga97my4m392o9")

  // remove
  collection.schema.removeField("yqhyluak")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e1dy7phl",
    "name": "acceptRules",
    "type": "bool",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zga97my4m392o9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yqhyluak",
    "name": "rules",
    "type": "text",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("e1dy7phl")

  return dao.saveCollection(collection)
})
