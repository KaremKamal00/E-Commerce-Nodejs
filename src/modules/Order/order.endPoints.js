import { roles } from "../../middleware/auth.js";

const orderEndPoints={
    create:[roles.User],
    cancel:[roles.User],
    deliver:[roles.User] //change to Admin
}

export default orderEndPoints