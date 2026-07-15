var express             = require('express'),
    app                 = express(),
	{ MongoClient, ServerApiVersion } = require("mongodb"),	
	formidable 			= require('express-formidable'),//formidable can handle the file in the request data, it is an advanced version of body-parser
	fsPromises 			= require('fs').promises;

app.use(formidable());

/*MongoDB settings*/
const mongourl = 'mongodb+srv://hamburger:Zyh2004125@cluster0.74wfa0t.mongodb.net/?appName=Cluster0'
const dbName = 'test';
const collectionName = "bookings";
const client = new MongoClient(mongourl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const insertDocument = async (db, doc) => {
    var collection = db.collection(collectionName);
    let results = await collection.insertOne(doc);
	console.log("insert one document:" + JSON.stringify(results));
    return results;
}

const findDocument = async (db, criteria) => {
    var collection = db.collection(collectionName);
    let results = await collection.find(criteria).toArray();
	console.log("find the documents:" + JSON.stringify(results));
    return results;
}
const updateDocument = async (db, criteria, updateData) => {
    var collection = db.collection(collectionName);
    let results = await collection.updateOne(criteria, { $set: updateData });
	console.log("update one document:" + JSON.stringify(results));
    return results;
}
const deleteDocument = async (db, criteria) => {
    var collection = db.collection(collectionName);
    let results = await collection.deleteMany(criteria);
	console.log("delete one document:" + JSON.stringify(results));
    return results;
}
/*End of MongoDB settings*/

/* RESTful */
// Task 3
/* End of Restful */

app.get('/api/booking/:bookingid', async (req,res) => { //async programming way
    if (req.params.bookingid) {
        console.log(req.body)
        let criteria = {};
        criteria['bookingid'] = req.params.bookingid;
        await client.connect();
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const docs = await findDocument(db, criteria);
        res.status(200).json(docs);
    } else {
        res.status(500).json({"error": "missing bookingid"}).end();
    }
});

app.put('/api/booking/:bookingid', async (req,res) => {
    if (req.params.bookingid) {
        console.log(req.body)
        let criteria = { bookingid: req.params.bookingid };
        let updateData = { mobile: req.fields.mobile };
        await client.connect();
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const results = await updateDocument(db, criteria, updateData);
        res.status(200).json(results).end();
    } else {
        res.status(500).json({"error": "missing bookingid"});
    }
})

app.delete('/api/booking/:bookingid', async (req,res) => {
    if (req.params.bookingid) {
        console.log(req.body)
        let criteria = { bookingid: req.params.bookingid };
        await client.connect();
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const results = await deleteDocument(db, criteria);
        console.log(results)
        res.status(200).json(results).end();
    } else {
        res.status(500).json({"error": "missing bookingid"});
    }
})

const port = process.env.PORT || 8099;
app.listen(port, () => {console.log(`Listening at http://localhost:${port}`);});
