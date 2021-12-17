// const { response } = require("express")

console.log('testing loading of Javascript')
// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
// response.json().then((data) =>
// {
//     console.log(data)
// })
// })


const weatherForm = document.querySelector('form')
const searchTxt = document.querySelector('input')
const MessageBox = document.querySelector('#MessageBox')
const LocationBox = document.querySelector('#LocationBox')


const fetchFunc = (address) => { fetch("http://localhost:3000/weather?address=" + address).then((response)=>{
    response.json().then((data)=>{
        
        if (data.error)
        {
            return LocationBox.textContent = data.error
        }
        LocationBox.textContent = data.forecast
        MessageBox.textContent = data.location
    })
})}


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    LocationBox.textContent = 'Loading, please wait'
    MessageBox.textContent = ''
    console.log(searchTxt.value)
    fetchFunc(searchTxt.value)
})