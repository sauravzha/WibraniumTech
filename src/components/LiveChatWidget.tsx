import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, User, Paperclip, Loader2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

type Department = 'Support' | 'Sales' | 'General';

export function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // User Details
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [department, setDepartment] = useState<Department>('General');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleStart = () => {
        if (!userName.trim() || !userEmail.trim()) {
            toast.error('Please provide your name and email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            toast.error('Please enter a valid email');
            return;
        }

        setIsStarted(true);

        // Initial Bot Message based on Department
        const initialText = department === 'Sales'
            ? `Hi ${userName}! 👋 I'm Alice from the Sales team. I'd love to help you find the right solution for your business. What are you looking for today?`
            : department === 'Support'
                ? `Hello ${userName}. This is Technical Support. Please describe the issue you're facing, and I'll do my best to resolve it.`
                : `Welcome back, ${userName}! How can we assist you today?`;

        setMessages([
            {
                id: Date.now(),
                text: initialText,
                sender: 'bot',
                timestamp: new Date(),
            },
        ]);
    };

    // Knowledge Base - Comprehensive information about WibraniumTech
    const knowledgeBase = {
        greetings: {
            keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
            responses: [
                "Hello! 👋 Welcome to WibraniumTech. How can I assist you today?",
                "Hi there! Thanks for reaching out to WibraniumTech. What can I help you with?",
                "Hey! Great to connect with you. How may I help you today?"
            ]
        },
        company: {
            keywords: ['who are you', 'what is wibraniumtech', 'tell me about', 'about you', 'company'],
            responses: [
                "WibraniumTech is a professional IT solutions company delivering custom software, automation systems, websites, and digital platforms for schools, factories, and small-to-medium businesses. We specialize in practical, easy-to-use, and affordable solutions that work at the ground level."
            ]
        },
        gyod: {
            keywords: ['gyod', 'get your own doctor', 'patient monitoring', 'health monitoring', 'health tracking', 'medical device'],
            responses: [
                "GYOD (Get Your Own Doctor) is our revolutionary health monitoring solution! It continuously tracks vital signs like Blood Pressure, ECG, temperature, and oxygen saturation in real-time. The data is displayed in our user-friendly app, enabling both patients and healthcare providers to monitor health 24/7 and take timely action. It's like having a doctor with you all the time! 🏥"
            ]
        },
        services: {
            keywords: ['service', 'what do you do', 'what can you do', 'offer', 'provide'],
            responses: [
                "We offer a wide range of IT services:\n\n🌐 Website Development (Business, E-commerce, School websites)\n💻 Custom Software Development (Desktop apps, ERP, Billing)\n📱 Mobile App Development\n🎓 School Management Software\n🏭 Industrial Automation & PLC Support\n📊 Barcode & QR Solutions\n📈 Digital Marketing (SEO, Google Ads, Social Media)\n🎨 Graphic Design\n\nWhat are you interested in?"
            ]
        },
        website: {
            keywords: ['website', 'web development', 'web design', 'site', 'online presence'],
            responses: [
                "We build fast, secure, and professional websites! Our services include:\n\n✅ Business Websites\n✅ E-commerce Stores\n✅ School/Institute Websites\n✅ Custom Websites\n\nAll our sites are mobile-friendly, SEO-optimized, and easy to manage. Interested in getting started?"
            ]
        },
        software: {
            keywords: ['software', 'application', 'desktop app', 'custom software', 'erp', 'billing'],
            responses: [
                "We develop custom software tailored to your exact needs:\n\n💼 Windows Desktop Applications\n🔧 Python-based Solutions\n📊 Data Entry & Validation Systems\n📈 Reporting & Analytics Tools\n🖥️ Hardware-Integrated Software\n\nOur solutions reduce manual work, increase accuracy, and scale with your business. What kind of software do you need?"
            ]
        },
        school: {
            keywords: ['school', 'education', 'student management', 'fee management', 'attendance'],
            responses: [
                "Our School Management Software is designed for private schools on a budget! Features include:\n\n📚 Student Admission & Records\n💰 Fee Management\n✅ Attendance Tracking\n📝 Exam & Result Management\n📊 Reports & Analytics\n\nIt's simple, affordable, and customizable to your school's needs!"
            ]
        },
        automation: {
            keywords: ['automation', 'plc', 'industrial', 'factory', 'manufacturing', 'machine'],
            responses: [
                "We specialize in Industrial Automation & PLC Support:\n\n🏭 PLC to PC Communication\n📡 Serial/COM Port Data Handling\n⚠️ Machine Error Code Mapping\n📊 Status Monitoring Dashboards\n🔧 Production Utility Software\n\nPerfect for manufacturing units, assembly lines, and semi-automatic machines!"
            ]
        },
        barcode: {
            keywords: ['barcode', 'qr code', 'label', 'printing', 'scanner'],
            responses: [
                "We provide complete Barcode & QR Code solutions:\n\n🏷️ Barcode & QR Code Generation\n🖨️ Custom Label Design & Printing\n📦 Integration with Thermal/TSC Printers\n📊 Inventory Tracking Systems\n\nIdeal for product labeling, inventory management, and warehouse tracking!"
            ]
        },
        marketing: {
            keywords: ['marketing', 'digital marketing', 'seo', 'google ads', 'social media', 'facebook ads', 'instagram'],
            responses: [
                "Our Digital Marketing services help you grow online:\n\n🎯 Google Ads\n📱 Facebook & Instagram Ads\n🔍 SEO (Search Engine Optimization)\n📍 Local Business Promotion\n💬 WhatsApp Marketing\n\nGet more visibility, leads, and better ROI with targeted campaigns!"
            ]
        },
        pricing: {
            keywords: ['price', 'cost', 'quote', 'how much', 'pricing', 'budget', 'affordable'],
            responses: [
                "Our pricing is customized based on your specific requirements to ensure you get the best value. Could you share more details about what you need? I can connect you with our team for a personalized quote. 💰",
                "Great question! Since every project is unique, we provide tailored pricing. Tell me more about your needs, and I'll help arrange a detailed quote for you!"
            ]
        },
        contact: {
            keywords: ['contact', 'email', 'phone', 'call', 'reach', 'address', 'location'],
            responses: [
                "You can reach us at:\n\n📧 Email: info@wibraniumtech.com\n📞 Phone: +91 89206 17274\n📍 Location: New Delhi, India\n\nFeel free to get in touch anytime!"
            ]
        },
        human: {
            keywords: ['human', 'agent', 'real person', 'talk to someone', 'representative'],
            responses: [
                "I've flagged this conversation for our team. A specialist will reach out to you shortly at " + userEmail + ". In the meantime, is there anything else I can help with? 👨‍💼"
            ]
        }
    };

    // Smart Response Function
    const findResponse = (input: string): string => {
        const lowerInput = input.toLowerCase().trim();

        // Check each category in knowledge base
        for (const [category, data] of Object.entries(knowledgeBase)) {
            for (const keyword of data.keywords) {
                if (lowerInput.includes(keyword)) {
                    // Return random response from available responses
                    const responses = data.responses;
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }

        // Default fallback responses
        const fallbacks = [
            "That's interesting! Could you tell me more about what you're looking for? I'd love to help! 😊",
            "I want to make sure I understand your needs correctly. Could you provide a bit more detail?",
            "Thanks for sharing! To assist you better, could you elaborate on what you're interested in?",
            "I'm here to help! Could you tell me more about your specific requirements or questions?"
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    };

    const handleSendMessage = async (text?: string) => {
        const messageText = text || inputValue.trim();
        if (!messageText) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now(),
            text: messageText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate thinking delay
        const delay = Math.random() * 1000 + 1500; // 1.5s - 2.5s delay

        setTimeout(() => {
            const botResponse = findResponse(messageText);

            const botMessage: Message = {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, delay);
    };

    return (
        <>
            {/* Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center group"
                    >
                        <MessageCircle className="h-7 w-7 text-white fill-current" />
                        <span className="absolute top-0 right-0 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Main Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-5rem)] flex flex-col overflow-hidden rounded-2xl shadow-2xl glass-card border border-white/20"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-4 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm">
                                        <User className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-blue-700 rounded-full"></span>
                                </div>
                                <div className="text-white">
                                    <h3 className="font-bold text-sm leading-tight">Wibranium Support</h3>
                                    <p className="text-xs text-white/80">Online • Replies instantly</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                                aria-label="Minimize chat"
                            >
                                <Minimize2 className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content Area */}
                        {!isStarted ? (
                            // Welcome / Login Screen
                            <div className="flex-1 p-6 flex flex-col bg-background/95 backdrop-blur-3xl">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageCircle className="h-8 w-8 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                                        Welcome to WibraniumTech
                                    </h2>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        We help businesses build digital excellence. How can we help you today?
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground ml-1">Full Name</label>
                                        <Input
                                            placeholder="John Doe"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            className="bg-secondary/50 border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground ml-1">Email Address</label>
                                        <Input
                                            type="email"
                                            placeholder="john@example.com"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            className="bg-secondary/50 border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground ml-1">Department</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(['General', 'Sales', 'Support'] as Department[]).map((dept) => (
                                                <button
                                                    key={dept}
                                                    onClick={() => setDepartment(dept)}
                                                    className={`text-xs py-2 px-1 rounded-lg border transition-all duration-200 ${department === dept
                                                        ? 'bg-primary text-white border-primary shadow-lg shadow-cyan-500/20'
                                                        : 'bg-secondary/30 border-transparent hover:bg-secondary/60 text-muted-foreground'
                                                        }`}
                                                >
                                                    {dept}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleStart}
                                        className="w-full btn-primary bg-gradient-to-r from-cyan-500 to-blue-600 h-10 mt-2 shadow-lg hover:shadow-cyan-500/25 transition-all"
                                    >
                                        Start Conversation
                                        <Send className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            // Chat Interface
                            <div className="flex-1 flex flex-col bg-background/95 backdrop-blur-3xl min-h-0">
                                {/* Message List */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                                    <div className="text-center text-xs text-muted-foreground my-4">
                                        Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {messages.map((msg) => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                {msg.sender === 'bot' && (
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 mr-2 mt-1">
                                                        <span className="text-xs text-white font-bold">W</span>
                                                    </div>
                                                )}
                                                <div
                                                    className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.sender === 'user'
                                                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                                                        : 'bg-secondary border border-white/10 text-foreground rounded-tl-none'
                                                        }`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex justify-start"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 mr-2">
                                                <span className="text-xs text-white font-bold">W</span>
                                            </div>
                                            <div className="bg-secondary border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center space-x-1 h-10 w-16 justify-center">
                                                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-3 bg-secondary/30 border-t border-white/10 backdrop-blur-md">
                                    <div className="flex items-center gap-2 bg-background/50 border border-white/10 rounded-xl p-1 pr-2 shadow-inner focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                                        <button
                                            className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-white/5 rounded-lg"
                                            aria-label="Attach file"
                                        >
                                            <Paperclip className="h-4 w-4" />
                                        </button>
                                        <Input
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Type a message..."
                                            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-10"
                                        />
                                        <Button
                                            size="icon"
                                            onClick={() => handleSendMessage()}
                                            className="h-9 w-9 bg-primary hover:bg-primary/90 rounded-lg shadow-sm"
                                            disabled={!inputValue.trim()}
                                        >
                                            <Send className="h-4 w-4 text-white" />
                                        </Button>
                                    </div>
                                    <div className="text-[10px] text-center text-muted-foreground mt-2 opacity-50">
                                        Powered by WibraniumTech AI
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
