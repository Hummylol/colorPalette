'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Images } from 'lucide-react'
import { useState } from 'react'
import { useColorContext } from '@/app/context/ColorContext'

interface ChatBoxProps {
    onClose: () => void // Close function
}

export default function ChatBox({  onClose }: ChatBoxProps) {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'user', text: 'Hey there!' },
        { id: 2, sender: 'other', text: 'Hi! How can I help you?' },
    ])
    const [newMessage, setNewMessage] = useState('')

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { id: messages.length + 1, sender: 'user', text: newMessage }])
            setNewMessage('')
        }
    }

    const { colors } = useColorContext()

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-md p-4 rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-center text-lg font-bold">Chat</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[35vh] p-2">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'
                                }`}
                        >
                            <div
                                className={`inline-block p-2 rounded-lg`}
                                style={{
                                    backgroundColor: message.sender === 'user' ? colors[1] : colors[2],
                                    color: message.sender === 'user' ? 'white' : 'black',
                                }}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
                <div className="flex items-center mt-4">
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-grow"
                    />
                    <Button onClick={handleSendMessage} className="ml-2">
                        <Images className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage} className="ml-2">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
