import { useState, useEffect, useRef } from 'react'
import { Menu, X, Github, Linkedin, Mail, Phone, ChevronUp, Download } from 'lucide-react'
import emailjs from 'emailjs-com';


export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [animatedSections, setAnimatedSections] = useState({})
  
  // Refs for sections to observe
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const experienceRef = useRef(null)
  const educationRef = useRef(null)
  const contactRef = useRef(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimatedSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }))
        }
      })
    }, observerOptions)

    // Observe all section refs
    const sections = [
      aboutRef.current,
      skillsRef.current,
      projectsRef.current,
      experienceRef.current,
      educationRef.current,
      contactRef.current
    ]

    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section)
      })
    }
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
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_ivkyoc5',       // Replace with your EmailJS Service ID
      'template_hih29wy',      // Replace with your Template ID
      form.current,
      'GVw9fxuVf1-O1rZ-x'        // Replace with your Public Key
    ).then(
      (result) => {
        console.log(result.text);
        alert("Message sent successfully!");
      },
      (error) => {
        console.log(error.text);
        alert("Failed to send message. Please try again.");
      }
    );

    e.target.reset(); // optional: clear form after submit
  };

  

  // Handle resume download
  const handleResumeDownload = () => {
    // console.log("Resume download button clicked");
    // alert("Download button clicked");
    try{
      // Check if process.env.PUBLIC_URL is defined
      // console.log("PUBLIC_URL:", process.env.PUBLIC_URL);
      
      // Try a direct path approach instead
      const resumePath = '/Ayush_Sinha_Resume.pdf';
      // console.log("Attempting to download from:", resumePath);
      
      // Create a direct link to the resume file
      const link = document.createElement('a');
      link.href = resumePath;
      link.download = 'Ayush_Sinha_Resume.pdf';
      link.target = '_blank'; // Try opening in new tab if download doesn't work
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download resume:", error);
      alert("There was an issue downloading the resume. Please try again later.");
    }
  
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-pulse">Ayush Sinha</h1>
          <nav className="hidden md:flex space-x-6">
            {['about', 'education', 'skills', 'projects', 'experience', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="hover:text-blue-400 transition-colors capitalize relative group"
              >
                {section}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-800 py-4 animate-fade-down">
            {['about', 'skills', 'projects', 'experience', 'education', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 capitalize transition-colors duration-300"
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
        <section 
          id="about" 
          ref={aboutRef} 
          className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-32 overflow-hidden"
        >
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl font-bold mb-4 animate-fade-in-down">Ayush Sinha</h2>
            <p className="text-xl mb-6 animate-fade-in-up">Master's Student in Computer Engineering</p>
            <p className="max-w-2xl mx-auto animate-fade-in">
              Full-stack developer skilled in building scalable software. Passionate about integrating AI and machine learning to create innovative solutions and drive technological advancements.
            </p>
            <button 
              onClick={handleResumeDownload}
              className="mt-8 inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-medium shadow-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              style={{zIndex: 100, position: 'relative'}}
            >
              <Download size={18} className="mr-2" /> Download Resume
            </button>

            {/* Background animation elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white bg-opacity-10"
                  style={{
                    width: `${Math.random() * 200 + 50}px`,
                    height: `${Math.random() * 200 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section 
          id="education" 
          ref={educationRef}
          className={`py-20 ${animatedSections.education ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Education</span>
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-gray-700 rounded-lg p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20 hover:shadow-xl">
                <h3 className="text-2xl font-semibold mb-2">Master of Engineering in Computer Engineering</h3>
                <p className="text-gray-300">University of Waterloo | Sept 2023 – Dec 2024</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20 hover:shadow-xl">
                <h3 className="text-2xl font-semibold mb-2">Bachelor of Technology in Electrical Engineering</h3>
                <p className="text-gray-300">Kalinga Institute of Industrial Technology (KIIT) | Aug 2019 – June 2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section 
          id="skills" 
          ref={skillsRef}
          className={`py-20 bg-gray-800 ${animatedSections.skills ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Technical Skills</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard title="Languages" skills={['Python', 'C++', 'JavaScript', 'TypeScript', 'HTML', 'CSS']} />
              <SkillCard title="Web Development" skills={['Angular.js', 'React.js','Node.js','Material-UI', 'Elysia.js', 'Bun', 'Tailwind CSS', 'Express.js']} />
              <SkillCard title="Database Management" skills={['PostgreSQL']} />
              <SkillCard title="Developer Tools" skills={['VS Code', 'Git', 'NPM', 'GitHub']} />
              <SkillCard title="Technologies/Frameworks" skills={['Docker', 'Linux', 'AWS']} />
              <SkillCard title="Libraries" skills={['Pandas', 'NumPy', 'Matplotlib', 'TensorFlow', 'PyTorch', 'Scikit-Learn']} />
              <SkillCard title="Project Management" skills={['Agile', 'Scrum', 'Kanban']} />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          ref={projectsRef}
          className={`py-20 ${animatedSections.projects ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Projects</span>
            </h2>
            <div className="flex justify-center mb-8">
              <div className="bg-gray-700 p-1 rounded-lg">
                <button
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'all' ? 'bg-blue-600 shadow-lg' : 'hover:bg-gray-600'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'web' ? 'bg-blue-600 shadow-lg' : 'hover:bg-gray-600'}`}
                  onClick={() => setActiveTab('web')}
                >
                  Web
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'other' ? 'bg-blue-600 shadow-lg' : 'hover:bg-gray-600'}`}
                  onClick={() => setActiveTab('other')}
                >
                  Other
                </button>
              </div>
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
                  animateIn={activeTab === 'all' || activeTab === 'web'}
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
                    animateIn={activeTab === 'all' || activeTab === 'other'}
                  />
                  <ProjectCard
                    title="Extending Wlang with Functions"
                    technologies="Python, TatSu"
                    description={[
                      "Enhanced Wlang's symbolic execution engine by introducing formal function specifications ('requires'/'ensures' clauses).",
                      "Achieved 100% test coverage across parser and execution modules.",
                      "Improved software reliability by reducing assertion failures.",
                      "Aligned symbolic execution with modern formal verification practices (inspired by Dafny)."
                    ]}
                    animateIn={activeTab === 'all' || activeTab === 'other'}
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section 
          id="experience" 
          ref={experienceRef}
          className={`py-20 bg-gray-800 ${animatedSections.experience ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Experience</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-700 rounded-lg p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20 hover:shadow-xl">
                <h3 className="text-2xl font-semibold mb-2">Electrical Intern</h3>
                <p className="text-gray-300 mb-4">Automation Network and Services Pvt Ltd, India | May 2022 – June 2022</p>
                <ul className="list-disc list-inside space-y-2">
                  <li className="text-gray-300">Verified control system connections for 10+ industrial machines pre-delivery, reducing client-side deployment issues
                  by 25%.</li>
                  <li className="text-gray-300">Accelerated testing cycles by 30% by troubleshooting from circuit diagrams and optimizing testing workflows.</li>
                  <li className="text-gray-300">Improved machine output quality by identifying and resolving hardware faults during live testing, lowering error
                  rates by 20%.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          ref={contactRef}
          className={`py-20 ${animatedSections.contact ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Get in Touch</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="mailto:ayushsinha960@gmail.com" className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                <Mail className="mr-2" /> Email
              </a>
              <a href="tel:+15485772138" className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                <Phone className="mr-2" /> Phone
              </a>
              <a href="https://www.linkedin.com/in/ayushh-sinha" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                <Linkedin className="mr-2" /> LinkedIn
              </a>
              <a href="https://github.com/ayushhsinha" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                <Github className="mr-2" /> GitHub
              </a>
            </div>
            
           {/* Contact Form */}
            <div className="mt-12 max-w-md mx-auto">
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"/>
                </div>
                <div>
                  <input
                    type="email"
                    name="reply_to"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"/>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    required
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"/>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Ayush Sinha. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="https://github.com/ayushhsinha" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ayushh-sinha" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:ayushsinha960@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 animate-bounce-slow"
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
    <div className="bg-gray-700 rounded-lg p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20 hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ title, technologies, description, animateIn }) {
  return (
    <div className={`bg-gray-800 rounded-lg p-6 shadow-lg transition-all duration-500 ${animateIn ? 'animate-slide-in-right' : 'opacity-0'} hover:shadow-blue-500/20 hover:shadow-xl`}>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-blue-400 mb-4">{technologies}</p>
      
      {/* Render the first item as a paragraph */}
      <p className="text-gray-300 mb-4">{description[0]}</p>

      {/* Render the rest as bullet points */}
      <ul className="list-disc list-inside space-y-2">
        {description.slice(1).map((item, index) => (
          <li key={index} className="text-gray-300">{item}</li>
        ))}
      </ul>
    </div>
  )
}