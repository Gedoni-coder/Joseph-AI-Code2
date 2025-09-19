import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  File,
  FileText,
  Image,
  CheckCircle,
  AlertTriangle,
  Activity,
  Trash2,
  Eye,
  Download,
  FolderOpen,
  Clock,
  User,
} from "lucide-react";

const DocumentUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]);

  const uploadedFiles = [
    {
      id: 1,
      name: "Financial_Report_Q4_2023.pdf",
      type: "application/pdf",
      size: "2.4 MB",
      uploadDate: "2024-01-20",
      uploadedBy: "John Smith",
      status: "Processed",
      category: "Financial",
      tags: ["quarterly", "compliance", "financial"],
    },
    {
      id: 2,
      name: "Supplier_Contract_ABC_Corp.docx",
      type: "application/docx",
      size: "856 KB",
      uploadDate: "2024-01-19",
      uploadedBy: "Sarah Johnson",
      status: "Processing",
      category: "Legal",
      tags: ["contract", "supplier", "legal"],
    },
    {
      id: 3,
      name: "Audit_Checklist_2024.xlsx",
      type: "application/xlsx",
      size: "1.2 MB",
      uploadDate: "2024-01-18",
      uploadedBy: "Michael Brown",
      status: "Processed",
      category: "Audit",
      tags: ["audit", "checklist", "compliance"],
    },
  ];

  const uploadMetrics = [
    {
      label: "Total Files",
      value: uploadedFiles.length,
      icon: <File className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Processed",
      value: uploadedFiles.filter(f => f.status === "Processed").length,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Processing",
      value: uploadedFiles.filter(f => f.status === "Processing").length,
      icon: <Clock className="h-5 w-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      label: "Total Size",
      value: "4.5 MB",
      icon: <FolderOpen className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="h-5 w-5 text-red-500" />;
    if (type.includes("image")) return <Image className="h-5 w-5 text-green-500" />;
    if (type.includes("doc")) return <FileText className="h-5 w-5 text-blue-500" />;
    if (type.includes("excel") || type.includes("xlsx")) return <FileText className="h-5 w-5 text-green-600" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-orange-100 text-orange-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Financial":
        return "bg-blue-100 text-blue-800";
      case "Legal":
        return "bg-purple-100 text-purple-800";
      case "Audit":
        return "bg-green-100 text-green-800";
      case "Operational":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload logic here
      console.log("Files dropped:", e.dataTransfer.files);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload logic here
      console.log("Files selected:", e.target.files);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ModuleHeader
        icon={<Upload className="h-6 w-6" />}
        title="Document Upload Center"
        description="Upload and manage compliance and audit documents"
        isConnected={true}
        lastUpdated={new Date()}
        connectionLabel="Live"
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Upload Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {uploadMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${metric.bgColor} rounded-lg`}>
                    <div className={metric.color}>{metric.icon}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                    <div className="text-lg font-bold">{metric.value}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload">Upload Documents</TabsTrigger>
            <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
            <TabsTrigger value="queue">Upload Queue</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            {/* Drag and Drop Zone */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Drag and drop files here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Or click to select files from your computer
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  />
                  <label htmlFor="file-upload">
                    <Button asChild>
                      <span>
                        <File className="h-4 w-4 mr-2" />
                        Choose Files
                      </span>
                    </Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG (Max: 10MB per file)
                  </p>
                </div>

                {/* Upload Categories */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-center">
                      <div className="p-2 bg-blue-100 rounded-lg w-fit mx-auto mb-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-sm">Financial Documents</h4>
                      <p className="text-xs text-muted-foreground">Reports, statements, budgets</p>
                    </div>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-center">
                      <div className="p-2 bg-purple-100 rounded-lg w-fit mx-auto mb-2">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-sm">Legal Documents</h4>
                      <p className="text-xs text-muted-foreground">Contracts, agreements, policies</p>
                    </div>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-center">
                      <div className="p-2 bg-green-100 rounded-lg w-fit mx-auto mb-2">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-sm">Audit Documents</h4>
                      <p className="text-xs text-muted-foreground">Checklists, reports, evidence</p>
                    </div>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-center">
                      <div className="p-2 bg-orange-100 rounded-lg w-fit mx-auto mb-2">
                        <FileText className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-sm">Operational Documents</h4>
                      <p className="text-xs text-muted-foreground">Procedures, forms, manuals</p>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Upload Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Supported File Types</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• PDF documents (.pdf)</li>
                      <li>• Microsoft Word (.doc, .docx)</li>
                      <li>• Microsoft Excel (.xls, .xlsx)</li>
                      <li>• Images (.png, .jpg, .jpeg)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-3">File Requirements</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Maximum file size: 10MB</li>
                      <li>• File names should be descriptive</li>
                      <li>• No special characters in file names</li>
                      <li>• Files will be automatically scanned</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <Card key={file.id} className="transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-semibold text-base truncate">{file.name}</h3>
                            <p className="text-sm text-muted-foreground">{file.size}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(file.status)}>
                              {file.status}
                            </Badge>
                            <Badge className={getCategoryColor(file.category)}>
                              {file.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Uploaded: {file.uploadDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>By: {file.uploadedBy}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <File className="h-3 w-3" />
                            <span>Type: {file.type}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-muted-foreground">Tags:</span>
                          {file.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="queue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upload Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadQueue.length === 0 ? (
                  <div className="text-center py-8">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No files in queue</h3>
                    <p className="text-muted-foreground">
                      Upload files to see them in the processing queue
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Upload queue items would be displayed here */}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/document-manager">
                <Button variant="outline" className="w-full">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Manage Documents
                </Button>
              </Link>
              <Link to="/compliance-reports">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Compliance Reports
                </Button>
              </Link>
              <Link to="/audit-reports">
                <Button variant="outline" className="w-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Audit Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DocumentUpload;
