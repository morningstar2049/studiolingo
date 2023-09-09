/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zga97my4m392o9")

  // remove
  collection.schema.removeField("4wknukl4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "virigrvs",
    "name": "age",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4wknukl4",
    "name": "age",
    "type": "number",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": 18,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("virigrvs")

  return dao.saveCollection(collection)
})
