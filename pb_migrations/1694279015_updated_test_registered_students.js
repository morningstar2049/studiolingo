/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zga97my4m392o9")

  // remove
  collection.schema.removeField("mciacbpj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "szahrvvq",
    "name": "online",
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
    "id": "mciacbpj",
    "name": "online",
    "type": "select",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "ონლაინ"
      ]
    }
  }))

  // remove
  collection.schema.removeField("szahrvvq")

  return dao.saveCollection(collection)
})
