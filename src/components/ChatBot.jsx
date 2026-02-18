import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Stethoscope } from 'lucide-react';
import { products } from '../data/mockData';

const quickReplies = [
    { label: '🩺 Check Symptoms', value: 'I want to check my symptoms' },
    { label: '💊 Medicine Info', value: 'I need information about medicines' },
    { label: '👨‍⚕️ Talk to Pharmacist', value: 'I want to talk to a pharmacist' },
    { label: '📦 Order Help', value: 'I need help with my order' },
];

const symptomMap = {
    headache: {
        response: "For headaches, I'd recommend **Paracetamol 500mg**. It's an effective pain reliever and fever reducer.",
        productId: 1,
    },
    fever: {
        response: "For fever, **Paracetamol 500mg** is recommended. You might also want a **Digital Thermometer** to monitor your temperature.",
        productIds: [1, 3],
    },
    pain: {
        response: "For general pain relief, **Paracetamol 500mg** is a safe option for adults and children.",
        productId: 1,
    },
    infection: {
        response: "For bacterial infections, **Amoxicillin 500mg** may be needed. ⚠️ Please note: this requires a prescription from your doctor.",
        productId: 5,
    },
    cold: {
        response: "For cold symptoms, I recommend **Paracetamol 500mg** for relief. Also consider using an **N95 Face Mask** to prevent spreading.",
        productIds: [1, 2],
    },
    flu: {
        response: "For flu symptoms, take **Paracetamol 500mg** for fever and body aches. Use a **Digital Thermometer** to monitor your temperature, and wear an **N95 Face Mask**.",
        productIds: [1, 3, 2],
    },
    wound: {
        response: "For wound care, our **First Aid Emergency Kit** has everything you need — bandages, antiseptics, and medical tools.",
        productId: 4,
    },
    cut: {
        response: "For cuts and minor injuries, I recommend our **First Aid Emergency Kit** which includes bandages and antiseptic supplies.",
        productId: 4,
    },
    blood_pressure: {
        response: "To monitor your blood pressure at home, we have an excellent **Blood Pressure Monitor** with automatic digital readings and memory function.",
        productId: 7,
    },
    breathing: {
        response: "⚠️ If you're having breathing difficulties, please seek immediate medical attention! For emergency oxygen needs, we have a **Portable Oxygen Tank** available.",
        productId: 8,
    },
    emergency: {
        response: "🚨 **In case of emergency, please call your local emergency number immediately!**\n\nWe have emergency supplies available:\n• First Aid Emergency Kit\n• Portable Oxygen Tank\n\nWould you like me to show you our emergency products?",
        productIds: [4, 8],
    },
};

function getProductCard(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return null;
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
    };
}

function generateResponse(message) {
    const lower = message.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|good\s*(morning|afternoon|evening))/.test(lower)) {
        return {
            text: "Hello! 👋 I'm your MediCare health assistant. How can I help you today?\n\nYou can ask me about:\n• Symptoms & medicine recommendations\n• Product information & dosages\n• Order assistance\n• Emergency guidance",
            products: [],
        };
    }

    // Thank you
    if (/^(thank|thanks|salamat)/.test(lower)) {
        return {
            text: "You're welcome! 😊 Is there anything else I can help you with? Stay healthy!",
            products: [],
        };
    }

    // Order help
    if (/order|delivery|track|shipping|status/.test(lower)) {
        return {
            text: "For order assistance:\n\n📦 **Track your order** — Go to the Orders page from the bottom menu\n🚚 **Delivery issues** — Check your order status for real-time updates\n💬 **Need more help?** — Please contact our support line at +63 912 345 6789\n\nIs there anything specific about your order you need help with?",
            products: [],
        };
    }

    // Talk to pharmacist
    if (/pharmacist|doctor|professional|consult|appointment/.test(lower)) {
        return {
            text: "👨‍⚕️ **Connect with a Pharmacist**\n\nOur licensed pharmacists are available:\n📞 Hotline: +63 912 345 6789\n🕐 Hours: Mon-Sat, 8:00 AM - 8:00 PM\n📍 Visit: MedPharm Supplies (1.2 km away)\n\n⚠️ For medical emergencies, please call your local emergency number immediately.",
            products: [],
        };
    }

    // Check symptoms (general prompt)
    if (/symptom|check.*symptom|not feeling well|sick|unwell/.test(lower)) {
        return {
            text: "I can help you find the right medicine! 🩺\n\nPlease describe your symptoms. For example:\n• \"I have a headache\"\n• \"I have a fever\"\n• \"I have a cold\"\n• \"I have a wound\"\n\nI'll recommend suitable products from our catalog.",
            products: [],
        };
    }

    // Medicine info (general prompt)
    if (/medicine info|about medicine|medication|what medicine/.test(lower)) {
        return {
            text: "💊 Here are the medicines we carry:\n\n1. **Paracetamol 500mg** — ₱120.00 — Pain & fever relief\n2. **Amoxicillin 500mg** — ₱280.00 — Antibiotic (prescription required)\n\nType a medicine name for detailed information, or describe your symptoms and I'll recommend the right one!",
            products: [],
        };
    }

    // Symptom-based matching
    for (const [symptom, data] of Object.entries(symptomMap)) {
        if (lower.includes(symptom) || lower.includes(symptom.replace('_', ' '))) {
            const productIds = data.productIds || (data.productId ? [data.productId] : []);
            const productCards = productIds.map(id => getProductCard(id)).filter(Boolean);
            return {
                text: data.response,
                products: productCards,
            };
        }
    }

    // Product search by name
    const matchedProduct = products.find(p =>
        lower.includes(p.name.toLowerCase()) ||
        p.name.toLowerCase().split(' ').some(word => word.length > 3 && lower.includes(word.toLowerCase()))
    );

    if (matchedProduct) {
        return {
            text: `📋 **${matchedProduct.name}**\n\n💰 Price: ₱${matchedProduct.price.toFixed(2)}\n📦 Stock: ${matchedProduct.stock} available\n⭐ Rating: ${matchedProduct.rating}/5 (${matchedProduct.reviews} reviews)\n🏪 Supplier: ${matchedProduct.supplier}\n\n📝 ${matchedProduct.description}\n💊 ${matchedProduct.dosage}`,
            products: [getProductCard(matchedProduct.id)],
        };
    }

    // Fallback
    return {
        text: "I'm not sure I understand. Here's what I can help with:\n\n• 🩺 **Symptoms** — Describe how you're feeling\n• 💊 **Medicine** — Ask about specific products\n• 📦 **Orders** — Track or get help with orders\n• 👨‍⚕️ **Pharmacist** — Connect with a professional\n\nOr try one of the quick replies below! 👇",
        products: [],
    };
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hi there! 👋 I'm your **MediCare Health Assistant**.\n\nI can help you with:\n• 🩺 Symptom checking & medicine recommendations\n• 💊 Product info & dosage guidance\n• 👨‍⚕️ Connecting with a pharmacist\n• 📦 Order assistance\n\nHow can I help you today?",
            products: [],
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = (text) => {
        const messageText = text || inputValue.trim();
        if (!messageText) return;

        // Add user message
        const userMsg = {
            id: Date.now(),
            type: 'user',
            text: messageText,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            const response = generateResponse(messageText);
            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: response.text,
                products: response.products,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800 + Math.random() * 700);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatMessage = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>');
    };

    return (
        <>
            {/* Floating Action Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="chatbot-fab"
                    id="chatbot-open-btn"
                    aria-label="Open online consultation"
                >
                    <span className="chatbot-fab-pulse" />
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span className="font-semibold text-sm">Consult Now</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-overlay" onClick={() => setIsOpen(false)}>
                    <div
                        className="chatbot-window"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                        <Stethoscope className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-600 rounded-full" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">MediCare Assistant</h3>
                                    <p className="text-blue-100 text-xs flex items-center">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 inline-block" />
                                        Online • Ready to help
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="chatbot-messages">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`chatbot-message-row ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.type === 'bot' && (
                                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                                            <Stethoscope className="w-4 h-4 text-blue-600" />
                                        </div>
                                    )}
                                    <div className={`chatbot-bubble ${msg.type === 'user' ? 'chatbot-bubble-user' : 'chatbot-bubble-bot'}`}>
                                        <div
                                            className="text-sm leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                                        />
                                        {/* Product Cards */}
                                        {msg.products && msg.products.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {msg.products.map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="chatbot-product-card"
                                                    >
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-semibold text-gray-800 truncate">{product.name}</p>
                                                            <p className="text-xs font-bold text-blue-600">₱{product.price.toFixed(2)}</p>
                                                            <p className="text-[10px] text-gray-500">{product.stock} in stock</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <span className="text-[10px] text-gray-400 mt-1 block">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    {msg.type === 'user' && (
                                        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="chatbot-message-row justify-start">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Stethoscope className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="chatbot-bubble chatbot-bubble-bot">
                                        <div className="chatbot-typing">
                                            <span /><span /><span />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        <div className="chatbot-quick-replies">
                            {quickReplies.map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSend(reply.value)}
                                    className="chatbot-chip"
                                >
                                    {reply.label}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="chatbot-input-bar">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Describe your symptoms..."
                                className="chatbot-input"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!inputValue.trim()}
                                className="chatbot-send-btn"
                                aria-label="Send message"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
