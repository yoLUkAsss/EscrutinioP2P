#### En una consola secundaria, mostrar los logs de la red
touch eth.log
tail -f eth.log

#### buscar archivo genesis.json
wget https://raw.githubusercontent.com/yoLUkAsss/DEscrutinio/master/docs/SimpleGenesis/genesis.json

#### crear carpeta folder
mkdir folder

#### inicializar la red por primera vez

geth --datadir folder --networkid 1907 init genesis.json

geth --datadir folder --networkid 1907 account new

#### guardarse la cuenta generada, por ejemplo: "01330772055bcfe1f66cfcbcdedbbb83d9b22e0e"

#### modificar la seccion alloc del genesis.json, agregando tokens a la cuenta elegida
gedit genesis.json

  "alloc" : {
      "6b3047902333a750c13e8e0ebadc27ceeaa915bb": { 
		"balance": "999999999999999999999999999" 
	  }
  }

#### eliminar todo el contenido dentro de la carpeta folder, salvo keystore
rm -rf folder/geth

#### inicializar la red por segunda vez (ahora la cuenta tendra creditos iniciales)

geth --datadir folder --networkid 1907 init genesis.json

#### Inicializa la consola e imprime los logs en eth.log

geth --rpc --rpcport "8545" --rpcaddr "127.0.0.1" --rpccorsdomain "*" --datadir folder --networkid 1907 --port "30303" --rpcapi "personal,db,eth,net,web3" console 2> eth.log

#### Lo siguiente ocurre en la consola geth
personal.unlockAccount(eth.accounts[0])

eth.mining
miner.start()
eth.mining


### 
