const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAll = async (req, res) => {
  const allContacts = await listContacts();

  return res.json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.json(result);
};

const addNew = async (req, res) => {
  const result = await addContact(req.body);

  return res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (!result) {
    return res.status(404).json({ message: "Not found" }).end();
  }

  return res.json({ message: "contact deleted" }).end();
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    return res.status(404).json({ message: "Not found" }).end();
  }

  return res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
