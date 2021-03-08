# Proyecto de de calculo de genes mutantes

El algoritmo fue desarrollado utilizando javascript y node.js para el calculo de los genes mutantes, se hizo uso tambien de las funciones lambda, API Gateway y DynamoDB de AWS para la creacion de una API Rest en la que se exposieran los servicios requeridos para el proyecto.

## Ejecucion del proyecto
## Se implementaron dos servicios que para ser utilizados se deben utilizar las siguientes URLs:
- El servicio GET /stats devuelve un JSON con estadisticas basicas de los cadenas de ADN previamente enviadas para procesarse y que fueron almacenados los resultados en una base de datos Dynamo.
- https://7dx5ztm9oe.execute-api.us-east-2.amazonaws.com/Despliegue/stats

- El servicio POST /mutant recibe un JSON que contiene la cadena de ADN a procesar y calcular los genes mutantes, el formato requrido para el JSON seria:
  {“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}
  Tambien se debe tener en cuenta que la cantidad de caracteres por grupo de genes debe ser igual a la cantidad de item del array que contiene el JSON.
  
- https://7dx5ztm9oe.execute-api.us-east-2.amazonaws.com/Despliegue/mutant
