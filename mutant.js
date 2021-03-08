"use strict";
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
let FilasIndicesMut = [];
// Function to Create an Item to DB
exports.handler = async (event) => {
  try {

    let table = "TablaGenes";
    let CadenaGenes = event.dna;
    let CountMutantes = 0;
    let  SiEsMutante = false;

    for (let i = 0; i < CadenaGenes.length; i++) {

        for (let j = 0; j < CadenaGenes.length; j++) {

            SiEsMutante = AuxiliarColumnas(CadenaGenes, j, i);
            if (SiEsMutante) {
                CountMutantes++;
                j += 3;
                SiEsMutante = false;
            }


        }
        for (let j = 0; j < CadenaGenes.length; j++) {

            SiEsMutante = AuxiliarFilas(CadenaGenes, j, i);
            if (SiEsMutante) {
                CountMutantes++;
                j += 3;
                SiEsMutante = false;
            }
        }

    }
    let temp2i = 0;
    for (let i = ((CadenaGenes.length - 4) * -1); i < CadenaGenes.length - 4; i++) {
        temp2i = i;
        for (let j = 0; j < CadenaGenes.length; j++) {
            if (i <= 0) {
                SiEsMutante = AuxiliarDiagonal(CadenaGenes, j, Math.abs(temp2i));
                if (SiEsMutante) {
                    CountMutantes++;
                    j += 3;
                    temp2i += 3;
                    SiEsMutante = false;
                }

                    temp2i--;

            } else {

                SiEsMutante = AuxiliarDiagonal(CadenaGenes, temp2i, j);
                if (SiEsMutante) {
                    CountMutantes++;
                    j += 3;
                    temp2i += 3;
                    SiEsMutante = false;
                }

                    temp2i++;

            }

        }

    }

    for (let i = ((CadenaGenes.length - 4) * -1); i <= CadenaGenes.length - 4; i++) {
        temp2i = i;
        if (i > 0) {
            temp2i = 0;
        }

        for (let j = CadenaGenes.length - 1; j >= 0; j--) {
            if (i <= 0) {

                SiEsMutante = AuxiliarDiagonalInversa(CadenaGenes, j, Math.abs(temp2i));
                if (SiEsMutante) {
                    CountMutantes++;
                    j -= 3;
                    temp2i += 3;
                    SiEsMutante = false;
                }

                    temp2i--;


            } else {

                SiEsMutante = AuxiliarDiagonalInversa(CadenaGenes, j - i, temp2i);
                if (SiEsMutante) {
                    CountMutantes++;
                    j -= 3;
                    temp2i += 3;
                    SiEsMutante = false;
                }

            }

        }

    }
    
    FilasIndicesMut = getUnique(FilasIndicesMut)
    
    
    
    const count_human_dna = CadenaGenes.length*CadenaGenes.length;
    const count_mutant_dna = FilasIndicesMut.length
    const ratio = count_mutant_dna/count_human_dna;
    let params = {
      TableName: table,
      Item: {
        "id": generateRowId(4).toString(),
        "count_mutant_dna":count_mutant_dna,
        "count_human_dna": count_human_dna,
        "ratio": ratio
        }
      }
   let result = await docClient.put(params).promise();

    if(CountMutantes > 0){
      console.log("ingreso correcto")
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "OK",
        }),
      };
    }else {
      console.log("error")
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: "FORBIDEN"
        }),
      };
    }
  } catch (error) {
    console.log(error);
    return error;
  }

function getUnique(array) {
    var uniqueArray = [];

    // Loop through array values
    for (var value of array) {
        if (uniqueArray.indexOf(value) === -1) {
            uniqueArray.push(value);
        }
    }
    return uniqueArray;
}

  function generateRowId(shardId /* range 0-64 for shard/slot */) {
  var CUSTOMEPOCH = 1300000000000;
  var ts = new Date().getTime() - CUSTOMEPOCH; // limit to recent
  var randid = Math.floor(Math.random() * 512);
  ts = (ts * 64);   // bit-shift << 6
  ts = ts + shardId;
  return (ts * 512) + randid;
}


function AuxiliarDiagonal(CadenaGenes, j, i) {

    let ACounter = 0,
        TCounter = 0,
        GCounter = 0,
        CCounter = 0,
        contadorCuatro = 4;
        let arregloTemp = [];
    while (Math.max(i, j) < CadenaGenes.length) {
        if (CadenaGenes[i][j] == 'A') ACounter++;
        if (CadenaGenes[i][j] == 'T') TCounter++;
        if (CadenaGenes[i][j] == 'G') GCounter++;
        if (CadenaGenes[i][j] == 'C') CCounter++;
        let str = "";
        arregloTemp.push(str = i.toString() + j.toString());
        contadorCuatro--;
        i += 1;
        j += 1;
        if (contadorCuatro == 0) break;
    }
    if (ACounter == 4 | TCounter == 4 | GCounter == 4 | CCounter == 4) {
        FilasIndicesMut = FilasIndicesMut.concat(arregloTemp)
        return true;
    } else {
        return false;
    }
}

function AuxiliarDiagonalInversa(CadenaGenes, j, i) {

    let ACounter = 0,
        TCounter = 0,
        GCounter = 0,
        CCounter = 0,
        contadorCuatro = 4;
        let arregloTemp = [];
    while (Math.max(i, j) < CadenaGenes.length && Math.min(i, j) >= 0) {
        if (CadenaGenes[i][j] == 'A') ACounter++;
        if (CadenaGenes[i][j] == 'T') TCounter++;
        if (CadenaGenes[i][j] == 'G') GCounter++;
        if (CadenaGenes[i][j] == 'C') CCounter++;
        let str = "";
        arregloTemp.push(str = i.toString() + j.toString());
        contadorCuatro--;
        i += 1;
        j -= 1;
        if (contadorCuatro == 0) break;
    }
    if (ACounter == 4 | TCounter == 4 | GCounter == 4 | CCounter == 4) {
        FilasIndicesMut = FilasIndicesMut.concat(arregloTemp)
        return true;
    } else {
        return false;
    }
}


function AuxiliarFilas(CadenaGenes, j, i) {

    let ACounter = 0,
        TCounter = 0,
        GCounter = 0,
        CCounter = 0;
    let arregloTemp = [];
    for (let index = j; index < j + 4 && index < CadenaGenes.length; index++) {
        if (CadenaGenes[i][index] == 'A') ACounter++;
        if (CadenaGenes[i][index] == 'T') TCounter++;
        if (CadenaGenes[i][index] == 'G') GCounter++;
        if (CadenaGenes[i][index] == 'C') CCounter++;
        let str = "";
        arregloTemp.push(str = i.toString() + index.toString());
    }
    if (ACounter == 4 | TCounter == 4 | GCounter == 4 | CCounter == 4) {
        FilasIndicesMut = FilasIndicesMut.concat(arregloTemp)
        return true;
    } else {
        return false;
    }
}


function AuxiliarColumnas(CadenaGenes, j, i) {

    let ACounter = 0,
        TCounter = 0,
        GCounter = 0,
        CCounter = 0;
    let arregloTemp = [];
    for (let index = j; index < j + 4 && index < CadenaGenes.length; index++) {
        if (CadenaGenes[index][i] == 'A') ACounter++;
        if (CadenaGenes[index][i] == 'T') TCounter++;
        if (CadenaGenes[index][i] == 'G') GCounter++;
        if (CadenaGenes[index][i] == 'C') CCounter++;
        let str = "";
        arregloTemp.push(str = index.toString() + i.toString());
    }
    if (ACounter == 4 | TCounter == 4 | GCounter == 4 | CCounter == 4) {
        FilasIndicesMut = FilasIndicesMut.concat(arregloTemp)
        return true;
    } else {
        return false;
    }
}

};

