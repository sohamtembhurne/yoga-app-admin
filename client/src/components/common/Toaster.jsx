import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Notifications for toaster
export const notifyHello = () => toast.info("Hello, register to join");
export const notifyUser = () => toast.info("Welcome back to Mindful");
export const notifyEdit = () => toast.error("Cannot edit this field");
export const notifyAge = () => toast.error('Age must be between 18 to 65')
export const notifyRegistrationSuccess = () => toast.success("Registration successful!");
export const notifyRegistrationFail = () => toast.error(`Registration failed`);

export const notifyDelete = () => toast.success("Row deleted successfully!");
export const notifyRowEdit = () => toast.success("Row edited successfully!");
export const notifyDeleteMultiple = (val) =>
    toast.success(`${val} rows deleted successfully!`);

const Toaster = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    );
};

export default Toaster;