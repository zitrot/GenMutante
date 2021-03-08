"use strict";
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    // TODO implement
   let table = "TablaGenes";


  

var params = {
    TableName: table,
};

  let data = await docClient.scan(params).promise();
   if (data) {
    
        console.log("Scan succeeded.");
        //data.Items.forEach(function(itemdata) {
         //  console.log("Item :", ++count,JSON.stringify(itemdata));
        //});
        
      console.log("estadisticas ADN")
      console.log(data)
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "OK",
          data:data
        }),
      };
        
    }

  
};
