/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zga97my4m392o9")

  // remove
  collection.schema.removeField("3boo1qsf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i1rntiiu",
    "name": "engBox",
    "type": "bool",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y45co2xi",
    "name": "chinaBox",
    "type": "bool",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "avshnhk6",
    "name": "gerBox",
    "type": "bool",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pu441tg1",
    "name": "rusBox",
    "type": "bool",
    "required": false,
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
    "id": "3boo1qsf",
    "name": "language",
    "type": "select",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "maxSelect": 4,
      "values": [
        "ინგლისური",
        "გერმანული",
        "ჩინური",
        "რუსული"
      ]
    }
  }))

  // remove
  collection.schema.removeField("i1rntiiu")

  // remove
  collection.schema.removeField("y45co2xi")

  // remove
  collection.schema.removeField("avshnhk6")

  // remove
  collection.schema.removeField("pu441tg1")

  return dao.saveCollection(collection)
})
