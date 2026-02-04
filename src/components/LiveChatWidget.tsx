import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Hi! 👋 Welcome to WibraniumTech. How can we help you today?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    const quickResponses = [
        'Tell me about your services',
        'I need a quote',
        'How do I get started?',
        'Do you offer support?',
    ];

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
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                text: `Great to meet you, ${userName}! What can I help you with?`,
                sender: 'bot',
                timestamp: new Date(),
            },
        ]);
    };

    const handleSendMessage = (text?: string) => {
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

        // Simulate bot response
        setTimeout(() => {
            let botResponse = '';

            if (messageText.toLowerCase().includes('service')) {
                botResponse =
                    'We offer Web Development, Mobile App Development, SEO, Video Editing, and CRM solutions. Which service interests you most?';
            } else if (messageText.toLowerCase().includes('quote') || messageText.toLowerCase().includes('price')) {
                botResponse =
                    'I\'d be happy to provide a quote! Could you tell me more about your project requirements? Or you can fill out our contact form for a detailed quote.';
            } else if (messageText.toLowerCase().includes('start') || messageText.toLowerCase().includes('begin')) {
                botResponse =
                    'Getting started is easy! Just tell us about your project, and our team will reach out within 24 hours to discuss next steps.';
            } else if (messageText.toLowerCase().includes('support')) {
                botResponse =
                    'Yes, we provide comprehensive support and maintenance packages for all our projects. Would you like to know more about our support options?';
            } else {
                botResponse =
                    'Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to browse our services or contact us directly.';
            }

            const botMessage: Message = {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        }, 1000);
    };

    useEffect(() => {
        if (isOpen && isStarted) {
            const messagesContainer = document.getElementById('chat-messages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }, [messages, isOpen, isStarted]);

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        <MessageCircle className="h-7 w-7 text-white" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageCircle className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">WibraniumTech Support</h3>
                                    <p className="text-xs opacity-90">We typically reply instantly</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 rounded-lg p-1 transition-colors"
                                title="Close chat"
                                aria-label="Close chat window"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {!isStarted ? (
                            /* Start Form */
                            <div className="flex-1 p-6 flex flex-col justify-center">
                                <h4 className="text-lg font-semibold mb-2">Welcome to WibraniumTech!</h4>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Fill in your details to start chatting with us.
                                </p>
                                <div className="space-y-4">
                                    <Input
                                        placeholder="Your Name"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Your Email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                    />
                                    <Button onClick={handleStart} className="w-full btn-primary">
                                        Start Chat
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Messages */}
                                <div id="chat-messages" className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.sender === 'user'
                                                    ? 'bg-primary text-white'
                                                    : 'bg-secondary text-foreground'
                                                    }`}
                                            >
                                                <p className="text-sm">{message.text}</p>
                                                <p className="text-xs opacity-70 mt-1">
                                                    {message.timestamp.toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Responses */}
                                <div className="px-4 py-2 border-t border-border">
                                    <div className="flex flex-wrap gap-2">
                                        {quickResponses.map((response) => (
                                            <button
                                                key={response}
                                                onClick={() => handleSendMessage(response)}
                                                className="text-xs px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                                            >
                                                {response}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Input */}
                                <div className="p-4 border-t border-border">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Type your message..."
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        />
                                        <Button
                                            onClick={() => handleSendMessage()}
                                            size="icon"
                                            className="btn-primary shrink-0"
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
