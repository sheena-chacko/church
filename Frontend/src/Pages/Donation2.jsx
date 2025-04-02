import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


const Donation2 = () => {
    
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      amount: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      amount: Yup.number().positive("Donation amount must be a positive number").required("Donation amount is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      alert("Thank you for your donation!");
      console.log(values);
      resetForm();
    },
  });

  return (

    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Make a Donation</h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="text-lg text-gray-700" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>

            <div>
              <label className="text-lg text-gray-700" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <label className="text-lg text-gray-700" htmlFor="amount">Donation Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
                placeholder="Enter donation amount"
                {...formik.getFieldProps("amount")}
              />
              {formik.touched.amount && formik.errors.amount ? (
                <div className="text-red-500 text-sm">{formik.errors.amount}</div>
              ) : null}
            </div>

            <div>
              <label className="text-lg text-gray-700" htmlFor="message">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
                rows="4"
                placeholder="Write a message (optional)"
                {...formik.getFieldProps("message")}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-lg"
              >
                Donate Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donation2;