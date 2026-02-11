import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadLineupPDF = async (teamName, formationName) => {
  // 1. Target the Elements
  const originalPitch = document.getElementById('pitch-container');
  const originalRoster = document.getElementById('roster-container');

  if (!originalPitch || !originalRoster) {
    alert("Error: Could not find lineup elements. Please wait for the page to load fully.");
    return;
  }

  try {
    // ==========================================
    // STEP 1: FIX PITCH (Standard Visualization)
    // ==========================================
    const pitchClone = originalPitch.cloneNode(true);
    
    // Force Pitch Styles for PDF
    pitchClone.style.transform = "none"; 
    pitchClone.style.borderRadius = "0px"; 
    pitchClone.style.border = "2px solid white";
    pitchClone.style.boxShadow = "none";
    
    // --- 1.1: MAKE PITCH ICONS LARGER ---
    const pitchIcons = pitchClone.querySelectorAll('img, svg');
    pitchIcons.forEach(icon => {
        icon.style.width = "64px";  
        icon.style.height = "64px";
        icon.style.minWidth = "64px";
        icon.style.minHeight = "64px";
        icon.style.objectFit = "contain";
    });

    // --- 1.2: MAKE PITCH NAMES VISIBLE & CLEAR ---
    const pitchNames = pitchClone.querySelectorAll('.truncate');
    pitchNames.forEach(name => {
        name.classList.remove('truncate');
        name.style.overflow = 'visible';
        name.style.whiteSpace = 'nowrap';
        name.style.width = 'auto';
        name.style.maxWidth = 'none';
        
        name.style.background = "rgba(0,0,0,0.8)"; 
        name.style.color = "#fff";
        name.style.fontSize = "16px"; 
        name.style.fontWeight = "bold";
        
        name.style.padding = "2px 8px 12px 8px"; // Padding ensures text isn't cut
        
        name.style.borderRadius = "6px";
        name.style.zIndex = "100";
        name.style.marginTop = "5px"; 
    });

    // --- 1.3: FIX JERSEY NUMBERS ---
    const pitchNumbers = pitchClone.querySelectorAll('.bg-pitch.text-slate-900');
    
    pitchNumbers.forEach(inputEl => {
        const numDiv = document.createElement('div');
        const val = inputEl.value || inputEl.innerText || "";
        numDiv.innerText = val;

        numDiv.style.width = "34px";        
        numDiv.style.height = "34px";       
        numDiv.style.backgroundColor = "#22c55e"; 
        numDiv.style.color = "#000000";            
        numDiv.style.border = "2px solid #ffffff"; 
        numDiv.style.borderRadius = "8px"; 
        
        numDiv.style.fontSize = "18px";
        numDiv.style.fontWeight = "bold";
        numDiv.style.fontFamily = "sans-serif";
        
        numDiv.style.display = "flex";
        numDiv.style.alignItems = "center";
        numDiv.style.justifyContent = "center";
        numDiv.style.textAlign = "center";
        numDiv.style.margin = "0";
        numDiv.style.boxSizing = "border-box";
        numDiv.style.paddingBottom = "3px"; 
        numDiv.style.lineHeight = "1";      
        
        numDiv.style.position = "absolute";
        numDiv.style.zIndex = "101";
        
        numDiv.style.top = "-15px";     
        numDiv.style.right = "-30px";   
        
        numDiv.style.boxShadow = "0 4px 6px rgba(0,0,0,0.4)";

        if(inputEl.parentNode) {
            inputEl.parentNode.replaceChild(numDiv, inputEl);
        }
    });

    // Position Pitch Off-Screen
    pitchClone.style.position = "fixed";
    pitchClone.style.left = "-10000px";
    pitchClone.style.top = "0px";
    pitchClone.style.width = "1000px"; 
    pitchClone.style.height = "700px"; 
    document.body.appendChild(pitchClone);

    const pitchCanvas = await html2canvas(pitchClone, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#14532d', 
      logging: false
    });

    // ==========================================
    // STEP 2: FIX ROSTER (2-COLUMN LIST FOR PORTRAIT)
    // ==========================================
    const rosterData = [];
    const rosterCards = originalRoster.querySelectorAll('.group'); 
    
    rosterCards.forEach(card => {
        const inputs = card.querySelectorAll('input');
        if (inputs.length >= 2) {
            const number = inputs[0].value || "";
            const name = inputs[1].value || "";
            if (name) rosterData.push({ number, name });
        }
    });

    // Roster Container
    const rosterContainer = document.createElement('div');
    rosterContainer.style.position = "fixed";
    rosterContainer.style.left = "-10000px";
    rosterContainer.style.top = "0px";
    rosterContainer.style.width = "1000px"; 
    rosterContainer.style.backgroundColor = "#0f172a";
    rosterContainer.style.padding = "20px";
    rosterContainer.style.display = "flex";
    rosterContainer.style.flexWrap = "wrap";
    rosterContainer.style.gap = "15px"; 
    rosterContainer.style.alignContent = "flex-start";

    // Build Items - 2 Columns looks cleaner in Portrait
    rosterData.forEach(player => {
        const item = document.createElement('div');
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.style.width = "48%"; // 2 Columns
        item.style.padding = "12px 16px"; // Increased padding prevents clipping
        item.style.backgroundColor = "rgba(255,255,255,0.05)";
        item.style.border = "1px solid rgba(255,255,255,0.1)";
        item.style.borderRadius = "8px";
        item.style.boxSizing = "border-box"; 
        
        // Prevent font clipping by ensuring height
        item.style.minHeight = "50px"; 

        const numSpan = document.createElement('span');
        numSpan.innerText = player.number;
        numSpan.style.color = "#22c55e"; 
        numSpan.style.fontFamily = "sans-serif";
        numSpan.style.fontWeight = "bold";
        numSpan.style.fontSize = "24px";
        numSpan.style.marginRight = "15px";
        numSpan.style.minWidth = "40px";
        numSpan.style.textAlign = "center";
        numSpan.style.lineHeight = "1"; 

        const nameSpan = document.createElement('span');
        nameSpan.innerText = player.name;
        nameSpan.style.color = "#ffffff";
        nameSpan.style.fontFamily = "sans-serif";
        nameSpan.style.fontSize = "18px";
        nameSpan.style.fontWeight = "600";
        nameSpan.style.textTransform = "uppercase";
        nameSpan.style.whiteSpace = "nowrap"; 
        nameSpan.style.lineHeight = "1.4"; // Higher line height fixes "cut" letters (g, y, j)

        item.appendChild(numSpan);
        item.appendChild(nameSpan);
        rosterContainer.appendChild(item);
    });

    if (rosterData.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.innerText = "No Substitutes";
        emptyMsg.style.color = "#64748b";
        emptyMsg.style.padding = "20px";
        emptyMsg.style.fontSize = "18px";
        rosterContainer.appendChild(emptyMsg);
    }

    document.body.appendChild(rosterContainer);

    const rosterCanvas = await html2canvas(rosterContainer, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0f172a'
    });

    document.body.removeChild(pitchClone);
    document.body.removeChild(rosterContainer);

    // ==========================================
    // STEP 3: GENERATE PORTRAIT PDF (A4 - 9:16-ish Ratio)
    // ==========================================
    // 'p' stands for Portrait
    const pdf = new jsPDF('p', 'mm', 'a4'); 
    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // Background
    pdf.setFillColor(15, 23, 42); 
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(34, 197, 94); 
    pdf.setFont("helvetica", "bold");
    pdf.text(teamName.toUpperCase(), pageWidth / 2, 15, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setTextColor(150);
    pdf.text(`${formationName} Formation`, pageWidth / 2, 22, { align: 'center' });

    // --- Pitch Placement (Top Half) ---
    const margin = 10;
    const headerHeight = 30;
    
    const pitchImg = pitchCanvas.toDataURL('image/png');
    const pitchRatio = pitchCanvas.width / pitchCanvas.height;
    
    // Fit pitch to width (minus margins)
    let pitchW = pageWidth - (margin * 2);
    let pitchH = pitchW / pitchRatio;

    // Center the pitch
    const pitchX = margin;
    const pitchY = headerHeight;

    pdf.addImage(pitchImg, 'PNG', pitchX, pitchY, pitchW, pitchH);

    // --- Roster Placement (Bottom Half) ---
    const rosterImg = rosterCanvas.toDataURL('image/png');
    const rosterRatio = rosterCanvas.width / rosterCanvas.height;
    
    // Section Title
    const subY = pitchY + pitchH + 10; // Gap below pitch
    pdf.setFillColor(34, 197, 94);
    pdf.rect(margin, subY, pageWidth - (margin*2), 0.5, 'F'); // Divider Line
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.text("SUBSTITUTES", margin, subY - 3);

    // Roster Image
    const availableHeight = pageHeight - subY - 15; // Bottom margin
    let rosterW = pageWidth - (margin * 2);
    let rosterH = rosterW / rosterRatio;

    // Check if list is too long for one page, if so, scale it
    if (rosterH > availableHeight) {
        rosterH = availableHeight;
        rosterW = rosterH * rosterRatio;
    }

    // Center Roster
    const rosterX = (pageWidth - rosterW) / 2;

    pdf.addImage(rosterImg, 'PNG', rosterX, subY + 5, rosterW, rosterH);

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(100);
    pdf.text("Generated by Linex11", 10, pageHeight - 5, { align: 'left' });

    pdf.save(`${teamName}_Lineup.pdf`);

  } catch (err) {
    console.error("PDF Gen Error:", err);
    alert("Could not generate PDF. Please ensure all assets are loaded.");
  }
};
