import { screen, app, BrowserWindow, ipcMain } from 'electron';
import path from "path";
import TareasController from './Controllers/TareasController.js';

let win = null; 
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default async (MongoClient) => {

ipcMain.on('set-action',async (event, data) => {

    console.log("server recived data")
    console.log(data)

    if(data.action == "get-tareas"){
    
        let resp = await TareasController.getTareas(MongoClient)
        win.webContents.send('feedback', {
            action: "get-tareas",
            data: resp.data
        });
    
    } else if(data.action == "insert-tarea") {

        let resp = await TareasController.crearTarea(MongoClient, data);
        win.webContents.send('feedback', {
            action: "insert-tarea",
            message: resp.message
        });

    } else if(data.action == "delete-tarea") {
        console.log("ID recibido para eliminar:", data.data.id);
        let resp = await TareasController.borrarTarea(MongoClient, data.data.id);
        win.webContents.send('feedback', {
            action: "delete-tarea",
            message: resp.message
        });
    } else if (data.action == "update-tarea") {
        let resp = await TareasController.actualizarTarea(MongoClient, data);
        win.webContents.send('feedback', {
            action: "update-tarea",
            message: resp.message
        });
    } else if (data.action == "get-tarea") {
        let resp = await TareasController.getTarea(MongoClient, data.data.id);
        console.log("Respuesta de get-tarea:", resp);
        win.webContents.send('feedback', {
            action: "get-tarea",
            data: resp.data
        });
    }



});



function createWindow(data) {

    
    if (!win) {

        win = new BrowserWindow({

            width: 800,
            height: 800,
            webPreferences: {
                contextIsolation: true,
                preload: path.join(__dirname, 'preload.js')
            },
            skipTaskbar: false,

        });
        win.loadFile('index.html');

   

        win.webContents.on('did-finish-load', () => {
            win.webContents.send('data-from-main', data);
        });

        win.on('closed', () => {
            win = null;
        });
    }
}

createWindow()
}