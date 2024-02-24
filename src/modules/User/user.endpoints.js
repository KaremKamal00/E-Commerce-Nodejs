import { roles } from "../../middleware/auth.js";

export const userEndPoints={
    add:[roles.User],
    remove:[roles.User],
    delete:[roles.Admin]
}