let CountMutantes = 0;

//funcion que se encarga de procesar la cadena de ADN y retornar la cantidad genes (grupos de 4 bases nitrogenadas) mutantes.
function Ocurrencias(CadenaGenes) {
    
    SiEsMutante = false;
    
    for (let i = 0; i < CadenaGenes.length; i++) {

        for (let j = 0; j < CadenaGenes.length; j++) {

            SiEsMutante = AuxiliarColumnas(CadenaGenes, j, i);
            //si se encontró un gen mutante aumentar el contador de genes y "saltar" a la posición en la matriz justo donde termina el gen mutante 
            if (SiEsMutante) {
                CountMutantes++;
                j += 3;
                SiEsMutante = false;
            }


        }
        for (let j = 0; j < CadenaGenes.length; j++) {

            SiEsMutante = AuxiliarFilas(CadenaGenes, j, i);
            if (SiEsMutante) {
                 //si se encontró un gen mutante aumentar el contador de genes y "saltar" a la posición en la matriz justo donde termina el gen mutante 
                CountMutantes++;
                j += 3;
                SiEsMutante = false;
            }
        }

    }
    //Para el movimiento en las diagonales inversa sla i pasa a ser un punto de inicio de la busqueda de la diagonal y 
    //se utiliza la variable temp2i y j para moverse a traves de todas las posiciones de la diagonal
    for (let i = ((CadenaGenes.length - 4) * -1); i <= CadenaGenes.length - 4; i++) {
        temp2i = i;
        for (let j = 0; j < CadenaGenes.length; j++) {
            if (i <= 0) {
                SiEsMutante = AuxiliarDiagonal(CadenaGenes, j, Math.abs(temp2i));
                 //si se encontró un gen mutante aumentar el contador de genes y "saltar" a la posición en la matriz justo donde termina el gen mutante 
                if (SiEsMutante) {
                    CountMutantes++;
                    j += 3;
                    temp2i += 3;
                    SiEsMutante = false;
                }
                if (itemp == CadenaGenes.length) {
                    break;
                } else {
                    //Variable que permite moverse en diagonal ya que se modifica al mismo tiempo que se modifica j
                    temp2i--;
                }
            } else {

                SiEsMutante = AuxiliarDiagonal(CadenaGenes, temp2i, j);
                 //si se encontró un gen mutante aumentar el contador de genes y "saltar" a la posición en la matriz justo donde termina el gen mutante 
                if (SiEsMutante) {
                    CountMutantes++;
                    j += 3;
                    temp2i += 3;
                    SiEsMutante = false;
                }
                if (itemp == CadenaGenes.length) {
                    break;
                } else {
                    temp2i++;
                }
            }

        }

    }
    //Para el movimiento en las diagonales inversa sla i pasa a ser un punto de inicio de la busqueda de la diagonal y 
    //se utiliza la variable temp2i y j para moverse a traves de todas las posiciones de la diagonal
    for (let i = ((CadenaGenes.length - 4) * -1); i <= CadenaGenes.length - 4; i++) {
        temp2i = i;
        if (i > 0) {
            temp2i = 0;
        }

        for (let j = CadenaGenes.length - 1; j >= 0; j--) {
            if (i <= 0) {

                SiEsMutante = AuxiliarDiagonalInversa(CadenaGenes, j, Math.abs(temp2i));
                 //si se encontró un gen mutante aumentar el contador de genes y "saltar" a la posición en la matriz justo donde termina el gen mutante 
                if (SiEsMutante) {
                    
                    CountMutantes++;
                    j -= 3;
                    temp2i += 3;
                    SiEsMutante = false;
                }
                if (itemp == CadenaGenes.length) {
                    break;
                } else {
                    temp2i--;
                }

            } else {

                SiEsMutante = AuxiliarDiagonalInversa(CadenaGenes, j - i, temp2i);
                 //si se encontró un gen mutante aumentar el contador de genes y "saltar" a la posición en la matriz justo donde termina el gen mutante 
                if (SiEsMutante) {
                    CountMutantes++;
                    j -= 3;
                    temp2i += 3;
                    SiEsMutante = false;
                }

            }

        }

    }
    console.log(CountMutantes)
    return CountMutantes;
}


function AuxiliarDiagonal(CadenaGenes, j, i) {

    let ACounter = 0,
        TCounter = 0,
        GCounter = 0,
        CCounter = 0,
        contadorCuatro = 4;
    itemp = 0;
    jtemp = 0;
    //En este while la funcion max() max permite saber si la i es mayor a la j o viceversa para luego ser comparada con el tamaño de la matriz
    //con el propocito de impedir que se acceda a una posicion inexistente
    while (Math.max(i, j) < CadenaGenes.length) {

        if (CadenaGenes[i][j] == 'A') ACounter++;
        if (CadenaGenes[i][j] == 'T') TCounter++;
        if (CadenaGenes[i][j] == 'G') GCounter++;
        if (CadenaGenes[i][j] == 'C') CCounter++;
        contadorCuatro--;
        i += 1;
        j += 1;
        if (contadorCuatro == 0) break;
    }
    itemp = i;
    jtemp = j;
    //si alguna de las bases nitrogenadas a parece 4 veces en cada movimiento se retorna true ya que seria un gen mutante
    if (ACounter == 4 | TCounter == 4 | GCounter == 4 | CCounter == 4) {

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
    itemp = 0;
    jtemp = 0;
    //En este while la funcion max() max permite saber si la i es mayor a la j o viceversa para luego ser comparada con el tamaño de la matriz
    //con el propocito de impedir que se acceda a una posicion inexistente, para lo cual tambien sirve la condicion en la que s eutiliza la funcion min()
    while (Math.max(i, j) < CadenaGenes.length && Math.min(i, j) >= 0) {
        if (CadenaGenes[i][j] == 'A') ACounter++;
        if (CadenaGenes[i][j] == 'T') TCounter++;
        if (CadenaGenes[i][j] == 'G') GCounter++;
        if (CadenaGenes[i][j] == 'C') CCounter++;

        contadorCuatro--;
        i += 1;
        j -= 1;
        if (contadorCuatro == 0) break;
    }
    itemp = i;
    jtemp = j;
    //si alguna de las bases nitrogenadas a parece 4 veces en cada movimiento se retorna true ya que seria un gen mutante
    if (ACounter == 4 | TCounter == 4 | GCounter == 4 | CCounter == 4) {

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
    //este for esta condicionado a que solo se puede verificar 4 pocisiones siguientes
    for (let index = j; index < j + 4 && index < CadenaGenes.length; index++) {
        if (CadenaGenes[i][index] == 'A') ACounter++;
        if (CadenaGenes[i][index] == 'T') TCounter++;
        if (CadenaGenes[i][index] == 'G') GCounter++;
        if (CadenaGenes[i][index] == 'C') CCounter++;

    }
    //si alguna de las bases nitrogenadas a parece 4 veces en cada movimiento se retorna true ya que seria un gen mutante
    if (ACounter == 4 | TCounter == 4 | GCounter == 4 | CCounter == 4) {

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
    //este for esta condicionado a que solo se puede verificar 4 pocisiones siguientes
    for (let index = j; index < j + 4 && index < CadenaGenes.length; index++) {
        if (CadenaGenes[index][i] == 'A') ACounter++;
        if (CadenaGenes[index][i] == 'T') TCounter++;
        if (CadenaGenes[index][i] == 'G') GCounter++;
        if (CadenaGenes[index][i] == 'C') CCounter++;

    }
    //si alguna de las bases nitrogenadas a parece 4 veces en cada movimiento se retorna true ya que seria un gen mutante
    if (ACounter == 4 | TCounter == 4 | GCounter == 4 | CCounter == 4) {

        return true;
    } else {
        return false;
    }
}
module.exports = Ocurrencias;
