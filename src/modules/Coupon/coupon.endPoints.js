import { roles } from "../../middleware/auth.js";

export const couponEndPoints={
    create:[roles.Admin],
    update:[roles.Admin]
}