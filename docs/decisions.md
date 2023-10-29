# Team Decisions #


## Testing ##

### Unit Testing ###

we used mockito on unit testing of the services, as for the controllers unit tests we used sinon and chai to stub the necessary functions and test the controllers.

### Integration Testing ###

we tested the interaction between the controllers and the services using sinon and chai.

### Task Type ###

we decided not to implement the task type despite it being use in the class RobotType, and so this class only holds a TaskType code that holds a connection to nothing.


## Floor Map ##

### Floor Map Representation ###

we decided to represent the floor map as an array of arrays, where each element in the array is a row in the floor map, and each element in the row is a cell in the floor map.
Each cell corresponds to a string in which can be put the code of the room filling out the space of that occupied in the floor map(i.e).

