import express from 'express';
import fs from "fs";
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fileUpload from 'express-fileupload';
import { listArchive } from 'node-7z-archive';

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

export const abc = (srcloc, password) => {
    return new Promise((resolve, reject) => {
        listArchive(srcloc, { p: password })
            .progress(function (files) {

                if (files.length != 0) {
                    resolve(files);
                }

            }).then(function (data) {
                console.log('Extracting done!', data);
            }).catch(function (err) {
                reject(err.message);
            });
    });
}

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('filedata'), (req, res, next) => {
    const file = req.file;
    const password = req.body.password;
    console.log(password);
    console.log(file.path);

    abc(file.path, password).then((data) => {
        console.log(data);
        fs.rmSync(file.path, {
            force: true,
        });
        res.send(data);
    }).catch((err) => {
        console.log(err)
        res.send(err);
    });

    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    
})

app.listen(3000, () => {
    console.log("Server running successfully on 3000");
});

// // import { createArchive, deleteArchive, extractArchive, fullArchive, listArchive, renameArchive, testArchive, updateArchive } from 'node-7z-archive';



// app.post('/lists', upload.single('file'), (req, res) => {

//     var file = req.file

//     console.log(file)

//     res.json({ "res": "Hello from nodejs" })


// })

// var server = app.listen(2222, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
// })



