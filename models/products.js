const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://backend-user:backend@mlecoustre.ndcnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser:       true,
             useUnifiedTopology:    true})
    .then(() => console.log('Connexion réussie à MongoDB'))
    .catch(() => console.error('Connexion à MongoDB échouée'));

const productSchema = mongoose.Schema({
    name:           {type: String,  required: true},
    description:    {type: String,  required: true},
    price:          {type: Number,  required: true},
    inStock:        {type: Boolean, required: true}
});

module.exports = mongoose.model('Product', productSchema);