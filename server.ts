import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Data (Mutable)
  let patients = [
    { id: "1", name: "Alistair Vance", age: 45, gender: "Male", lastVisit: "2024-06-10", condition: "Post-Op Cardiology", phone: "+15550101" },
    { id: "2", name: "Elena Rodriguez", age: 32, gender: "Female", lastVisit: "2024-06-11", condition: "Metabolic Panel", phone: "+15550102" },
    { id: "3", name: "Marcus Thorne", age: 58, gender: "Male", lastVisit: "2024-06-08", condition: "Hypertension", phone: "+15550103" },
    { id: "4", name: "Sophia Chen", age: 29, gender: "Female", lastVisit: "2024-06-12", condition: "Routine Checkup", phone: "+15550104" },
  ];

  const appointments = [
    { id: "1", patientId: "1", time: "09:00 AM", type: "CONCIERGE", description: "Post-Op Cardiology Follow-up" },
    { id: "2", patientId: "2", time: "11:30 AM", type: "STANDARD", description: "Quarterly Metabolic Panel" },
    { id: "3", patientId: "3", time: "02:15 PM", type: "URGENT", description: "Blood Pressure Review" },
  ];

  const activity = [
    { id: "1", type: "LAB", title: "Lab Results Released", description: "The detailed genomic analysis for Patient #8842 (Vance) has been uploaded.", time: "14 MIN AGO" },
    { id: "2", type: "REFERRAL", title: "New Referral Invitation", description: "Dr. Sarah Jenkins has invited a new VIP patient for an initial consultation.", time: "2 HOURS AGO" },
    { id: "3", type: "SCRIPT", title: "Script Authenticated", description: "Digital prescription for Tier 3 medications successfully synced.", time: "4 HOURS AGO" },
    { id: "4", type: "ALERT", title: "Critical Billing Alert", description: "Insurance claim #800-44 was rejected due to missing practitioner ID.", time: "YESTERDAY", critical: true },
  ];

  const templates = [
    { id: "1", name: "Pre-Op Instructions", content: "Dear {{name}}, this is a reminder for your upcoming surgery. Please fast for 12 hours prior to your appointment. Contact LuMe Clinic at {{phone}} for questions." },
    { id: "2", name: "Post-Op Follow-up", content: "Hello {{name}}, we hope you are recovering well. Please remember to take your prescribed medications and monitor your temperature. Best, LuMe Clinic." },
    { id: "3", name: "Prescription Ready", content: "Hi {{name}}, your prescription for {{medication}} is ready for pickup at Obsidian Pharmacy Hub. Show this message to the concierge." },
  ];

  // API Routes
  app.get("/api/patients", (req, res) => {
    res.json(patients);
  });

  app.post("/api/patients", (req, res) => {
    const newPatient = {
      id: (patients.length + 1).toString(),
      ...req.body,
      lastVisit: new Date().toISOString().split('T')[0]
    };
    patients.push(newPatient);
    res.status(201).json(newPatient);
  });

  app.get("/api/templates", (req, res) => {
    res.json(templates);
  });

  app.get("/api/appointments", (req, res) => {
    res.json(appointments);
  });

  app.get("/api/activity", (req, res) => {
    res.json(activity);
  });

  app.get("/api/stats", (req, res) => {
    res.json({
      revenue: 428900,
      revenueGrowth: 12.4,
      activePatients: 1204,
      occupancy: 94,
      avgWait: 8.2,
      satisfaction: 4.92,
      activeSuites: "12/14"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
