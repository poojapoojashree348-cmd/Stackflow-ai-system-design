import { jsPDF } from "jspdf";

/**
 * Enterprise & Executive PDF Architecture Blueprint Generator
 * Produces a styled, high-end technical system design document.
 */
export function exportExecutivePDF(project) {
  const design = project?.design;
  if (!design) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();   // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let cursorY = margin;

  // Domain Theme Detection
  const title = project?.title || design?.projectSummary?.projectName || "System Design";
  const lowerTitle = title.toLowerCase();
  const summaryText = design.summary || "Full-stack enterprise application architecture and technical specification.";
  const projectType = design?.projectSummary?.projectType || "Enterprise Cloud Application";
  const archPattern = design?.projectSummary?.architecture || design?.architecture?.pattern || "Distributed Microservices Architecture";
  const frontend = design?.projectSummary?.frontend || design?.technologyStack?.find(t => t.category?.includes("Frontend"))?.name || "React.js";
  const backend = design?.projectSummary?.backend || design?.technologyStack?.find(t => t.category?.includes("Backend"))?.name || "Node.js (Express)";
  const database = design?.projectSummary?.database || design?.database?.databaseType || "PostgreSQL / MongoDB";
  const auth = design?.projectSummary?.authentication || "JWT + RBAC Security";
  const deployment = design?.projectSummary?.deployment || "Docker + AWS Cloud";

  // Document Metadata
  const docVersion = "v2.5 Enterprise";
  const docRef = `STK-ARC-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  // Color Palette Constants [R, G, B]
  const C_DARK_BG = [15, 23, 42];        // Slate 900
  const C_CARD_BG = [248, 250, 252];     // Slate 50
  const C_CARD_BORDER = [226, 232, 240]; // Slate 200
  const C_TEXT_MAIN = [30, 41, 59];      // Slate 800
  const C_TEXT_MUTED = [100, 116, 139];  // Slate 500
  const C_PRIMARY = [79, 70, 229];       // Indigo 600
  const C_PRIMARY_DARK = [49, 46, 129];  // Indigo 900
  const C_CYAN = [14, 165, 233];         // Sky 500
  const C_EMERALD = [16, 185, 129];      // Emerald 500
  const C_AMBER = [245, 158, 11];        // Amber 500
  const C_ROSE = [239, 68, 68];          // Rose 500

  // Helper: Check Page Break with Running Header
  const checkPageBreak = (neededHeight) => {
    if (cursorY + neededHeight > pageHeight - 16) {
      doc.addPage();
      cursorY = 22;
      drawRunningHeader();
    }
  };

  // Helper: Draw Running Header for Page 2+
  const drawRunningHeader = () => {
    doc.setFillColor(15, 23, 42);
    doc.rect(margin, 8, contentWidth, 0.6, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(79, 70, 229);
    doc.text("STACKFLOW AI", margin, 12.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.text(`|  TECHNICAL SYSTEM SPECIFICATION: ${title.toUpperCase()}`, margin + 25, 12.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 116, 139);
    doc.text(docRef, pageWidth - margin, 12.5, { align: "right" });

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, 15, pageWidth - margin, 15);
  };

  // Helper: Draw Section Title Banner
  const drawSectionHeader = (secNum, secTitle) => {
    checkPageBreak(18);
    cursorY += 2;

    // Number badge
    doc.setFillColor(79, 70, 229);
    doc.roundedRect(margin, cursorY, 20, 6, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`SEC ${secNum}`, margin + 10, cursorY + 4.2, { align: "center" });

    // Section title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(15, 23, 42);
    doc.text(secTitle, margin + 23, cursorY + 4.5);

    // Decorative line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    const titleWidth = doc.getTextWidth(secTitle);
    const lineStart = margin + 25 + titleWidth;
    if (lineStart < pageWidth - margin) {
      doc.line(lineStart, cursorY + 3, pageWidth - margin, cursorY + 3);
    }

    cursorY += 10;
  };

  // ==========================================
  // PAGE 1: EXECUTIVE HERO & COVER BANNER
  // ==========================================

  // Top Dark Navy Hero Banner
  const bannerHeight = 44;
  doc.setFillColor(...C_DARK_BG);
  doc.roundedRect(margin, cursorY, contentWidth, bannerHeight, 3, 3, "F");

  // Gradient accent top bar
  doc.setFillColor(...C_PRIMARY);
  doc.roundedRect(margin, cursorY, contentWidth * 0.65, 2.5, 1.2, 1.2, "F");
  doc.setFillColor(...C_CYAN);
  doc.roundedRect(margin + contentWidth * 0.65, cursorY, contentWidth * 0.35, 2.5, 1.2, 1.2, "F");

  // Brand & Document Tag inside Banner
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(165, 180, 252); // Indigo 200
  doc.text("STACKFLOW AI ARCHITECTURE ENGINE  •  CERTIFIED SYSTEM BLUEPRINT", margin + 7, cursorY + 9);

  // Status Badge in Banner (Top Right)
  doc.setFillColor(16, 185, 129); // Emerald 500
  doc.roundedRect(pageWidth - margin - 35, cursorY + 5.5, 29, 5, 1.2, 1.2, "F");
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.text("VERIFIED ARCHITECTURE", pageWidth - margin - 20.5, cursorY + 9, { align: "center" });

  // Main Project Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  const titleLines = doc.splitTextToSize(title, contentWidth - 14);
  doc.text(titleLines, margin + 7, cursorY + 18);

  // Subtitle / Architecture Pattern
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text(`${projectType}  •  ${archPattern}`, margin + 7, cursorY + 26);

  // Metadata Footer inside banner
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.3);
  doc.line(margin + 7, cursorY + 31, pageWidth - margin - 7, cursorY + 31);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text(`Doc Ref: ${docRef}   |   Release: ${docVersion}   |   Date: ${currentDate}`, margin + 7, cursorY + 37);

  doc.setTextColor(56, 189, 248);
  doc.text("CLASSIFICATION: ENGINEERING BLUEPRINT", pageWidth - margin - 7, cursorY + 37, { align: "right" });

  cursorY += bannerHeight + 5;

  // ==========================================
  // EXECUTIVE BENTO BOX: 6 ARCHITECTURE PILLARS
  // ==========================================
  const cardCols = 3;
  const cardGap = 3.5;
  const cardW = (contentWidth - cardGap * (cardCols - 1)) / cardCols; // ~58mm
  const cardH = 17;

  const pillars = [
    { label: "FRONTEND FRAMEWORK", val: frontend, icon: "🖥️", color: [2, 132, 199] },
    { label: "BACKEND ENGINE", val: backend, icon: "⚙️", color: [16, 185, 129] },
    { label: "DATABASE ENGINE", val: database, icon: "🗄️", color: [245, 158, 11] },
    { label: "AUTHENTICATION", val: auth, icon: "🔐", color: [139, 92, 246] },
    { label: "CLOUD DEPLOYMENT", val: deployment, icon: "☁️", color: [14, 165, 233] },
    { label: "ARCHITECTURE STYLE", val: archPattern.split(" ")[0] + " Architecture", icon: "🏛️", color: [239, 68, 68] }
  ];

  for (let i = 0; i < pillars.length; i++) {
    const col = i % cardCols;
    const row = Math.floor(i / cardCols);
    const cx = margin + col * (cardW + cardGap);
    const cy = cursorY + row * (cardH + 3);

    // Card background
    doc.setFillColor(...C_CARD_BG);
    doc.setDrawColor(...C_CARD_BORDER);
    doc.setLineWidth(0.3);
    doc.roundedRect(cx, cy, cardW, cardH, 2, 2, "FD");

    // Left accent bar
    doc.setFillColor(...pillars[i].color);
    doc.roundedRect(cx, cy, 1.8, cardH, 0.8, 0.8, "F");

    // Pillar Label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...C_TEXT_MUTED);
    doc.text(pillars[i].label, cx + 4.5, cy + 5);

    // Pillar Value
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...C_TEXT_MAIN);
    const valText = doc.splitTextToSize(pillars[i].val, cardW - 7);
    doc.text(valText[0] || pillars[i].val, cx + 4.5, cy + 11.5);
  }

  cursorY += (cardH + 3) * 2 + 5;

  // ==========================================
  // SECTION 01: SYSTEM PHILOSOPHY & CAPABILITIES
  // ==========================================
  drawSectionHeader("01", "Executive Summary & Architectural Philosophy");

  // Summary Callout Box
  const summaryBoxWidth = contentWidth;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const splitSummary = doc.splitTextToSize(summaryText, summaryBoxWidth - 10);
  const summaryBoxHeight = splitSummary.length * 4.2 + 8;

  doc.setFillColor(241, 245, 249); // Slate 100
  doc.setDrawColor(199, 210, 254); // Indigo 200
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, cursorY, summaryBoxWidth, summaryBoxHeight, 2, 2, "FD");

  // Left Indigo Highlight
  doc.setFillColor(...C_PRIMARY);
  doc.roundedRect(margin, cursorY, 2.5, summaryBoxHeight, 1, 1, "F");

  // Summary Text
  doc.setTextColor(...C_TEXT_MAIN);
  doc.text(splitSummary, margin + 6, cursorY + 5.5);
  cursorY += summaryBoxHeight + 5;

  // Key Features Pills / Badges
  if (design.keyFeatures && design.keyFeatures.length > 0) {
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...C_PRIMARY_DARK);
    doc.text("KEY ARCHITECTURAL HIGHLIGHTS & DIFFERENTIATORS:", margin, cursorY);
    cursorY += 4.5;

    design.keyFeatures.forEach((feat) => {
      checkPageBreak(8);
      // Checkmark dot
      doc.setFillColor(...C_EMERALD);
      doc.circle(margin + 2.5, cursorY - 1, 1.2, "F");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...C_TEXT_MAIN);
      const featText = doc.splitTextToSize(feat, contentWidth - 8);
      doc.text(featText, margin + 6, cursorY);
      cursorY += featText.length * 3.8 + 1.5;
    });
    cursorY += 3;
  }

  // ==========================================
  // SECTION 02: FUNCTIONAL MODULES
  // ==========================================
  drawSectionHeader("02", "Functional Modules & Domain Boundaries");

  const modulesList = (design.functionalModules && design.functionalModules.length > 0)
    ? design.functionalModules
    : (design.modules && design.modules.length > 0)
      ? design.modules.map(m => ({
          name: m.name,
          items: m.responsibilities || [m.description]
        }))
      : [];

  if (modulesList.length > 0) {
    modulesList.forEach((mod, mIdx) => {
      checkPageBreak(30);

      // Card Header Color
      const modColor = mIdx === 0 ? [2, 132, 199] : (mIdx === 1 ? [16, 185, 129] : [217, 119, 6]);
      const modItems = mod.items || [];

      // Module Card Header
      doc.setFillColor(...modColor);
      doc.roundedRect(margin, cursorY, contentWidth, 6.5, 1.5, 1.5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(`MODULE ${mIdx + 1}: ${mod.name.toUpperCase()}`, margin + 5, cursorY + 4.5);

      cursorY += 6.5;

      // Module Card Body
      const bodyItemsHeight = Math.min(modItems.length, 8) * 4 + 4;
      doc.setFillColor(...C_CARD_BG);
      doc.setDrawColor(...C_CARD_BORDER);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, cursorY, contentWidth, bodyItemsHeight, 0, 0, "FD");

      // Items list inside card (2 columns if more than 4 items)
      let itemY = cursorY + 3.5;
      const isTwoCol = modItems.length > 4;
      const colWidth = (contentWidth - 10) / 2;

      modItems.slice(0, 8).forEach((item, itmIdx) => {
        const colIdx = isTwoCol ? (itmIdx % 2) : 0;
        const rowIdx = isTwoCol ? Math.floor(itmIdx / 2) : itmIdx;
        const itmX = margin + 5 + colIdx * colWidth;
        const currentItemY = cursorY + 3.5 + rowIdx * 3.8;

        doc.setFillColor(...modColor);
        doc.rect(itmX, currentItemY - 1.8, 1.2, 1.2, "F");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(...C_TEXT_MAIN);
        const itemText = doc.splitTextToSize(item, colWidth - 4);
        doc.text(itemText[0] || item, itmX + 3, currentItemY);
      });

      cursorY += bodyItemsHeight + 3.5;
    });
    cursorY += 2;
  }

  // ==========================================
  // SECTION 03: DATABASE SCHEMA BLUEPRINT
  // ==========================================
  drawSectionHeader("03", `Database Schema Specification (${design.database?.databaseType || "Enterprise Relational / NoSQL"})`);

  const tables = design.database?.tables || [];
  if (tables.length > 0) {
    tables.forEach((tbl, tIdx) => {
      checkPageBreak(35);

      // Table Name Ribbon
      doc.setFillColor(...C_DARK_BG);
      doc.roundedRect(margin, cursorY, contentWidth, 6.5, 1.2, 1.2, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(`TABLE: ${tbl.name}`, margin + 4, cursorY + 4.5);

      if (tbl.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184);
        doc.text(`- ${tbl.description}`, margin + 4 + doc.getTextWidth(`TABLE: ${tbl.name} `), cursorY + 4.5);
      }
      cursorY += 6.5;

      // Table Header Row
      const colX_name = margin + 3;
      const colX_type = margin + 45;
      const colX_key = margin + 78;
      const colX_desc = margin + 110;

      doc.setFillColor(226, 232, 240); // Slate 200
      doc.rect(margin, cursorY, contentWidth, 5, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.8);
      doc.setTextColor(71, 85, 105);
      doc.text("FIELD NAME", colX_name, cursorY + 3.5);
      doc.text("DATA TYPE", colX_type, cursorY + 3.5);
      doc.text("CONSTRAINTS / KEY", colX_key, cursorY + 3.5);
      doc.text("FIELD PURPOSE", colX_desc, cursorY + 3.5);
      cursorY += 5;

      // Table Field Rows
      (tbl.fields || []).forEach((f, fIdx) => {
        checkPageBreak(8);
        const rowH = 5.2;

        // Alternating row zebra fill
        if (fIdx % 2 === 0) {
          doc.setFillColor(255, 255, 255);
        } else {
          doc.setFillColor(248, 250, 252);
        }
        doc.rect(margin, cursorY, contentWidth, rowH, "F");

        // Subtle row bottom divider
        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.2);
        doc.line(margin, cursorY + rowH, margin + contentWidth, cursorY + rowH);

        // Field Name
        doc.setFont("helvetica", f.isPrimaryKey ? "bold" : "normal");
        doc.setFontSize(7.2);
        doc.setTextColor(15, 23, 42);
        doc.text(f.name, colX_name, cursorY + 3.6);

        // Data Type (monospace feel)
        doc.setFont("courier", "bold");
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text(f.type || "VARCHAR", colX_type, cursorY + 3.6);

        // Key Constraints Pill
        if (f.isPrimaryKey) {
          doc.setFillColor(79, 70, 229); // Indigo
          doc.roundedRect(colX_key, cursorY + 1.2, 14, 3.2, 0.8, 0.8, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(5.5);
          doc.setTextColor(255, 255, 255);
          doc.text("PRIMARY", colX_key + 7, cursorY + 3.4, { align: "center" });
        } else if (f.isForeignKey) {
          doc.setFillColor(13, 148, 136); // Teal
          doc.roundedRect(colX_key, cursorY + 1.2, 20, 3.2, 0.8, 0.8, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(5.5);
          doc.setTextColor(255, 255, 255);
          doc.text("FOREIGN KEY", colX_key + 10, cursorY + 3.4, { align: "center" });
        } else {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(6.8);
          doc.setTextColor(148, 163, 184);
          doc.text(f.isNullable === false ? "NOT NULL" : "NULLABLE", colX_key, cursorY + 3.6);
        }

        // Description
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.8);
        doc.setTextColor(71, 85, 105);
        const descText = doc.splitTextToSize(f.description || "-", contentWidth - (colX_desc - margin) - 2);
        doc.text(descText[0] || "-", colX_desc, cursorY + 3.6);

        cursorY += rowH;
      });

      cursorY += 4;
    });
  }

  // ==========================================
  // SECTION 04: REST API SPECIFICATIONS
  // ==========================================
  drawSectionHeader("04", "RESTful API Endpoints & Contract Matrix");

  const apis = design.apis || [];
  if (apis.length > 0) {
    checkPageBreak(15);

    apis.forEach((api, aIdx) => {
      checkPageBreak(12);

      const m = (api.method || "GET").toUpperCase();
      let badgeBg = [2, 132, 199];   // Sky
      let badgeText = [255, 255, 255];
      if (m === "POST") badgeBg = [16, 185, 129];      // Emerald
      else if (m === "PUT" || m === "PATCH") badgeBg = [245, 158, 11]; // Amber
      else if (m === "DELETE") badgeBg = [239, 68, 68]; // Rose

      const cardH = 9.5;
      doc.setFillColor(...C_CARD_BG);
      doc.setDrawColor(...C_CARD_BORDER);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, cursorY, contentWidth, cardH, 1.2, 1.2, "FD");

      // HTTP Method Pill
      doc.setFillColor(...badgeBg);
      doc.roundedRect(margin + 2.5, cursorY + 2.2, 14, 5, 1, 1, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(...badgeText);
      doc.text(m, margin + 9.5, cursorY + 5.7, { align: "center" });

      // Monospace Endpoint
      doc.setFont("courier", "bold");
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(api.endpoint, margin + 19, cursorY + 5.8);

      // Auth Requirement Badge
      const isAuthReq = api.authentication !== false;
      const authBadgeX = margin + 105;
      doc.setFillColor(isAuthReq ? 241 : 243, isAuthReq ? 245 : 244, isAuthReq ? 249 : 246);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(authBadgeX, cursorY + 2.5, 18, 4.5, 0.8, 0.8, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(isAuthReq ? 79 : 100, isAuthReq ? 70 : 116, isAuthReq ? 229 : 139);
      doc.text(isAuthReq ? "AUTH REQUIRED" : "PUBLIC ROUTE", authBadgeX + 9, cursorY + 5.6, { align: "center" });

      // Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.2);
      doc.setTextColor(71, 85, 105);
      const descLimit = doc.splitTextToSize(api.description || "", contentWidth - 130);
      doc.text(descLimit[0] || "", authBadgeX + 22, cursorY + 5.8);

      cursorY += cardH + 2;
    });
    cursorY += 3;
  }

  // ==========================================
  // SECTION 05: SYSTEM ARCHITECTURE & TOPOLOGY
  // ==========================================
  drawSectionHeader("05", "System Topology & Architectural Data Flow");

  checkPageBreak(40);

  // Vector System Architecture Flow Graphic
  const flowBoxH = 14;
  const flowBoxW = 38;
  const flowGap = 8;

  const flowNodes = [
    { title: "Client Layer", sub: frontend.split(" ")[0] || "React Web", color: [2, 132, 199] },
    { title: "API Gateway", sub: "Nginx / Envoy", color: [16, 185, 129] },
    { title: "Microservices", sub: backend.split(" ")[0] || "Express Cluster", color: [79, 70, 229] },
    { title: "Database Layer", sub: database.split(" ")[0] || "Postgres / Mongo", color: [245, 158, 11] }
  ];

  flowNodes.forEach((node, nIdx) => {
    const nx = margin + nIdx * (flowBoxW + flowGap);

    // Node Box
    doc.setFillColor(...C_CARD_BG);
    doc.setDrawColor(...node.color);
    doc.setLineWidth(0.5);
    doc.roundedRect(nx, cursorY, flowBoxW, flowBoxH, 1.5, 1.5, "FD");

    // Top color strip
    doc.setFillColor(...node.color);
    doc.roundedRect(nx, cursorY, flowBoxW, 2, 0.8, 0.8, "F");

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(node.title, nx + flowBoxW / 2, cursorY + 7, { align: "center" });

    // Subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...C_TEXT_MUTED);
    doc.text(node.sub, nx + flowBoxW / 2, cursorY + 11.5, { align: "center" });

    // Arrow to next node
    if (nIdx < flowNodes.length - 1) {
      const arrowX = nx + flowBoxW + 1.5;
      const arrowY = cursorY + flowBoxH / 2;
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.5);
      doc.line(arrowX, arrowY, arrowX + flowGap - 3, arrowY);
      // arrowhead
      doc.line(arrowX + flowGap - 4.5, arrowY - 1.5, arrowX + flowGap - 3, arrowY);
      doc.line(arrowX + flowGap - 4.5, arrowY + 1.5, arrowX + flowGap - 3, arrowY);
    }
  });

  cursorY += flowBoxH + 6;

  // Architectural Components Breakdown Table
  const archComps = design.architecture?.components || [];
  if (archComps.length > 0) {
    checkPageBreak(25);

    // Table Header
    doc.setFillColor(226, 232, 240);
    doc.rect(margin, cursorY, contentWidth, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);
    doc.text("LAYER", margin + 3, cursorY + 3.5);
    doc.text("SERVICE / COMPONENT", margin + 35, cursorY + 3.5);
    doc.text("TECHNOLOGY SPEC", margin + 85, cursorY + 3.5);
    doc.text("ARCHITECTURAL ROLE", margin + 130, cursorY + 3.5);
    cursorY += 5;

    archComps.forEach((comp, cIdx) => {
      checkPageBreak(8);
      const rowH = 5.5;
      doc.setFillColor(cIdx % 2 === 0 ? 255 : 248, cIdx % 2 === 0 ? 255 : 250, cIdx % 2 === 0 ? 255 : 252);
      doc.rect(margin, cursorY, contentWidth, rowH, "F");

      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(margin, cursorY + rowH, margin + contentWidth, cursorY + rowH);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...C_PRIMARY);
      doc.text(comp.layer || "Service", margin + 3, cursorY + 3.8);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text(comp.name, margin + 35, cursorY + 3.8);

      doc.setFont("courier", "bold");
      doc.setFontSize(6.8);
      doc.setTextColor(100, 116, 139);
      doc.text(comp.technology || "Microservice", margin + 85, cursorY + 3.8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.8);
      doc.setTextColor(71, 85, 105);
      const roleText = doc.splitTextToSize(comp.description || "Core component", contentWidth - 132);
      doc.text(roleText[0] || "", margin + 130, cursorY + 3.8);

      cursorY += rowH;
    });
    cursorY += 4;
  }

  // ==========================================
  // SECTION 06: TECHNOLOGY STACK & JUSTIFICATION
  // ==========================================
  drawSectionHeader("06", "Technology Stack Justification");

  const techStack = design.technologyStack || [];
  if (techStack.length > 0) {
    checkPageBreak(25);

    // Table Header
    doc.setFillColor(226, 232, 240);
    doc.rect(margin, cursorY, contentWidth, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);
    doc.text("CATEGORY", margin + 3, cursorY + 3.5);
    doc.text("SELECTED TECHNOLOGY", margin + 45, cursorY + 3.5);
    doc.text("TECHNICAL JUSTIFICATION & VALUE", margin + 95, cursorY + 3.5);
    cursorY += 5;

    techStack.forEach((t, tIdx) => {
      checkPageBreak(8);
      const rowH = 5.5;
      doc.setFillColor(tIdx % 2 === 0 ? 255 : 248, tIdx % 2 === 0 ? 255 : 250, tIdx % 2 === 0 ? 255 : 252);
      doc.rect(margin, cursorY, contentWidth, rowH, "F");

      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(margin, cursorY + rowH, margin + contentWidth, cursorY + rowH);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(79, 70, 229);
      doc.text(t.category || "Core", margin + 3, cursorY + 3.8);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.2);
      doc.setTextColor(15, 23, 42);
      doc.text(t.name, margin + 45, cursorY + 3.8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.8);
      doc.setTextColor(71, 85, 105);
      const rText = doc.splitTextToSize(t.reason || "Industry standard enterprise solution", contentWidth - 97);
      doc.text(rText[0] || "", margin + 95, cursorY + 3.8);

      cursorY += rowH;
    });
    cursorY += 4;
  }

  // ==========================================
  // SECTION 07: AI RECOMMENDATIONS & BEST PRACTICES
  // ==========================================
  drawSectionHeader("07", "Architectural Guardrails & AI Recommendations");

  const recommendations = design.recommendations || design.aiRecommendations || [];
  if (recommendations.length > 0) {
    checkPageBreak(25);

    recommendations.forEach((rec, rIdx) => {
      checkPageBreak(12);

      const title = typeof rec === "string" ? `Guideline ${rIdx + 1}` : (rec.title || rec.category);
      const desc = typeof rec === "string" ? rec : (rec.description || "");
      const priority = typeof rec === "object" && rec.priority ? rec.priority.toUpperCase() : "HIGH";

      let pColor = [245, 158, 11]; // Amber
      if (priority === "CRITICAL") pColor = [239, 68, 68]; // Red
      else if (priority === "LOW") pColor = [16, 185, 129]; // Emerald

      const recBoxH = 9;
      doc.setFillColor(...C_CARD_BG);
      doc.setDrawColor(...C_CARD_BORDER);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, cursorY, contentWidth, recBoxH, 1.2, 1.2, "FD");

      // Left Accent Strip
      doc.setFillColor(...pColor);
      doc.roundedRect(margin, cursorY, 2, recBoxH, 0.8, 0.8, "F");

      // Priority Pill
      doc.setFillColor(...pColor);
      doc.roundedRect(margin + 5, cursorY + 2.2, 16, 4.5, 0.8, 0.8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(255, 255, 255);
      doc.text(priority, margin + 13, cursorY + 5.3, { align: "center" });

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(title, margin + 24, cursorY + 5.5);

      // Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      const recDesc = doc.splitTextToSize(desc, contentWidth - 75);
      doc.text(recDesc[0] || "", margin + 65, cursorY + 5.5);

      cursorY += recBoxH + 2.5;
    });
    cursorY += 3;
  }

  // ==========================================
  // SECTION 08: DEPLOYMENT PIPELINE
  // ==========================================
  drawSectionHeader("08", "Cloud Infrastructure & CI/CD Deployment Topology");

  const deploymentStages = design.deploymentPlan || design.deployment || [];
  if (deploymentStages.length > 0) {
    checkPageBreak(25);

    const depCardW = (contentWidth - 4 * 2.5) / Math.min(deploymentStages.length, 5);
    const depCardH = 15;

    deploymentStages.slice(0, 5).forEach((stg, sIdx) => {
      const sx = margin + sIdx * (depCardW + 2.5);
      const stageName = stg.target || stg.stage || `Stage ${sIdx + 1}`;
      const stageAction = stg.action || stg.details || stg.tool || "Cloud Target";

      doc.setFillColor(...C_CARD_BG);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.roundedRect(sx, cursorY, depCardW, depCardH, 1.5, 1.5, "FD");

      // Number badge
      doc.setFillColor(79, 70, 229);
      doc.circle(sx + 4.5, cursorY + 4.5, 2, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(255, 255, 255);
      doc.text(`${sIdx + 1}`, sx + 4.5, cursorY + 5.2, { align: "center" });

      // Stage Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(15, 23, 42);
      doc.text(stageName, sx + 8, cursorY + 5.2);

      // Action description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.2);
      doc.setTextColor(71, 85, 105);
      const actLines = doc.splitTextToSize(stageAction, depCardW - 5);
      doc.text(actLines, sx + 2.5, cursorY + 9.5);
    });

    cursorY += depCardH + 6;
  }

  // ==========================================
  // FINAL PASS: DYNAMIC PAGE NUMBERING & FOOTERS
  // ==========================================
  const totalPages = doc.getNumberOfPages();

  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);

    // Running Footer Line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);

    // Footer Left: Confidentiality Seal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text("CONFIDENTIAL & PROPRIETARY  |  ENGINEERING SYSTEM BLUEPRINT", margin, pageHeight - 7);

    // Footer Center: Generated by StackFlow AI
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Generated with StackFlow AI Architecture Engine", pageWidth / 2, pageHeight - 7, { align: "center" });

    // Footer Right: Page X of Y
    doc.setFont("helvetica", "bold");
    doc.setTextColor(79, 70, 229);
    doc.text(`Page ${p} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: "right" });
  }

  // Save PDF with clean enterprise file naming
  const safeFilename = `${(title || "system-design").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-executive-blueprint.pdf`;
  doc.save(safeFilename);
}
