import { roles } from "../../middleware/auth.js"

const productEndPoints={
    create:[roles.Admin],
    update:[roles.Admin],
    delete:[roles.Admin],
}

export default productEndPoints