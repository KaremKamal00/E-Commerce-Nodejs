import { roles } from "../../middleware/auth.js"

const categoryEndPoints={
    create:[roles.Admin],
    update:[roles.Admin],
    delete:[roles.Admin]
}

export default categoryEndPoints