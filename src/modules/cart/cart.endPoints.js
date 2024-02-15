import { roles } from "../../middleware/auth.js"

const cartEndPoints={
    addToCart:[roles.User]
    
}

export default cartEndPoints