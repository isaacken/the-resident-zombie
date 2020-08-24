# API Documentation


## Setup

### Prerequisites

- docker
- docker-compose

- yarn or npm (this setup instructions use yarn but you can use what you prefer)

Then, run in bash

```bash
yarn
cp .env.example .env
docker-compose up -d
yarn knex migrate:latest
yarn knex seed:run
 
```

### Test environment
To test you must run the following in bash:
```bash
yarn
cp .env.example .env.test
docker-compose -f docker-compose.test.yml up -d
yarn test
```

## Endpoints examples

### Register survivor

**POST** &nbsp; ```/people```

**BODY** example

```json
{
  "person": {
    "name": "John Doe",
    "age": 21,
    "gender": "M",
    "lat": -22.284850, 
    "lng": -46.365896
  },
  "inventory": [
    { "item_name": "Fiji Water", "quantity": 10 },
    { "item_name": "Campbell Soup", "quantity": 10 },
    { "item_name": "AK47", "quantity": 10 },
    { "item_name": "First Aid Pouch", "quantity": 10 }
  ]
}
```

**RESPONSE** ```HTTP 200```

```json
{
  "id": "e3ccc24a-da12-497f-af32-6c84dff2a01f",
  "name": "John Doe",
  "age": 21,
  "gender": "M",
  "lat": -22.28485,
  "lng": -46.365896,
  "infected": false,
  "created_at": "2020-08-24T18:05:29.875Z",
  "updated_at": null
}
```

### UPDATE LOCATION

**PATCH** &nbsp; ```/people/update-location/{id}```

**BODY** example

```json
{
  "location": {
    "lat": -21.284850, 
    "lng": -43.365896
  }
}
```

**RESPONSE** ```HTTP 204```

No Content

### FLAG INFECTED

**PATCH** &nbsp; ```/people/flag-infected/{reported-id}```

**BODY** example

```json
{
  "reporter_id": "a9455e91-3e05-41fe-8459-850a9549cf37"
}
```

**RESPONSE** ```HTTP 204```

No Content

### TRADE ITEMS

**POST** &nbsp; ```/trade```

**BODY** example

```json
{
  "trader_1": {
    "id": "fe243fb3-2f45-4c8a-ac24-f63e9eae4a78",
    "items": [
      { "item_name": "First Aid Pouch", "quantity": 1 },
      { "item_name": "AK47", "quantity": 2 }
    ]
  },
  "trader_2": {
    "id": "8ceac9cb-51e8-4192-84e8-b63b71e6ac7f",
    "items": [
      { "item_name": "Fiji Water", "quantity": 1 },
      { "item_name": "Campbell Soup", "quantity": 1 }
    ]
  }
}
```

**RESPONSE** ```HTTP 200```

OK


### REPORT: INFECTED SURVIVORS

**GET** &nbsp; ```/reports/infected-survivors```

**BODY**

Empty


**RESPONSE** ```HTTP 200```

```json
{
  "infected_people": 0.4166666666666667
}
```

### REPORT: NON INFECTED SURVIVORS

**GET** &nbsp; ```/reports/non-infected-survivors```

**BODY**

Empty


**RESPONSE** ```HTTP 200```

```json
{
  "non_infected_people": 0.5833333333333334
}
```

### REPORT: ITEMS PER SURVIVOR

**GET** &nbsp; ```/reports/items-per-survivor```

**BODY**

Empty


**RESPONSE** ```HTTP 200```

```json
[
  {
    "item_name": "Fiji Water",
    "quantity_per_survivor": 10
  },
  {
    "item_name": "Campbell Soup",
    "quantity_per_survivor": 10
  },
  {
    "item_name": "First Aid Pouch",
    "quantity_per_survivor": 10
  },
  {
    "item_name": "AK47",
    "quantity_per_survivor": 9.428571428571429
  }
]
```

### REPORT: POINTS LOST BY INFECTED SURVIVOR

**GET** &nbsp; ```/reports/points-lost-by-infected-survivors```

**BODY**

Empty


**RESPONSE** ```HTTP 200```

```json
{
  "points_lost_by_infected_survivors": 2136
}
```