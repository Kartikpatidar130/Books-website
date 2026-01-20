import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <img
            src="../../public/images/software-developer-icons-vector-5884837.avif"
            alt="Kartik Patidar"
            className="rounded-full w-40 h-40 object-cover border-4 border-green-700 shadow-md"
          />
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-2">Kartik Patidar</h1>
        <p className="text-gray-600 text-lg mb-6">Founder & Developer of WordsBooks</p>

        <p className="text-gray-700 text-base mb-6">
          Hi! I'm Kartik Patidar, the creator behind WordsBooks. My passion is to
          help readers find their perfect books across Fiction, Non-Fiction, and
          Children's stories. I love coding, building user-friendly experiences,
          and connecting people with knowledge through books.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:text-green-900 transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:text-green-900 transition"
          >
            GitHub
          </a>
          <a
            href="mailto:kartik@example.com"
            className="text-green-700 hover:text-green-900 transition"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
