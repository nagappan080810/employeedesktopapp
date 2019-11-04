//import statements
const { app, BrowserWindow } = require('electron')

const path = require('path')

const url = require('url')




//global variables
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true})
    );

  win.webContents.openDevTools();

  win.on('closed', function(){
    win = null;
  });
}

console.log(app);
console.log(BrowserWindow);

app.on('ready', createWindow);

app.on('window-all-closed', function(){
    //below is for macos to quit all the menu actions also
    if (process.platform!=='darwin') {
        app.quit();
    }
});

app.on('activate', ()=> {
    //this is also for macos
    if (win==null) {
        createWindow();
    }
});


const showAddModal = () => {
  console.log(db);
  let form = document.getElementById('shopping-list-add')
  form.reset()
  document.body.className += ' ' + form.id
}