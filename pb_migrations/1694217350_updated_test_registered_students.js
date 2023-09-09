/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zga97my4m392o9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ca5jn1hq",
    "name": "studentAmount",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zga97my4m392o9")

  // remove
  collection.schema.removeField("ca5jn1hq")

  return dao.saveCollection(collection)
})
