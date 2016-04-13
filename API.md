

See the [ActiveStack SyncEngine API documenation](https://github.com/ActiveStack/syncengine/blob/update_optimizations/API.md) for more details.

## Login
```json
{
  "cn": "com.app.mo.Person",  // Or whatever the actual class name of the `Person` object is
  "userId": <UserToken.User.ID>,  // The `UserToken`.`User`.`ID` from the `AuthenticationResponse`
}
```

```json
{
  "token": "",
  "messageId": "<uuid of message>",
  "refreshToken": "DEV",
  "accessToken": "<my_google_access_token>",
  "deviceId": "<uuid>",
  "clientType": "",
  "userId": "",
  "cn": "com.percero.agents.auth.vo.AuthenticateOAuthAccessTokenRequest",
  "regAppKey": "<app_key>",
  "clientId": null,
  "redirectUri": null,
  "authProvider": "GOOGLE"
}
```

```json
{
  "token": "",
  "code": "<success_code_from_google>",
  "clientType": "",
  "redirectUri": "http://myapp.com/oauth2callback.html",
  "deviceId": "<uuid>",
  "userId": "",
  "cn": "com.percero.agents.auth.vo.AuthenticateOAuthCodeRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "messageId": "<uuid of message>",
  "requestToken": null,
  "authProvider": "GOOGLE",
  "requestSecret": null
}
```

### Disconnect SyncEngine
When a client disconnects, the ActiveStack SyncEngine expects a [`DisconnectRequest`](), which informs the SyncEngine that this client is no longer connected.
```json
{
  "cn": "com.percero.agents.sync.vo.DisconnectRequest",
  "clientId": "<client_id>",
  "deviceId": "",
  "token": "<token>",
  "userId": "<user_id>"
}
```

### Disconnect Auth
When a client disconnects, the ActiveStack SyncEngine expects a [`DisconnectRequest`](), which informs the SyncEngine that this client is no longer connected.
```json
{
  "cn": "com.percero.agents.auth.vo.DisconnectRequest",
  "clientId": "<client_id>",
  "deviceId": "",
  "token": "<token>",
  "userId": "<user_id>"
}
```

### Logout
In order to logout, a client must send a [`LogoutRequest`]() to the ActiveStack SyncEngine.
```json
{
  "pleaseDestroyClient": false, // If set to true, destroys all record of this client
  "responseChannel": "",
  "sendAck": true,
  "clientType": "",
  "token": "<token>",
  "deviceId": "",
  "userId": "<user)id>",
  "cn": "com.percero.agents.sync.vo.LogoutRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "messageId": "<uuid of message>",
  "svcOauthKey": ""
}
```

## Core API

- All `className` references assume that the corresponding class is part of the registered data model, meaning it is included in the `ActiveStack.Domain` module.

### [connect](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/ConnectHandler.java)
This connect request is NEVER seen by the client, but is handled under the hood by the ActiveStack Gateway.  It is included here for the sake of completeness.  Note that the `ConnectResponse` IS sent to the client, indicating that the client is now connected to the ActiveStack SyncEngine and can commence sending requests.
NOTE: The `clientId`', `userId`, and `token` in this `ConnectResponse` are to be sent with every subsequent request to the ActiveStack SyncEngine
```json
{
  "cn": "com.percero.agents.sync.vo.ConnectRequest",
  "clientId": "<client)id>",
  "deviceId": "<device_id>",
  "token": "<token>",
  "userId": "<user_id>"
}
```
Response:
```json
{
  "cn": "com.percero.agents.sync.vo.ConnectResponse",
  "clientId": "<client-id>",
  "timestamp": 1460480647867,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": null,
  "gatewayMessageId": null,
  "currentTimestamp": 1460480647867,
  "dataID": null
}
```

### [reconnect](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/ReconnectHandler.java)
When a client loses connection to ActiveStack, it can send a [`ReconnectRequest`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/ReconnectRequest.java) to the SyncEngine. This is to let the SyncEngine know that this client has come back online.
NOTE: The `clientId`', `userId`, and `token` in this `ReconnectResponse` are to be sent with every subsequent request to the ActiveStack SyncEngine.  Also, a reconnect always results in a NEW client id being assigned to the client.
```json
{
  "cn": "com.percero.agents.sync.vo.ReconnectRequest",
  "existingClientId": "<existing_client_id>",
  "existingClientIds": [
    "<existing_client_id>",
    "<another_existing_client_id>",
    "<one of these exists for every connect and reconnect>"
  ],
  "clientId": "<current_client_id>",
  "deviceId": "<device_id>",
  "token": "<token>",
  "userId": "<user_id>"
}
```
Response:
```json
{
  "cn": "com.percero.agents.sync.vo.ConnectResponse",
  "clientId": "<client-id>",
  "timestamp": 1460480647867,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": null,
  "gatewayMessageId": null,
  "currentTimestamp": 1460480647867,
  "dataID": null
}
```

### [findById](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/FindByIdHandler.java)
```json
{
  "token": "<token>",
  "messageId": "<uuid of message>",
  "responseChannel": "",
  "sendAck": true,
  "clientType": "",
  "deviceId": "",
  "userId": "<user_id>",
  "cn": "com.percero.agents.sync.vo.FindByIdRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "theClassId": "<uuid of object to find>",
  "theClassName": "com.app.mo.MyModelObject",
  "svcOauthKey": ""
}
```

### [findByIds](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/FindByIdsHandler.java)
```json
{
  "token": "<token>",
  "messageId": "<uuid of message>",
  "responseChannel": "",
  "sendAck": true,
  "clientType": "",
  "deviceId": "",
  "userId": "<user_id>",
  "cn": "com.percero.agents.sync.vo.FindByIdsRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "theClassIdList": [
    {
      "className": "com.app.mo.MyModelObject",
      "ids": [
        "<uuid>",
        "<uuid of next object to find>",
        "<and so on>",
        ...
        "<uuid of last object to find>"
      ]
    }
  ],
  "svcOauthKey": ""
}
```

### [getAllByName](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/GetAllByNameHandler.java)
```json
{
  "token": "<token>",
  "returnTotal": true,
  "responseChannel": "",
  "sendAck": true,
  "theClassName": "com.app.mo.MyModelObject",
  "clientType": "",
  "pageSize": 25,
  "deviceId": "",
  "userId": "<user_id>",
  "pageNumber": 0,
  "cn": "com.percero.agents.sync.vo.GetAllByNameRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "messageId": "<uuid of message>",
  "svcOauthKey": ""
}
```
Response:
```json
{
  "cn": "com.percero.agents.sync.vo.GetAllByNameResponse",
  "clientId": "<client_id>",
  "timestamp": 1460480792894,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": "<uuid of request message>",
  "gatewayMessageId": null,
  "result": [
    {
      "cn": "com.app.mo.SomeModelObject",
      "ID": "<uuid>",
      "someStringField": "..."
    },
    {
      "cn": "com.app.mo.SomeModelObject",
      "ID": "<uuid>",
      "someStringField": "..."
    }
  ],
  "pageSize": 2,
  "pageNumber": 0,
  "totalCount": 82
}
```

### [findByExample](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/FindByExampleHandler.java)
```json
{
  "token": "<token>",
  "responseChannel": "",
  "sendAck": true,
  "clientType": "",
  "deviceId": "",
  "userId": "<user)id>",
  "cn": "com.percero.agents.sync.vo.FindByExampleRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "messageId": "<uuid of message>",
  "theObject": {
    "cn": "com.app.mo.Person",
    "userId": "8ad0360a3a89d53f013b1a99f14d0130"
  },
  "svcOauthKey": ""
}
```
Response:
```json
{
  "cn": "com.percero.agents.sync.vo.FindByExampleResponse",
  "clientId": "129d41c01ba2476e01bbb12f0ba50cd5",
  "timestamp": 1460480779167,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": "<uuid of request message>",
  "gatewayMessageId": null,
  "result": [
    {
      "cn": "com.app.mo.MyModelObject",
      "ID": "<uuid of object>",
      "someTimestampField": 1353312000000,
      "someStringField": "...",
      "someToManyProperty": [
        {
          "className": "com.app.mo.MyToManyObject",
          "ID": "<uuid>"
        },
        {
          "className": "com.app.mo.MyToManyObjectChildClass",
          "ID": "<uuid>"
        }
      ],
      "someToOneProperty": {
        "className": "com.app.mo.MyToOneObject",
        "ID": "<uuid>"
      }
    }
  ]
}
```


### [putObject](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/PutObjectHandler.java)
```json
{
  "token": "<token>",
  "responseChannel": "",
  "sendAck": true,
  "clientType": "",
  "deviceId": "",
  "transId": "<uuid>",
  "userId": "<user_id>",
  "cn": "com.percero.agents.sync.vo.PutRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "messageId": "<uuid of message>",
  "theObject": {
    "someIntegerPropertyName": 12345,
    "someToOnePropertyName": {
      "className": "com.app.mo.SingleModelObject",
      "ID": "<uuid>",
      "properties": {}
    },
    "someToManyPropertyName": [
      {
        "className": "com.app.mo.OtherModelObject",
        "ID": "<uuid>",
        "properties": {}
      },
      {
        "className": "com.app.mo.OtherModelObject",
        "ID": "<uuid>",
        "properties": {}
      }
    ],
    "cn": "com.app.mo.MyModelObject",
    "someDoublePropertyName": 12.345,
    "ID": "<uuid of object>",
    "someStringPropertyName": "..."
  },
  "putTimestamp": <timestamp of update>,
  "svcOauthKey": ""
}
```
Response:
```json
{
  "cn": "com.percero.agents.sync.vo.PutResponse",
  "clientId": "<client_id>",
  "timestamp": 1460481711169,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": "<uuid of request message>",
  "gatewayMessageId": null,
  "result": true
}
```

### [createObject](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/CreateObjectHandler.java)
```json
{
  "token": "<token>",
  "responseChannel": "",
  "sendAck": true,
  "clientType": "",
  "deviceId": "",
  "userId": "<user_id>",
  "cn": "com.percero.agents.sync.vo.CreateRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "messageId": "<uuid of message>",
  "theObject": {
    "someStringProperty": "...",
    "someToManyProperty": [],
    "ID": "<uuid of new object>",
    "cn": "com.app.mo.MyModelObject",
    "someToOneProperty": {
      "className": "com.app.mo.SingleModelObject",
      "ID": "<uuid>",
      "properties": {}
    }
  },
  "svcOauthKey": ""
}
```
Response:
```json
{
  "cn": "com.percero.agents.sync.vo.CreateResponse",
  "clientId": "<client_id>",
  "timestamp": 1460481616555,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": "<uuid of request message>",
  "gatewayMessageId": null,
  "theObject": {
    "cn": "com.app.mo.MyModelObject",
    "ID": "<uuid of new object>",
    "someStringField": "...",
    "someToManyProperty": []
  },
  "result": true
}
```

### [removeObject](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/RemoveObjectHandler.java)
```json
{
  "token": "<token>",
  "responseChannel": "",
  "removePair": {
    "className": "com.app.mo.MyModelObject",
    "ID": "<uuid of object to remove>",
    "properties": {}
  },
  "sendAck": true,
  "clientType": "",
  "deviceId": "",
  "userId": "<user_id>",
  "cn": "com.percero.agents.sync.vo.RemoveRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "messageId": "<uuid of message>",
  "svcOauthKey": ""
}
```
Response:
```json
{
  "cn": "com.percero.agents.sync.vo.RemoveResponse",
  "clientId": "<client_id>",
  "timestamp": 1460481797411,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": "<uuid of request message>",
  "gatewayMessageId": null,
  "result": true
}
```

### [getChangeWatcher](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/GetChangeWatcherHandler.java)
```json
{
  "token": "<token>",
  "responseChannel": "",
  "sendAck": true,
  "params": [
    "<name of parameter>"
  ],
  "clientType": "",
  "regAppKey": "",
  "deviceId": "",
  "fieldName": "role",
  "userId": "<user_id>",
  "cn": "com.percero.agents.sync.vo.PushCWUpdateRequest",
  "classIdPair": {
    "className": "com.app.mo.MyModelObject",
    "ID": "<object_id>",
    "properties": {}
  },
  "clientId": "<client_id>",
  "messageId": "<uuid of message>",
  "svcOauthKey": ""
}
```
Response:
```json
{
  "cn": "com.percero.agents.sync.vo.PushCWUpdateResponse",
  "clientId": "<client_id>",
  "timestamp": 1460481097749,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": "<uuid of request message>",
  "gatewayMessageId": null,
  "classIdPair": {
    "className": "com.app.mo.SomeModelObject",
    "ID": "<uuid of updated object>"
  },
  "fieldName": "role",
  "params": [
    "<name of parameter>"
  ],
  "value": {
    "className": "com.app.mo.ResultModelObject",
    "properties": null,
    "ID": "<uuid>"
  }
}
```

### [runServerProcess](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/RunProcessHandler.java)
- Runs a custom server process.  This process can be a custom piece of code, a defined HTTP process, a defined SQL stored procedure, or some other defined Connector.
  - Request: [`RunServerProcessRequest`](https://github.com/ActiveStack/syncengine/blob/master/src/main/java/com/percero/agents/sync/vo/RunServerProcessRequest.java)
  - Response: [`RunServerProcessResponse`](https://github.com/ActiveStack/syncengine/blob/master/src/main/java/com/percero/agents/sync/vo/RunServerProcessResponse.java)
  - Parameters:
    - `queryName`: The name of the process.  To use a specific Connector (such as 'HTTP' or 'SQL_PROC' for database stored procedures), prefix the operation name of the Connector name and a ":".  Example:  "HTTP:fetchDataFromHttpEndpoint"
    - `queryArguments` (optional): Any required parameters for the server process.  Typically, this is passed as some sort of map (parameterName -> parameterValue)
```json
{
  "queryName": "<task_name>",
  "deviceId": "",
  "userId": "<user_id>",
  "shardedProcess": false,
  "svcOauthKey": "",
  "clientId": "<client_id>",
  "responseChannel": "",
  "queryArguments": [
    "arg1",
    12.345,
    12345
  ],
  "cn": "com.percero.agents.sync.vo.RunProcessRequest",
  "regAppKey": "",
  "clientType": "",
  "sendAck": true,
  "serviceGroupId": null,
  "messageId": "<message_id>",
  "processId": null,
  "token": "<token>"
}
```


## Client Responses

### Push Updates Received
Whenever the ActiveStack SyncEngine sends out an update, it expects to receive a [`PushUpdatesReceived`]() response from the client. This lets the ActiveStack SyncEngine know that the client has received and processed the update. The SyncEngine will continue to attempt to push the same update out to the client until the client responds with the `PushUpdatesReceived` response.
```json
{
  "token": "<token>",
  "responseChannel": "",
  "sendAck": true,
  "clientType": "",
  "deviceId": "",
  "userId": "<user_id>",
  "cn": "com.percero.agents.sync.vo.PushUpdatesReceivedRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "messageId": "<uuid of message>",
  "classIdPairs": [
    {
      "className": "com.app.mo.MyModelObject",
      "ID": "<uuid of update object>",
      "properties": {}
    }
  ],
  "svcOauthKey": ""
}
```
Response:
```json
{
  "cn": "com.percero.agents.sync.vo.PushUpdatesReceivedResponse",
  "clientId": "<client_id>",
  "timestamp": 1460481757415,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": "<uuid of request message>",
  "gatewayMessageId": null,
  "result": true
}
```

### Deletes Received
Whenever the ActiveStack SyncEngine sends out a remove/delete, it expects to receive a [`DeletesReceived`]() response from the client. This lets the ActiveStack SyncEngine know that the client has received and processed the delete. The SyncEngine will continue to attempt to push the same delete out to the client until the client responds with the `DeletesReceived` response.
```json
{
  "token": "<token>",
  "responseChannel": "",
  "sendAck": true,
  "clientType": "",
  "deviceId": "",
  "userId": "<user_id>",
  "cn": "com.percero.agents.sync.vo.PushDeletesReceivedRequest",
  "regAppKey": "",
  "clientId": "<client_id>",
  "messageId": "<uuid of message>",
  "classIdPairs": [
    {
      "className": "com.app.mo.MyModelObject",
      "ID": "<uuid of removed object>",
      "properties": {}
    }
  ],
  "svcOauthKey": ""
}
```

Response:
```json
{
  "cn": "com.percero.agents.sync.vo.PushDeletesReceivedResponse",
  "clientId": "<client_id>",
  "timestamp": 1460481861735,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": "<uuid of request message>",
  "gatewayMessageId": null,
  "result": true
}
```


## Pushes from SyncEngine
This is really where the real-time aspect of ActiveStack comes into play.  The main point here is that clients are notified of updates to objects that they are currently interested in.  It is up to the client SDK to respond appropriately to these update notifications.

### PushUpdateResponse
Sent whenever an object has been updated for which a client has registered to receive updates.
```json
{
  "cn": "com.percero.agents.sync.vo.PushUpdateResponse",
  "clientId": "<client_id>",
  "timestamp": 1460482040672,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": null,
  "gatewayMessageId": null,
  "objectList": [
    {
      "cn": "com.app.mo.MyModelObject",
      "ID": "<uuid of updated object>",
      "someStringProperty": "..."
    }
  ],
  "updatedFields": []
}
```

### DeleteUpdateResponse
Sent whenever an object has been deleted for which a client has registered to receive updates.
```json
{
  "cn": "com.percero.agents.sync.vo.PushDeleteResponse",
  "clientId": "<client_id>",
  "timestamp": 1460481912713,
  "ids": null,
  "data": null,
  "type": null,
  "correspondingMessageId": null,
  "gatewayMessageId": null,
  "objectList": [
    {
      "className": "com.app.mo.MyModelObject",
      "ID": "<uuid of removed object>"
    }
  ]
}
```

