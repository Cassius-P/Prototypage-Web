var user = localStorage.getItem("user")
var content = $('#content');


if(user == null){
    loadView('login.html')
}else{
    user = JSON.parse(user);
    let validity = Date.parse(user.validityDate);
    let now = Date.now();
    now = new Date(now);
    validity = new Date(validity);
    let compare = now < validity;
    if(compare){
        loadView('index.html')
    }
}


var ctx = document.getElementById('charts')
if(ctx != null){
    ctx = ctx.getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    label: 'Hygrométrie',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 4,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4
                },
                {
                    label: 'Température',
                    data: [29, 27.5, 25, 29.2, 31, 33],
                    backgroundColor: [
                        'rgb(241,128,6,0.2)'
                    ],
                    borderColor: [
                        'rgb(241,128,6)'
                    ],
                    borderWidth: 4,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4
                },
                {
                    label: 'Luminosité',
                    data: [75, 73, 70, 68, 62, 65],
                    backgroundColor: [
                        'rgba(155,155,155,0.2)'
                    ],
                    borderColor: [
                        'rgb(255,255,255)'
                    ],
                    borderWidth: 4,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4
                }]
        },
        options: {
            plugins:{
                legend: {
                    labels: {
                        color: "#FFFFFF",
                    },
                    title:{
                        color:'#FFFFFF',
                    }
                },
            },
            responsive:true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid:{
                        color: '#919191'
                    }
                },
                x:{
                    grid:{
                        color: '#919191'
                    }
                }
            },

        }
    });
}

function loadView(view){
    $('#content').load(view);
}
