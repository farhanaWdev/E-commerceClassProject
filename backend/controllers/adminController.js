const AllUser = require("../models/userSchema");
const Category = require("../models/categorySchema");

let allusersControler = async (req, res) => {
  let users = await AllUser.find({}).select("-password");
  res.status(200).json({
    success: true,
    message: `${users.length} users  found`,
    data: users,
  });
  console.log("hello");
};

let singleUser = async (req, res) => {
  let { id } = req.params;

  let data = await AllUser.findById({ _id: id }).select("-password");
  res.status(200).json({
    success: true,
    message: "User info found",
    data: data,
  });
};

let activeUser = async (req, res) => {
  let data = await AllUser.find({ status: "active" });
  res.status(200).json({
    success: true,
    message: "Active user info found",
    data: data,
  });
};

let deactiveUser = async (req, res) => {
  let data = await AllUser.find({ status: "deactive" });
  res.status(200).json({
    success: true,
    message: "Deactive user found",
    data: data,
  });
};

let updateUser = async (req, res) => {
  let { id } = req.params;

  await AllUser.findByIdAndUpdate({ _id: id }, req.body, { new: true });
  res.status(200).json({
    success: true,
    message: "User Updated",
  });
};

let updateCategory = async (req, res) => {
  let { id } = req.params;
  let updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedCategory) {
    return res.status(404).json({
      success: false,
      message: "category not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "category updated successfully",
    data: updatedCategory,
  });
};

let deleteCategory = async(req,res)=>{
      let { id } = req.params;
let deletedCategory = await Category.findByIdAndDelete(id)
if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "category deleted successfully"
        });
}

let deleteUserController = async(req,res)=>{
          let { id } = req.params;
let deletedUser = await AllUser.findByIdAndDelete(id)
if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "user deleted successfully"
        });

}



module.exports = {
  allusersControler,
  deleteUserController,
  singleUser,
  activeUser,
  deactiveUser,
  updateUser,
  updateCategory,
  deleteCategory
};
