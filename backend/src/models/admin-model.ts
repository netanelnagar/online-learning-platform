import { model, Schema } from "mongoose";
import { IAdmin } from "../types/admin-types";
import validator from "validator";
import { chackSamePassword, correctPassword } from "../utils/general-functions";
import { hash } from "bcryptjs";

const adminSchema = new Schema<IAdmin>(
     {
          username: { type: String, required: true, unique: true, },
          email: {
               type: String,
               required: true,
               unique: true,
               validate: [validator.isEmail, '{VALUE} is not a valid email address!']
          }, // Login identifier
          password: { type: String, required: true },
          passwordConfirm: {
               type: String,
               required: [true, 'Please confirm your password'],
               validate: [chackSamePassword, 'Passwords are not the same!']

          },
          role: {
               type: String,
               enum: {
                    values: ['admin'],
                    message: '{VALUE} is not a valid role.'
               }
          }, // Role in the system
          profilePicture: { type: String }, // Optional profile picture URL
          actions: [                         // Logs of admin actions
               {
                    actionType: { type: String },  // e.g., 'DELETE_USER', 'CREATE_COURSE'
                    description: { type: String }, // Optional description of the action
                    timestamp: { type: Date, default: Date.now }
               }
          ],

     },
     {
          timestamps: true,
          autoIndex: true
     }
);

adminSchema.pre("save", async function (next) {

     !this.isModified("password") && next();

     this.password = await hash(this.password!, 8);

     this.passwordConfirm = undefined;

     next();
});


adminSchema.methods.correctPassword = correctPassword;


export const Admin = model<IAdmin>('Admin', adminSchema, 'Admins');
