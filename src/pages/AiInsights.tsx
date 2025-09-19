import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ModuleHeader from "@/components/ui/module-header";
import {
  Brain,
  Send,
  Plus,
  Paperclip,
  Mic,
  MoreVertical,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Activity,
  Lightbulb,
  FileText,
  Image,
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Download,
  Share,
  Sparkles,
} from "lucide-react";

const AiInsights = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm Joseph, your AI business advisor. I'm here to help you with strategic insights, data analysis, business planning, and much more. What would you like to explore today?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      suggestions: [
        "Analyze my Q1 financial performance",
        "Help me plan market expansion strategy",
        "Review risk factors in my business",
        "Create a growth forecast"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setUploadedFiles([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content: "I've analyzed your request and here are my insights:\n\n**Key Findings:**\n• Revenue growth trajectory shows positive momentum\n• Market opportunities in 3 untapped segments\n• Operational efficiency can be improved by 15%\n\n**Recommendations:**\n1. Focus on customer retention strategies\n2. Explore strategic partnerships\n3. Invest in digital transformation\n\nWould you like me to dive deeper into any of these areas?",
          suggestions: ["Show detailed revenue analysis", "Explain partnership opportunities", "Create action plan"]
        },
        {
          content: "Based on current market conditions and your business data, I recommend the following strategy:\n\n**Growth Strategy Framework:**\n\n🎯 **Primary Focus:** Customer acquisition in emerging markets\n📊 **Investment:** $500K over 6 months\n📈 **Expected ROI:** 250% within 12 months\n\n**Implementation Steps:**\n1. Market research and segmentation\n2. Product positioning optimization\n3. Marketing campaign launch\n4. Performance monitoring\n\nShall I create a detailed implementation timeline for you?",
          suggestions: ["Create timeline", "Analyze market segments", "Show budget breakdown"]
        },
        {
          content: "I've processed your data and identified several key insights:\n\n**Financial Health Score: 8.5/10** ✅\n\n**Strengths:**\n• Strong cash flow management\n• Diversified revenue streams\n• Low debt-to-equity ratio\n\n**Areas for Improvement:**\n• Inventory turnover rate\n• Customer acquisition cost\n• Market penetration in key demographics\n\n**Next Steps:**\nWould you like me to create a personalized action plan to address these opportunities?",
          suggestions: ["Create action plan", "Analyze competitors", "Forecast scenarios"]
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: randomResponse.content,
        timestamp: new Date(),
        suggestions: randomResponse.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileData = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setUploadedFiles(prev => [...prev, ...fileData]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (type) => {
    if (type.includes('image')) return <Image className="h-4 w-4" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="h-4 w-4" />;
    if (type.includes('spreadsheet') || type.includes('excel')) return <BarChart3 className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ModuleHeader
        icon={<Brain className="h-6 w-6" />}
        title="Joseph AI Assistant"
        description="Your intelligent business advisor for strategic insights and data analysis"
        isConnected={true}
        lastUpdated={new Date()}
        connectionLabel="AI Active"
      />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "assistant" && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
              
              <div className={`max-w-3xl ${message.type === "user" ? "order-first" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-white border shadow-sm"
                  }`}
                >
                  {/* File attachments for user messages */}
                  {message.files && message.files.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {message.files.map((file) => (
                        <div key={file.id} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                          {getFileIcon(file.type)}
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs opacity-75">({formatFileSize(file.size)})</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                </div>
                
                {/* Suggestions for assistant messages */}
                {message.type === "assistant" && message.suggestions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Message actions */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {message.type === "assistant" && (
                    <div className="flex items-center gap-1 ml-2">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Share className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {message.type === "user" && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-medium">
                    U
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="bg-white border shadow-sm rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-6 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          {/* File Upload Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Paperclip className="h-4 w-4" />
                <span className="text-sm font-medium">Attached Files:</span>
              </div>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-2 p-2 bg-white rounded border">
                    {getFileIcon(file.type)}
                    <span className="text-sm flex-1">{file.name}</span>
                    <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Input Box */}
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <div className="relative border rounded-2xl bg-white shadow-sm">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask Joseph about your business strategy, data analysis, market insights, or anything else..."
                  className="w-full p-4 pr-20 resize-none border-0 focus:ring-0 focus:outline-none rounded-2xl"
                  rows={1}
                  style={{
                    minHeight: '52px',
                    maxHeight: '200px',
                    height: 'auto'
                  }}
                />
                
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.csv"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 w-8 p-0"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="h-12 w-12 rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick("Analyze my business performance")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Business Analysis
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick("Help me create a growth strategy")}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Growth Strategy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick("Review my market opportunities")}
            >
              <Target className="h-4 w-4 mr-2" />
              Market Analysis
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick("Create financial projections")}
            >
              <Activity className="h-4 w-4 mr-2" />
              Financial Planning
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;
