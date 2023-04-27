const Joi = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const authSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

const subscriptionScema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const emailSchema = Joi.object({
  email: Joi.string().required().email(),
});

const User = model("user", userSchema);

module.exports = { User, authSchema, subscriptionScema, emailSchema };
