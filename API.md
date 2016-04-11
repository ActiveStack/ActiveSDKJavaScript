

##

- All `className` references assume that the corresponding class is part of the registered data model, meaning it is included in the `ActiveStack.Domain` module.

### [findById](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/FindByIdHandler.java)
- Retrieves the object identified by a `className` and an `ID`.  The server will respond with a `findByIdResponse` containing either the result, or a NULL result indicating the specified object was not found, and registers the Client for any updates to that object.
  - Request: [`FindByIdRequest`](https://github.com/ActiveStack/syncengine/blob/master/src/main/java/com/percero/agents/sync/vo/FindByIdRequest.java)
  - Response: [`FindByIdResponse`](https://github.com/ActiveStack/syncengine/blob/master/src/main/java/com/percero/agents/sync/vo/FindByIdResponse.java)
  - Parameters:
    - `theClassName`: The name of the class
    - `theClassId`: The ID of the object to find
  - Note that the API should be able to handle inheritance.  So "parentClass::ID" and "class::ID" should both return the same result (assuming that "class" inherits from "parentClass").

### [findByIds](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/FindByIdsHandler.java)
- Retrieves a list of object identified by the `className` and a list of `ID`'s and registers the Client for any updates to those objects.
  - Request: [`FindByIdsRequest`](https://github.com/ActiveStack/syncengine/blob/master/src/main/java/com/percero/agents/sync/vo/FindByIdsRequest.java)
  - Response: [`FindByIdsResponse`](https://github.com/ActiveStack/syncengine/blob/master/src/main/java/com/percero/agents/sync/vo/FindByIdsResponse.java)
  - Parameters:
    - `theClassIdList`: [`ClassIDPairs`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/ClassIDPairs.java) object which contains the `className` and a list of `ID`'s to retrieve
  - Note that the API should be able to handle inheritance.  So "parentClass::ID" and "class::ID" should both return the same result (assuming that "class" inherits from "parentClass").

### [getAllByName](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/GetAllByNameHandler.java)
- Retrieves all objects of a particular class and registers the Client for any updates to those objects.
  - Request: [`GetAllByNameRequest`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/GetAllByNameRequest.java)
  - Response: [`GetAllByNameResponse`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/GetAllByNameResponse.java)
  - Parameters:
    - `theClassName`: The name of the class to get all objects.
    - `pageSize` (optional): Number of items to return in result.
    - `pageNumber` (optional): Desired page number
    - `returnTotal` (optional): If set to `true`, returns the total number of objects to be returned.  Typically used in the first call to determine exactly how many objects are expected.

### [findByExample](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/FindByExampleHandler.java)
- Retrieves all objects that match the supplied sample object and registers the Client for any updates to those objects.
  - Request: [`FindByExampleRequest`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/FindByExampleRequest.java)
  - Response: [`FindByExampleResponse`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/FindByExampleResponse.java)
  - Parameters:
    - `theObject`: A sample object of the domain model.  Fields on the object that are set will be included as part of the filter criteria

### [putObject](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/PutObjectHandler.java)
- Updates an existing object
  - Request: [`PutRequest`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/PutRequest.java)
  - Response: [`PutResponse`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/PutResponse.java)
  - Parameters:
    - `theObject`
    - `putTimestamp` (optional): The time this object was updated. This is used for conflict resolution
    - `transId` (optional): A client defined transaction ID. Mostly used for tracking of updates, does NOT enforce a database transaction.

### [createObject](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/CreateObjectHandler.java)
- Creates a new object
  - Request: [`CreateRequest`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/CreateRequest.java)
  - Response: [`CreateResponse`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/CreateResponse.java)
  - Parameters:
    - `theObject`: The object to be created.  If the object does NOT contain an ID, the ActiveStack Sync Engine will create one.

### [removeObject](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/RemoveObjectHandler.java)
- Removes an existing object
  - Request: [`RemoveRequest`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/RemoveRequest.java)
  - Response: [`RemoveResponse`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/RemoveResponse.java)
  - Parameters:
    - `removePair`: A [`ClassIDPair`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/ClassIDPair.java) identifying the ID and class name of the object to be removed

### [getChangeWatcher](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/GetChangeWatcherHandler.java)
- Retrieves the value of a ChangeWatcher and registers the Client for any updates to that value.
  - Request: [`PushCWUpdateRequest`](https://github.com/ActiveStack/syncengine/blob/master/src/main/java/com/percero/agents/sync/vo/PushCWUpdateRequest.java)
  - Response: [`PushCWUpdateResponse`](https://github.com/ActiveStack/syncengine/blob/master/src/main/java/com/percero/agents/sync/vo/PushCWUpdateResponse.java)
  - Parameters:
    - `classIdPair`: A [`ClassIDPair`](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/agents/sync/vo/ClassIDPair.java) identifying the ID and class name of the object that the ChangeWatcher hangs off of.
    - `fieldName`: The name of the field that represents the ChangeWatcher.
    - `params` (optional): An array of strings that represent the parameters that uniquely identify the ChangeWatcher.

### [runServerProcess](https://github.com/ActiveStack/syncengine/blob/156ea8927fba9681f8b547662904073a45f990b1/src/main/java/com/percero/amqp/handlers/RunProcessHandler.java)
- Runs a custom server process.  This process can be a custom piece of code, a defined HTTP process, a defined SQL stored procedure, or some other defined Connector.
  - Request: [`RunServerProcessRequest`](https://github.com/ActiveStack/syncengine/blob/master/src/main/java/com/percero/agents/sync/vo/RunServerProcessRequest.java)
  - Response: [`RunServerProcessResponse`](https://github.com/ActiveStack/syncengine/blob/master/src/main/java/com/percero/agents/sync/vo/RunServerProcessResponse.java)
  - Parameters:
    - `queryName`: The name of the process.  To use a specific Connector (such as 'HTTP' or 'SQL_PROC' for database stored procedures), prefix the operation name of the Connector name and a ":".  Example:  "HTTP:fetchDataFromHttpEndpoint"
    - `queryArguments` (optional): Any required parameters for the server process.  Typically, this is passed as some sort of map (parameterName -> parameterValue)


