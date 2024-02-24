import { roles } from "../../middleware/auth.js";

export const subCategoryEndPoints={
    create:[roles.Admin],
    update:[roles.Admin],
    delete:[roles.Admin]
}