/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const LeadStatus = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  CONVERTED: 'Converted',
  CLOSED: 'Closed'
};

export const TrainingMode = {
  ONLINE: 'Online',
  OFFLINE: 'Offline'
};

// Highly realistic mock data from the program specifications
export const INITIAL_LEADS = [
  {
    leadId: 1,
    fullName: "Rahul Kumar",
    email: "rahul@example.com",
    mobileNumber: "9876543210",
    qualification: "B.Tech",
    interestedTechnology: "Java Full Stack",
    trainingMode: TrainingMode.ONLINE,
    message: "I want project training details. Looking forward to hand-ons project workshops.",
    status: LeadStatus.NEW,
    source: "Website",
    createdAt: "2026-06-22T10:30:00Z",
    assignedCounselor: "Sarah Jenkins",
    notes: [
      {
        id: "n-1",
        text: "Expressed strong interest in the Spring Boot microservices module.",
        createdAt: "2026-06-22T11:00:00Z",
        author: "Sarah Jenkins"
      }
    ],
    timeline: [
      {
        id: "t-1",
        type: "creation",
        title: "Lead Created",
        description: "Form submitted via Desktop Landing Page.",
        createdAt: "2026-06-22T10:30:00Z",
        performedBy: "System"
      },
      {
        id: "t-2",
        type: "note_added",
        title: "Initial Contact Attempt",
        description: "Sent introductory WhatsApp message regarding the Java Full Stack module.",
        createdAt: "2026-06-22T11:00:00Z",
        performedBy: "Sarah Jenkins"
      }
    ]
  },
  {
    leadId: 2,
    fullName: "Priya Singh",
    email: "priya@gmail.com",
    mobileNumber: "9876543221",
    qualification: "MCA",
    interestedTechnology: "React",
    trainingMode: TrainingMode.ONLINE,
    message: "Seeking intensive training with a focus on single page application performance and state management.",
    status: LeadStatus.CONTACTED,
    source: "Facebook",
    createdAt: "2026-06-21T15:45:00Z",
    assignedCounselor: "Amit Verma",
    notes: [
      {
        id: "n-2",
        text: "Spoke over the phone. Knows JavaScript basics. Wants to understand job opportunities.",
        createdAt: "2026-06-22T09:15:00Z",
        author: "Amit Verma"
      }
    ],
    timeline: [
      {
        id: "t-3",
        type: "creation",
        title: "Lead Created",
        description: "Form received from Facebook Lead Ad.",
        createdAt: "2026-06-21T15:45:00Z",
        performedBy: "System"
      },
      {
        id: "t-4",
        type: "status_change",
        title: "Status Updated: Contacted",
        description: "Lead status changed from New to Contacted.",
        createdAt: "2026-06-22T09:15:00Z",
        performedBy: "Amit Verma"
      },
      {
        id: "t-5",
        type: "note_added",
        title: "Note Created",
        description: "Wants job assurance details and placement logs.",
        createdAt: "2026-06-22T09:15:00Z",
        performedBy: "Amit Verma"
      }
    ]
  },
  {
    leadId: 3,
    fullName: "Amit Verma",
    email: "amit@gmail.com",
    mobileNumber: "9876543232",
    qualification: "B.Sc",
    interestedTechnology: "Spring Boot",
    trainingMode: TrainingMode.OFFLINE,
    message: "Interested in classroom training in Bangalore. Please callback.",
    status: LeadStatus.QUALIFIED,
    source: "Google Ads",
    createdAt: "2026-06-20T11:20:00Z",
    assignedCounselor: "Rahul Kumar",
    notes: [
      {
        id: "n-3",
        text: "Academic records verified. Strong profile. Ready to commit to schedule.",
        createdAt: "2026-06-22T14:30:00Z",
        author: "Rahul Kumar"
      }
    ],
    timeline: [
      {
        id: "t-6",
        type: "creation",
        title: "Lead Created",
        description: "Form submitted via Mobile Search Ad.",
        createdAt: "2026-06-20T11:20:00Z",
        performedBy: "System"
      },
      {
        id: "t-7",
        type: "status_change",
        title: "Status Updated: Qualified",
        description: "Candidate verified for offline batch prerequisites.",
        createdAt: "2026-06-22T14:30:00Z",
        performedBy: "Rahul Kumar"
      }
    ]
  },
  {
    leadId: 4,
    fullName: "Neha Patel",
    email: "neha@gmail.com",
    mobileNumber: "9876543243",
    qualification: "B.Tech",
    interestedTechnology: "AWS",
    trainingMode: TrainingMode.ONLINE,
    message: "Experienced backend developer looking to obtain AWS Solutions Architect certification.",
    status: LeadStatus.CONVERTED,
    source: "Website",
    createdAt: "2026-06-19T08:00:00Z",
    assignedCounselor: "Sarah Jenkins",
    notes: [
      {
        id: "n-4",
        text: "Enrollment completed. Payment processed for AWS Cloud Specialization.",
        createdAt: "2026-06-20T16:10:00Z",
        author: "Sarah Jenkins"
      }
    ],
    timeline: [
      {
        id: "t-8",
        type: "creation",
        title: "Lead Created",
        description: "Form submitted via Desktop Landing Page.",
        createdAt: "2026-06-19T08:00:00Z",
        performedBy: "System"
      },
      {
        id: "t-9",
        type: "status_change",
        title: "Status Updated: Converted",
        description: "Successfully processed course admission.",
        createdAt: "2026-06-20T16:10:00Z",
        performedBy: "Sarah Jenkins"
      },
      {
        id: "t-10",
        type: "email_sent",
        title: "Welcome Kit Dispatched",
        description: "Automated Thank You and receipt dispatched to neha@gmail.com.",
        createdAt: "2026-06-20T16:15:00Z",
        performedBy: "System"
      }
    ]
  },
  {
    leadId: 5,
    fullName: "Vikram Sharma",
    email: "vikram@gmail.com",
    mobileNumber: "9876543254",
    qualification: "MCA",
    interestedTechnology: "DevOps",
    trainingMode: TrainingMode.OFFLINE,
    message: "Looking for corporate level DevOps hands-on pipeline automation training.",
    status: LeadStatus.CLOSED,
    source: "Facebook",
    createdAt: "2026-06-18T14:30:00Z",
    assignedCounselor: "Amit Verma",
    notes: [
      {
        id: "n-5",
        text: "Timing conflict. Looking for weekend batches only which are currently full.",
        createdAt: "2026-06-19T10:00:00Z",
        author: "Amit Verma"
      }
    ],
    timeline: [
      {
        id: "t-11",
        type: "creation",
        title: "Lead Created",
        description: "Form submitted via Social Media link.",
        createdAt: "2026-06-18T14:30:00Z",
        performedBy: "System"
      },
      {
        id: "t-12",
        type: "status_change",
        title: "Status Updated: Closed",
        description: "Declined due to scheduling constraints.",
        createdAt: "2026-06-19T10:00:00Z",
        performedBy: "Amit Verma"
      }
    ]
  }
];

export const INITIAL_TEMPLATES = [
  {
    id: "tpl_thank_you",
    name: "Thank You Email",
    subject: "Thank you for showing interest in our Project Training Program!",
    body: `Hi \{{name\}},

Thank you for reaching out to Moriah Tech Labs! 

We have received your request for our Project Training Program. A dedicated counselor has been assigned to your profile and will connect with you on \{{phone\}} or via email within the next 24 hours to guide you through your selected track: \{{technology\}} (\{{mode\}}).

In the meantime, feel free to review our curriculum and check out live systems created by our former graduates.

Regards,
Moriah Tech Labs Admissions Team
support@moriahtechlabs.com`
  },
  {
    id: "tpl_brochure",
    name: "Brochure Email",
    subject: "Download Your Moriah Tech Labs Program Syllabus & Success Guide",
    body: `Hi \{{name\}},

Here is your copy of the requested syllabus and placement guide for \{{technology\}}!

Moriah Tech Labs programs are 100% practical, guided by industry mentors with 10+ years of active software development experience. Inside this brochure, you will find:
- Week-by-week curriculum breakdown
- Details about our 4 capstone banking & CRM products
- Placement logs and resume review guides

Please let us know if you want to book a free 1-on-1 counselor audit.

Best,
Moriah Tech Labs Team`
  },
  {
    id: "tpl_reminder",
    name: "Reminder Email",
    subject: "Friendly Reminder: Your Free Career Counseling Session is Scheduled",
    body: `Hi \{{name\}},

This is a reminder that you have scheduled a free career counseling audit with Moriah Tech Labs.

Details:
- Chosen Stream: \{{technology\}}
- Format: \{{mode\}}
- Scheduled Date: Tomorrow at 11:00 AM

If you need to reschedule or have immediate queries, reply directly to this mail or message us on WhatsApp.

Regards,
Moriah Tech Labs Admissions`
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "New Lead Submitted",
    description: "Rahul Kumar registered interest for Java Full Stack (Online) of qualification B.Tech.",
    type: "new_lead",
    createdAt: "2026-06-22T10:30:00Z",
    read: false
  },
  {
    id: "notif-2",
    title: "Lead Converted",
    description: "Neha Patel successfully converted to AWS Cloud Track under Sarah Jenkins.",
    type: "converted",
    createdAt: "2026-06-20T16:10:00Z",
    read: true
  },
  {
    id: "notif-3",
    title: "Follow-up Reminder",
    description: "Scheduled check-in tomorrow for qualified lead Amit Verma (Spring Boot).",
    type: "follow_up_reminder",
    createdAt: "2026-06-22T18:00:00Z",
    read: false
  }
];
