import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Mail, Phone, ChevronUp } from 'lucide-react'
import './index.css'; // Import your Tailwind CSS file
export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [showBackToTop, setShowBackToTop] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ayush Sinha</h1>
          <nav className="hidden md:flex space-x-6">
            {['about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="hover:text-blue-400 transition-colors capitalize"
              >
                {section}
              </button>
            ))}
          </nav>
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-800 py-4">
            {['about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 capitalize"
              >
                {section}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="about" className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in-down">Ayush Sinha</h2>
            <p className="text-xl mb-6 animate-fade-in-up">Master's Student in Electrical and Computer Engineering</p>
            <p className="max-w-2xl mx-auto animate-fade-in">
              Passionate about developing efficient and scalable software solutions. Seeking to build a career in the tech industry by utilizing skills in programming, software design, and problem-solving.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard title="Languages" skills={['Python', 'C++', 'JavaScript', 'TypeScript', 'HTML', 'CSS']} />
              <SkillCard title="Web Development" skills={['Angular.js', 'React.js','Node.js','Material-UI', 'Elysia.js', 'Bun']} />
              <SkillCard title="Database Management" skills={['PostgreSQL']} />
              <SkillCard title="Developer Tools" skills={['VS Code', 'Git', 'Docker', 'NPM', 'GitHub']} />
              <SkillCard title="Technologies/Frameworks" skills={['Docker', 'Linux', 'Git', 'AWS']} />
              <SkillCard title="Project Management" skills={['Agile', 'Scrum', 'Kanban']} />
              <SkillCard title="Libraries" skills={['Pandas', 'NumPy', 'Matplotlib', 'TensorFlow', 'PyTorch', 'Scikit-Learn']} />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
            <div className="flex justify-center mb-8">
              <button
                className={`px-4 py-2 rounded-l-lg ${activeTab === 'all' ? 'bg-blue-600' : 'bg-gray-700'}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'web' ? 'bg-blue-600' : 'bg-gray-700'}`}
                onClick={() => setActiveTab('web')}
              >
                Web
              </button>
              <button
                className={`px-4 py-2 rounded-r-lg ${activeTab === 'other' ? 'bg-blue-600' : 'bg-gray-700'}`}
                onClick={() => setActiveTab('other')}
              >
                Other
              </button>
            </div>
            <div className="space-y-12">
              {(activeTab === 'all' || activeTab === 'web') && (
                <ProjectCard
                  title="Student Housing Booking Website"
                  technologies="Angular, Node.js, Elysia.js, Bun, Docker, PostgreSQL"
                  description={[
                    "Built a dynamic housing booking platform with real-time property search filters for location, pricing, and room types.",
                    "Improved search efficiency by 25% through dynamic filtering.",
                    "Reduced server startup time by 60% with Bun runtime and Docker containerization.",
                    "Achieved 100% test coverage with 144+ automated tests to ensure full reliability.",
                    "Focused on scalable design and fast deployment."
                  ]}
                />
              )}
              {(activeTab === 'all' || activeTab === 'other') && (
                <>
                  <ProjectCard
                    title="Traffic Intersection Surveillance"
                    technologies="Python, C++, Graph Theory, Algorithms"
                    description={[
                      "Designed an optimization tool to help law enforcement place cameras across city intersections efficiently.",
                      "Reduced hardware requirements by 40% using advanced graph algorithms.",
                      "Ensured full surveillance coverage with minimal camera overlap.",
                      "Applied graph theory solutions to real-world infrastructure challenges."
                    ]}
                  />
                  <ProjectCard
                    title="Extending Wlang with Functions"
                    technologies="Python, TatSu"
                    description={[
                      "Enhanced Wlang’s symbolic execution engine by introducing formal function specifications ('requires'/'ensures' clauses).",
                      "Achieved 1☺00% test coverage across parser and execution modules.",
                      "Improved software reliability by reducing assertion failures.",
                      "Aligned symbolic execution with modern formal verification practices (inspired by Dafny)."
                    ]}
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Electrical Intern</h3>
              <p className="text-gray-300 mb-4">Automation Network and Services Pvt Ltd, India | May 2022 – June 2022</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Ensured proper functionality of control system machines by testing and verifying connections before client delivery.</li>
                <li>Improved troubleshooting by reviewing and interpreting circuit diagrams, contributing to faster and more efficient machine testing processes.</li>
                <li>Enhanced machine performance by detecting and fixing malfunctions during hands-on testing, ensuring high-quality system output.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
            <div className="space-y-6">
              <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-2">Master of Engineering in Electrical and Computer Engineering</h3>
                <p className="text-gray-300">University of Waterloo | Sept 2023 – Dec 2024</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-2">Bachelor of Technology in Electrical Engineering</h3>
                <p className="text-gray-300">Kalinga Institute of Industrial Technology (KIIT) | Aug 2019 – June 2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:ayushsinha960@gmail.com" className="flex items-center hover:text-blue-400 transition-colors">
                <Mail className="mr-2" /> Email
              </a>
              <a href="tel:+15485772138" className="flex items-center hover:text-blue-400 transition-colors">
                <Phone className="mr-2" /> Phone
              </a>
              <a href="https://www.linkedin.com/in/ayushh-sinha" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-400 transition-colors">
                <Linkedin className="mr-2" /> LinkedIn
              </a>
              <a href="https://github.com/ayushhsinha" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-400 transition-colors">
                <Github className="mr-2" /> GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center">
        <p>&copy; 2024 Ayush Sinha. All rights reserved.</p>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}

function SkillCard({ title, skills }) {
  return (
    <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ title, technologies, description }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-blue-400 mb-4">{technologies}</p>
       {/* Render the first item as a paragraph */}
       {/* <p className="text-gray-300 mb-4">{description[0]}</p> */}

      {/* Render the rest as bullet points */}
      {/* <ul className="list-disc list-inside space-y-2">
        {description.slice(1).map((item, index) => (
          <li key={index} className="text-gray-300">{item}</li>
        ))} */}
      <ul className="list-disc list-inside space-y-2">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}