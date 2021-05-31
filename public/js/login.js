
/*

let button = document.querySelector('#connect')
let inputs = document.querySelectorAll('input')



let prefix = "tomate-ls"
//let pwHashed = JSON.stringify(JSON.parse(ls.getItem(prefix+"Test")).user.password)
bcrypt.compare("admin", "$2y$10$dcYXmNA2a3Tup9MKZJodd.6TtLRxXqu4k/eTGe9ohGFFemPUAJSV6", (Err, state)=>{
    console.log(state)
})

*/


/*


let url = 'http://192.168.1.2:8080'
button.addEventListener('click', ()=>{
    inputs[0].classList.remove("border-solid")
    inputs[0].classList.remove("border-4")
    inputs[0].classList.remove("border-red-500")
    inputs[1].classList.remove("border-solid")
    inputs[1].classList.remove("border-4")
    inputs[1].classList.remove("border-red-500")

    if(inputs[0].value == ""){
        inputs[0].classList.add("border-solid")
        inputs[0].classList.add("border-4")
        inputs[0].classList.add("border-red-500")
        return
    }
    if(inputs[1].value == ""){
        inputs[1].classList.add("border-solid")
        inputs[1].classList.add("border-4")
        inputs[1].classList.add("border-red-500")
        return
    }



    $.ajax({
        url: url + "/login?email=" + inputs[0].value,
        type: 'GET',
        dataType: 'json',
        cors: true ,
        contentType:'application/x-www-form-urlencoded',
        secure: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function (data, status, xhr) {
            console.log(data, status)
            checkCredentials(data, status)
            /!*if (checkCredentials(data, status)) {
                console.log("connect")
            }*!/
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error Something');
        },

        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa("Key"));
        },
    });
    console.log(inputs[0].value, inputs[1].value)
})

function checkCredentials(data, status){
    require()
    if(!status){
        console.log("status")
        return false;
    }
    if(!data.status){
        console.log(data.status)
        return false;
    }

    ls.setItem(prefix+"Test", JSON.stringify(data))
    checkpw(inputs[0].value, data.user.password, (res)=>{
        console.log("checkpw Res", res)
    })
    /!*if(bcrypt.compare(inputs[0].value, data.user.password, (err, res) => {
        if (err) {
            console.error(err)
            return false
        }
        console.log("res"+res)
        return res; //true or false
    }));*!/
}
*/
