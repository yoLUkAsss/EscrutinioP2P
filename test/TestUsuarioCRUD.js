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
      return usuarioCRUDInstance.crearUsuario("jesus", "jesus", 1, {from:accounts[0]});
    }).then(function(idTx) {
      return usuarioCRUDInstance.existeUsuario(0);
    }).then(function(exists) {
      assert.ok(exists, "Exists user with id 0");
    });
  });

});
