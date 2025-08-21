import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { type Message } from '../types';
import { Wifi, BatteryFull, Lock } from 'lucide-react';

const initialMessages: Message[] = [
  { id: 1, text: "Привіт! Як справи?", sender: 'other', timestamp: "11:34" },
  { id: 2, text: "Все добре. На зв'язку. Тут безпечно?", sender: 'me', timestamp: "11:35" },
  { id: 3, text: "Так, абсолютно. Наскрізне шифрування.", sender: 'other', timestamp: "11:35" },
  { id: 4, text: "Бачив останні новини?", sender: 'other', timestamp: "11:36" },
  { id: 5, text: "Ні, що там?", sender: 'me', timestamp: "11:36" },
  { id: 6, text: "Скину деталі. Цей канал надійний.", sender: 'other', timestamp: "11:37" },
];


const ChatScreen: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeoutId: number;

        const animateMessages = (index: number) => {
            if (index >= initialMessages.length) {
                timeoutId = window.setTimeout(() => {
                    setMessages([]);
                    setIsTyping(false);
                    animateMessages(0);
                }, 5000);
                return;
            }

            const currentMessage = initialMessages[index];
            const isFromOther = currentMessage.sender === 'other';
            const typingDuration = Math.random() * 1200 + 800;

            const showMessage = () => {
                setMessages(prev => [...prev, currentMessage]);
                timeoutId = window.setTimeout(() => {
                    animateMessages(index + 1);
                }, 1500);
            };

            if (isFromOther) {
                timeoutId = window.setTimeout(() => {
                    setIsTyping(true);
                    timeoutId = window.setTimeout(() => {
                        setIsTyping(false);
                        showMessage();
                    }, typingDuration);
                }, 500);
            } else {
                timeoutId = window.setTimeout(showMessage, 400);
            }
        };

        animateMessages(0);

        return () => window.clearTimeout(timeoutId);
    }, []);

    useLayoutEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages, isTyping]);

    const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
        const isMe = message.sender === 'me';
        return (
            <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'} animate-message-appear`}>
                <div className={`px-4 py-2 rounded-2xl ${isMe ? 'bg-brand-accent-light rounded-br-md' : 'bg-brand-light-gray rounded-bl-md'}`}>
                    <p className="text-sm text-white">{message.text}</p>
                </div>
                <span className="text-xs text-gray-500 mb-1">{message.timestamp}</span>
            </div>
        );
    };

    const TypingIndicator = () => (
        <div className="flex items-center gap-1 self-start px-4 py-3 rounded-2xl bg-brand-light-gray rounded-bl-md animate-message-appear">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-typing-dots" style={{ animationDelay: '0s' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-typing-dots" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-typing-dots" style={{ animationDelay: '0.4s' }}></span>
        </div>
    );

    return (
        <>
            {/* Status Bar */}
            <div className="px-4 py-1.5 bg-brand-dark flex justify-between items-center text-white text-xs">
                <span className="font-bold">11:38</span>
                <div className="flex items-center gap-1.5">
                    <Wifi size={14} />
                    <BatteryFull size={14} />
                </div>
            </div>

            {/* Chat Interface */}
            <div className="h-[calc(100%-28px)] flex flex-col">
                <header className="px-4 py-2 bg-brand-gray/50 flex items-center gap-3 border-b border-brand-light-gray/30">
                    <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold">A</div>
                    <div>
                        <h3 className="font-semibold text-sm">Agent_7</h3>
                        <p className="text-xs text-green-400 flex items-center gap-1"><Lock size={10} /> Канал захищено</p>
                    </div>
                </header>
                <div
                    ref={chatContainerRef}
                    className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')" }}
                >
                    {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
                    {isTyping && <TypingIndicator />}
                </div>
                <footer className="p-2 bg-brand-gray/50 border-t border-brand-light-gray/30">
                    <div className="w-full h-8 bg-brand-light-gray rounded-full opacity-50"></div>
                </footer>
            </div>
        </>
    );
};


const PhoneMockup: React.FC = () => {
    const mockupContainerRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number | null>(null);

    const rotateX = useRef(0);
    const rotateY = useRef(0);
    const targetRotateX = useRef(0);
    const targetRotateY = useRef(0);

    useEffect(() => {
        const mockupEl = mockupContainerRef.current;
        if (!mockupEl) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = mockupEl.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            targetRotateX.current = (y - centerY) / 20;
            targetRotateY.current = -(x - centerX) / 20;
        };

        const handleMouseLeave = () => {
            targetRotateX.current = 0;
            targetRotateY.current = 0;
        };
        
        const animate = () => {
            const easing = 0.08;
            rotateX.current += (targetRotateX.current - rotateX.current) * easing;
            rotateY.current += (targetRotateY.current - rotateY.current) * easing;

            mockupEl.style.transform = `perspective(1000px) rotateX(${rotateX.current}deg) rotateY(${rotateY.current}deg) scale(1.05)`;

            animationFrameId.current = requestAnimationFrame(animate);
        };
        
        mockupEl.addEventListener('mousemove', handleMouseMove);
        mockupEl.addEventListener('mouseleave', handleMouseLeave);
        
        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            mockupEl.removeEventListener('mousemove', handleMouseMove);
            mockupEl.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameId.current !== null) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <div
            ref={mockupContainerRef}
            style={{
                transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.05)`,
            }}
            className="relative mx-auto border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl animate-subtle-glow"
        >
            <div className="w-[140px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[40px] w-[3px] bg-gray-800 absolute -start-[13px] top-[100px] rounded-s-lg"></div>
            <div className="h-[40px] w-[3px] bg-gray-800 absolute -start-[13px] top-[160px] rounded-s-lg"></div>
            <div className="h-[60px] w-[3px] bg-gray-800 absolute -end-[13px] top-[120px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-brand-dark">
                <ChatScreen />
            </div>
        </div>
    );
};

export default PhoneMockup;