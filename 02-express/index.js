
import express from 'express'

const app = express()

const port = 3000

app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("Hello there")
// })

// app.get("/about", (req,res) => {
//     res.send("This is our about page....Welcoming you all to the about page of our company.........")
// })

// app.get("/sowmya",(req, res) => {
//     res.send("This is my website url click on this to visit my website https://sowmya12.me")
// })

let teaData = []
let nextId = 1;

// CRUD

// C -> Create

//to send new tea data
app.post('/teas', (req, res) => {

    const {name, price} = req.body
    const newTea = { id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
} )

// R -> Read

//to list all tea data
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

//to fetch individual tea data 
//-------------------------------------------------------------
// we use 'id' to get data from user to fetch particular data
// 'params' key word is used to get data that is given by the user via url
//anything that comes from url will be in "string" format - so before using it we need to convert it into our required form
// here we use parseInt method to convert the url content to integer (id)

app.get('/teas/:id', (req, res) => {
    let tea = teaData.find(t => t.id === parseInt(req.params.id))
    
    if(!tea)
    {
        res.send("Could not find Matching Tea!!")
    }
    else
    {
        res.status(200).send(tea)
    }
})

// U -> Update

//update tea

app.put('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id) //grabbing parameter from url
    console.log(teaId)
    const teaToUpdate = teaData.find(t => t.id === teaId) 

    // if the tea having the id specified by us is not found...we simply say its not found..
    if(!teaToUpdate)
    {
        return res.status(404).send("Tea data not found!!")
    }

    //if found we need to get the data for updation from request body
    const {name, price} = req.body 
    teaToUpdate.name = name;
    teaToUpdate.price = price;

    //send the response to user
    return res.status(200).send("Data Updated Successfully!!!...\n")

})

// D -> Delete

//Delete tea
// app.delete('/teas/:id',(req, res) => {
//     const index = teaData.findIndex( t => t.id === parseInt(res.params.id))

//     if(index === -1)
//     {
//         return res.status(404).send('tea not found')
//     }

//     teaData.splice(index, 1)

//     return res.status(204).send("tea deleted successfully!!!...")
// })

// app.delete('/teas/:id', (req, res) => {
//     const teaId = parseInt(req.params.id); // Parse id from the URL

//     const index = teaData.findIndex(t => t.id === teaId);

//     if (index === -1) {
//         return res.status(404).send('Tea not found');
//     }

//     teaData.splice(index, 1);

//     return res.status(204).send("Tea deleted successfully!!!...");
// });

app.delete('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id); // Parse id from the URL
    const index = teaData.findIndex(t => t.id === teaId);

    if (index === -1) {
        return res.status(404).send('Tea not found');
    }

    teaData.splice(index, 1);

    return res.status(200).send("Tea deleted successfully!!!...");
});

app.listen(port, () =>
{
    console.log(`Server is running at port: ${port}.....`)
})