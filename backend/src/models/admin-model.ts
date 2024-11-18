import { model, Schema } from "mongoose";
import { IAdmin } from "../types/admin-types";
import validator from "validator";

const adminSchema = new Schema<IAdmin>(
     {
          name: { type: String, required: true },  // Admin's full name
          email: {
               type: String,
               required: true,
               unique: true,
               validate: [validator.isEmail, '{VALUE} is not a valid email address!']
          }, // Login identifier
          password: { type: String, required: true }, // Encrypted password
          salt: { type: String, required: true },
          role: { type: String, default: 'admin' }, // Role in the system
          profilePicture: { type: String }, // Optional profile picture URL
          actions: [                         // Logs of admin actions
               {
                    actionType: { type: String },  // e.g., 'DELETE_USER', 'CREATE_COURSE'
                    targetId: { type: Schema.Types.ObjectId }, // ID of the affected resource
                    description: { type: String }, // Optional description of the action
                    timestamp: { type: Date, default: Date.now }
               }
          ],

     },
     { timestamps: true }
);


export const adminModel = model<IAdmin>('adminModel', adminSchema, 'Admins');
