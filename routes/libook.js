const bodyParser = require('body-parser');
const express = require('express');
const router=express.Router();
const fs = require('fs');
const jsdataPath ='./routes/dbooks.json';
const savebookData = (data) => {
    const strd = JSON.stringify(data)
    fs.writeFileSync(jsdataPath, strd);
}

const getbookData = () => {
    const jsd = fs.readFileSync(jsdataPath);
    return JSON.parse(jsd) ;   
}


// reading the data
router.get('/book', (req, res) => {
    fs.readFile(jsdataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
     
    });
  });

//create operation
  router.post('/book/addbook',bodyParser.json(), (req, res) => {
   
    var existbook = getbookData();
    //A 6-digit random number as id.
    const newId = Math.floor(100000 + Math.random() * 900000)
   
    existbook[newId] = req.body;
     
    console.log(existbook);

    savebookData(existbook);
    res.send({success: true, msg: 'Book added successfully'})
});

// Read oprtation - get single book from json file




// Update operation
router.put('/book/:id', (req, res) => {
   var updbook = getbookData()
   fs.readFile(jsdataPath, 'utf8', (err, data) => {
    const bkId = req.params['id'];
    updbook[bkId] = req.body;

    savebookData(updbook);
    res.send(`Book with id ${bkId} has been updated`)
  }, true);
});

//delete operation
router.delete('/book/delete/:id', (req, res) => {
   fs.readFile(jsdataPath, 'utf8', (err, data) => {
    var delbook = getbookData();

    const dbkId = req.params['id'];

    delete delbook[dbkId];  
   savebookData(delbook);
    res.send(`accounts with id ${dbkId} has been deleted`)
  }, true);
})
module.exports = router

