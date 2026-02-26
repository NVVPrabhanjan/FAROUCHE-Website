import mongoose from "mongoose";


const auditLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    adminRole: {
      type: String,
      enum: ["super_admin", "admin", "viewer"],
    },

    action: {
      type: String,
      enum: [
        "ADMIN_SIGNUP",
        "ADD_EVENT",
        "EDIT_EVENT",
        "DELETE_EVENT",
        "ADD_RESULT",
        "DELETE_RESULT",
        "MARK_ATTENDANCE",
        "SEND_EMAIL",
        "ROLE_CHANGE",
      ],
      required: true,
    },

    detail: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
