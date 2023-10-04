// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// // const path = require('path');
// // const decompress = require('decompress');
// // const reader = require('xlsx');
// // const fs = require('fs');

// const app = express();
// const port = 8080;

// app.use(cors());

// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: function (req, file, cb) {
//     // Keep the original file name
//     const originalName = file.originalname.replace(/\s/g, '_'); // Replace spaces with underscores (if needed)
//     cb(null, originalName);
//   },
// });

// const upload = multer({ storage });

// app.use(express.static('uploads'));

// app.post('/upload', upload.array('file'), (req, res) => {
//   console.log('Files uploaded successfully');
//   res.send('Files uploaded successfully');
// });



// app.listen(port, '192.168.30.80', () => {
//   console.log('Server is running at: http://192.168.30.80:8080');
// });



const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const decompress = require('decompress');
const reader = require('xlsx');
const fs = require('fs');


const app = express();
const port = 8080;

app.use(cors());

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    // Keep the original zip file name
    const originalName = file.originalname;
    cb(null, originalName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.zip') {
      return cb(new Error('Only zip files are allowed'));
    }
    cb(null, true);
  },
});

app.use(express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Zip file uploaded successfully');
  res.send('Zip file uploaded successfully');
});


decompress("C:\\Users\\Madhava Sharma\\Desktop\\Drag And Drop\\backend\\uploads\\21.8.23.zip", "C:\\Users\\Madhava Sharma\\Desktop\\Drag And Drop\\backend\\uploadcsv") 
    .then((files) => {
        //console.log(files)
        console.log(new Date(Date.UTC(0, 0, 45159 - 1)).getDate());
        console.log(new Date(Math.round((45159 - 25569)*86400*1000)))
        console.log(files)
        //const exceldata = []
        files.slice(1,).forEach((filedata)=>{
        const f = "C:\\Users\\Madhava Sharma\\Desktop\\Drag And Drop\\backend\\uploadcsv\\"+filedata.path.replace('/','\\')
        console.log(f)
        const file = reader.readFile(f)
        let data = []

        const sheets = file.SheetNames
        console.log(sheets)
        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                let pdate = (new Date(Date.UTC(0, 0, res.PDate - 1)))
                res.PDate = new Date(Date.UTC(0, 0, res.PDate - 1))
                console.log(pdate.getDate(),``)
                
                data.push(res)
            })
        }

        // Printing data
        console.log(data)
            
        })
         });
app.listen(port, '192.168.30.80', () => {
  console.log('Server is running at: http://192.168.30.80:8080');
});
