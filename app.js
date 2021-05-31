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
    let userInfo = getUserInfo(req.body.email)

    let verif = false;
    if(userInfo != false){
        bcrypt.compare(req.body.password, userInfo.user.password, (error,state) => {
            console.log(state, error)
            if (error != null){
                verif = false
            }
            verif = state;

        })
    }



    if(verif){
        console.log("Set item")
        ls.setItem(prefix+"user", JSON.stringify(userInfo))
        console.log(ls.getItem(prefix+"user"))
    }
    console.log(req.body)
    res.redirect('/')



})



app.listen(8080, '127.0.0.1');
console.log('Server launched on port 8080');
console.log('Access website on http://127.0.0.1:8080');
let user = ls.getItem(prefix+"user")
user != null ? ls.removeItem(prefix+"user") : console.log("Personne dans la base chef !")

function dashboardOrLogin(res){
    let user = ls.getItem(prefix+"user")
    user = JSON.parse(user);
    user?.user == null ? res.render('login.html') : res.render('dashboard.html')


}

function getUserInfo(email){
    const https = require('https');
    let userInfo = false

    https.get('https://api.tomates.iswei.fr/login?email='+email, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(JSON.parse(data));
            if (JSON.parse(data).status){
                userInfo = data
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    return userInfo
}

function verifyPassword(userInfo, password){
    console.log(password, userInfo.user.password)
}
