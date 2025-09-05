
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let painting = false;
    let color = "#000000";
    let brushSize = 5;

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
      ctx.strokeStyle = color;

      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    }

    colorPicker.addEventListener("input", (e) => color = e.target.value);
    brushSlider.addEventListener("input", (e) => brushSize = e.target.value);
    clearBtn.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));

    saveBtn.addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = "my-drawing.png";
      link.href = canvas.toDataURL();
      link.click();
    });
