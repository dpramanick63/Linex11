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
    // STEP 1: FIX PITCH (Rectangular, Flat & BIGGER ITEMS)
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

    // --- 1.2: MAKE PITCH NAMES LARGER & TEXT MUCH HIGHER ---
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
        
        // MOVED TEXT UP (MORE)
        // Huge bottom padding forces text to the top of the box
        name.style.padding = "0px 8px 15px 8px"; 
        
        name.style.borderRadius = "6px";
        name.style.zIndex = "100";
        name.style.marginTop = "5px"; 
    });

    // --- 1.3: FIX JERSEY NUMBERS (PRESERVED) ---
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

    // Position Off-Screen
    pitchClone.style.position = "fixed";
    pitchClone.style.left = "-10000px";
    pitchClone.style.top = "0px";
    pitchClone.style.width = "1200px"; 
    pitchClone.style.height = "800px"; 
    document.body.appendChild(pitchClone);

    const pitchCanvas = await html2canvas(pitchClone, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#14532d', 
      logging: false
    });

    // ==========================================
    // STEP 2: FIX ROSTER (NAMES MOVED UP EVEN MORE)
    // ==========================================
    const rosterClone = originalRoster.cloneNode(true);

    const originalInputs = originalRoster.querySelectorAll('input');
    const clonedInputs = rosterClone.querySelectorAll('input');

    originalInputs.forEach((orig, index) => {
        const cloneInput = clonedInputs[index];
        if (cloneInput) {
            const textDiv = document.createElement('div');
            textDiv.innerText = orig.value || ""; 
            
            textDiv.style.textAlign = "center";
            textDiv.style.width = "100%";
            textDiv.style.fontFamily = "sans-serif";
            textDiv.style.fontWeight = "bold";
            textDiv.style.zIndex = "50";

            if (orig.classList.contains('text-pitch')) {
                // === NUMBER (Green) ===
                textDiv.style.color = "#22c55e"; 
                textDiv.style.fontSize = "28px"; 
                // Huge negative margin to pull the NAME (below it) upwards
                textDiv.style.marginBottom = "-40px"; 
                textDiv.style.lineHeight = "1";
            } else {
                // === NAME (White) ===
                textDiv.style.color = "#ffffff"; 
                textDiv.style.fontSize = "14px"; 
                textDiv.style.textTransform = "uppercase";
                textDiv.style.marginTop = "0px"; 
                // Strong Transform to force it UP
                textDiv.style.transform = "translateY(-20px)";
            }

            cloneInput.parentNode.replaceChild(textDiv, cloneInput);
        }
    });

    // --- 2.2: Force Roster Icons Larger ---
    const rosterIcons = rosterClone.querySelectorAll('img, svg');
    rosterIcons.forEach(icon => {
        icon.style.width = "60px";  
        icon.style.height = "60px"; 
        icon.style.minWidth = "60px";
        icon.style.minHeight = "60px";
    });

    // Reset Container Styles
    rosterClone.style.position = "fixed";
    rosterClone.style.left = "-10000px";
    rosterClone.style.top = "0px";
    rosterClone.style.width = "450px"; 
    rosterClone.style.height = "auto"; 
    rosterClone.style.overflow = "visible"; 
    rosterClone.style.backgroundColor = "#0f172a"; 
    rosterClone.style.padding = "20px"; 
    rosterClone.style.border = "none";

    const gridDiv = rosterClone.querySelector('.grid');
    if (gridDiv) {
        gridDiv.className = ''; 
        gridDiv.style.display = "grid";
        gridDiv.style.gridTemplateColumns = "1fr 1fr"; 
        gridDiv.style.gap = "20px"; 
    }

    const playerCards = rosterClone.querySelectorAll('div[draggable]'); 
    playerCards.forEach(card => {
        card.style.border = "1px solid rgba(255,255,255,0.1)";
        card.style.borderRadius = "12px";
        card.style.padding = "15px"; 
        card.style.background = "rgba(0,0,0,0.3)";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.alignItems = "center";
        card.style.justifyContent = "center"; 
        card.style.minHeight = "140px"; 
    });

    const buttons = rosterClone.querySelectorAll('button');
    buttons.forEach(btn => btn.style.display = 'none');

    document.body.appendChild(rosterClone);

    const rosterCanvas = await html2canvas(rosterClone, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0f172a',
      windowHeight: rosterClone.scrollHeight + 100
    });

    document.body.removeChild(pitchClone);
    document.body.removeChild(rosterClone);

    // ==========================================
    // STEP 3: GENERATE LANDSCAPE PDF
    // ==========================================
    const pdf = new jsPDF('l', 'mm', 'a4'); 
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Background
    pdf.setFillColor(15, 23, 42); 
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header
    pdf.setFontSize(22);
    pdf.setTextColor(34, 197, 94); 
    pdf.setFont("helvetica", "bold");
    pdf.text(teamName.toUpperCase(), 15, 15);
    
    pdf.setFontSize(12);
    pdf.setTextColor(150);
    pdf.text(`${formationName} Formation`, 15, 22);

    // --- Pitch Placement ---
    const margin = 15;
    const headerHeight = 25;
    const contentHeight = pageHeight - headerHeight - margin;
    
    const pitchImg = pitchCanvas.toDataURL('image/png');
    const pitchRatio = pitchCanvas.width / pitchCanvas.height;
    
    let pitchW = (pageWidth - (margin * 3)) * 0.65; 
    let pitchH = pitchW / pitchRatio;

    if (pitchH > contentHeight) {
        pitchH = contentHeight;
        pitchW = pitchH * pitchRatio;
    }

    pdf.addImage(pitchImg, 'PNG', margin, headerHeight, pitchW, pitchH);

    // --- Roster Placement ---
    const rosterImg = rosterCanvas.toDataURL('image/png');
    const rosterRatio = rosterCanvas.width / rosterCanvas.height;
    
    const rosterX = margin + pitchW + 10;
    const rosterW = (pageWidth - margin) - rosterX;
    const rosterH = rosterW / rosterRatio;

    pdf.setFillColor(34, 197, 94);
    pdf.rect(rosterX, headerHeight, rosterW, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(11);
    pdf.text("SUBSTITUSIONS", rosterX + (rosterW/2), headerHeight + 5.5, { align: 'center' });

    pdf.addImage(rosterImg, 'PNG', rosterX, headerHeight + 10, rosterW, rosterH);

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(100);
    pdf.text("Generated by Linex11", 15, pageHeight - 5, { align: 'left' });

    pdf.save(`${teamName}_Lineup.pdf`);

  } catch (err) {
    console.error("PDF Gen Error:", err);
    alert("Could not generate PDF. Please ensure all assets are loaded.");
  }
};