/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8zga97my4m392o9",
    "created": "2023-09-08 22:45:29.515Z",
    "updated": "2023-09-08 22:45:29.515Z",
    "name": "test_registered_students",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pjymmqap",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "txgchdlk",
        "name": "objective",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": 20,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wsibuj62",
        "name": "type",
        "type": "select",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "ზოგადი",
            "სასაუბრო",
            "ბიზნეს ინგლისური",
            "ბიზნეს რუსული"
          ]
        }
      },
      {
        "system": false,
        "id": "tn0dtbdf",
        "name": "level",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jmhin9ot",
        "name": "lesson_freq",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "pyz7segu",
        "name": "phone_number",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "uiuulnmb",
        "name": "email",
        "type": "email",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "exceptDomains": [],
          "onlyDomains": []
        }
      },
      {
        "system": false,
        "id": "t3u9gdtf",
        "name": "source",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8zga97my4m392o9");

  return dao.deleteCollection(collection);
})
