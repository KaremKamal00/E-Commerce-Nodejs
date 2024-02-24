import { roles } from "../../middleware/auth.js";

export const brandEndPoints={
    create:[roles.Admin],
    update:[roles.Admin],
    delete:[roles.Admin]
}