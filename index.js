const http = require('http');
const fetch = require('node-fetch');
require('dotenv').config();
const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(process.env.SEND_GRID);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

    var url = "https://storage.googleapis.com/falcon-571d6.appspot.com/fsr%2F1911-038%2F20200304-201158-FSR%201911-038%20TOURNEAU%20-%20BUCHERER%20%40%20590%20MADISON%20AVENUE%2C%20NEW%20YORK%2C%20NY%2010022%2C%20US?GoogleAccessId=cloudplatform%40falcon-571d6.iam.gserviceaccount.com&Expires=16447017600&Signature=FUxn9x3W3adXs2C4L45ECNrMzyLWbjZdv9hnA7cY52Kk2rBaRn44WdP%2Fo9p3YXQHwE18fWJzcES%2FarVmmib5%2Bh5Tih0ERzNlz4aoTgEA98NnEzaXTTZ8vQSCe3GzDQARBWtDrlxASKIcSYpm7FUqep%2Bp5njHh%2F4Kswn5n7set%2ByPI4gm1SW97KGDv2sQy5zvV98CgbL%2BGuNvtj9dBvfHRveXp32JuIKcJRbL%2F7PYuNYtV9RWgVnKmgR1wSOeGSKm%2BeDxgrnlVN7X036p4WBVCwHE6WNLGX%2FLghfxHCgd7egrTXhnPoqYFn0jkS8n2kfaQPk0mpNBLDq1bNT6AkBL0w%3D%3D"

    fetch(url).then(res => res.buffer()).then(buffer => {
        const msg = {
            to: 'karina@ezfirecontrols.com',
            from: 'karina@ezfirecontrols.com',
            subject: "fileName",
            text: "fileName",
            attachments: [
                {
                    content: buffer,
                    filename: "fileName",
                    type: "application/pdf"
                }
            ]
        };

        console.log(msg);

        sendGrid
            .send(msg)
            .then(() => { console.log('Email sent!') })
            .catch(err => { console.log('Error sending email', err) });
    })
        .catch(err => { console.log('Error getting buffer', err) })
});
