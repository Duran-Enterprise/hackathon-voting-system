# Backend APIs

## GET ALL POLLS
This api ....
```sh
GET /apisadasdasda
```

## GET VOTING RESULT BY ID
This api is primarily used for getting specific voting results from a given `pollId`.
```sh
GET /api/v1/results?pollId=[id]
```

---


### Query params
| Query Parameters | Type   | Description                                          |
| ---------------- | ------ | ---------------------------------------------------- |
| `pollId`         | number | The poll Id that will be used to query the database. |

### Response
| Returns   | Type               | Description                          |
| --------- | ------------------ | ------------------------------------ |
| `status`  | `status` \| `fail` | Represents the status of the request |
| `message` | `string`           | Message from the server.             |
| `count`   | `number`           | Number of rows returned              |
| `data`    | `Result`           | Returns the result object .          |

### Type Definitions
| Custom Type | Attributes        | Attribute Type | Definition                       |
| ----------- | ----------------- | -------------- | -------------------------------- |
| `Result`    | `resultId`        | `number`       | Result ID from the database      |
|             | `winner`          | `string`       | Choices with highest vote count. |
|             | `choices`         | `Choice`       | Choices from the poll            |
|             | `pollDescription` | `string`       | Poll Description                 |
| `Choice`    | `name`            | `string`       | Choice Name                      |
|             | `"voteCount"`     | `number`       | Vote count for the choice        |

### Example Usage
```javascript
    const pollId = 4
    const results = await fetch(`/api/v1/results?pollId=${pollID}`).then((data)=>{data.json()});
    const resultId = results.resultId;
    const winner = results.winner;
    const choices = results.choices;
    const pollDescription = results.pollDescription;
```
### Example Response
```json
    {
        "resultId":25,
        "winner": "PHP",
        "pollDescription": "What is the best programming language?",
        "choices":[
            { "name": "PHP", "voteCount": 5 },
            { "name": "Javascript", "voteCount": 4 },
            { "name": "C", "voteCount": 3 },
            { "name": "Java", "voteCount": 2 },
            { "name": "Python", "voteCount": 1 }
        ]
    }
```