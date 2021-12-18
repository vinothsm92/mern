const router = require('express').Router();
let Book = require('../models/books.model');

var sort={_id:1}
router.route('/books').get((req, res) => {
  var pageNo = 0;
  sort={_id:1}
  title=""
  if (req.query.page) {
    pageNo = parseInt(req.query.page);
  }
  if (req.query.title) {
    
    sort={[req.query.title]:-1}
  }
  var perPage = parseInt(req.query.size);
  var skip=perPage * pageNo;
  Book.aggregate([

    {$facet:{

      "total" : [ {"$group": {_id:null, count:{$sum:1}}} ],

      "data" : [{ "$sort": sort }, { "$skip": skip}, {"$limit": perPage} ]

    }},
   
   {$unwind: "$total"},

    //output projection
   {$project:{
      count: "$total.count",
      data: "$data"
   }}

])
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

var i=0
router.route('/add').post((req, res) => {
  i++;
  console.log(i)
req.body._id=i;
  const newBook = new Book(req.body);

  newBook.save()
    .then(() => res.json('Book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;