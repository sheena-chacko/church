import React, { useState, useRef } from "react";

const Virtualid = () => {
  const [member, setMember] = useState({
    name: "",
    dob: "",
    housename: "",
    photo: null,
  });

  const cardRef = useRef();

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMember({ ...member, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = async () => {
    const input = cardRef.current;

    const html2canvas = await import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js")
      .then((module) => module.default)
      .catch((err) => console.error("Error loading html2canvas:", err));

    const { jsPDF } = await import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js")
      .then((module) => module)
      .catch((err) => console.error("Error loading jsPDF:", err));

    if (html2canvas && jsPDF) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 10, 10, 90, 0);
        pdf.save("Church_ID_Card.pdf");
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-blue-300">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-blue-700">Church ID Card</h2>
          <p className="text-sm text-gray-500">Official Member Identification</p>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="w-28 h-28 border-4 border-blue-400 rounded-full overflow-hidden shadow-lg">
            <img
              src={member.photo || "/person.jpeg"} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mt-3 text-sm text-gray-600"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={member.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={member.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">House Name</label>
            <input
              type="text"
              name="housename"
              value={member.housename}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {member.name && (
          <div ref={cardRef} className="mt-5 p-4 bg-blue-500 text-white rounded-md shadow-md text-center">
            <h3 className="text-lg font-semibold mb-2">Church Member ID</h3>
            <div className="flex flex-col items-center">
              <img
                src={member.photo || "/person.jpeg"}
                alt="Profile"
                className="w-16 h-16 object-cover rounded-md border-2 border-white shadow-lg"
              />
              <p className="text-lg font-bold mt-2">{member.name}</p>
              <p className="text-sm font-semibold">DOB: {member.dob}</p>
              <p className="text-sm font-semibold">House Name: {member.housename}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleDownloadPDF}
          className="w-full mt-5 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-800 transition duration-300 shadow-md"
        >
          Download ID Card as PDF
        </button>
      </div>
    </div>
  );
};

export default Virtualid;