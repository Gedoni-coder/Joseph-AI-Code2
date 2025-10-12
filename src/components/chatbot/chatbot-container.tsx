import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Bot,
  Minimize2,
  Maximize2,
  X,
  MessageCircle,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ModuleContextSwitcher } from "./module-context-switcher";
import { ChatInterface } from "./chat-interface";
import { ToolsDock } from "./tools-dock";
import { ToolModal } from "./tool-modal";
import { AgentPanel } from "./agent-panel";
import { useChatbot } from "../../hooks/useChatbot";
import { setJosephExplainFunction } from "../../lib/joseph-global-explain";
import { cn } from "../../lib/utils";

interface ChatbotContainerProps {
  className?: string;
}

type ChatbotSize = "minimized" | "half" | "fullscreen";

export function ChatbotContainer({ className }: ChatbotContainerProps) {
  const {
    isOpen,
    isMinimized,
    messages,
    currentInput,
    isTyping,
    currentContext,
    selectedTool,
    isToolOpen,
    moduleContexts,
    economicTools,
    smartSuggestions,
    setIsOpen,
    setIsMinimized,
    setCurrentInput,
    sendMessage,
    switchContext,
    openTool,
    setIsToolOpen,
    handleSuggestionClick,
    explainElement,
    clearChat,
  } = useChatbot();

  console.log("ChatbotContainer: isOpen =", isOpen);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePanel, setActivePanel] = useState<"chat" | "tools" | "agent">(
    "chat",
  );
  const [sizeMode, setSizeMode] = useState<ChatbotSize>("half");

  // Initialize global explain function
  useEffect(() => {
    setJosephExplainFunction(explainElement);
  }, [explainElement]);

  // Log when floating button is clicked
  const handleOpenClick = () => {
    console.log("Floating chatbot button clicked");
    setIsOpen(true);
  };

  // Replace floating button onClick with handleOpenClick

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F11 or Ctrl+Enter to toggle fullscreen
      if (e.key === "F11" || (e.ctrlKey && e.key === "Enter")) {
        e.preventDefault();
        if (sizeMode === "fullscreen") {
          setSizeMode("half");
        } else {
          setSizeMode("fullscreen");
        }
      }
      // Escape to minimize from fullscreen
      if (e.key === "Escape" && sizeMode === "fullscreen") {
        setSizeMode("half");
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, sizeMode]);

  // Drag and drop functionality
  useEffect(() => {
    if (!isOpen || sizeMode === "minimized") return;

    const chatMain = document.querySelector("[data-chatbot-main]");
    if (!chatMain) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      (chatMain as HTMLElement).style.backgroundColor =
        "rgba(59, 130, 246, 0.05)";
      (chatMain as HTMLElement).style.borderColor = "rgba(59, 130, 246, 0.3)";
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      (chatMain as HTMLElement).style.backgroundColor = "";
      (chatMain as HTMLElement).style.borderColor = "";
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      (chatMain as HTMLElement).style.backgroundColor = "";
      (chatMain as HTMLElement).style.borderColor = "";

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        // Handle file upload
        console.log("Files dropped:", files);
        // TODO: Implement file handling
      }
    };

    chatMain.addEventListener("dragover", handleDragOver);
    chatMain.addEventListener("dragleave", handleDragLeave);
    chatMain.addEventListener("drop", handleDrop);

    return () => {
      chatMain.removeEventListener("dragover", handleDragOver);
      chatMain.removeEventListener("dragleave", handleDragLeave);
      chatMain.removeEventListener("drop", handleDrop);
    };
  }, [isOpen, sizeMode]);

  // Function to cycle through size modes
  const cycleSizeMode = () => {
    console.log("Current size mode:", sizeMode, "Cycling to next...");
    const nextMode =
      sizeMode === "half"
        ? "fullscreen"
        : sizeMode === "fullscreen"
          ? "minimized"
          : "half";
    console.log("Setting new size mode:", nextMode);
    setSizeMode(nextMode);
  };

  // Get positioning and sizing classes based on mode
  const getSizeClasses = () => {
    switch (sizeMode) {
      case "minimized":
        return "bottom-2 right-6 w-80 h-16 z-[9999]";
      case "half":
        return "bottom-2 right-6 w-96 h-[450px] z-[9999]";
      case "fullscreen":
        return "top-2 left-2 right-2 bottom-2 w-auto h-auto z-[9999]";
      default:
        return "bottom-2 right-6 w-96 h-[450px] z-[9999]";
    }
  };

  // Get size mode icon
  const getSizeModeIcon = () => {
    if (sizeMode === "fullscreen") {
      return <Minimize2 className="h-4 w-4" />;
    }
    return <Maximize2 className="h-4 w-4" />;
  };

  // Get tooltip text for size mode
  const getSizeModeTooltip = () => {
    switch (sizeMode) {
      case "half":
        return "Go fullscreen";
      case "fullscreen":
        return "Minimize";
      case "minimized":
        return "Restore";
      default:
        return "Change size";
    }
  };

  if (!isOpen) {
    return (
      <div
        data-joseph-no-explain
        className={cn("fixed bottom-4 right-4 z-[99999]", className)}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-primary to-primary/80 border-2 border-primary/20 p-2"
              onClick={handleOpenClick}
            >
              <div className="relative w-full h-full">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F65b22f3aedf4439cb7708f60698fc899%2Fe85e18d5c9404f1da472bd3d9d893f87?format=webp&width=800"
                  alt="Joseph AI"
                  className="w-full h-full object-contain"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <div className="text-center">
              <p className="font-medium">Joseph AI Assistant</p>
              <p className="text-xs opacity-90">
                Your Economic Analysis Companion
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div
      data-joseph-no-explain
      className={cn(
        "fixed transition-all duration-300",
        getSizeClasses(),
        className,
      )}
      style={{ zIndex: 9999 }}
    >
      <Card
        className={cn(
          "h-full shadow-2xl border border-border/50 bg-background/95 backdrop-blur-sm",
          sizeMode === "fullscreen" ? "overflow-auto" : "overflow-hidden",
        )}
      >
        {/* Header Bar - Made Sticky */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {/* Logo Space */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Company/App Logo */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-200 group p-2">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F65b22f3aedf4439cb7708f60698fc899%2Fe85e18d5c9404f1da472bd3d9d893f87?format=webp&width=800"
                      alt="Joseph AI Logo"
                      className="w-full h-full object-contain"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    <p className="font-medium">Joseph AI Platform</p>
                    <p className="text-xs opacity-90">
                      Economic Analysis Suite
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* Separator */}
              <div className="w-px h-8 bg-border/50"></div>

              {/* Joseph Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md border-2 border-primary/20 p-1">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F65b22f3aedf4439cb7708f60698fc899%2Fe85e18d5c9404f1da472bd3d9d893f87?format=webp&width=800"
                    alt="Joseph AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>

              {/* Branding & Status */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-sm sm:text-base truncate">
                    Joseph AI
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-100 text-green-700 border-green-200"
                  >
                    Live
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Economic Assistant • Peaceful Intelligence
                </div>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="text-xs truncate max-w-[120px]"
            >
              {currentContext.name}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-6 px-2"
              onClick={() => {
                console.log("Badge clicked, current mode:", sizeMode);
                cycleSizeMode();
              }}
            >
              {sizeMode.charAt(0).toUpperCase() + sizeMode.slice(1)} - Click to
              Change
            </Button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Show/Hide Sidebar Button (mobile) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 sm:hidden hover:bg-primary/10"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{sidebarCollapsed ? "Show" : "Hide"} sidebar</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hidden sm:flex hover:bg-primary/10"
                  onClick={() => {
                    const panels = ["chat", "tools", "agent"] as const;
                    const currentIndex = panels.indexOf(activePanel);
                    const nextIndex = (currentIndex + 1) % panels.length;
                    setActivePanel(panels[nextIndex]);
                  }}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch panels</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cycleSizeMode();
                  }}
                >
                  {getSizeModeIcon()}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getSizeModeTooltip()}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close chat</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Main Content */}
        {sizeMode !== "minimized" && (
          <div className="flex h-[calc(100%-4rem)] overflow-hidden">
            {/* Left Sidebar - Module Context Switcher */}
            <div
              className={cn(
                "border-r border-border/50 bg-muted/20 backdrop-blur-sm transition-all duration-200 flex-shrink-0",
                sidebarCollapsed
                  ? "w-12"
                  : sizeMode === "fullscreen"
                    ? "w-80"
                    : "w-48 sm:w-52",
              )}
            >
              <div className="flex items-center justify-between p-3 border-b border-border/50">
                {!sidebarCollapsed && (
                  <span className="text-xs font-medium text-muted-foreground">
                    Context & Tools
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {!sidebarCollapsed && (
                <div className="flex flex-col h-[calc(100%-3rem)]">
                  {/* Tab Switcher */}
                  <div className="flex border-b border-border/50">
                    <Button
                      variant={activePanel === "chat" ? "secondary" : "ghost"}
                      size="sm"
                      className="flex-1 rounded-none h-9 text-xs font-medium"
                      onClick={() => setActivePanel("chat")}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span className="text-xs">Modules</span>
                    </Button>
                    <Button
                      variant={activePanel === "tools" ? "secondary" : "ghost"}
                      size="sm"
                      className="flex-1 rounded-none h-9 text-xs font-medium"
                      onClick={() => setActivePanel("tools")}
                    >
                      <Bot className="h-3 w-3 mr-1" />
                      <span className="text-xs">Tools</span>
                    </Button>
                    <Button
                      variant={activePanel === "agent" ? "secondary" : "ghost"}
                      size="sm"
                      className="flex-1 rounded-none h-9 text-xs font-medium"
                      onClick={() => setActivePanel("agent")}
                    >
                      <Bot className="h-3 w-3 mr-1" />
                      <span className="text-xs">Agent</span>
                    </Button>
                  </div>

                  {/* Panel Content */}
                  <div className="flex-1">
                    {activePanel === "chat" ? (
                      <ModuleContextSwitcher
                        contexts={moduleContexts}
                        currentContext={currentContext}
                        onContextSwitch={switchContext}
                      />
                    ) : activePanel === "tools" ? (
                      <ToolsDock
                        tools={economicTools}
                        onToolSelect={openTool}
                      />
                    ) : (
                      <AgentPanel />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Main Chat Area */}
            <div
              className="flex-1 flex flex-col justify-between overflow-hidden"
              data-chatbot-main
            >
              <ChatInterface
                messages={messages}
                currentInput={currentInput}
                isTyping={isTyping}
                currentContext={currentContext}
                smartSuggestions={smartSuggestions}
                onInputChange={setCurrentInput}
                onSendMessage={sendMessage}
                onSuggestionClick={handleSuggestionClick}
                onClearChat={clearChat}
              />
            </div>
          </div>
        )}

        {/* Minimized State */}
        {sizeMode === "minimized" && (
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center p-1">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F65b22f3aedf4439cb7708f60698fc899%2Fe85e18d5c9404f1da472bd3d9d893f87?format=webp&width=800"
                  alt="Joseph AI"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium">Joseph AI</span>
              {isTyping && (
                <Badge variant="secondary" className="text-xs">
                  Typing...
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/10"
              onClick={() => setSizeMode("half")}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Tool Modal */}
        <ToolModal
          tool={selectedTool}
          isOpen={isToolOpen}
          onClose={() => setIsToolOpen(false)}
        />
      </Card>
    </div>
  );
}

// Global function to expose explainElement for clicking on elements
declare global {
  interface Window {
    josephExplain?: (description: string, data?: any) => void;
  }
}
