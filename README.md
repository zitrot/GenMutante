# Prueba tecnica de verificación de ADN mutante

El algoritmo fue desarrollado utilizando javascript y node.js para el calculo de los genes mutantes, se hizo uso tambien de las funciones lambda, API Gateway y DynamoDB de AWS para la creacion de una API Rest en la que se exposieran los servicios requeridos para el proyecto.

## Ejecucion del proyecto
## Se implementaron dos servicios que para ser utilizados se deben utilizar las siguientes URLs:
- El servicio GET /stats devuelve un JSON con estadisticas basicas de los cadenas de ADN previamente enviadas para procesarse y que fueron almacenados los resultados en una base de datos Dynamo.
- https://7dx5ztm9oe.execute-api.us-east-2.amazonaws.com/Despliegue/stats

- El servicio POST /mutant recibe un JSON que contiene la cadena de ADN a procesar y verificar si el ADN procede de un mutante o no, el formato requrido para el JSON seria:
  {“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}
  Tambien se debe tener en cuenta que la cantidad de caracteres por grupo de genes debe ser igual a la cantidad de item del array que contiene el JSON.
  
- https://7dx5ztm9oe.execute-api.us-east-2.amazonaws.com/Despliegue/mutant


## Pruebas de ejecucion en AWS
- Para las pruebas de ejecución se tienen



## Resultados de las pruebas del codigo
- Se realizó el code coverage del algoritmo principal para rectificar si mas el 80% de las lineas del codigo eran ejecutadas, por lo cual se obtuvo el siguiente resultado:

![imagen](https://user-images.githubusercontent.com/32344442/110418336-646f4c80-8065-11eb-85b0-f1f1f143ba0b.png)




