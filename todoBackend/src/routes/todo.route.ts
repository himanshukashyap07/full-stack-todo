import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTodo, DeleteTodo, toggelIsTodoCompelete, updateTodo } from "../controllers/todo.controller.js";


const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createTodo)
router.route("/:todoId")
    .delete(DeleteTodo)
    .patch(updateTodo);
router.route("/toggleTodoComplete/:todoId")
    .patch(toggelIsTodoCompelete);

export default router;