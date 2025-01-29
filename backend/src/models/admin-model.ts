import { model, Schema } from "mongoose";
import { IAdmin } from "../types/admin-types";
import validator from "validator";
import { checkSamePassword, changedPasswordAfter, correctPassword, createPasswordResetToken } from "../utils/general-functions";
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
               validate: [checkSamePassword, 'Passwords are not the same!']

          },
          passwordChangedAt: Date,
          passwordResetToken: String,
          passwordResetExpires: Date, 
          role: { type: String, default: "admin" }, 
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

adminSchema.pre<IAdmin>("save", async function (next) {
     this.role = "admin";

     !this.isModified("password") && next();

     this.password = await hash(this.password!, 8);

     this.passwordConfirm = undefined;

     next();
});


adminSchema.methods.correctPassword = correctPassword;
adminSchema.methods.changedPasswordAfter = changedPasswordAfter;
adminSchema.methods.createPasswordResetToken = createPasswordResetToken;

export const Admin = model<IAdmin>('Admin', adminSchema, 'Admins');
