pragma solidity ^0.4.11;

contract Counts {


    bytes32[] candidates;
    bool created;

    struct RowData {
      uint distritoID;
      uint escuelaID;
      uint mesaID;
      uint[] conteo;
    }
    
    struct TotalPorDistritoData {
        uint[] total;
        bool update;
        mapping (uint => TotalPorEscuelaData) totalPorEscuela;
    }
    
    struct TotalPorEscuelaData {
        uint[] total;
        bool update;
        mapping (uint => TotalPorMesaData) totalPorMesa;
    }
    
    struct TotalPorMesaData {
        uint[] total;
    }

    uint[] total;
    mapping (uint => TotalPorDistritoData) totalPorDistrito;

    uint rows;
    RowData[] allData;

    function init(bytes32[] newCandidates) public {
      require(!created);
      candidates = newCandidates;
      rows = 0;
      created = true;
    }

    function getTotal() public constant returns(uint[]) {
      return total;
    }
    
    function setData(uint did, uint eid, uint mid, uint[] co) public {
        // SE AGREGA NUEVA FILA
        allData[rows] = RowData(did, eid, mid, co );
        rows++;

        // SE ACTUALIZA TOTAL DE ELECCION
        for (uint i=0 ; i<candidates.length ; i++) {
          total[i] += co[i];
        }

        // SE INDICA EL TOTAL DE UNA MESA
        totalPorDistrito[did].totalPorEscuela[eid].totalPorMesa[mid].total = co;

        // SE INDICA QUE LA ESCUELA INDICADA DEBE SER ACTUALIZADA
        totalPorDistrito[did].totalPorEscuela[eid].update = true;

        // SE INDICA QUE EL DISTRITO INDICADO DEBE SER ACTUALIZADO
        totalPorDistrito[did].update = true;
    }
    
    function getByDistrict(uint did) public returns (uint[]) {
        if (totalPorDistrito[did].total.length != 0 && ! totalPorDistrito[did].update) {
            return totalPorDistrito[did].total;
        } else {
            uint[] memory result = new uint[](allData[0].conteo.length);
            for (uint k=0 ; k<allData[0].conteo.length ; k++) {
                result[k] = 0;
            }
            for (uint i=0 ; i<allData.length ; i++) {
                if (allData[i].distritoID == did) {
                    for (uint j=0 ; j<allData[0].conteo.length ; j++) {
                        result[j] += allData[i].conteo[j];
                    }
                }
            }
            totalPorDistrito[did].total = result;
            totalPorDistrito[did].update = false;
            return totalPorDistrito[did].total;
        }
    }
    
    function getBySchool(uint did, uint eid) public returns (uint[]) {
        if (totalPorDistrito[did].totalPorEscuela[eid].total.length != 0 && ! totalPorDistrito[did].totalPorEscuela[eid].update) {
            return totalPorDistrito[did].totalPorEscuela[eid].total;
        } else {
            uint[] memory result = new uint[](allData[0].conteo.length);
            for (uint k=0 ; k<allData[0].conteo.length ; k++) {
                result[k] = 0;
            }
            for (uint i=0 ; i<allData.length ; i++) {
                if (allData[i].distritoID == did && allData[i].escuelaID == eid) {
                    for (uint j=0 ; j<allData[0].conteo.length ; j++) {
                        result[j] += allData[i].conteo[j];
                    }
                }
            }
            totalPorDistrito[did].totalPorEscuela[eid].total = result;
            totalPorDistrito[did].totalPorEscuela[eid].update = false;
            return totalPorDistrito[did].totalPorEscuela[eid].total;
        }
    }
    
    function getByMesa(uint did, uint eid, uint mid) public returns (uint[]) {
        return totalPorDistrito[did].totalPorEscuela[eid].totalPorMesa[mid].total;
    }

}
