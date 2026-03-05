const Table = require("../models/Table");

exports.getAll = async(req, res) => {
  const tables = await Table.find();
  res.json(tables);
};

exports.getOne = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.json(table);
  } catch (error) {
    res.status(400).json({ message: 'Invalid table ID' });
  }
};

// Create a table
exports.create = async (req, res) => {
  const table = await Table.create(req.body);
  res.json(table);
};

exports.update = async (req, res) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.json(updatedTable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id);
    if (!deletedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid table ID' });
  }
};

// Get tables with capacity >= given value
exports.getByCapacity = async (req, res) => {
  try {
    const minCapacity = Number(req.params.min);
    const tables = await Table.find({
      capacity: { $gte: minCapacity }
    });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
exports.removeIfCapacityOK = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    if (table.capacity > 6) {
      return res.status(403).json({
        message: 'Cannot delete table with capacity greater than 6'
      });
    }
    await table.deleteOne();
    res.json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid table ID' });
  }
};