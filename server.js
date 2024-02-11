const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/search', async (req, res) => { // get method is used to make http request and http standard is what APIs follow. putting async in front of the function tells the computer that it has to wait for a response before proceeding to the next step
    try{ // try catch block allows errors to be caught, especially when you are looking for a response from an api
        const countryName = req.query.country // extracts country name from query coming from client side
        const apiResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`) // starts a request and returns a promise. When the request completes, the promise is resolved with the Response object
        if (!apiResponse.ok){
            throw new Error(`HTTP error status: ${apiResponse.status}`)
        }
        const data = await apiResponse.json()
        console.log(data)
        res.send(data)
    }
    catch (error) {
        res.status(500).send({message: error.message})
        console.log(error)
    }
})

app.get('/word', async (req,res) => {
    res.send("hello")
})

app.listen(port, () => { // server needs to know where it is listening
    console.log(`Server running on http://localhost:${port}`)
}) 