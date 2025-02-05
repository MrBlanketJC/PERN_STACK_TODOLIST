const { json, response } = require('express');
const pool = require('../db')

const getAllTasks = async (req, res, next) => {
    try {

        const allTasks = await pool.query('select * from task')

        res.json(allTasks.rows)
    } catch (error) {
        next(error)
    }

}

const getTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query("select * from task where id=$1", [id]);

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Task not found",
            });

        res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
}

const createTask = async (req, res, next) => {

    const { title, description } = req.body

    try {
        const result = await pool.query('insert into task (title, description) values ($1, $2) RETURNING *', [
            title,
            description
        ]);
        res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {

    try {
        const { id } = req.params;

        const result = await pool.query('delete from task where id = $1', [id])

        if (result.rowCount === 0)
            return res.status(404).json({
                message: "Task not found",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {

    try {

        const { id } = req.params;
        const { title, description } = req.body

        const result = await pool.query('update task set title=$2, description=$3 where id=$1 RETURNING *', [id, title, description])

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Task not found",
            });

        res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }

}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}