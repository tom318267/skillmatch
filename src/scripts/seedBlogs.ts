import dotenv from "dotenv";
dotenv.config();

import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase";

const sampleBlogs = [
  {
    title: "5 Essential Skills for Remote Work Success in 2024",
    excerpt:
      "Master these key skills to thrive in the evolving remote work landscape.",
    content:
      "<p>The landscape of remote work continues to evolve, and success requires more than just technical prowess. In today's digital-first environment, professionals need to develop a unique set of skills to truly excel. As we navigate through 2024, these skills have become more crucial than ever before.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Evolution of Remote Work</h2>" +
      "<p>The shift to remote work has fundamentally changed how we approach our professional lives. What started as a temporary solution has evolved into a permanent transformation of the workplace. Organizations worldwide have discovered that remote work not only offers flexibility but can also lead to increased productivity and employee satisfaction when managed effectively.</p><br/>" +
      "<p>However, this new way of working brings its own set of challenges. The physical separation from colleagues, the reliance on digital tools, and the blending of home and work life all require new approaches and skills. The most successful remote professionals have learned to adapt their working styles and develop specific competencies that enable them to thrive in this digital-first environment.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Communication in the Digital Age</h2>" +
      "<p>Perhaps the most critical skill in the remote work environment is the ability to communicate effectively through digital channels. Gone are the days of quick desk-side conversations or impromptu meetings in the break room. Instead, we must master the art of clear, concise, and purposeful digital communication.</p><br/>" +
      "<p>Effective remote communicators understand the importance of context and tone in written messages. They know when to use synchronous communication tools like video calls versus asynchronous methods like email or messaging platforms. They've learned to compensate for the lack of physical presence by being more explicit in their communication, providing clear documentation, and ensuring their messages are both comprehensive and accessible.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Digital Collaboration Challenge</h2>" +
      "<p>Collaboration in a remote environment presents unique challenges that require new approaches and mindsets. The traditional methods of brainstorming, project planning, and team coordination have been transformed by digital tools and platforms. Successful remote workers have learned to leverage these tools effectively, creating virtual spaces that facilitate creativity, innovation, and productive teamwork.</p><br/>" +
      "<p>The key lies in understanding how to maintain human connection while working through digital interfaces. This means being intentional about creating opportunities for informal interaction, ensuring all team members have a voice in virtual meetings, and finding ways to replicate the spontaneous exchanges that naturally occur in physical offices.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Time Management and Boundaries</h2>" +
      "<p>One of the most significant challenges remote workers face is maintaining healthy boundaries between work and personal life. When your home becomes your office, the line between professional and personal time can quickly blur. Successful remote workers have learned to create structured routines, designate specific workspaces, and establish clear boundaries that protect both their productivity and their well-being.</p><br/>" +
      "<p>This includes developing strategies for managing time effectively, setting realistic expectations with colleagues about availability, and creating rituals that signal the beginning and end of the workday. It's about finding a sustainable rhythm that allows for focused work while preventing burnout.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Future of Remote Work</h2>" +
      "<p>As we look to the future, it's clear that remote work will continue to evolve. New technologies will emerge, work practices will adapt, and our understanding of effective remote collaboration will deepen. The most successful remote workers will be those who remain adaptable, continuously learning and adjusting their approaches as the landscape changes.</p><br/>" +
      "<p>The skills that make remote work successful today – effective communication, digital collaboration, time management, and the ability to maintain work-life boundaries – will remain fundamental. However, they will need to be refined and adapted as new tools and practices emerge.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Conclusion</h2>" +
      "<p>Success in the remote work environment requires a combination of intentional skill development, adaptability, and a commitment to continuous learning. By focusing on developing these essential skills, remote workers can create fulfilling and productive professional lives while maintaining healthy personal boundaries. The future of work is here, and it's digital, distributed, and full of opportunity for those who are prepared to embrace it.</p>",
    date: "March 15, 2024",
    readTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8",
  },
  {
    title: "The Future of AI in Workplace Productivity",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing how we work and collaborate.",
    content:
      "<p>Artificial Intelligence is no longer a futuristic concept – it's actively reshaping how we approach work and productivity. As we delve into this technological revolution, it's crucial to understand both its current impact and future implications for the workplace.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The AI Revolution in the Workplace</h2>" +
      "<p>The integration of AI into our daily work lives represents one of the most significant technological shifts since the advent of the internet. Unlike previous technological revolutions that primarily affected specific industries or job functions, AI is transforming work across all sectors and roles. From entry-level positions to executive suites, artificial intelligence is changing how we approach tasks, make decisions, and collaborate with others.</p><br/>" +
      "<p>This transformation isn't just about automation or efficiency – it's about fundamentally reimagining how work gets done. AI systems are becoming sophisticated partners in our daily work, augmenting human capabilities rather than simply replacing them. They're helping us process vast amounts of information, identify patterns that might otherwise go unnoticed, and make more informed decisions.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Beyond Automation: AI as a Collaborative Partner</h2>" +
      "<p>The early narrative around AI in the workplace focused heavily on automation and the potential displacement of human workers. However, as AI systems have evolved, a more nuanced understanding has emerged. The most powerful applications of AI aren't about replacing humans but about creating synergistic partnerships between human intelligence and machine capabilities.</p><br/>" +
      "<p>These partnerships are taking various forms across different industries. In creative fields, AI tools are helping generate initial concepts that human creators can refine and develop. In data-heavy industries, AI systems are processing and analyzing information at unprecedented scales, allowing humans to focus on strategic interpretation and decision-making. In customer service, AI chatbots handle routine inquiries while human agents focus on complex problems that require empathy and nuanced understanding.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Human Element in an AI-Enhanced Workplace</h2>" +
      "<p>As AI systems become more sophisticated, the value of distinctly human skills is actually increasing. Emotional intelligence, creative thinking, ethical judgment, and complex problem-solving are becoming more important, not less. The most successful organizations are those that understand how to combine human and artificial intelligence effectively, leveraging the strengths of each.</p><br/>" +
      "<p>This shift is requiring workers to develop new skills and mindsets. The ability to work effectively alongside AI systems, understanding their capabilities and limitations, is becoming as fundamental as computer literacy was in the previous generation. Workers need to learn how to frame problems in ways that AI can help address, interpret AI-generated outputs critically, and make ethical decisions about when and how to apply AI solutions.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Preparing for the Future</h2>" +
      "<p>The pace of AI development shows no signs of slowing, and its impact on workplace productivity will likely accelerate in the coming years. Organizations and individuals that want to stay competitive need to be proactive in preparing for this evolving landscape. This means investing in AI literacy, developing frameworks for ethical AI use, and creating cultures that embrace technological innovation while maintaining a strong human element.</p><br/>" +
      "<p>The key to success will be finding the right balance – understanding where AI can add the most value while preserving and enhancing the human aspects of work that cannot be replicated by machines. This balance will be different for each organization and role, but the fundamental principle remains the same: AI should augment and enhance human capabilities, not replace them entirely.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Conclusion</h2>" +
      "<p>The future of workplace productivity lies in the successful integration of AI and human capabilities. By understanding and embracing this partnership, while thoughtfully addressing its challenges and implications, organizations can create more efficient, innovative, and fulfilling work environments. The key is to remain adaptable, ethical, and focused on leveraging technology to enhance rather than diminish the human element in work.</p>",
    date: "March 12, 2024",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    title: "Building a Strong Professional Network Online",
    excerpt: "Strategic approaches to networking in the digital age.",
    content:
      "<p>In today's interconnected world, building and maintaining a professional network has become more important – and more challenging – than ever before. The digital landscape offers unprecedented opportunities for connection, but it also requires a thoughtful and strategic approach to create meaningful professional relationships.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Evolution of Professional Networking</h2>" +
      "<p>The way we build professional relationships has undergone a dramatic transformation in recent years. Traditional networking, once limited to industry events, conferences, and in-person meetings, has expanded into the digital realm. This evolution has democratized networking, making it possible for professionals from any location to connect with peers, mentors, and opportunities worldwide.</p><br/>" +
      "<p>However, this expanded access comes with its own set of challenges. The ease of making connections online can sometimes lead to superficial relationships that lack the depth and authenticity of traditional networking. The key to success in this new environment lies in understanding how to leverage digital tools while maintaining the human element that makes networking valuable.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Digital First Impression</h2>" +
      "<p>In the online world, your digital presence serves as your first impression. Your professional profiles, online interactions, and shared content all contribute to how others perceive you. This makes it crucial to approach your online presence with the same care and intentionality you would bring to an in-person professional interaction.</p><br/>" +
      "<p>Creating a strong digital presence goes beyond simply maintaining a profile on professional networking sites. It involves developing a consistent personal brand, sharing valuable insights and experiences, and engaging meaningfully with your network's content. The goal is to be recognized not just for what you do, but for the unique perspective and value you bring to your professional community.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Building Authentic Connections</h2>" +
      "<p>The true value of networking lies in the quality of connections rather than the quantity. In the digital age, it's easy to accumulate hundreds or even thousands of connections, but the real benefits come from developing deeper, more meaningful relationships with select individuals. This requires moving beyond the simple act of connecting online to engaging in genuine dialogue and mutual support.</p><br/>" +
      "<p>Successful online networking involves being proactive in reaching out to others, showing genuine interest in their work and experiences, and finding ways to add value to the relationship. This might mean sharing relevant resources, making introductions, or offering support and advice when appropriate. The key is to approach each interaction with authenticity and a genuine desire to build a mutually beneficial relationship.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Nurturing Your Network</h2>" +
      "<p>Building a network is just the beginning – maintaining and nurturing these relationships over time is equally important. In the digital age, this means staying actively engaged with your network through regular interactions, meaningful contributions to discussions, and periodic direct communication with key connections.</p><br/>" +
      "<p>Technology can help facilitate this ongoing engagement through tools that help you track interactions, set reminders for follow-ups, and stay informed about your connections' professional milestones and achievements. However, it's important to remember that these tools should support, not replace, genuine human interaction and relationship building.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Looking to the Future</h2>" +
      "<p>As digital platforms continue to evolve and new tools emerge, the fundamentals of effective networking remain constant: authenticity, mutual value, and genuine connection. The most successful networkers will be those who can adapt to new platforms and technologies while maintaining these core principles.</p><br/>" +
      "<p>The future of professional networking will likely see even greater integration of digital and traditional networking approaches, with technology making it easier to maintain and leverage professional relationships across geographical and organizational boundaries. Success will come to those who can effectively navigate this hybrid landscape, using digital tools to enhance rather than replace meaningful human connection.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Conclusion</h2>" +
      "<p>Building a strong professional network in the digital age requires a balanced approach that leverages technology while maintaining the human element of relationship building. By focusing on authenticity, providing value, and nurturing meaningful connections, professionals can create networks that support their growth and success in an increasingly digital world.</p>",
    date: "March 10, 2024",
    readTime: "11 min read",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
  },
  {
    title: "Mastering Work-Life Balance in the Digital Age",
    excerpt:
      "Strategies for maintaining harmony between professional and personal life in an always-connected world.",
    content:
      "<p>In an era where technology has blurred the lines between work and personal life, achieving a healthy balance has become both more challenging and more crucial than ever. The digital revolution that promised to make our lives easier has, in many ways, made it more complex, requiring us to be more intentional about how we manage our time and energy.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Challenge of Always-On Culture</h2>" +
      "<p>The modern workplace has evolved into an always-on environment, where emails, messages, and notifications follow us everywhere. This constant connectivity has created unprecedented challenges for maintaining boundaries between our professional and personal lives. The ability to work from anywhere, while liberating in many ways, has also made it increasingly difficult to truly disconnect and recharge.</p><br/>" +
      "<p>The impact of this always-on culture extends beyond mere inconvenience. Studies have shown that the inability to disconnect from work can lead to increased stress levels, decreased productivity, and potential burnout. The psychological toll of constant availability has made it essential to develop new strategies for protecting our personal time and mental well-being.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Creating Digital Boundaries</h2>" +
      "<p>One of the most effective approaches to managing work-life balance in the digital age is establishing clear boundaries around technology use. This doesn't mean completely disconnecting, but rather being intentional about when and how we engage with work-related communications. Setting specific times for checking emails, designating technology-free zones in our homes, and establishing clear expectations with colleagues about availability can help create necessary separation between work and personal time.</p><br/>" +
      "<p>The key lies in being proactive rather than reactive in our relationship with technology. By taking control of how and when we engage with digital tools, we can prevent them from controlling us. This might mean turning off notifications outside of work hours, using separate devices for work and personal use, or implementing digital wellness tools to track and manage our screen time.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Role of Physical and Mental Space</h2>" +
      "<p>Creating physical and mental boundaries is equally important as digital ones. In a world where many of us work from home, the physical separation between work and personal life has become increasingly blurred. Designating specific areas for work, even in small living spaces, can help maintain the psychological boundary between professional and personal life. When the workday ends, physically leaving this space can signal to our brains that it's time to shift into personal mode.</p><br/>" +
      "<p>Mental space is just as crucial. Practices like meditation, exercise, or engaging in hobbies can help create psychological distance from work-related stress and prevent it from seeping into our personal time. These activities serve as natural transitions between work and personal life, allowing us to decompress and reset.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Time Management in the Digital Era</h2>" +
      "<p>Effective time management has taken on new importance in the digital age. The traditional nine-to-five workday has evolved into a more fluid concept, requiring us to be more intentional about how we structure our time. This means not just managing our work hours, but also protecting our personal time with the same diligence we apply to professional commitments.</p><br/>" +
      "<p>Time-blocking techniques, priority setting, and regular schedule audits can help ensure that both work and personal activities receive appropriate attention. The goal isn't to create rigid boundaries, but rather to develop a sustainable rhythm that allows for both productivity and personal fulfillment.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Importance of Recovery</h2>" +
      "<p>In our pursuit of professional success, we often overlook the critical role of recovery in maintaining long-term productivity and well-being. Regular periods of disconnection from work are not just luxuries – they're essential for maintaining creativity, motivation, and mental health. This includes both daily recovery periods and longer breaks like vacations and weekends.</p><br/>" +
      "<p>The quality of our recovery time matters as much as the quantity. Engaging in activities that truly rejuvenate us, whether that's spending time with family, pursuing hobbies, or simply being in nature, can help us return to work with renewed energy and perspective.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Conclusion</h2>" +
      "<p>Mastering work-life balance in the digital age requires a combination of intentional boundaries, effective time management, and commitment to regular recovery. While technology has created new challenges for maintaining this balance, it has also provided tools and opportunities for managing our time and energy more effectively. The key lies in being proactive about creating and maintaining boundaries while remaining flexible enough to adapt to changing circumstances. By taking control of our relationship with technology and being intentional about how we structure our time, we can create a more sustainable and fulfilling integration of our professional and personal lives.</p>",
    date: "March 8, 2024",
    readTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  },
  {
    title: "The Rise of Sustainable Business Practices",
    excerpt:
      "How companies are adapting to meet environmental challenges and consumer demands for sustainability.",
    content:
      "<p>Sustainability has evolved from a nice-to-have corporate initiative to a fundamental business imperative. As environmental concerns mount and consumers become increasingly conscious of their environmental impact, businesses across all sectors are being forced to rethink their operations and strategies through the lens of sustainability.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Business Case for Sustainability</h2>" +
      "<p>The shift toward sustainable business practices is no longer driven solely by environmental consciousness or corporate responsibility. Companies are discovering that sustainability initiatives can drive innovation, reduce costs, and create competitive advantages. From reducing energy consumption to minimizing waste, sustainable practices often align with operational efficiency and cost reduction goals.</p><br/>" +
      "<p>Moreover, consumers are increasingly making purchasing decisions based on companies' environmental credentials. This shift in consumer behavior has created new market opportunities while threatening the viability of businesses that fail to adapt. Investment firms are also incorporating environmental, social, and governance (ESG) criteria into their decision-making processes, making sustainability a crucial factor in accessing capital.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Transforming Supply Chains</h2>" +
      "<p>One of the most significant areas of focus for sustainable business practices is supply chain management. Companies are examining every step of their supply chains, from raw material sourcing to final product delivery, looking for opportunities to reduce environmental impact. This includes reducing transportation emissions, minimizing packaging waste, and ensuring sustainable sourcing practices.</p><br/>" +
      "<p>Technology is playing a crucial role in this transformation. Blockchain and other digital technologies are enabling greater transparency and traceability in supply chains, allowing companies to verify sustainable practices and communicate these efforts to consumers. Advanced analytics are helping organizations optimize routes, reduce waste, and predict maintenance needs, further improving efficiency.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Innovation and Circular Economy</h2>" +
      "<p>The concept of the circular economy is gaining traction as businesses look for ways to eliminate waste and maximize resource efficiency. This approach moves beyond the traditional 'take-make-dispose' model to one where products and materials are kept in use for as long as possible. Companies are redesigning products for durability and recyclability, implementing take-back programs, and finding innovative ways to reuse materials.</p><br/>" +
      "<p>This shift is driving innovation across industries. From developing new materials that are both sustainable and high-performing to creating new business models based on sharing and reuse, companies are finding creative solutions to environmental challenges while opening up new revenue streams.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Employee Engagement and Corporate Culture</h2>" +
      "<p>Successful sustainability initiatives require more than just top-down policies – they need buy-in and engagement from employees at all levels. Companies are finding that sustainability programs can boost employee morale and attraction, as workers increasingly want to be part of organizations that align with their values. This has led to the integration of sustainability into corporate culture, training programs, and employee engagement initiatives.</p><br/>" +
      "<p>Organizations are also recognizing the importance of empowering employees to contribute to sustainability goals. This might involve creating green teams, implementing suggestion programs, or providing resources and support for employee-led environmental initiatives.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Measuring and Reporting Impact</h2>" +
      "<p>As sustainability becomes more central to business strategy, the need for accurate measurement and reporting of environmental impact has grown. Companies are developing more sophisticated methods for tracking their environmental footprint, from carbon emissions to water usage to waste generation. This data is crucial for setting meaningful goals, tracking progress, and communicating with stakeholders.</p><br/>" +
      "<p>Standardization of sustainability reporting is also evolving, with various frameworks and metrics being developed to help companies measure and communicate their environmental impact in consistent and comparable ways. This transparency is becoming increasingly important for maintaining trust with consumers, investors, and other stakeholders.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Conclusion</h2>" +
      "<p>The rise of sustainable business practices represents a fundamental shift in how companies operate and create value. While the transition to more sustainable practices presents challenges, it also offers opportunities for innovation, efficiency, and competitive advantage. As environmental concerns continue to mount and stakeholder expectations evolve, sustainability will only become more central to business success. Companies that embrace this change and proactively develop sustainable practices will be better positioned to thrive in an increasingly environmentally conscious world.</p>",
    date: "March 5, 2024",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
  },
  {
    title: "Effective Leadership in the Modern Workplace",
    excerpt:
      "Exploring the evolving nature of leadership in today's dynamic business environment.",
    content:
      "<p>Leadership in the modern workplace has undergone a significant transformation, shaped by technological advancement, changing workforce demographics, and evolving expectations of what makes an effective leader. Today's leaders must navigate a complex landscape that requires new skills and approaches while staying true to timeless leadership principles.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>The Evolution of Leadership</h2>" +
      "<p>Traditional command-and-control leadership styles have given way to more collaborative and inclusive approaches. Modern leaders are expected to be facilitators of success rather than just directors of work. This shift reflects both changing workforce expectations and the recognition that complex modern challenges require diverse perspectives and collaborative problem-solving.</p><br/>" +
      "<p>The rise of remote and hybrid work environments has further accelerated this evolution, requiring leaders to develop new skills in virtual team management and digital collaboration. The ability to build trust and maintain team cohesion across physical distances has become a crucial leadership competency.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Emotional Intelligence in Leadership</h2>" +
      "<p>Emotional intelligence has emerged as a critical factor in modern leadership effectiveness. Leaders must not only understand and manage their own emotions but also be attuned to the emotional needs and well-being of their team members. This includes developing strong empathy, active listening skills, and the ability to create psychologically safe environments where team members feel comfortable sharing ideas and concerns.</p><br/>" +
      "<p>The importance of emotional intelligence has been highlighted by recent global challenges, which have emphasized the need for leaders who can guide their teams through uncertainty while maintaining morale and productivity. Leaders must balance driving performance with showing genuine care and concern for their team members' well-being.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Inclusive Leadership</h2>" +
      "<p>Modern leadership must embrace diversity, equity, and inclusion (DEI) as fundamental principles rather than optional initiatives. This means actively working to create environments where all team members feel valued and can contribute their unique perspectives and talents. Inclusive leaders recognize that diversity drives innovation and better decision-making.</p><br/>" +
      "<p>Effective inclusive leadership requires conscious effort to recognize and mitigate unconscious biases, create equitable opportunities for advancement, and foster a culture where different viewpoints are actively sought and valued. This approach not only supports social justice but also drives better business outcomes.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Adaptability and Continuous Learning</h2>" +
      "<p>The pace of change in today's business environment requires leaders to be highly adaptable and committed to continuous learning. Successful leaders maintain a growth mindset, staying curious about new technologies, trends, and approaches while being willing to adjust their leadership style as circumstances require.</p><br/>" +
      "<p>This adaptability extends to how leaders approach problem-solving and decision-making. Rather than relying on past experiences alone, modern leaders must be comfortable with ambiguity and willing to experiment with new approaches. They must also encourage and support continuous learning within their teams.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Building and Maintaining Trust</h2>" +
      "<p>Trust remains the foundation of effective leadership, but building and maintaining it has become more complex in modern work environments. Leaders must demonstrate consistency between their words and actions, maintain transparency in their decision-making, and show vulnerability when appropriate. This authenticity helps create stronger connections with team members and builds credibility.</p><br/>" +
      "<p>In virtual and hybrid environments, trust-building requires extra attention and intentionality. Leaders must find new ways to maintain visibility and connection with their teams while ensuring clear communication and follow-through on commitments.</p><br/>" +
      "<h2 class='text-2xl font-bold text-gray-900 mb-4'>Conclusion</h2>" +
      "<p>Effective leadership in the modern workplace requires a delicate balance of adapting to new challenges while maintaining core leadership principles. Success depends on developing emotional intelligence, embracing inclusion, maintaining adaptability, and building trust. As the business environment continues to evolve, leaders must remain committed to their own growth while creating environments where their teams can thrive. Those who can master these elements while staying authentic to their values will be best positioned to lead their organizations into the future.</p>",
    date: "March 3, 2024",
    readTime: "11 min read",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

const seedBlogs = async () => {
  try {
    const email = "admin@jobboard.com";
    const password = "test123456";

    const auth = getAuth();
    console.log("Attempting to authenticate...");
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Authentication successful!");

    const blogsRef = collection(db, "blogs");

    for (const blog of sampleBlogs) {
      try {
        const docRef = await addDoc(blogsRef, blog);
        console.log("Added blog:", blog.title, "with ID:", docRef.id);
      } catch (error) {
        console.error("Error adding blog:", error);
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
};

seedBlogs();
