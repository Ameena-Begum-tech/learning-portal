import React, { useState } from "react";
import jsPDF from "jspdf";
import "./ProfessionalCareer.css"; // import CSS

const ProfessionalCareer = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    education: "",
    skills: "",
    experience: "",
    projects: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");

    doc.setFontSize(22);
    doc.setFont(undefined, "bold");
    doc.text(formData.name || "Your Name", 105, 20, { align: "center" });
    doc.setFontSize(16);
    doc.setFont(undefined, "normal");
    doc.text(formData.title || "Your Job Title", 105, 28, { align: "center" });

    doc.setFontSize(12);
    const contactInfo = [
      `Email: ${formData.email || ""}`,
      `Phone: ${formData.phone || ""}`,
      `LinkedIn: ${formData.linkedin || ""}`,
      `GitHub: ${formData.github || ""}`,
    ].filter(Boolean).join(" | ");
    doc.text(contactInfo, 105, 36, { align: "center" });

    let y = 50;

    if (formData.education) {
      doc.setFont(undefined, "bold");
      doc.text("Education", 20, y);
      doc.setFont(undefined, "normal");
      y += 6;
      doc.text(formData.education, 20, y);
      y += 12;
    }

    if (formData.skills) {
      doc.setFont(undefined, "bold");
      doc.text("Skills", 20, y);
      doc.setFont(undefined, "normal");
      y += 6;
      doc.text(formData.skills, 20, y);
      y += 12;
    }

    if (formData.experience) {
      doc.setFont(undefined, "bold");
      doc.text("Experience", 20, y);
      doc.setFont(undefined, "normal");
      y += 6;
      doc.text(formData.experience, 20, y);
      y += 12;
    }

    if (formData.projects) {
      doc.setFont(undefined, "bold");
      doc.text("Projects", 20, y);
      doc.setFont(undefined, "normal");
      y += 6;
      doc.text(formData.projects, 20, y);
      y += 12;
    }

    doc.save(`${formData.name || "resume"}.pdf`);
  };

  return (
    <div className="resume-container">
      <h2 className="resume-title">Resume Builder</h2>
      <form className="resume-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Job Title (e.g., Frontend Developer)"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          value={formData.linkedin}
          onChange={handleChange}
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub Profile URL"
          value={formData.github}
          onChange={handleChange}
        />
        <textarea
          name="education"
          placeholder="Education"
          value={formData.education}
          onChange={handleChange}
        />
        <textarea
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
        />
        <textarea
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
        />
        <textarea
          name="projects"
          placeholder="Projects"
          value={formData.projects}
          onChange={handleChange}
        />
        <button type="button" onClick={generatePDF}>
          Generate PDF
        </button>
      </form>
    </div>
  );
};

export default ProfessionalCareer;
