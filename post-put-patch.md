1. POST: This method is used to create new entry in database.

2. PUT: This method is used to replace the whole entry in database.
   existing user: {
   "id": 101,
   "name": "Samir",
   "age": 24,
   "city": "Gurgaon"
   }
   request: PUT /users/101
   body: {
   "name": "Samir Singh",
   "age": 25,
   "city": "Delhi"
   }
   after update: {
   "id": 101,
   "name": "Samir Singh",
   "age": 25,
   "city": "Delhi"
   }
   entire object is replaced, with PUT we usually send the complete object, else missing field get removed.

3. PATCH: This method is used to update the partial data from the database.
   existing user: {
   "id": 101,
   "name": "Samir",
   "age": 24,
   "city": "Gurgaon"
   }
   request: PATCH /users/101
   body:{
   "age": 25
   }
   after update:{
   "id": 101,
   "name": "Samir",
   "age": 25,
   "city": "Gurgaon"
   }
