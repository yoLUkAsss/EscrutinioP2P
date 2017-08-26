## Ejemplo de como crear una red privada, un contrato y agregar nodos a la red.

### Creacion de la red:

* crear una carpeta en la cual se guardaran los archivos necesarios para la red.

```console
mkdir node
```

* crear una cuenta para usarla en la red, pide una contrasena y es irrecuperable

```console
geth --datadir node account new
```

* crear un archivo genesis.json, el cual tendra la configuracion de la red
```
{
  "config": {
    "chainId": 1907,
    "homesteadBlock": 0,
    "eip155Block": 0,
    "eip158Block": 0
  },
  "difficulty": "40",
  "gasLimit": "2100000",
  "alloc": {}
}
```

* inicializar la red usando el archivo genesis y un id de red unico

```console
geth --datadir node --networkid 98765 init genesis.json
```

* levantar la red con el id usado para inicializar el genesis.json

```console
geth --datadir node --networkid 98765
```

### Creacion de un contrato:
* Prueba de un simple contrato que suma y multiplica.
* crear en un archivo llamado simple.sol el siguiente codigo

```
pragma solidity ^0.4.13;

contract Simple {
  function arithmetics(uint _a, uint _b) returns (uint o_sum, uint o_product) {
    o_sum = _a + _b;
    o_product = _a * _b;
  }

  function multiply(uint _a, uint _b) returns (uint) {
    return _a * _b;
  }
}
```
* compilar con solidity, esto creara 2 archivos .abi y .bin

```console
solc -o . --bin --abi simple.sol
```

* modificar Simple.abi asignando todo en la siguiente variable,

```js
var simpleContract = eth.contract(“contenido de .abi”)
```

* modificar Simple.bin asignando todo en data, la cuenta a utilizar debe estar desbloqueada, con el siguiente comando en la consola geth.

```console
personal.unlockAccount(eth.accounts[0])
```

```js
var simple = simpleContract.new(
{
from: eth.accounts[0],
data: “contenido de .bin”
})
```

* desde la consola geth, se agrega el contrato

```console
loadScript(“Simple.abi”)
loadScript(“Simple.bin”)
```

* antes de probar el contrato alguien debe haber "minado" por ese contrato, desde la consola geth dejar minando este nodo.

```console
miner.start(1)
```

* ejemplos de prueba, desde la consola geth

```console
simple.multiply.call(1,2)
simple.arithmethics.call(1,2)
```

### Agregar un nodo a la red

* crear una carpeta en la cual se guardaran los archivos necesarios para la red.

```console
mkdir node
```

* Desde el nodo que se quiere conectar a la red, crear un archivo genesis.json usando la misma configuracion utilizada en la red.

```
{
  "config": {
    "chainId": 1907,
    "homesteadBlock": 0,
    "eip155Block": 0,
    "eip158Block": 0
  },
  "difficulty": "40",
  "gasLimit": "2100000",
  "alloc": {}
}
```

* Inicializar la red usando el archivo genesis y el mismo id usado en la red.

```console
geth --datadir node --networkid 98765 init genesis.json
```

* Sabiendo el enode, el puerto y la ip publica en el que se levanto la red. Con el siguiente comando te conectas a la red y levantas la consola

```console
geth --datadir node --networkid 98765 --port 30304 --bootnodes "enode@ip-publica:puerto" console
```

* Para crear una cuenta, dentro de la red con la consola geth. Pide una contrasena irrecuperable.

```console
personal.newAccount('password')
```
