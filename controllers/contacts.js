const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const query = { owner };
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    query.favorite = favorite;
  }

  const allContacts = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  return res.json(allContacts);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOne({ owner, _id: contactId });

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.json(result);
};

const addNew = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  return res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove({ owner, _id: contactId });

  if (!result) {
    return res.status(404).json({ message: "Not found" }).end();
  }

  return res.json({ message: "contact deleted" }).end();
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { owner, _id: contactId },
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    return res.status(404).json({ message: "Not found" }).end();
  }

  return res.json(result);
};

const updateFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { owner, _id: contactId },
    req.body,
    {
      new: true,
    }
  );

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
  updateFavorite: ctrlWrapper(updateFavorite),
};
