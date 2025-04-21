// api/controllers/itemController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllItems = async (req, res) => {
  try {
    const items = await prisma.transaction.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { amount, note, categoryId } = req.body; // Destructure categoryId here
    if (amount === undefined) {
      return res.status(400).json({ error: 'Amount is required' });
    }
    // Ensure categoryId is valid
    if (!categoryId) {
      return res.status(400).json({ error: 'Category is required' });
    }

    // Check if the categoryId exists in the database (optional validation)
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Create the new transaction with the provided categoryId
    const newItem = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        note: note || '',
        userId: req.userId,
        categoryId: categoryId,  // Use categoryId here
      }
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteItems = async (req, res) => {
  try {
    // Extract the transactionId from the request params
    const { id } = req.params; // Assuming the transaction ID is passed in the URL

    // Check if the transaction exists before attempting to delete
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Delete the transaction from the database
    const deleteItem = await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });

    // Respond with the deleted transaction details
    res.status(200).json({ message: 'Transaction deleted successfully', deletedItem: deleteItem });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getCategories = async(req,res) =>{
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};