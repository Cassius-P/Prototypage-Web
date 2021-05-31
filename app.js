let express = require('express')
let bodyParser = require('body-parser')
let bcrypt = require('bcryptjs')
let LocalStorage = require('node-localstorage').LocalStorage;
let ls = new LocalStorage('./user');
let prefix = "ls-tomate/"

let app = express()
let cons = require('consolidate');

app.engine('html', cons.swig)
app.set('view engine', 'html');
app.set('views', './public/views');
// On définit des alias sur nos assets,
// ainsi dans la vue on pourra facilement y faire référence sans tenir
// compte du chemin du fichier
app.use('/css', express.static('./public/css'));
app.use('/js', express.static('./public/js'));
app.use('/img', express.static('./public/img'));

// create application/json parser
let jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {

    dashboardOrLogin(res)
});
app.get('/*', (req, res)=>{
    res.redirect('/');
})
app.post('/login', urlencodedParser, function (req, res) {
    //let userInfo = getUserInfo(req.body.email)
    //Test
    let userInfo = {
        state: true,
        user:{
            email: "admin@admin.com",
            password: "$2y$10$dcYXmNA2a3Tup9MKZJodd.6TtLRxXqu4k/eTGe9ohGFFemPUAJSV6",
            id:"1"
        }
    }
    console.log("beforeVerify")
    let verif = false;
    bcrypt.compare(req.body.password, userInfo.user.password, (error,state) => {
        console.log(state, error)
        if (error != null){
            verif = false
        }

        verif = state;

        if(verif){
            console.log("Set item")
            ls.setItem(prefix+"user", userInfo)
            console.log(ls.getItem(prefix+"user"))
        }
        console.log(req.body)
        res.redirect('/')
    })


})



app.listen(8080, '127.0.0.1');
console.log('Server launched on port 8080');
console.log('Access website on http://127.0.0.1:8080');
let user = ls.getItem(prefix+"user")
user != null ? ls.removeItem(prefix+"user") : console.log("Personne dans la base chef !")

function dashboardOrLogin(res){
    let user = ls.getItem(prefix+"user")
    console.log(user)
    user == null ? res.render('login.html') : res.render('dashboard.html')

    //user != null ? ls.removeItem(prefix+"user") : console.log("Personne dans la base chef !")
}

function getUserInfo(email){
    const https = require('https');
    let userInfo = false

    https.get('https://api.tomates.iswei.fr/login?email='+email, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            if (JSON.parse(data).status){
                userInfo = JSON.parse(data);
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function verifyPassword(userInfo, password){
    console.log(password, userInfo.user.password)

}
