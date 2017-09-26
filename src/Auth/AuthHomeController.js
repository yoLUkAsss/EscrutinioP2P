
let AuthHomeController = {

    showData : (event, data) => {
        event.preventDefault()
        alert(JSON.stringify(data, undefined, 2))
    }
}

export default AuthHomeController
