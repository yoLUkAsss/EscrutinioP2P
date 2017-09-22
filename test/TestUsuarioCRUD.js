const Web3 = require('web3');
const Web3Utils = require('web3-utils');
// Instantiate new web3 object pointing toward an Ethereum node.
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var UsuarioCRUD = artifacts.require("./UsuarioCRUD.sol");

contract('UsuarioCRUD', function(accounts) {

  it("create an UsuarioCRUD contract should create this contract with 0 users.", function() {
    return UsuarioCRUD.deployed().then(function(instance) {
      return instance.getUsuarios.call({from: accounts[0]});
    }).then(function(usuarios) {
      assert.equal(usuarios.length, 0, "There are 0 users.");
    });
  });

  it("create an Usuario should add that user into UsuarioCRUD.", function(){
    return UsuarioCRUD.deployed().then(function(instance){
      usuarioCRUDInstance = instance
      return usuarioCRUDInstance.crearUsuario("jesus@gmail.com", "jesus", 1, {from:accounts[0]});
    }).then(function(idTx) {
      return usuarioCRUDInstance.existeUsuario(0);
    }).then(function(exists) {
      assert.ok(exists, "Exists user with id 0");
    });
  });

  it("get an Usuario existent should returns its id, mail, role id.", function(){
    return UsuarioCRUD.deployed()
      .then( (instance) => {
      usuarioCRUDInstance = instance
      return usuarioCRUDInstance.crearUsuario("jesus@gmail.com", "jesus", 1, {from:accounts[0]});
    }).then( (idTx) => {
      return usuarioCRUDInstance.getUsuario(0)
    }).then( (usuario) => {
      //usuario[0] id
      //usuario[1] mail
      // let expectedMail = web3.fromAscii("jesus@gmail.com", 32)
      // let currentMail = usuario[1]
      let expectedMail = "jesus@gmail.com"
      let currentMail = web3.toUtf8(usuario[1])
      assert.equal(expectedMail, currentMail, "mails are equals")
      //chequear password
      //usuario[2] password
      //problema: no puedo hashear la password del usuario cuando este se lo crea
      // let expectedPassword = Web3Utils.keccak256("jesus")
      // let currentPassword = usuario[2]
      let expectedPassword = "jesus"
      let currentPassword = web3.toUtf8(usuario[2])
      assert.equal(expectedPassword, currentPassword, "passwords are equals")
      //chequear role
      //usuario[3] role(es un int)
      let expectedRole = 1
      let currentRole = usuario[3].toNumber()
      assert.equal(expectedRole, currentRole, "categories are equals")
    })
  })

});
