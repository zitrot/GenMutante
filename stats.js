"use strict";
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    // TODO implement
   let table = "TablaGenes";


  

var params = {
    TableName: table,
};

    let ContadorMutantes = 0;
    let ContadorHumanos = 0;
  let data = await docClient.scan(params).promise();
  data = data.Items
  
  for (var prop of data) {
      console.log(prop.Mutante)
        if(prop.Mutante == 'si'){
            ContadorMutantes++;
        }else{
            ContadorHumanos++;
        }
  }
  console.log(ContadorMutantes,ContadorHumanos)
   if (data) {
      console.log("estadisticas ADN")
      console.log(data)
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "OK",
          data:{count_mutant_dna:ContadorMutantes, count_human_dna:ContadorHumanos, ratio:ContadorMutantes/ContadorHumanos}
        }),
      };
        
    }

  
};
