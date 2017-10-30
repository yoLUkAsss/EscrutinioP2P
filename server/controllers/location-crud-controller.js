import { fromObject, distritoCRUDInstance, web3 } from '../utils/web3-utils.js'

export class LocationController {
  /*    returns locationsId : [int]   */
  getLocations(req, res){
    try{
      distritoCRUDInstance.then((currentInstance) => {
        currentInstance.getDistritos.call(fromObject).then((locationsId) => {
          res.json(locationsId)
        }).catch(err => {
          res.json("failed")
        })
      })
    } catch(err){
      res.json("failed")
    }
  }
  /*    params: locationId : int  */
  /*    returns locationAddress : string   */
  getLocation(req, res){
    try{
      distritoCRUDInstance.then((currentInstance) => {
        currentInstance.getDistrito.call(req.params.locationId, fromObject).then((locationAddress) => {
          res.json(locationAddress)
        }).catch(err => {
          res.json("failed")
        })
      })
    } catch(err){
      res.json("failed")
    }
  }
  //a definir
  createLocation(req, res){
    try{
      distritoCRUDInstance.then((currentInstance) => {
        res.json("A DEFINIR")
      }).catch(err => {
        res.json("failed")
      })
      //   currentInstance.createDistrito.sendTransaction(fromObject).then((idTx) => {
      //     console.log(idTx)
      //     res.json("work")
      //   }).catch(err => {
      //     res.json("failed")
      //   })
      // })
    } catch(err){
      res.json("failed")
    }
  }
}
