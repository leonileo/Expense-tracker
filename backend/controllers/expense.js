const ExpenseSchema = require('../models/ExpenseModel')

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = ExpenseSchema({
        title, amount, category, description, date
    })
    try{
        if(!title || !amount || !category || !description || !date) {
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a postive number.'})
        }
        await income.save()
        res.status(200).json({message: "Expense Added."})
    } catch(error){
        res.status(500).json({message: error})
    }
}

exports.getExpenses = async (req, res) => {
    try{
        const incomes = await ExpenseSchema.find({}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch(error) {
        res.status(500).json({message:  error})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
        console.log(income)
        res.status(200).json({message: 'Expense deleted'})
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
}
