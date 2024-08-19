  //Create a Person Schema: First, let’s define the Person schema using Mongoose. We’ll include the required fields: name, age, and favoriteFoods. Here’s how you can create the schema:
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model('Person', personSchema);

//Create and Save a Record
const newPerson = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger', 'Rice'],
  });
  
  newPerson.save((err, savedPerson) => {
    if (err) {
      console.error('Error saving person:', err);
    } else {
      console.log('Saved person:', savedPerson);
    }
  });

  //Create Many Records: To create multiple people at once, use Model.create():
  const arrayOfPeople = [
    { name: 'Alice', age: 25, favoriteFoods: ['Sushi'] },
    { name: 'Bob', age: 28, favoriteFoods: ['Tacos'] },
    // Add more people as needed
  ];
  
  Person.create(arrayOfPeople, (err, createdPeople) => {
    if (err) {
      console.error('Error creating people:', err);
    } else {
      console.log('Created people:', createdPeople);
    }
  });
    

  //Search for People:
//To find all people with a given name
Person.find({ name: 'Alice' }, (err, foundPeople) => {
    if (err) {
      console.error('Error finding people:', err);
    } else {
      console.log('Found people:', foundPeople);
    }
  });

  //To find a person with a specific food in their favorites:
  Person.findOne({ favoriteFoods: 'Pizza' }, (err, foundPerson) => {
    if (err) {
      console.error('Error finding person:', err);
    } else {
      console.log('Found person:', foundPerson);
    }
  });

  
  //Update a Person:
//To add “hamburger” to a person’s favoriteFoods
Person.findByIdAndUpdate(
    personId, // Replace with the actual _id of the person
    { $push: { favoriteFoods: 'Hamburger' } },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        console.error('Error updating person:', err);
      } else {
        console.log('Updated person:', updatedPerson);
      }
    }
  );

  
  //To update a person’s age:
  Person.findOneAndUpdate(
    { name: 'John Doe' }, // Replace with the actual name
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        console.error('Error updating person:', err);
      } else {
        console.log('Updated person:', updatedPerson);
      }
    }
  );

  
  //Delete a Person:
//To delete a person by _id:
Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) {
      console.error('Error removing person:', err);
    } else {
      console.log('Removed person:', removedPerson);
    }
  });

  //To delete all people named “Mary”
  Person.remove({ name: 'Mary' }, (err, result) => {
    if (err) {
      console.error('Error removing people:', err);
    } else {
      console.log('Removed count:', result.deletedCount);
    }
  });

  
  //Chain Query Helpers: To find burrito lovers, sort by name, limit results, and hide their age
  Person.find({ favoriteFoods: 'Burrito' })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec((err, burritoLovers) => {
    if (err) {
      console.error('Error finding burrito lovers:', err);
    } else {
      console.log('Burrito lovers:', burritoLovers);
    }
  });
