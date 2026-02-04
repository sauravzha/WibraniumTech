import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  Trash2, 
  Eye, 
  LogOut,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function Admin() {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const fetchLeads = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch leads");
      console.error(error);
    } else {
      setLeads(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchLeads();
    }
  }, [isAdmin]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    const { error } = await supabase
      .from("contact_leads")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated");
      fetchLeads();
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    const { error } = await supabase
      .from("contact_leads")
      .delete()
      .eq("id", leadId);

    if (error) {
      toast.error("Failed to delete lead");
    } else {
      toast.success("Lead deleted");
      fetchLeads();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string; icon: typeof Clock }> = {
      new: { className: "bg-blue-100 text-blue-700", icon: Clock },
      contacted: { className: "bg-yellow-100 text-yellow-700", icon: Mail },
      converted: { className: "bg-green-100 text-green-700", icon: CheckCircle },
      closed: { className: "bg-gray-100 text-gray-700", icon: XCircle },
    };
    const config = statusConfig[status] || statusConfig.new;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logo} alt="WibraniumTech" className="h-10 w-auto" />
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: leads.length, icon: Users },
            { label: "New", value: leads.filter((l) => l.status === "new").length, icon: Clock },
            { label: "Contacted", value: leads.filter((l) => l.status === "contacted").length, icon: Mail },
            { label: "Converted", value: leads.filter((l) => l.status === "converted").length, icon: CheckCircle },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-xl border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <h2 className="text-xl font-semibold">Contact Leads</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={fetchLeads} disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <p className="text-muted-foreground">
                        {isLoading ? "Loading..." : "No leads found"}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone || "-"}</TableCell>
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => handleStatusChange(lead.id, value)}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue>{getStatusBadge(lead.status)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(lead.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(lead.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedLead && formatDate(selectedLead.created_at)}
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedLead.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <a href={`mailto:${selectedLead.email}`} className="text-primary hover:underline block">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  {selectedLead.phone ? (
                    <a href={`tel:${selectedLead.phone}`} className="text-primary hover:underline block">
                      {selectedLead.phone}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">Not provided</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <p className="mt-1 p-4 bg-secondary rounded-lg text-sm whitespace-pre-wrap">
                  {selectedLead.message}
                </p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button asChild className="flex-1">
                  <a href={`mailto:${selectedLead.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </Button>
                {selectedLead.phone && (
                  <Button asChild variant="outline" className="flex-1">
                    <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
