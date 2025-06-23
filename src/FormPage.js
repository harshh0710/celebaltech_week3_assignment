import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countryCityMap } from "./data";

export default function FormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First Name is required.";
    if (!form.lastName.trim()) errs.lastName = "Last Name is required.";
    if (!form.username.trim()) errs.username = "Username is required.";
    if (!form.email.includes("@")) errs.email = "Invalid email.";
    if (form.password.length < 6) errs.password = "Min 6 characters.";
    if (!/^\d{10}$/.test(form.phoneNumber)) errs.phoneNumber = "10 digits required.";
    if (!form.country) errs.country = "Country required.";
    if (!form.city) errs.city = "City required.";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan)) errs.pan = "Invalid PAN.";
    if (!/^\d{12}$/.test(form.aadhaar)) errs.aadhaar = "12 digit Aadhaar required.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length === 0) {
      navigate("/submitted", { state: form });
    } else {
      setErrors(errs);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">Internship Application Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Username", name: "username" },
          { label: "Email", name: "email", type: "email" }
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

        <div>
          <label>Password</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            name="phoneCode"
            value={form.phoneCode}
            onChange={handleChange}
            className="w-1/4 border p-2 rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-3/4 border p-2 rounded"
          />
        </div>
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

        <div>
          <label>Country</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Country</option>
            {Object.keys(countryCityMap).map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>

        <div>
          <label>City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            disabled={!form.country}
          >
            <option value="">Select City</option>
            {(countryCityMap[form.country] || []).map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div>
          <label>PAN Number</label>
          <input
            type="text"
            name="pan"
            value={form.pan}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.pan && <p className="text-red-500 text-sm">{errors.pan}</p>}
        </div>

        <div>
          <label>Aadhaar Number</label>
          <input
            type="text"
            name="aadhaar"
            value={form.aadhaar}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.aadhaar && <p className="text-red-500 text-sm">{errors.aadhaar}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={Object.keys(validate()).length > 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
