/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * App.jsx – Moriah Tech Labs Lead Generation Platform
 * Integrated with Spring Boot backend at /api/*
 */

import React, { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import AdminPortal from './components/AdminPortal';
import {
  LeadStatus,
  TrainingMode,
  INITIAL_LEADS,
  INITIAL_TEMPLATES,
  INITIAL_NOTIFICATIONS
} from './types';
import { motion, AnimatePresence } from 'motion/react';

// ─── API base URL (change to your deployed backend URL in production) ─────────
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Helper: build Basic Auth header from stored creds
function getAdminHeaders() {
  const creds = sessionStorage.getItem('admin_creds');
  if (!creds) return { 'Content-Type': 'application/json' };
  return {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${creds}`
  };
}

export default function App() {
  // Navigation
  const [isAdminView, setIsAdminView] = useState(false);

  // Theme
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [theme]);

  // Core data states (seeded with sample data, replaced by API on admin load)
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [successLeadName, setSuccessLeadName] = useState(null);

  // ─── Fetch all leads from backend (called when admin logs in) ──────────────
  const fetchLeadsFromBackend = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/leads`, {
        headers: getAdminHeaders()
      });
      if (!res.ok) return; // silently fall back to local data
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        // Map backend response to the shape the frontend expects
        const mapped = json.data.map(l => ({
          leadId: l.leadId,
          fullName: l.fullName,
          email: l.email,
          mobileNumber: l.mobileNumber,
          qualification: l.qualification || '',
          interestedTechnology: l.interestedTechnology || '',
          trainingMode: l.trainingMode || 'Online',
          message: l.message || '',
          status: l.status || LeadStatus.NEW,
          source: l.source || 'Website',
          createdAt: l.createdAt,
          assignedCounselor: l.assignedCounselor || 'Sarah Jenkins',
          notes: [],
          timeline: [
            {
              id: `t-${l.leadId}`,
              type: 'creation',
              title: 'Inquiry Registration',
              description: `Registered for ${l.interestedTechnology} (${l.trainingMode}).`,
              createdAt: l.createdAt,
              performedBy: 'System Desk'
            }
          ]
        }));
        setLeads(mapped);
      }
    } catch (err) {
      console.warn('[API] Could not reach backend, using local data:', err.message);
    }
  }, []);

  // ─── Update lead status on backend ────────────────────────────────────────
  const patchLeadStatusOnBackend = useCallback(async (leadId, status) => {
    try {
      await fetch(`${API_BASE}/api/admin/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: getAdminHeaders(),
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.warn('[API] Status update failed (offline mode):', err.message);
    }
  }, []);

  // ─── Sync lead updates (local + backend status patch) ─────────────────────
  const handleUpdateLeads = useCallback((updatedLeads, changedLeadId, newStatus) => {
    setLeads(updatedLeads);
    // Persist locally as fallback
    try { localStorage.setItem('moriahtechlabs_leads', JSON.stringify(updatedLeads)); } catch (_) {}
    // Patch status on backend if we have the info
    if (changedLeadId && newStatus) {
      patchLeadStatusOnBackend(changedLeadId, newStatus);
    }
  }, [patchLeadStatusOnBackend]);

  const handleUpdateTemplates = (updatedTemplates) => {
    setTemplates(updatedTemplates);
    try { localStorage.setItem('moriahtechlabs_templates', JSON.stringify(updatedTemplates)); } catch (_) {}
  };

  const handleUpdateNotifications = (updatedNotifications) => {
    setNotifications(updatedNotifications);
    try { localStorage.setItem('moriahtechlabs_notifications', JSON.stringify(updatedNotifications)); } catch (_) {}
  };

  // ─── Public lead form submission → POST /api/leads ────────────────────────
  const handlePublicLeadSubmission = async (leadData) => {
  const timestamp = new Date().toISOString();

  // POST to backend FIRST — wait for real confirmation
  let backendSucceeded = false;
  let backendLeadId = null;

  try {
    const res = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });

    if (res.ok) {
      const json = await res.json();
      backendSucceeded = true;
      backendLeadId = json.data?.leadId;
      console.log('[API] Lead persisted to DB, id:', backendLeadId);
    } else {
      const errJson = await res.json().catch(() => null);
      console.warn('[API] Backend rejected lead submission:', errJson?.message || res.status);
      alert(
        "We couldn't save your details: " +
        (errJson?.message || `Server error (${res.status})`) +
        ". Please check your phone number format and try again."
      );
      return; // stop here — do NOT show thank-you screen on failure
    }
  } catch (err) {
    console.warn('[API] Backend unreachable:', err.message);
    alert("We couldn't reach the server. Please check your connection and try again.");
    return; // stop here — do NOT show thank-you screen on failure
  }

  if (!backendSucceeded) return;

  // Only update local UI state AFTER backend confirms success
  const nextId = backendLeadId || (leads.length > 0 ? Math.max(...leads.map(l => l.leadId)) + 1 : 1);
  const newLeadRecord = {
    ...leadData,
    leadId: nextId,
    status: LeadStatus.NEW,
    source: 'Website',
    createdAt: timestamp,
    assignedCounselor: 'Sarah Jenkins',
    notes: [],
    timeline: [
      {
        id: `t-creation-${Date.now()}`,
        type: 'creation',
        title: 'Inquiry Registration',
        description: `Registered student for ${leadData.interestedTechnology} (${leadData.trainingMode}).`,
        createdAt: timestamp,
        performedBy: 'System Desk'
      }
    ]
  };

  const updatedLeadsList = [newLeadRecord, ...leads];
  setLeads(updatedLeadsList);
  try { localStorage.setItem('moriahtechlabs_leads', JSON.stringify(updatedLeadsList)); } catch (_) {}

  const newNotification = {
    id: `alert-${Date.now()}`,
    title: 'Interactive Web Lead Received',
    description: `New online inquiry: ${leadData.fullName} requested info on ${leadData.interestedTechnology}.`,
    type: 'new_lead',
    createdAt: timestamp,
    read: false
  };
  setNotifications([newNotification, ...notifications]);

  setSuccessLeadName(leadData.fullName); // thank-you screen shows ONLY on real success
};

  // Re-fetch leads whenever admin view becomes active (incl. page refresh)
  useEffect(() => {
    if (isAdminView && sessionStorage.getItem('admin_creds')) {
      fetchLeadsFromBackend();
    }
  }, [isAdminView, fetchLeadsFromBackend]);

  // Navigate to admin (fetch fresh data)
  const handleNavigateToAdmin = () => {
    setIsAdminView(true);
    fetchLeadsFromBackend();
  };

  return (
    <div className={`relative overflow-x-hidden ${theme === 'light' ? 'light text-slate-900 bg-slate-50' : 'dark'}`}>
      <AnimatePresence mode="wait">
        {!isAdminView ? (
          <motion.div
            key="public_site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LandingPage
              onSubmitLead={handlePublicLeadSubmission}
              onNavigateToAdmin={handleNavigateToAdmin}
              successLeadName={successLeadName}
              onClearSuccess={() => setSuccessLeadName(null)}
              theme={theme}
              onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="admin_workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AdminPortal
              leads={leads}
              onUpdateLeads={handleUpdateLeads}
              templates={templates}
              onUpdateTemplates={handleUpdateTemplates}
              notifications={notifications}
              onUpdateNotifications={handleUpdateNotifications}
              onNavigateHome={() => setIsAdminView(false)}
              theme={theme}
              onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              apiBase={API_BASE}
              onAdminLogin={(username, password) => {
                // Store credentials for subsequent admin API calls
                const encoded = btoa(`${username}:${password}`);
                sessionStorage.setItem('admin_creds', encoded);
                fetchLeadsFromBackend();
              }}
              onAdminLogout={() => {
                sessionStorage.removeItem('admin_creds');
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
