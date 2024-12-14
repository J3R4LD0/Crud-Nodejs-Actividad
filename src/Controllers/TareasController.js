import { DBNames } from '../db.js';
import { ObjectId } from 'mongodb';


class TareasController {

  static async getTareas(MongoClient) {

    let Tareas = await MongoClient.collection(DBNames.Tareas).find({}).toArray()

    return {
      success: true,
      message: "OK",
      data: Tareas.map(task=>({
        ...task,
        _id: task._id.toString()
      }))
    }

  }

  static async crearTarea(MongoClient, req) {
    try {
      console.log(req.data);

      await MongoClient.collection(DBNames.Tareas).insertOne({
        codigo: req.data.codigo,
        nombre: req.data.nombre,
        descripcion: req.data.descripcion,
        fecha_creacion: new Date(req.data.fecha_creacion),
        fecha_inicio: new Date(req.data.fecha_inicio),
        fecha_finalizacion: new Date(req.data.fecha_finalizacion),
        codigo_proyecto: req.data.codigo_proyecto,
        codigo_empleado: req.data.codigo_empleado,
      });

      return {
        success: true,
        message: "Tarea insertada correctamente",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "ERROR al insertar tarea"
      };
    }
  }

  static async updateSheduledNotification(MongoClient, req) {
    try {

      var id = req.params.id;

      console.log(req.body)
      await MongoClient.collection(DBNames.Tareas).updateOne({ _id: ObjectId(id) },
        {
          $set: {
            codigo: req.codigo,
            nombre: req.nombre,
            descripcion: req.descripcion,
            fecha_inicio: req.fecha_inicio,
            fecha_finalizacion: req.fecha_finalizacion,
            codigo_proyecto: req.codigo_proyecto,
            codigo_empleado: req.codigo_empleado,
          }
        }
      );

      return {
        success: true,
        message: "OK",

      }


    } catch (error) {

      return {
        success: false,
        message: "ERROR"
      }

    }
  }

  static async borrarTarea(MongoClient, id) {
    try {

      console.log("borrar" )
      console.log(id)
      await MongoClient.collection(DBNames.Tareas).deleteOne({ _id: ObjectId(id) });
      return {
        success: true,
        message: "Tarea eliminada correctamente",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "ERROR al eliminar tarea"
      };
    }
  }

  static async actualizarTarea(MongoClient, req) {
    try {
        const id = req.data.id; // ID de la tarea a actualizar
        await MongoClient.collection(DBNames.Tareas).updateOne(
            { _id: ObjectId(id) },
            {
                $set: {
                    codigo: req.data.codigo,
                    nombre: req.data.nombre,
                    descripcion: req.data.descripcion,
                    fecha_creacion: new Date(req.data.fecha_creacion),
                    fecha_inicio: new Date(req.data.fecha_inicio),
                    fecha_finalizacion: new Date(req.data.fecha_finalizacion),
                    codigo_proyecto: req.data.codigo_proyecto,
                    codigo_empleado: req.data.codigo_empleado,
                }
            }
        );

        return {
            success: true,
            message: "Tarea actualizada correctamente",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "ERROR al actualizar tarea"
        };
    }
  }

  static async getTarea(MongoClient, id) {
    try {
        const tarea = await MongoClient.collection(DBNames.Tareas).findOne({ _id: ObjectId(id) });
        console.log("Tarea encontrada:", tarea);
        return {
            success: true,
            message: "Tarea encontrada",
            data: {
                ...tarea,
                _id: tarea._id.toString()
            }
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "ERROR al obtener tarea"
        };
    }
  }

}



export default TareasController 