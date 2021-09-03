const mongoose = require('mongoose');
const Campsite = require('./models/campsite');
const url = 'mongodb://localhost:27017/nucampsite';
//wrapper around mongoDB's driver node connect method
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});



connect.then(() => {

    console.log('Connected correctly to server');

    //changed create
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    .then(campsite => {
        console.log(campsite);
        //make 2 updates to campsite document

        return Campsite.fieByIdAndUpdate(campsite._id, {
            $set: { description: 'Updated Test Document' }
        }, {
            new: true
        });
    })
    .then(campsite => {
        console.log(campsite);

        campsite.comments.push({
            rating: 5,
            text: 'What a magnificient view!',
            author: 'Tinus Lorvaldes'
        });
        //returns campsite.save
        return campsite.save();
    })
    .then(campsite => {
        console.log(campsite);
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});


