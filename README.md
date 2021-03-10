# Prueba tecnica de verificación de ADN mutante

El algoritmo fue desarrollado utilizando javascript y node.js para el calculo de los genes mutantes, se hizo uso tambien de las funciones lambda, API Gateway y DynamoDB de AWS para la creacion de una API Rest en la que se expusieran los servicios requeridos para el proyecto.

## Ejecucion del proyecto
## Se implementaron dos servicios que para ser utilizados se deben utilizar las siguientes URLs:
- El servicio GET /stats devuelve un JSON con estadisticas basicas de los cadenas de ADN previamente enviadas para procesarse y que fueron almacenados los resultados en una base de datos Dynamo.
- https://7dx5ztm9oe.execute-api.us-east-2.amazonaws.com/Despliegue/stats

- El servicio POST /mutant recibe un JSON que contiene la cadena de ADN a procesar y verificar si el ADN procede de un mutante o no, el formato requrido para el JSON seria:
  {“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}
  Tambien se debe tener en cuenta que la cantidad de caracteres por grupo de genes debe ser igual a la cantidad de item del array que contiene el JSON.
  
- https://7dx5ztm9oe.execute-api.us-east-2.amazonaws.com/Despliegue/mutant


## Pruebas de ejecucion en AWS
- Para las pruebas de ejecución con el proyecto en AWS se puede utiilizar el programa Postman de la siguiente forma:

-En este ejemplo se tiene la url que apunta al POST request /mutant y al cual se dbe enviar un Json como se ve en la imagen. 
![imagen](https://user-images.githubusercontent.com/32344442/110698352-8da1f100-81bb-11eb-8dda-b57a8d7e3c0e.png)

Si la cadena de ADN resulta ser de un mutante el POST request responderá con OK-200 y en caso de que no sea mutante respondera con 403-FORBIDEN 


-Para el caso del GET request /stats solamente se debe ingresar la URL correctamente y al ejecutarla devolvera un JSON con las estadisticas de las cadenas de adn previamente procesadas
![imagen](https://user-images.githubusercontent.com/32344442/110702598-bb3d6900-81c0-11eb-83e7-6ae97c07e42b.png)

En la carpeta Pruebas_postman se encuentran dos archivos JSON que pueden ser utilizados para la hacer pruebas.

## Pruebas de ejecucion locales
- Para ejecutar las pruebas locales primero se debe instalar las depencencias requeridas en la ruta del proyecto utilizando el comando

 npm install

- Luego para configurar que cadena de adn se desea probar se debe entrar al archivo Ocurrencias.test.js y y ingresar la matriz como se muestra en la imagen.

![imagen](https://user-images.githubusercontent.com/32344442/110700706-41a47b80-81be-11eb-802e-717ea1c8bdc3.png)

La matriz se ingresa como parametro de la funcion Ocurrencias() y en la funcion .toBe() se ingresa la cantidad correcta de genes mutantes que el algoritmo deberia encontrar.

- finalmente para ejecutar la prueba desde una consola se debe ingresar a la ruta del proyecto y ejecutar el comando

npm run test

## Resultados de las pruebas del codigo
- Se realizó el code coverage del algoritmo principal para rectificar si mas el 80% de las lineas del codigo eran ejecutadas, por lo cual se obtuvo el siguiente resultado:

![imagen](https://user-images.githubusercontent.com/32344442/110418336-646f4c80-8065-11eb-85b0-f1f1f143ba0b.png)




