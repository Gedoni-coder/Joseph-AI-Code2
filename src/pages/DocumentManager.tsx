import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleHeader from "@/components/ui/module-header";
import {
  FolderOpen,
  File,
  FileText,
  Image,
  Search,
  Filter,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Share,
  Star,
  Clock,
  User,
  Activity,
  Grid3X3,
  List,
  MoreVertical,
  Pin,
  Archive,
  Tag,
  Calendar,
  BarChart3,
  DollarSign,
  Shield,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Briefcase,
} from "lucide-react";

const DocumentManager = () => {
  const [selectedModule, setSelectedModule] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  // Document modules classification
  const modules = [
    {
      id: "all",
      name: "All Documents",
      icon: <FolderOpen className="h-5 w-5" />,
      count: 156,
      color: "bg-gray-100 text-gray-800",
      description: "All company documents across modules"
    },
    {
      id: "financial",
      name: "Financial Advisory",
      icon: <DollarSign className="h-5 w-5" />,
      count: 32,
      color: "bg-green-100 text-green-800",
      description: "Financial reports, budgets, and advisory documents"
    },
    {
      id: "business",
      name: "Business Forecast",
      icon: <TrendingUp className="h-5 w-5" />,
      count: 28,
      color: "bg-blue-100 text-blue-800",
      description: "Business plans, forecasts, and projections"
    },
    {
      id: "market",
      name: "Market Analysis",
      icon: <BarChart3 className="h-5 w-5" />,
      count: 24,
      color: "bg-purple-100 text-purple-800",
      description: "Market research and competitive analysis"
    },
    {
      id: "compliance",
      name: "Compliance & Audit",
      icon: <Shield className="h-5 w-5" />,
      count: 19,
      color: "bg-orange-100 text-orange-800",
      description: "Compliance reports and audit documentation"
    },
    {
      id: "tax",
      name: "Tax & Legal",
      icon: <CheckCircle className="h-5 w-5" />,
      count: 15,
      color: "bg-indigo-100 text-indigo-800",
      description: "Tax documents and legal agreements"
    },
    {
      id: "policy",
      name: "Policy Analysis",
      icon: <AlertTriangle className="h-5 w-5" />,
      count: 12,
      color: "bg-red-100 text-red-800",
      description: "Policy documents and regulatory analysis"
    },
    {
      id: "strategy",
      name: "Strategy & Planning",
      icon: <Target className="h-5 w-5" />,
      count: 18,
      color: "bg-pink-100 text-pink-800",
      description: "Strategic plans and growth documents"
    },
    {
      id: "operations",
      name: "Operations",
      icon: <Briefcase className="h-5 w-5" />,
      count: 8,
      color: "bg-yellow-100 text-yellow-800",
      description: "Operational procedures and documentation"
    },
  ];

  // Sample documents with module classification
  const documents = [
    {
      id: 1,
      name: "Q4_2023_Financial_Report.pdf",
      type: "application/pdf",
      size: "2.4 MB",
      module: "financial",
      uploadDate: "2024-01-20",
      modifiedDate: "2024-01-20",
      uploadedBy: "John Smith",
      tags: ["quarterly", "financial", "report"],
      starred: true,
      pinned: false,
      status: "Final",
      description: "Comprehensive quarterly financial performance report"
    },
    {
      id: 2,
      name: "Market_Expansion_Strategy_2024.docx",
      type: "application/docx",
      size: "856 KB",
      module: "market",
      uploadDate: "2024-01-19",
      modifiedDate: "2024-01-19",
      uploadedBy: "Sarah Johnson",
      tags: ["strategy", "market", "expansion"],
      starred: false,
      pinned: true,
      status: "Draft",
      description: "Strategic plan for market expansion initiatives"
    },
    {
      id: 3,
      name: "Business_Forecast_Model_2024.xlsx",
      type: "application/xlsx",
      size: "1.2 MB",
      module: "business",
      uploadDate: "2024-01-18",
      modifiedDate: "2024-01-18",
      uploadedBy: "Michael Brown",
      tags: ["forecast", "model", "planning"],
      starred: true,
      pinned: false,
      status: "Final",
      description: "Advanced business forecasting model with scenario analysis"
    },
    {
      id: 4,
      name: "SOX_Compliance_Audit_2023.pdf",
      type: "application/pdf",
      size: "3.1 MB",
      module: "compliance",
      uploadDate: "2024-01-17",
      modifiedDate: "2024-01-17",
      uploadedBy: "Emily Davis",
      tags: ["sox", "compliance", "audit"],
      starred: false,
      pinned: false,
      status: "Final",
      description: "Sarbanes-Oxley compliance audit results and recommendations"
    },
    {
      id: 5,
      name: "Tax_Optimization_Strategy.pdf",
      type: "application/pdf",
      size: "1.8 MB",
      module: "tax",
      uploadDate: "2024-01-16",
      modifiedDate: "2024-01-16",
      uploadedBy: "Robert Wilson",
      tags: ["tax", "optimization", "strategy"],
      starred: false,
      pinned: false,
      status: "Review",
      description: "Corporate tax optimization strategy and implementation plan"
    },
    {
      id: 6,
      name: "Growth_Planning_Framework.pptx",
      type: "application/pptx",
      size: "4.2 MB",
      module: "strategy",
      uploadDate: "2024-01-15",
      modifiedDate: "2024-01-16",
      uploadedBy: "Lisa Anderson",
      tags: ["growth", "planning", "framework"],
      starred: true,
      pinned: true,
      status: "Final",
      description: "Comprehensive growth planning framework and methodologies"
    },
    {
      id: 7,
      name: "Policy_Impact_Analysis_GDPR.docx",
      type: "application/docx",
      size: "987 KB",
      module: "policy",
      uploadDate: "2024-01-14",
      modifiedDate: "2024-01-15",
      uploadedBy: "David Chen",
      tags: ["policy", "gdpr", "impact"],
      starred: false,
      pinned: false,
      status: "Draft",
      description: "GDPR policy impact analysis and compliance requirements"
    },
    {
      id: 8,
      name: "Operational_Efficiency_Report.pdf",
      type: "application/pdf",
      size: "2.1 MB",
      module: "operations",
      uploadDate: "2024-01-13",
      modifiedDate: "2024-01-13",
      uploadedBy: "Maria Garcia",
      tags: ["operations", "efficiency", "report"],
      starred: false,
      pinned: false,
      status: "Final",
      description: "Operational efficiency analysis and improvement recommendations"
    },
  ];

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return <FileText className="h-8 w-8 text-red-500" />;
    if (type.includes('image')) return <Image className="h-8 w-8 text-green-500" />;
    if (type.includes('doc')) return <FileText className="h-8 w-8 text-blue-500" />;
    if (type.includes('excel') || type.includes('xlsx')) return <BarChart3 className="h-8 w-8 text-green-600" />;
    if (type.includes('ppt')) return <FileText className="h-8 w-8 text-orange-500" />;
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Final":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-orange-100 text-orange-800";
      case "Review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesModule = selectedModule === "all" || doc.module === selectedModule;
    const matchesSearch = searchTerm === "" || 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesModule && matchesSearch;
  });

  const pinnedDocuments = filteredDocuments.filter(doc => doc.pinned);
  const regularDocuments = filteredDocuments.filter(doc => !doc.pinned);

  return (
    <div className="min-h-screen bg-gray-50">
      <ModuleHeader
        icon={<FolderOpen className="h-6 w-6" />}
        title="Document Management Center"
        description="Centralized document storage and organization across all business modules"
        isConnected={true}
        lastUpdated={new Date()}
        connectionLabel="Live"
      />

      <div className="container mx-auto px-4 py-6">
        {/* Module Classification Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all whitespace-nowrap ${
                  selectedModule === module.id
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className={selectedModule === module.id ? "text-white" : ""}>
                  {module.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{module.name}</div>
                  <div className={`text-xs ${selectedModule === module.id ? "text-blue-100" : "text-muted-foreground"}`}>
                    {module.count} documents
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Module Description */}
        {selectedModule !== "all" && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${modules.find(m => m.id === selectedModule)?.color}`}>
                  {modules.find(m => m.id === selectedModule)?.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{modules.find(m => m.id === selectedModule)?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {modules.find(m => m.id === selectedModule)?.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <File className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Documents</div>
                  <div className="text-lg font-bold">{filteredDocuments.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Final Status</div>
                  <div className="text-lg font-bold">
                    {filteredDocuments.filter(d => d.status === "Final").length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Starred</div>
                  <div className="text-lg font-bold">
                    {filteredDocuments.filter(d => d.starred).length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Pin className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Pinned</div>
                  <div className="text-lg font-bold">
                    {filteredDocuments.filter(d => d.pinned).length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Display */}
        <div className="space-y-6">
          {/* Pinned Documents */}
          {pinnedDocuments.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Pin className="h-4 w-4 text-purple-600" />
                <h2 className="text-lg font-semibold">Pinned Documents</h2>
              </div>
              
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {pinnedDocuments.map((document) => (
                    <Card key={document.id} className="transition-all hover:shadow-lg border-purple-200">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg">
                              {getFileIcon(document.type)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Pin className="h-4 w-4 text-purple-500" />
                              {document.starred && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-sm truncate" title={document.name}>
                              {document.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">{document.size}</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(document.status)}>
                              {document.status}
                            </Badge>
                            <Badge className={modules.find(m => m.id === document.module)?.color}>
                              {modules.find(m => m.id === document.module)?.name.split(' ')[0]}
                            </Badge>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            <p>By {document.uploadedBy}</p>
                            <p>{document.uploadDate}</p>
                          </div>
                          
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Share className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {pinnedDocuments.map((document) => (
                    <Card key={document.id} className="transition-all hover:shadow-md border-purple-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            {getFileIcon(document.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate">{document.name}</h3>
                              <Pin className="h-4 w-4 text-purple-500" />
                              {document.starred && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{document.size}</span>
                              <span>•</span>
                              <span>By {document.uploadedBy}</span>
                              <span>•</span>
                              <span>{document.uploadDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(document.status)}>
                              {document.status}
                            </Badge>
                            <Badge className={modules.find(m => m.id === document.module)?.color}>
                              {modules.find(m => m.id === document.module)?.name}
                            </Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Regular Documents */}
          <div>
            {pinnedDocuments.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen className="h-4 w-4 text-blue-600" />
                <h2 className="text-lg font-semibold">All Documents</h2>
              </div>
            )}
            
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {regularDocuments.map((document) => (
                  <Card key={document.id} className="transition-all hover:shadow-lg cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg">
                            {getFileIcon(document.type)}
                          </div>
                          <div className="flex items-center gap-1">
                            {document.starred && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-sm truncate" title={document.name}>
                            {document.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{document.size}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(document.status)}>
                            {document.status}
                          </Badge>
                          <Badge className={modules.find(m => m.id === document.module)?.color}>
                            {modules.find(m => m.id === document.module)?.name.split(' ')[0]}
                          </Badge>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          <p>By {document.uploadedBy}</p>
                          <p>{document.uploadDate}</p>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Share className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {regularDocuments.map((document) => (
                  <Card key={document.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {getFileIcon(document.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{document.name}</h3>
                            {document.starred && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{document.size}</span>
                            <span>•</span>
                            <span>By {document.uploadedBy}</span>
                            <span>•</span>
                            <span>{document.uploadDate}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {document.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(document.status)}>
                            {document.status}
                          </Badge>
                          <Badge className={modules.find(m => m.id === document.module)?.color}>
                            {modules.find(m => m.id === document.module)?.name}
                          </Badge>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No documents found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? `No documents match your search "${searchTerm}"`
                  : `No documents in ${modules.find(m => m.id === selectedModule)?.name || 'this module'}`
                }
              </p>
              <Link to="/document-upload">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DocumentManager;
