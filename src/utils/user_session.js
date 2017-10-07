

export let email = ""

export let category = ""

export let contract_address = ""


export function get_current_user() {
    return {
        "email" : this.email,
        "category" : this.category
    }
}

export function get_address_current_user() {
    return this.contract_address
}

export function set_current_user(new_address, new_email, new_category) {
    this.contract_address = new_address
    this.email = new_email
    this.category = new_category
}