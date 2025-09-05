
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let painting = false;
    let color = "#000000";
    let brushSize = 5;
    let brushType = "normal";
    let hue = 0; // for rainbow

    const colorPicker = document.getElementById("colorPicker");
    const brushSlider = document.getElementById("brushSize");
    const clearBtn = document.getElementById("clearBtn");
    const saveBtn = document.getElementById("saveBtn");

    canvas.addEventListener("mousedown", () => painting = true);
    canvas.addEventListener("mouseup", () => {
      painting = false;
      ctx.beginPath();
    });
    canvas.addEventListener("mousemove", draw);

    function draw(e) {
      if (!painting) return;

      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";

      if (brushType === "normal") {
        ctx.strokeStyle = color;
      }

      if (brushType === "rainbow") {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        hue++;
        if (hue >= 360) hue = 0;
      }

      if (brushType === "neon") {
        ctx.strokeStyle = color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
      } else {
        ctx.shadowBlur = 0; // reset when not neon
      }

      if (brushType === "dotted") {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, brushSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
        return; // no continuous lines
      }

      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    }

    // Events
    colorPicker.addEventListener("input", (e) => color = e.target.value);
    brushSlider.addEventListener("input", (e) => brushSize = e.target.value);
    clearBtn.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));

    saveBtn.addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = "my-drawing.png";
      link.href = canvas.toDataURL();
      link.click();
    });

    // Brush switcher
    document.querySelectorAll("[data-brush]").forEach(btn => {
      btn.addEventListener("click", () => {
        brushType = btn.dataset.brush;
      });
    });
