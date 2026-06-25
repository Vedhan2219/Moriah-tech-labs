/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  Bell, 
  LogOut, 
  Search, 
  FileSpreadsheet, 
  Plus, 
  Send, 
  Clock, 
  Edit3, 
  Save, 
  UserCheck, 
  TrendingUp,
  RefreshCw, 
  Sliders, 
  X, 
  ChevronDown, 
  Calendar, 
  ArrowUpRight, 
  MessageCircle, 
  Sparkles,
  Award,
  BookOpen,
  SendHorizontal,
  FolderOpen,
  Settings,
  CheckCircle,
  AlertCircle,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LeadStatus, TrainingMode } from '../types';
import { button } from 'motion/react-client';

export default function AdminPortal({
  leads,
  onUpdateLeads,
  templates,
  onUpdateTemplates,
  notifications,
  onUpdateNotifications,
  onNavigateHome,
  theme = 'dark',
  onToggleTheme,
  apiBase = 'http://localhost:8080',
  onAdminLogin,
  onAdminLogout
}) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Portal Navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLead, setSelectedLead] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [techFilter, setTechFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  // Interactive templates editor state
  const [selectedTemplateId, setSelectedTemplateId] = useState('tpl_thank_you');
  const [editedSubject, setEditedSubject] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [templateSuccessMessage, setTemplateSuccessMessage] = useState('');

  // Interactive follow-up input
  const [newFollowUpText, setNewFollowUpText] = useState('');
  const [newFollowUpStatus, setNewFollowUpStatus] = useState('');
  
  // Schedule follow-up states
  const [schedLeadId, setSchedLeadId] = useState('');
  const [schedDate, setSchedDate] = useState('2026-06-25');
  const [schedType, setSchedType] = useState('Phone Call');
  const [schedNotes, setSchedNotes] = useState('');
  const [schedSuccess, setSchedSuccess] = useState('');
  const [actionToast, setActionToast] = useState({ show: false, msg: "", type: "success" });
  
  // Quick Lead Add Modal
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addTech, setAddTech] = useState('Java Full Stack');
  const [addMode, setAddMode] = useState(TrainingMode.ONLINE);
  const [addQual, setAddQual] = useState('B.Tech');
  const [addMsg, setAddMsg] = useState('');

  // Sync templates edit values upon selection
  React.useEffect(() => {
    const tpl = templates.find(t => t.id === selectedTemplateId);
    if (tpl) {
      setEditedSubject(tpl.subject);
      setEditedBody(tpl.body);
    }
  }, [selectedTemplateId, templates]);

  // Handle Admin Authorization – authenticates against Spring Boot backend
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const encoded = btoa(`${username.trim()}:${password}`);
      const res = await fetch(`${apiBase}/api/admin/leads?page=0&size=1`, {
        headers: {
          'Authorization': `Basic ${encoded}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.ok || res.status === 200) {
        setIsAuthenticated(true);
        if (onAdminLogin) onAdminLogin(username.trim(), password);
      } else if (res.status === 401 || res.status === 403) {
        setLoginError('Invalid credentials. Please check your username and password.');
      } else {
        // Backend unreachable – allow demo fallback with admin/admin
        if (username.trim().toLowerCase() === 'admin' && password === 'admin') {
          setIsAuthenticated(true);
          setLoginError('');
        } else {
          setLoginError('Cannot reach backend. For demo access use: admin / admin');
        }
      }
    } catch (err) {
      // Network error – allow demo mode
      if (username.trim().toLowerCase() === 'admin' && password === 'admin') {
        setIsAuthenticated(true);
      } else {
        setLoginError('Backend offline. For demo access use: admin / admin');
      }
    }
  };

  // Add a brand new lead manually (Admin function)
const handleManualLeadAdd = async (e) => {
   e.preventDefault();
   if (!addName || !addEmail || !addPhone) {
     alert("Please complete required Name, Email, and Phone fields.");
     return;
   }

   const payload = {
     fullName: addName,
     email: addEmail,
     mobileNumber: addPhone,
     qualification: addQual,
     interestedTechnology: addTech,
     trainingMode: addMode,
     message: addMsg || "Added manually by Counselor",
     source: "Manual"
   };

   try {
     const res = await fetch(`${apiBase}/api/leads`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(payload)
     });

     if (res.ok) {
       const json = await res.json();
       const saved = json.data || json;
       const newLead = {
         leadId: saved.id || saved.leadId || Date.now(),
         fullName: saved.fullName || addName,
         email: saved.email || addEmail,
         mobileNumber: saved.mobileNumber || addPhone,
         qualification: saved.qualification || addQual,
         interestedTechnology: saved.interestedTechnology || addTech,
         trainingMode: saved.trainingMode || addMode,
         message: saved.message || addMsg,
         status: saved.status || 'NEW',
         source: saved.source || 'Manual',
         createdAt: saved.createdAt || new Date().toISOString(),
         assignedCounselor: "Sarah Jenkins",
         notes: [],
         timeline: [{
           id: `ml-t-${Date.now()}`,
           type: "creation",
           title: "Lead Registered Manually",
           description: "Contact registered directly from counselor admin desk.",
           createdAt: new Date().toISOString(),
           performedBy: "Sarah Jenkins"
         }]
       };
       onUpdateLeads([newLead, ...leads]);
     } else {
       alert("Failed to save lead to backend. Please try again.");
       return;
     }
   } catch (err) {
     alert("Backend unreachable. Please ensure the backend is running.");
     return;
   }

   const newNotification = {
     id: `notif-${Date.now()}`,
     title: "Manual Lead Registered",
     description: `${addName} added directly under ${addTech} specialization.`,
     type: 'new_lead',
     createdAt: new Date().toISOString(),
     read: false
   };
   onUpdateNotifications([newNotification, ...notifications]);

   setAddName('');
   setAddEmail('');
   setAddPhone('');
   setAddMsg('');
   setIsAddLeadOpen(false);
};

  // Update lead status & add event timeline
  const handleStatusUpdate = (leadId, nextStatus) => {
    const updated = leads.map(l => {
      if (l.leadId === leadId) {
        const prevStatus = l.status;
        if (prevStatus === nextStatus) return l;

        const timelineEvent = {
          id: `t-sys-${Date.now()}`,
          type: 'status_change',
          title: `Status Changed: ${nextStatus}`,
          description: `Lead progression updated from ${prevStatus} to ${nextStatus}.`,
          createdAt: new Date().toISOString(),
          performedBy: "Sarah Jenkins"
        };

        return {
          ...l,
          status: nextStatus,
          timeline: [timelineEvent, ...l.timeline]
        };
      }
      return l;
    });

    onUpdateLeads(updated, leadId, nextStatus);
    
    // Update selected lead view if active
    if (selectedLead && selectedLead.leadId === leadId) {
      const match = updated.find(l => l.leadId === leadId);
      if (match) setSelectedLead(match);
    }

    // Trigger Notification for target stage
    if (nextStatus === LeadStatus.CONVERTED) {
      const parentLead = leads.find(l => l.leadId === leadId);
      const newNotif = {
        id: `notif-stage-${Date.now()}`,
        title: "Lead Converted Successfully",
        description: `${parentLead?.fullName || 'Candidate'} converted to course batch. Syllabus logs dispatched.`,
        type: 'converted',
        createdAt: new Date().toISOString(),
        read: false
      };
      onUpdateNotifications([newNotif, ...notifications]);
    }
  };

  // Assign/re-assign Counselor to Lead
  const handleAssignCounselor = (leadId, counselorName) => {
    const updated = leads.map(l => {
      if (l.leadId === leadId) {
        const prevC = l.assignedCounselor || 'None';
        if (prevC === counselorName) return l;

        const timelineEvent = {
          id: `t-sys-counselor-${Date.now()}`,
          type: 'note_added',
          title: `Counselor Assigned: ${counselorName}`,
          description: `Folder coordination owner changed from ${prevC} to ${counselorName}.`,
          createdAt: new Date().toISOString(),
          performedBy: "Sarah Jenkins"
        };

        return {
          ...l,
          assignedCounselor: counselorName,
          timeline: [timelineEvent, ...l.timeline]
        };
      }
      return l;
    });

    onUpdateLeads(updated);
    if (selectedLead && selectedLead.leadId === leadId) {
      const match = updated.find(l => l.leadId === leadId);
      if (match) setSelectedLead(match);
    }
  };

  // Dispatch custom CRM follow-up event
  const handleAddFollowUpNote = (e) => {
    e.preventDefault();
    if (!selectedLead || !newFollowUpText.trim()) return;

    const timestamp = new Date().toISOString();
    const eventId = `timeline-${Date.now()}`;
    const noteId = `note-${Date.now()}`;

    const newNote = {
      id: noteId,
      text: newFollowUpText.trim(),
      createdAt: timestamp,
      author: "Sarah Jenkins"
    };

    const newEvent = {
      id: eventId,
      type: 'note_added',
      title: "Follow-up Feedback Captured",
      description: newFollowUpText.trim(),
      createdAt: timestamp,
      performedBy: "Sarah Jenkins"
    };

    const updatedLeads = leads.map(l => {
      if (l.leadId === selectedLead.leadId) {
        const updatedStatus = newFollowUpStatus || l.status;
        const timelineList = [newEvent];
        
        if (updatedStatus !== l.status) {
          timelineList.unshift({
            id: `timeline-status-${Date.now()}`,
            type: 'status_change',
            title: `Status Progressed: ${updatedStatus}`,
            description: `Transited state during follow up action.`,
            createdAt: timestamp,
            performedBy: "Sarah Jenkins"
          });
        }

        return {
          ...l,
          status: updatedStatus,
          notes: [...l.notes, newNote],
          timeline: [...timelineList, ...l.timeline]
        };
      }
      return l;
    });

    const changedStatus = newFollowUpStatus || null;
    onUpdateLeads(updatedLeads, selectedLead.leadId, changedStatus || undefined);
    
    
    // Sync active selection view
    const latestSelected = updatedLeads.find(l => l.leadId === selectedLead.leadId);
    if (latestSelected) setSelectedLead(latestSelected);

    // Reset fields
    setNewFollowUpText('');
    setNewFollowUpStatus('');
  };

  // Schedule future candidate follow-up engagement
  const handleScheduleFollowUp = (e) => {
    e.preventDefault();
    const targetLeadId = schedLeadId || (leads[0]?.leadId);
    if (!targetLeadId) return;

    const targetLead = leads.find(l => l.leadId === targetLeadId);
    if (!targetLead) return;

    const timestamp = new Date().toISOString();
    const eventId = `timeline-sched-${Date.now()}`;

    const newEvent = {
      id: eventId,
      type: 'note_added',
      title: `Scheduled ${schedType}`,
      description: `Follow-up planned for ${new Date(schedDate).toLocaleDateString()}. Notes: ${schedNotes.trim() || 'None'}.`,
      createdAt: timestamp,
      performedBy: "Sarah Jenkins"
    };

    const updatedLeads = leads.map(l => {
      if (l.leadId === targetLeadId) {
        return {
          ...l,
          timeline: [newEvent, ...l.timeline]
        };
      }
      return l;
    });

    onUpdateLeads(updatedLeads);

    // Add alarm alert notification
    const newNotif = {
      id: `notif-sched-${Date.now()}`,
      title: "New Follow-Up Scheduled",
      description: `${schedType} scheduled with ${targetLead.fullName} on ${new Date(schedDate).toLocaleDateString()}.`,
      type: 'reminder',
      createdAt: timestamp,
      read: false
    };
    onUpdateNotifications([newNotif, ...notifications]);

    // Show success alert toast
    setSchedSuccess(`Successfully scheduled ${schedType} with ${targetLead.fullName} for ${schedDate}!`);
    setTimeout(() => setSchedSuccess(''), 5000);

    // Reset notes
    setSchedNotes('');
  };

  // Toast helper — shows inline notification instead of browser alert()
  const showToast = (msg, type = "success") => {
    setActionToast({ show: true, msg, type });
    setTimeout(() => setActionToast({ show: false, msg: "", type: "success" }), 4000);
  };

  // Email Template compile helper (replaces double bracket slots dynamically)
  const compileTemplate = (body, candidate) => {
    return body
      .replace(/\{\{name\}\}/g, candidate.fullName)
      .replace(/\{\{technology\}\}/g, candidate.interestedTechnology)
      .replace(/\{\{phone\}\}/g, candidate.mobileNumber)
      .replace(/\{\{mode\}\}/g, candidate.trainingMode);
  };

// Real email dispatch — calls backend API, falls back to mailto
  const simulateEmailDispatch = async (tplId) => {
    if (!selectedLead) return;
    const template = templates.find(t => t.id === tplId);
    if (!template) return;

    const compiledSubject = compileTemplate(template.subject, selectedLead);
    const compiledBody = compileTemplate(template.body, selectedLead);

    try {
      const creds = sessionStorage.getItem('admin_creds');
      const res = await fetch(`${apiBase}/api/admin/leads/${selectedLead.leadId}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(creds ? { 'Authorization': `Basic ${creds}` } : {})
        },
        body: JSON.stringify({ subject: compiledSubject, body: compiledBody, templateId: tplId })
      });
      if (res.ok) {
        showToast(`✅ Email sent to ${selectedLead.email} — Subject: "${compiledSubject}"`, "success");
      } else {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selectedLead.email)}&su=${encodeURIComponent(compiledSubject)}&body=${encodeURIComponent(compiledBody)}`;
window.open(gmailUrl, '_blank');
showToast(`📧 Gmail opened for ${selectedLead.email}`, "success");
        showToast(`📧 Email client opened for ${selectedLead.email}`, "success");
      }
    } catch (err) {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selectedLead.email)}&su=${encodeURIComponent(compiledSubject)}&body=${encodeURIComponent(compiledBody)}`;
window.open(gmailUrl, '_blank');
showToast(`📧 Gmail opened for ${selectedLead.email}`, "success");
      showToast(`📧 Email client opened for ${selectedLead.email}`, "success");
    }

    const timestamp = new Date().toISOString();
    const emailEvent = {
      id: `tpl-dispatch-${Date.now()}`,
      type: 'email_sent',
      title: `Email Sent: ${template.name}`,
      description: `Sent to ${selectedLead.email} — Subject: "${compiledSubject}"`,
      createdAt: timestamp,
      performedBy: "Sarah Jenkins"
    };

    const updated = leads.map(l => {
      if (l.leadId === selectedLead.leadId) {
        return { ...l, timeline: [emailEvent, ...l.timeline] };
      }
      return l;
    });
    onUpdateLeads(updated);
    const match = updated.find(l => l.leadId === selectedLead.leadId);
    if (match) setSelectedLead(match);
  };

  // Real WhatsApp — actually opens WhatsApp Web/App with pre-filled message
  const simulateWhatsAppAction = () => {
    if (!selectedLead) return;

    let mobile = selectedLead.mobileNumber.replace(/[\s\-]/g, '');
    if (!mobile.startsWith('+')) {
      mobile = mobile.startsWith('91') ? `+${mobile}` : `+91${mobile}`;
    }

    const textMsg = `Hello ${selectedLead.fullName}, this is Sarah from Moriah Tech Labs! 🎓

We received your inquiry for *${selectedLead.interestedTechnology}* (${selectedLead.trainingMode} mode).

Our expert counselor would love to connect and walk you through the project-based curriculum, batch schedule, and placement support.

📞 When would be a convenient time to speak?

— Moriah Tech Labs Team`;

    const whatsappUrl = `https://wa.me/${mobile.replace('+', '')}?text=${encodeURIComponent(textMsg)}`;
    window.open(whatsappUrl, '_blank');

    const timestamp = new Date().toISOString();
    const wpEvent = {
      id: `wp-dispatch-${Date.now()}`,
      type: 'note_added',
      title: 'WhatsApp Message Sent',
      description: `WhatsApp opened for ${selectedLead.mobileNumber} — ${selectedLead.interestedTechnology} inquiry.`,
      createdAt: timestamp,
      performedBy: "Sarah Jenkins"
    };

    const updated = leads.map(l => {
      if (l.leadId === selectedLead.leadId) {
        return { ...l, timeline: [wpEvent, ...l.timeline] };
      }
      return l;
    });
    onUpdateLeads(updated);
    const match = updated.find(l => l.leadId === selectedLead.leadId);
    if (match) setSelectedLead(match);

    showToast(`✅ WhatsApp opened for ${selectedLead.fullName} (${mobile})`, "success");
  };

  // Save changes to email templates
  const handleSaveTemplate = (e) => {
    e.preventDefault();
    const updated = templates.map(t => {
      if (t.id === selectedTemplateId) {
        return {
          ...t,
          subject: editedSubject,
          body: editedBody
        };
      }
      return t;
    });

    onUpdateTemplates(updated);
    setTemplateSuccessMessage("Template modifications saved successfully!");
    setTimeout(() => setTemplateSuccessMessage(''), 3000);
  };

  // Export Leads – tries backend CSV endpoint first, falls back to local build
  const handleCSVExport = async () => {
    if (leads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    try {
      const creds = sessionStorage.getItem('admin_creds');
      const res = await fetch(`${apiBase}/api/admin/leads/export`, {
        headers: creds ? { 'Authorization': `Basic ${creds}` } : {}
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `moriahtechlabs_leads_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return;
      }
    } catch (_) { /* fall through to local CSV */ }

    // Local CSV fallback
    const headers = ["Lead ID", "Full Name", "Email", "Phone", "Qualification", "Technology Interest", "Mode", "Source", "Status", "Created At", "Assigned Counselor"];
    const rows = leads.map(l => [
      l.leadId,
      `"${(l.fullName || '').replace(/"/g, '""')}"`,
      l.email,
      `'${l.mobileNumber}`,
      l.qualification,
      `"${l.interestedTechnology}"`,
      l.trainingMode,
      l.source,
      l.status,
      l.createdAt,
      l.assignedCounselor
    ]);
    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", encodedUri);
    downloadAnchor.setAttribute("download", `moriahtechlabs_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  // Clear or dismiss system alerts
  const handleDismissNotification = (id) => {
    const updated = notifications.map(n => {
      if (n.id === id) return { ...n, read: true };
      return n;
    });
    onUpdateNotifications(updated);
  };

  // CRM Analytics Metrics (re-computed upon leads updates)
  const stats = useMemo(() => {
    const total = leads.length;
    const nw = leads.filter(l => l.status === LeadStatus.NEW).length;
    const converted = leads.filter(l => l.status === LeadStatus.CONVERTED).length;
    const rate = total > 0 ? Math.round((converted / total) * 100) : 0;
    
   // Today's count — dynamic, always reflects actual current date
    const todayStr = new Date().toISOString().split("T")[0];
    const todayCount = leads.filter(l => l.createdAt.startsWith(todayStr)).length;

    // Monthly count — dynamic
    const monthlyStr = new Date().toISOString().slice(0, 7);
    const monthlyCount = leads.filter(l => l.createdAt.startsWith(monthlyStr)).length;

    // Source breakdown details
    const sources = {
      Website: leads.filter(l => l.source === 'Website').length,
      GoogleAds: leads.filter(l => l.source.includes('Google')).length,
      Facebook: leads.filter(l => l.source === 'Facebook').length,
      Manual: leads.filter(l => l.source === 'Manual').length,
    };

    // Tech interest counts
    const techInterests = {};
    leads.forEach(l => {
      const tech = l.interestedTechnology;
      techInterests[tech] = (techInterests[tech] || 0) + 1;
    });

    return {
      total,
      newLeads: nw,
      conversionRate: rate,
      todayLeads: todayCount,
      monthlyLeads: monthlyCount,
      sources,
      technologyInterest: techInterests
    };
  }, [leads]);

  // Filter and Search mechanism for CRM Table list
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = 
        l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.mobileNumber.includes(searchQuery);

      const matchesTech = techFilter === 'All' || l.interestedTechnology === techFilter;
      const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
      const matchesMode = modeFilter === 'All' || l.trainingMode === modeFilter;

      let matchesDate = true;
      const now = new Date();
      const todayDate = now.toISOString().split("T")[0];
      const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split("T")[0];
      const thisMonthStr = now.toISOString().slice(0, 7);
      if (dateFilter === 'Today') {
        matchesDate = l.createdAt.startsWith(todayDate);
      } else if (dateFilter === 'Yesterday') {
        matchesDate = l.createdAt.startsWith(yesterdayDate);
      } else if (dateFilter === 'ThisMonth') {
        matchesDate = l.createdAt.startsWith(thisMonthStr);
      }

      return matchesSearch && matchesTech && matchesStatus && matchesMode && matchesDate;
    });
  }, [leads, searchQuery, techFilter, statusFilter, modeFilter, dateFilter]);

  // Render Authentication screen beforehand if unauthorized
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative font-sans">
        <div className="absolute top-4 left-4">
          <button 
            onClick={onNavigateHome}
            className="text-xs font-mono font-bold text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg hover:text-white transition-colors cursor-pointer"
          >
            ← Public site
          </button>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4">
          <div className="flex items-center justify-center mx-auto mb-2 select-none">
            <img 
              src="/src/assets/images/logo.png" 
              alt="Moriah Tech Labs" 
              className="h-40 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-center text-3xl font-heading font-extrabold text-white">Moriah Tech Labs Admin Portal</h2>
          <p className="text-center text-xs text-slate-400 font-mono">Simulated Lead Management CRM Platform</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-800 py-8 px-4 shadow-xl border border-slate-700 rounded-2xl sm:px-10 space-y-6">
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              {loginError && (
                <div className="p-3 rounded-lg bg-red-900/30 border border-red-500 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                  placeholder="admin"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                  placeholder="admin"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-md shadow-blue-500/10 cursor-pointer text-center font-heading transition-colors mt-6"
              >
                Access Admin Desk
              </button>
            </form>

            <div className="pt-4 border-t border-slate-700 text-center text-xs text-slate-450 font-mono">
              <span className="text-amber-400">Demo Access Enabled</span>
              <p className="mt-1">Credentials: <strong className="text-white bg-slate-900 px-1.5 py-0.5 rounded">admin</strong> | Password: <strong className="text-white bg-slate-900 px-1.5 py-0.5 rounded">admin</strong></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* Admin Top bar */}
      <header className="bg-slate-900 text-white py-3 px-4 sm:px-6 lg:px-8 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/src/assets/images/logo.png" 
            alt="Moriah Tech Labs" 
            className="h-20 w-30 object-contain"
            referrerPolicy="no-referrer"
          />
          <div>
            <span className="font-heading font-extrabold text-base tracking-tight text-white flex items-center gap-1">
              <span>Moriah Tech Labs</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700">CRM workspace</span>
            </span>
            <p className="text-[9px] font-mono text-slate-400 leading-none">Logged in as Admin</p>
          </div>
        </div>

        {/* Action hubs */}
        <div className="flex items-center gap-3">
          {/* Back to public site */}
          <button 
            onClick={onNavigateHome}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg font-mono flex items-center gap-1 border border-slate-700"
          >
            <span>Public Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* New manual lead trigger */}
          <button 
            onClick={() => setIsAddLeadOpen(true)}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>

          {/* Logout */}
          <button 
            onClick={() => {
              setIsAuthenticated(false);
              setSelectedLead(null);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            title="Log Out"
            
          >
            <LogOut className="w-9 h-9" />
          </button>
          
        </div>
      </header>

      {/* Main Admin Workspace Columns */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Left Sidebar */}
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-4 space-y-2 flex flex-row md:flex-col justify-start md:justify-items-stretch" id="admin_nav_sidebar">
          {/* Sidebar Menu - Tabs */}
          <div className="flex flex-wrap md:flex-col gap-1.5 w-full">
            <button 
              onClick={() => { setActiveTab('dashboard'); setSelectedLead(null); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Metrics Overview</span>
            </button>

            <button 
              onClick={() => { setActiveTab('leads'); setSelectedLead(null); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${activeTab === 'leads' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Users className="w-4 h-4" />
              <span className="flex-1">Leads Manager</span>
              <span className="text-[10px] font-mono px-1.5 rounded bg-slate-100 font-bold text-slate-500">
                {leads.length}
              </span>
            </button>

            <button 
              onClick={() => { setActiveTab('templates'); setSelectedLead(null); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${activeTab === 'templates' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Mail className="w-4 h-4" />
              <span>Email Templates</span>
            </button>

            <button 
              onClick={() => { setActiveTab('notifications'); setSelectedLead(null); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Bell className="w-4 h-4" />
              <span className="flex-1">System Alerts</span>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="text-[10px] font-mono px-1.5 rounded bg-red-100 font-bold text-red-600 animate-pulse">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            <button 
              onClick={() => { setActiveTab('followups'); setSelectedLead(null); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${activeTab === 'followups' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
              id="followup_tab_btn"
            >
              <Calendar className="w-4 h-4" />
              <span>Follow-Up Planner</span>
            </button>
          </div>
        </aside>

        {/* Center Main Stage Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-x-hidden">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-slate-900">CRM Dashboard</h2>
                  <p className="text-xs text-slate-800 font-mono">
                  Live synchronization feed | Checked {new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
                </div>
                {/* Manual csv export shortcut */}
                <button 
                  onClick={handleCSVExport}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700 transition"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Export CSV Log</span>
                </button>
              </div>

              {/* Dynamic Stats Widget grid */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Widget 1: Total */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500">Total Leads</span>
                      <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">{stats.total}</span>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono mt-3">From all campaign sources</div>
                </div>

                {/* Widget 2: New today */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500 font-bold text-amber-650">New Leads</span>
                      <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">{stats.newLeads}</span>
                    </div>
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                      <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                  </div>
                  <div className="text-[10px] text-amber-600 font-mono mt-3 font-semibold">Immediate attention required</div>
                </div>

                {/* Widget 3: Conversion */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500">Conversion Rate</span>
                      <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">{stats.conversionRate}%</span>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                      <UserCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-mono mt-3 font-semibold">↑ Verified course admissions</div>
                </div>

                {/* Widget 4: Today submissions */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500">Today's Leads</span>
                      <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600 mt-1">{stats.todayLeads}</span>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono mt-3">Daily registrations batch</div>
                </div>

                {/* Widget 5: Monthly Leads */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500">Monthly Leads</span>
                      <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-indigo-600 mt-1">{stats.monthlyLeads}</span>
                    </div>
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono mt-3">Monthly cycle aggregation</div>
                </div>
              </div>

              {/* Analytical Charts Row (Beside-Beside layout represented neatly in SVG/HTML) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Lead Sources breakdown donut */}
                <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="font-heading font-bold text-sm text-slate-900">Leads by Campaign Source</h4>
                  
                  {/* Visually stunning circle visualization */}
                  <div className="relative flex justify-center py-6">
                    <svg className="w-36 h-36" viewBox="0 0 36 36">
                      {/* Grey Circle backdrop */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                      
                      {/* Semi arcs representing shares */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="40 100" strokeDashoffset="0" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="30 100" strokeDashoffset="-40" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="20 100" strokeDashoffset="-70" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="10 100" strokeDashoffset="-90" />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-heading font-bold text-slate-900">{stats.total}</span>
                      <span className="text-[10px] font-mono text-slate-400">Total Leads</span>
                    </div>
                  </div>

                  {/* Custom Labels list */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" /><span>Website Portals</span></span>
                      <span className="font-mono font-bold text-slate-700">{stats.sources.Website} ({Math.round(stats.sources.Website / (stats.total || 1) * 100)}%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span>Google Campaign</span></span>
                      <span className="font-mono font-bold text-slate-700">{stats.sources.GoogleAds} ({Math.round(stats.sources.GoogleAds / (stats.total || 1) * 100)}%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /><span>Facebook Leads</span></span>
                      <span className="font-mono font-bold text-slate-700">{stats.sources.Facebook} ({Math.round(stats.sources.Facebook / (stats.total || 1) * 100)}%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span>Manual entry</span></span>
                      <span className="font-mono font-bold text-slate-700">{stats.sources.Manual} ({Math.round(stats.sources.Manual / (stats.total || 1) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Right: Technology Interest Stats */}
                <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="font-heading font-bold text-sm text-slate-900">Track Demand Spectrum</h4>
                  
                  {/* Dynamic horizontal metrics block */}
                  <div className="space-y-3.5 pt-2">
                    {Object.entries(stats.technologyInterest).length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No registrations processed yet.</p>
                    ) : (
                      Object.entries(stats.technologyInterest).map(([tech, count], i) => {
                        const countNum = Number(count);
                        const pct = Math.round((countNum / stats.total) * 100);
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold text-slate-700">{tech}</span>
                              <span className="font-mono text-slate-500 font-bold">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded bg-slate-100 overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 rounded transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Leads Table Panel */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-slate-900">Recent Leads Activity log</h4>
                  <button 
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold text-blue-650 hover:text-blue-800 flex items-center gap-1 hover:underline"
                  >
                    <span>View all leads</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 border-b text-slate-500 uppercase tracking-wider font-mono">
                      <tr>
                        <th className="p-3.5 pl-6 font-semibold text-slate-600">Candidate Name</th>
                        <th className="p-3.5 font-semibold text-slate-600">Interested Technology</th>
                        <th className="p-3.5 font-semibold text-slate-600">Mode / Source</th>
                        <th className="p-3.5 font-semibold text-slate-600">Status Badge</th>
                        <th className="p-3.5 pr-6 font-semibold text-slate-600">Registration Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads.slice(0, 4).map((l, idx) => (
                        <tr 
                          key={idx} 
                          className="hover:bg-slate-50/60 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedLead(l);
                            setActiveTab('leads');
                          }}
                        >
                          <td className="p-3.5 pl-6 font-semibold text-slate-900">
                            <div>
                              <span>{l.fullName}</span>
                              <span className="block text-[10px] text-slate-450 font-normal">{l.email}</span>
                            </div>
                          </td>
                          <td className="p-3.5 font-medium">{l.interestedTechnology}</td>
                          <td className="p-3.5">
                            <span className="font-mono text-[10px] text-indigo-750 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded leading-none mr-2">
                              {l.trainingMode}
                            </span>
                            <span className="text-[10px] text-slate-500">{l.source}</span>
                          </td>
                          <td className="p-3.5">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              l.status === LeadStatus.NEW ? 'bg-blue-100 text-blue-800' :
                              l.status === LeadStatus.CONTACTED ? 'bg-amber-100 text-amber-800' :
                              l.status === LeadStatus.QUALIFIED ? 'bg-purple-100 text-purple-800' :
                              l.status === LeadStatus.CONVERTED ? 'bg-emerald-100 text-emerald-800' :
                              'bg-slate-200 text-slate-800'
                            }`}>
                              {l.status}
                            </span>
                          </td>
                          <td className="p-3.5 pr-6 text-slate-400 font-mono">
                            {new Date(l.createdAt).toLocaleDateString()} {new Date(l.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS LIST / CRM MANAGER & DETAILS WRAPPERS */}
          {activeTab === 'leads' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
              
              {/* Left sidebar or main table (Grid split dynamically if details view is open!) */}
              <div className={`${selectedLead ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <h2 className="font-heading font-extrabold text-2xl text-slate-900">Leads Management Library</h2>
                    <p className="text-xs text-slate-700 font-mono">Filter, coordinate, and logs candidate status</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleCSVExport}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-slate-300 rounded bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Export CSV</span>
                    </button>
                    <button 
                      onClick={() => setIsAddLeadOpen(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Lead</span>
                    </button>
                  </div>
                </div>

                {/* Filters Row Component */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Free word search */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute top-2.5 left-3" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search candidates by name, email, phone..."
                        className="w-full pl-9 pr-4 py-2 text-xs rounded border border-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {/* Tech select filter */}
                      <div>
                        <select 
                          value={techFilter} 
                          onChange={e => setTechFilter(e.target.value)}
                          className="px-2 py-2 text-xs rounded border border-slate-400 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="All">All Tracks</option>
                          <option value="Java Full Stack">Java Full Stack</option>
                          <option value="Spring Boot">Spring Boot</option>
                          <option value="React">React</option>
                          <option value="Angular">Angular</option>
                          <option value="AWS">AWS</option>
                          <option value="Docker">Docker</option>
                          <option value="DevOps">DevOps</option>
                          <option value="Python">Python</option>
                        </select>
                      </div>

                      {/* Status select filter */}
                      <div>
                        <select 
                          value={statusFilter} 
                          onChange={e => setStatusFilter(e.target.value)}
                          className="px-2 py-2 text-xs rounded border border-slate-400 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="All">All Statuses</option>
                          <option value={LeadStatus.NEW}>New</option>
                          <option value={LeadStatus.CONTACTED}>Contacted</option>
                          <option value={LeadStatus.QUALIFIED}>Qualified</option>
                          <option value={LeadStatus.CONVERTED}>Converted</option>
                          <option value={LeadStatus.CLOSED}>Closed</option>
                        </select>
                      </div>

                      {/* Mode Filter */}
                      <div>
                        <select 
                          value={modeFilter} 
                          onChange={e => setModeFilter(e.target.value)}
                          className="px-2 py-2 text-xs rounded border border-slate-400 bg-white text-slate-700 focus:outline-none"
                        >
                          <option value="All">All Formats</option>
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </div>

                      {/* Date Filter */}
                      <div>
                        <select 
                          value={dateFilter} 
                          onChange={e => setDateFilter(e.target.value)}
                          className="px-2 py-2 text-xs rounded border border-slate-400 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="All">All Dates</option>
                          <option value="Today font-bold">Today</option>
                          <option value="Yesterday">Yesterday</option>
                          <option value="ThisMonth">This Month</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-[#f8fafc] border-b text-slate-500 uppercase tracking-widest font-mono">
                        <tr>
                          <th className="p-3 pl-4 font-semibold">Name</th>
                          <th className="p-3 font-semibold">Email & Phone</th>
                          <th className="p-3 font-semibold">Specialization</th>
                          <th className="p-3 font-semibold">Source</th>
                          <th className="p-3 font-semibold">Status</th>
                          <th className="p-3 pr-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                              No matching registered candidates found. Adjust search flags.
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((l, i) => (
                            <tr 
                              key={i} 
                              onClick={() => setSelectedLead(l)}
                              className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${selectedLead?.leadId === l.leadId ? 'bg-blue-50/50' : ''}`}
                            >
                              <td className="p-3 pl-4">
                                <span className="font-semibold text-slate-900 block leading-tight">{l.fullName}</span>
                                <span className="text-[10px] font-mono text-slate-450">ID: #{l.leadId}</span>
                              </td>
                              <td className="p-3">
                                <div className="text-slate-900 leading-snug">{l.email}</div>
                                <div className="text-[10px] text-slate-600 font-mono">{l.mobileNumber}</div>
                              </td>
                              <td className="p-3">
                                <div className="font-medium text-slate-700 leading-tight">{l.interestedTechnology}</div>
                                <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-100 px-1 rounded-sm">
                                  {l.trainingMode}
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="text-[10px] text-slate-800 font-mono">{l.source || 'Website'}</span>
                              </td>
                              <td className="p-3">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  l.status === LeadStatus.NEW ? 'bg-blue-100 text-blue-800' :
                                  l.status === LeadStatus.CONTACTED ? 'bg-amber-100 text-amber-800' :
                                  l.status === LeadStatus.QUALIFIED ? 'bg-purple-100 text-purple-800' :
                                  l.status === LeadStatus.CONVERTED ? 'bg-emerald-100 text-emerald-800' :
                                  'bg-slate-200 text-slate-800'
                                }`}>
                                  {l.status}
                                </span>
                              </td>
                              <td className="p-3 pr-4 text-right">
                                <div className="inline-flex gap-2">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedLead(l);
                                    }}
                                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-[10px] font-bold transition-all"
                                  >
                                    View
                                  </button>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedLead(l);
                                      // Focus note taking or state change
                                    }}
                                    className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-[10px] font-bold transition-all"
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Export single row CSV
                                      const headers = ["ID", "Name", "Email", "Phone", "Qualification", "Technology", "Mode", "Status", "Source"];
                                      const row = [l.leadId, l.fullName, l.email, l.mobileNumber, l.qualification, l.interestedTechnology, l.trainingMode, l.status, l.source || 'Website'];
                                      const csv = "data:text/csv;charset=utf-8," + [headers.join(","), row.map(v => `"${v}"`).join(",")].join("\n");
                                      const uri = encodeURI(csv);
                                      const link = document.createElement("a");
                                      link.setAttribute("href", uri);
                                      link.setAttribute("download", `moriah_lead_${l.fullName.replace(/\s+/g, '_')}.csv`);
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                    }}
                                    className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded text-[10px] font-bold transition-all"
                                  >
                                    Export
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* CRM RIGHT DETAILS COLLAPSIBLE WRAPPER */}
              <AnimatePresence>
                {selectedLead && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="lg:col-span-5 bg-white border border-slate-200 rounded-xl shadow-lg p-5 space-y-6"
                    id="lead_coordinator_sidebar"
                  >
                    {/* Header bar controls */}
                    <div className="flex justify-between items-start border-b pb-3">
                      <div>
                        <span className="text-[9px] uppercase font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                          ID: #{selectedLead.leadId}
                        </span>
                        <h3 className="font-heading font-extrabold text-lg text-slate-900 mt-1 leading-snug">{selectedLead.fullName}</h3>
                        <p className="text-xs text-slate-500 font-mono">Status: <strong className="text-blue-700">{selectedLead.status}</strong></p>
                      </div>
                      <button 
                        onClick={() => setSelectedLead(null)}
                        className="p-1 border border-slate-200 rounded hover:bg-slate-50 font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Stage Status update selector */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-700 font-mono">Advance Pipeline stage</label>
                      <div className="grid grid-cols-5 gap-1">
                        {Object.values(LeadStatus).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleStatusUpdate(selectedLead.leadId, st)}
                            className={`px-1 py-1.5 rounded text-[9px] font-bold border transition ${
                              selectedLead.status === st 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                   {/* Quick launcher action buttons */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-700 font-mono">Immediate coordination actions</label>

                      {/* Inline toast — replaces browser alert() */}
                      {actionToast.show && (
                        <div className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border ${actionToast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{actionToast.msg}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        {/* WhatsApp — actually opens wa.me */}
                        <button 
                          onClick={simulateWhatsAppAction}
                          className="px-3 py-2 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-600" />
                          <span>WhatsApp Candidate</span>
                        </button>

                        {/* Brochure — opens mailto or backend */}
                        <button 
                          onClick={() => simulateEmailDispatch('tpl_brochure')}
                          className="px-3 py-2 text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg border border-blue-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span>Send Brochure Email</span>
                        </button>
                      </div>
                      
                      {/* Thank You email */}
                      <button 
                        onClick={() => simulateEmailDispatch('tpl_thank_you')}
                        className="w-full px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg text-center flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <SendHorizontal className="w-3.5 h-3.5" />
                        <span>Send Welcome Thank-You Email</span>
                      </button>
                    </div>

                    {/* Demographics spec sheet */}
                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold font-mono text-slate-500 uppercase">Information log details</h4>
                      
                      <div className="grid grid-cols-2 gap-y-2 text-xs">
                        <div>
                          <span className="text-slate-400">Mobile Phone:</span>
                          <p className="font-semibold text-slate-800 font-mono mt-0.5">{selectedLead.mobileNumber}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Email Address:</span>
                          <p className="font-semibold text-slate-800 mt-0.5 break-all">{selectedLead.email}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 font-medium font-sans">Technology Interest:</span>
                          <p className="font-semibold text-slate-800 mt-0.5">{selectedLead.interestedTechnology}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 font-medium">Highest Academics:</span>
                          <p className="font-semibold text-slate-800 mt-0.5">{selectedLead.qualification}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 font-medium font-sans">Funnels Source:</span>
                          <p className="font-semibold text-slate-800 mt-0.5">{selectedLead.source}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 font-medium">Counselor:</span>
                          <select
                            value={selectedLead.assignedCounselor || ''}
                            onChange={(e) => handleAssignCounselor(selectedLead.leadId, e.target.value)}
                            className="w-full mt-0.5 p-1 text-[11px] rounded border border-slate-300 bg-white text-slate-700 focus:outline-none"
                          >
                            <option value="">Select Counselor</option>
                            <option value="Sarah Jenkins">Sarah Jenkins</option>
                            <option value="Amit Verma">Amit Verma</option>
                            <option value="Rahul Kumar">Rahul Kumar</option>
                            <option value="Sarah Smith">Sarah Smith</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2 border-t text-xs">
                        <span className="text-slate-500 font-medium">Original Inquiry Message:</span>
                        <p className="text-slate-700 italic mt-1 bg-white p-2 border rounded-lg max-h-20 overflow-y-auto leading-relaxed">
                          &ldquo;{selectedLead.message}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Counselor follow-up notes action form & logs */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold font-mono text-slate-600 uppercase">Add Counselor Touchpoint note</h4>
                      
                      <form onSubmit={handleAddFollowUpNote} className="space-y-3">
                        <textarea
                          placeholder="Type notes from call or scheduling comments..."
                          value={newFollowUpText}
                          onChange={e => setNewFollowUpText(e.target.value)}
                          rows={2}
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                          required
                        />

                        <div className="flex gap-2">
                          <select
                            value={newFollowUpStatus}
                            onChange={e => setNewFollowUpStatus(e.target.value)}
                            className="text-[11px] px-2 rounded border border-slate-300 bg-white text-slate-700 focus:outline-none"
                          >
                            <option value="">Retain Status</option>
                            <option value={LeadStatus.CONTACTED}>Mark Contacted</option>
                            <option value={LeadStatus.QUALIFIED}>Mark Qualified</option>
                            <option value={LeadStatus.CONVERTED}>Mark Converted</option>
                            <option value={LeadStatus.CLOSED}>Mark Closed</option>
                          </select>

                          <button
                            type="submit"
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Log note</span>
                          </button>
                        </div>
                      </form>

                      {/* Timeline Events list */}
                      <div className="space-y-3 pt-3 border-t border-slate-100 max-h-60 overflow-y-auto">
                        <h4 className="text-xs font-bold font-mono text-slate-500 uppercase">Interactive CRM Timeline</h4>
                        
                        <div className="relative pl-4 border-l border-slate-200 ml-1.5 space-y-4">
                          {selectedLead.timeline.map((ev, evIdx) => (
                            <div key={evIdx} className="relative text-xs">
                              {/* Glowing dot representing event */}
                              <div className={`absolute -left-[20.5px] top-1.5 w-3 h-3 rounded-full border-2 border-white ${
                                ev.type === 'creation' ? 'bg-blue-500' :
                                ev.type === 'status_change' ? 'bg-purple-500' :
                                ev.type === 'email_sent' ? 'bg-indigo-500' :
                                'bg-slate-500'
                              }`} />
                              <div className="flex justify-between items-start">
                                <span className="font-bold text-slate-900">{ev.title}</span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {new Date(ev.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-slate-600 italic leading-relaxed mt-0.5">{ev.description}</p>
                              <span className="text-[9px] text-slate-400 font-mono block mt-1">Logged by: {ev.performedBy}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 3: EMAIL TEMPLATE MANAGER */}
          {activeTab === 'templates' && (
            <div className="space-y-6 text-left">
              <div className="border-b pb-4">
                <h2 className="font-heading font-extrabold text-2xl text-slate-900">Email Notification Templates</h2>
                <p className="text-xs text-slate-600 font-mono">Design visual workflows &amp; verify dynamic slots replacements</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left block templates selector */}
                <div className="lg:col-span-4 bg-white rounded-xl border border-slate-300 shadow-sm p-4 space-y-3">
                  <h4 className="text-xs font-extrabold font-mono text-slate-500 uppercase tracking-widest pl-1 mb-2">Available templates</h4>
                  
                  <div className="space-y-1.5 flex flex-col">
                    {templates.map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => setSelectedTemplateId(tpl.id)}
                        className={`w-full p-3 rounded-lg text-xs font-semibold text-left border transition ${
                          selectedTemplateId === tpl.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{tpl.name}</span>
                        </div>
                        <p className={`text-[10px] font-normal truncate mt-1 ${selectedTemplateId === tpl.id ? 'text-blue-100' : 'text-slate-500'}`}>
                          {tpl.subject}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border text-xs text-slate-600 leading-relaxed font-sans">
                    <span className="font-bold text-slate-800">Dynamic Slots Supported:</span>
                    <p className="font-mono text-[10px] mt-1 space-y-1 text-slate-700">
                      <span className="block">{"{{name}}"} - Full candidate name</span>
                      <span className="block">{"{{technology}}"} - Chosen course track</span>
                      <span className="block">{"{{phone}}"} - Contact number index</span>
                      <span className="block">{"{{mode}}"} - Selected format modality</span>
                    </p>
                  </div>
                </div>

                {/* Right block active editor & live compiler preview side-by-side */}
                <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
                  <h4 className="font-heading font-bold text-slate-900 text-base">
                    Active Editor: <span className="text-blue-600">{templates.find(t => t.id === selectedTemplateId)?.name}</span>
                  </h4>

                  {templateSuccessMessage && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-350 text-emerald-800 text-xs font-semibold">
                      {templateSuccessMessage}
                    </div>
                  )}

                  <form onSubmit={handleSaveTemplate} className="space-y-4">
                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Subject line</label>
                      <input 
                        type="text" 
                        value={editedSubject}
                        onChange={e => setEditedSubject(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white leading-relaxed"
                        required
                      />
                    </div>

                    {/* Email body mark */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Message Text Body</label>
                      <textarea
                        value={editedBody}
                        onChange={e => setEditedBody(e.target.value)}
                        rows={8}
                        className="w-full p-3 text-xs bg-slate-900 text-slate-100 font-mono rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save template changes</span>
                      </button>
                    </div>
                  </form>

                  {/* Active candidate Live compiler preview block! */}
                  <div className="pt-5 border-t border-slate-200">
                    <h5 className="text-xs font-bold font-mono text-slate-600 uppercase mb-3">Live Compiler simulation frame</h5>
                    
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                      <div className="flex gap-1 items-center pb-2 border-b border-slate-200">
                        <span className="font-bold text-slate-600 font-mono w-20">PREVIEW ADMISSION LOG:  </span>
                        <span className="font-semibold text-slate-700">{leads[0]?.  fullName || 'No registered leads'} (Java Full Stack)</span>
                      </div>

                      <div className="space-y-2 pt-2 bg-white p-3 rounded-lg border text-slate-800">
                        <div className="font-semibold text-slate-800">
                          Subject: {compileTemplate(editedSubject, leads[0] || {})}
                        </div>
                        <div className="whitespace-pre-line text-slate-600 leading-relaxed border-t pt-2 max-h-52 overflow-y-auto font-sans">
                          {compileTemplate(editedBody, leads[0] || {})}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS LIST HISTORY */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 text-left">
              <div className="border-b pb-4 flex justify-between items-center">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-slate-900">System Notification Alerts log</h2>
                  <p className="text-xs text-slate-500 font-mono">Core action alerts generated dynamically from form actions</p>
                </div>
                {/* Clear all */}
                <button 
                  onClick={() => {
                    const dismissed = notifications.map(n => ({ ...n, read: true }));
                    onUpdateNotifications(dismissed);
                  }}
                  className="text-xs text-blue-650 hover:text-blue-800 font-semibold"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-3 max-w-2xl mx-auto">
                {notifications.length === 0 ? (
                  <p className="p-8 bg-white border rounded-xl text-center text-slate-400 italic">No alerts logged yet.</p>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 bg-white border rounded-xl shadow-sm flex items-start justify-between gap-3 transition-opacity ${notif.read ? 'opacity-60' : 'border-l-4 border-l-blue-600'}`}
                    >
                      <div className="flex gap-3 items-start text-xs">
                        {/* Bullet based on type */}
                        <div className={`p-2 rounded-lg mt-0.5 ${
                          notif.type === 'new_lead' ? 'bg-blue-50 text-blue-600' :
                          notif.type === 'converted' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-purple-50 text-purple-600'
                        }`}>
                          {notif.type === 'new_lead' ? <Users className="w-4 h-4" /> :
                           notif.type === 'converted' ? <CheckCircle className="w-4 h-4" /> :
                           <AlertCircle className="w-4 h-4" />}
                        </div>

                        <div>
                          <div className="font-heading font-bold text-slate-900 text-sm">{notif.title}</div>
                          <p className="text-slate-600 leading-relaxed mt-1">{notif.description}</p>
                          <span className="text-[10px] font-mono text-slate-400 block mt-2">
                            {new Date(notif.createdAt).toLocaleDateString()} {new Date(notif.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>

                      {!notif.read && (
                        <button
                          onClick={() => handleDismissNotification(notif.id)}
                          className="text-[10px] font-mono font-bold uppercase text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded cursor-pointer border hover:border-blue-200"
                        >
                          Dismiss
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: FOLLOW-UP PLANNER */}
          {activeTab === 'followups' && (
            <div className="space-y-6 text-left">
              <div className="border-b pb-4 flex justify-between items-center">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-slate-900">Follow-Up Coordination Dashboard</h2>
                  <p className="text-xs text-slate-600 font-mono">Plan prospective candidate interactions &amp; streamline pipeline stages</p>
                </div>
              </div>

              {/* Status indicator row summary boards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.values(LeadStatus).map((st, i) => {
                  const count = leads.filter(l => l.status === st).length;
                  return (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-450">{st}</span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-extrabold text-slate-900">{count}</span>
                        <span className="text-[9px] text-slate-800">candidates</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Side: Schedule Follow Up Form */}
                <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
                  <h3 className="font-heading font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Schedule Future Touchpoint</span>
                  </h3>

                  {schedSuccess && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium border border-emerald-150 animate-pulse">
                      {schedSuccess}
                    </div>
                  )}

                  <form onSubmit={handleScheduleFollowUp} className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="block text-slate-600 font-semibold font-mono">Target Candidate</label>
                      <select 
                        value={schedLeadId}
                        onChange={e => setSchedLeadId(e.target.value)}
                        className="w-full p-2 rounded border border-slate-300 focus:ring-1 focus:ring-blue-500 bg-white text-xs"
                        required
                      >
                        <option value="">-- Choose Candidate --</option>
                        {leads.map(l => (
                          <option key={l.leadId} value={l.leadId}>
                            {l.fullName} ({l.interestedTechnology})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="block text-slate-600 font-semibold font-mono">Scheduled Date</label>
                        <input 
                          type="date"
                          value={schedDate}
                          onChange={e => setSchedDate(e.target.value)}
                          className="w-full p-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-blue-500 bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-600 font-semibold font-mono">Contact channel</label>
                        <select
                          value={schedType}
                          onChange={e => setSchedType(e.target.value)}
                          className="w-full p-1.5 rounded border border-slate-300 focus:ring-1 focus:ring-blue-500 bg-white"
                        >
                          <option value="Phone Call">Phone Call</option>
                          <option value="WhatsApp Message">WhatsApp Message</option>
                          <option value="Email syllabus">Email syllabus</option>
                          <option value="LinkedIn InMail">LinkedIn InMail</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-600 font-semibold font-mono">Engagement notes plan</label>
                      <textarea
                        placeholder="Topics for touchpoint (placement check, syllabus review, course discount info...)"
                        value={schedNotes}
                        onChange={e => setSchedNotes(e.target.value)}
                        rows={3}
                        className="w-full p-2 rounded border border-slate-300 focus:ring-1 focus:ring-blue-500 bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-sm text-center transition-colors cursor-pointer text-xs"
                    >
                      Schedule Follow-Up Action
                    </button>
                  </form>
                </div>

                {/* Right Side: Follow-Up Timelines Board List */}
                <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
                  <h3 className="font-heading font-bold text-slate-900 text-sm border-b pb-2">
                    System Timeline Activities &amp; Planning 
                  </h3>

                  <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 relative pl-3 border-l-2 border-slate-100">
                    {/* Extract recent timeline events across all leads */}
                    {(() => {
                      const allEvents = leads.flatMap(l => 
                        (l.timeline || []).map(ev => ({
                          ...ev,
                          candidateName: l.fullName,
                          candidateId: l.leadId
                        }))
                      ).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                      if (allEvents.length === 0) {
                        return <p className="text-xs text-slate-400 italic">No touchprints processed yet.</p>;
                      }

                      return allEvents.slice(0, 16).map((ev, idx) => (
                        <div key={idx} className="relative text-xs group pb-1">
                          {/* Left bullet marker node */}
                          <div className={`absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full border border-white ${
                            ev.type === 'creation' ? 'bg-blue-600' :
                            ev.type === 'status_change' ? 'bg-purple-600' :
                            ev.type === 'email_sent' ? 'bg-indigo-600' :
                            'bg-amber-600'
                          }`} />
                          
                          <div className="flex justify-between items-start">
                            <span className="font-semibold text-slate-900">
                              {ev.title} &mdash; <span className="text-blue-600 hover:text-blue-800 underline cursor-pointer" onClick={() => {
                                // Find lead, focus views
                                const found = leads.find(l => l.leadId === ev.candidateId);
                                if (found) {
                                  setSelectedLead(found);
                                  setActiveTab('leads');
                                }
                              }}>{ev.candidateName}</span>
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {new Date(ev.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <p className="text-slate-600 italic mt-0.5 leading-relaxed">&ldquo;{ev.description}&rdquo;</p>
                          {/* <span className="text-[9px] text-slate-400 font-mono block mt-0.5">Logged: {ev.performedBy || 'Sarah Jenkins'}</span> */}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* QUICK ADD LEAD MODAL DIALOG */}
      <AnimatePresence>
        {isAddLeadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddLeadOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-w-lg w-full text-left overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="font-heading font-extrabold text-lg text-slate-900">Manually Register New Lead</h3>
                <button 
                  onClick={() => setIsAddLeadOpen(false)}
                  className="p-1 border rounded text-slate-400 hover:bg-slate-50"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleManualLeadAdd} className="space-y-4 text-xs sm:text-sm">
                {/* Full name */}
                <div>
                  <label htmlFor="manualFullName" className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase">Full Candidate Name *</label>
                  <input 
                    type="text" 
                    id="manualFullName"
                    value={addName}
                    onChange={e => setAddName(e.target.value)}
                    placeholder="Enter candidate real name"
                    className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-slate-900"
                    required
                  />
                </div>

                {/* Email and Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="manualEmail" className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase">Email Address *</label>
                    <input 
                      type="email" 
                      id="manualEmail"
                      value={addEmail}
                      onChange={e => setAddEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none bg-white text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="manualPhone" className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase">Contact Mobile Number *</label>
                    <input 
                      type="tel" 
                      id="manualPhone"
                      value={addPhone}
                      onChange={e => setAddPhone(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none bg-white text-slate-900"
                      required
                    />
                  </div>
                </div>

                {/* Tech and Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="manualTech" className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase">Specialization Stream</label>
                    <select
                      id="manualTech"
                      value={addTech}
                      onChange={e => setAddTech(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none bg-white"
                    >
                      <option value="Java Full Stack">Java Full Stack</option>
                      <option value="Spring Boot">Spring Boot Core</option>
                      <option value="React">React Native</option>
                      <option value="Angular">Angular Framework</option>
                      <option value="AWS">AWS Solution Architect</option>
                      <option value="Docker">Docker Containers</option>
                      <option value="DevOps">DevOps Pipeline logs</option>
                      <option value="Python">Python Scripts</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="manualMode" className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase">Delivery Mode</label>
                    <select
                      id="manualMode"
                      value={addMode}
                      onChange={e => setAddMode(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none bg-white"
                    >
                      <option value={TrainingMode.ONLINE}>Online Delivery</option>
                      <option value={TrainingMode.OFFLINE}>Offline Classroom</option>
                    </select>
                  </div>
                </div>

                {/* Qualification */}
                <div>
                  <label htmlFor="manualQual" className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase">Highest Qualification</label>
                  <select
                    id="manualQual"
                    value={addQual}
                    onChange={e => setAddQual(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="B.Tech">B.Tech / B.E.</option>
                    <option value="MCA">MCA</option>
                    <option value="BCA">BCA / Computer Science</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MBA">MBA</option>
                    <option value="Other">Non-IT</option>
                  </select>
                </div>

                {/* message query log */}
                <div>
                  <label htmlFor="manualMsg" className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase">Internal Comments / Remarks</label>
                  <textarea 
                    id="manualMsg"
                    value={addMsg}
                    onChange={e => setAddMsg(e.target.value)}
                    rows={2}
                    placeholder="Provide any additional logs, callback timings, or course demands..."
                    className="w-full p-2.5 rounded border border-slate-300 focus:outline-none bg-white text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-wider uppercase shadow-md text-center cursor-pointer transition-colors"
                >
                  Confirm Lead Registration
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
