const revealItems = document.querySelectorAll("[data-reveal]");
if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (nav) {
      nav.classList.remove("is-open");
    }
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const compareBlocks = document.querySelectorAll("[data-compare]");
compareBlocks.forEach((block) => {
  const range = block.querySelector("input[type=range]");
  const inner = block.querySelector(".compare-inner");
  if (!range || !inner) {
    return;
  }
  const update = () => {
    inner.style.setProperty("--pos", `${range.value}%`);
  };
  range.addEventListener("input", update);
  update();
});

const covidAffinity = [
  { label: "Ritonavir", value: -5.499 },
  { label: "Nirmatrelvir", value: -5.162 },
  { label: "Remdesivir", value: -4.381 },
  { label: "Ibuprofene", value: -4.083 },
  { label: "Aspirina", value: -3.813 }
];

const parallelDataSets = {
  cutoff: {
    label: "Cutoff",
    data: [
      { x: 0, serial: 0.1875, parallel: 0.184167 },
      { x: 1, serial: 0.139, parallel: 0.0711667 },
      { x: 2, serial: 0.147833, parallel: 0.0541667 },
      { x: 3, serial: 0.136333, parallel: 0.0383333 },
      { x: 4, serial: 0.119667, parallel: 0.0316667 },
      { x: 5, serial: 0.130333, parallel: 0.0331667 },
      { x: 6, serial: 0.130167, parallel: 0.035 },
      { x: 7, serial: 0.124167, parallel: 0.0338333 },
      { x: 8, serial: 0.129667, parallel: 0.0428333 },
      { x: 9, serial: 0.169667, parallel: 0.062 },
      { x: 10, serial: 0.119667, parallel: 0.0593333 },
      { x: 11, serial: 0.126833, parallel: 0.0938333 }
    ]
  },
  size: {
    label: "Array size",
    data: [
      { x: 100000, serial: 0.011, parallel: 0.0108333 },
      { x: 200000, serial: 0.024, parallel: 0.0245 },
      { x: 300000, serial: 0.0386667, parallel: 0.0381667 },
      { x: 400000, serial: 0.0521667, parallel: 0.052 },
      { x: 500000, serial: 0.0673333, parallel: 0.065 },
      { x: 600000, serial: 0.0811667, parallel: 0.0805 },
      { x: 700000, serial: 0.0933333, parallel: 0.0928333 },
      { x: 800000, serial: 0.0913333, parallel: 0.0915 },
      { x: 900000, serial: 0.102833, parallel: 0.1025 },
      { x: 1000000, serial: 0.142333, parallel: 0.1475 }
    ]
  }
};

function setupCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = rect.width * scale;
  canvas.height = rect.height * scale;
  const context = canvas.getContext("2d");
  context.scale(scale, scale);
  return context;
}

function drawBarChart(canvas, data) {
  const context = setupCanvas(canvas);
  const { width, height } = canvas.getBoundingClientRect();
  context.clearRect(0, 0, width, height);

  const padding = { top: 20, right: 16, bottom: 36, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.map((item) => Math.abs(item.value))) * 1.1;

  context.strokeStyle = "rgba(28, 31, 34, 0.15)";
  context.beginPath();
  context.moveTo(padding.left, padding.top);
  context.lineTo(padding.left, padding.top + chartHeight);
  context.lineTo(padding.left + chartWidth, padding.top + chartHeight);
  context.stroke();

  const barWidth = chartWidth / data.length * 0.6;
  data.forEach((item, index) => {
    const x = padding.left + (index + 0.2) * (chartWidth / data.length);
    const value = Math.abs(item.value);
    const barHeight = (value / maxValue) * chartHeight;
    const y = padding.top + chartHeight - barHeight;

    context.fillStyle = "rgba(15, 118, 110, 0.8)";
    context.fillRect(x, y, barWidth, barHeight);

    context.fillStyle = "#1c1f22";
    context.font = "12px Manrope, sans-serif";
    const label = item.label.length > 10 ? `${item.label.slice(0, 9)}...` : item.label;
    context.fillText(label, x - 2, padding.top + chartHeight + 16);
    context.fillStyle = "#5c5d5f";
    const formatted = Number.isInteger(item.value) ? `${item.value}` : item.value.toFixed(3);
    context.fillText(formatted, x - 2, y - 6);
  });
}

function drawLineChart(canvas, data, xLabel, summaryEl) {
  const context = setupCanvas(canvas);
  const { width, height } = canvas.getBoundingClientRect();
  context.clearRect(0, 0, width, height);

  const padding = { top: 20, right: 20, bottom: 36, left: 44 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const allValues = data.flatMap((item) => [item.serial, item.parallel]);
  const maxValue = Math.max(...allValues) * 1.15;
  const minValue = Math.min(...allValues) * 0.85;

  const getX = (value, index) => {
    if (data.length === 1) {
      return padding.left + chartWidth / 2;
    }
    return padding.left + (index / (data.length - 1)) * chartWidth;
  };
  const getY = (value) => {
    const normalized = (value - minValue) / (maxValue - minValue || 1);
    return padding.top + chartHeight - normalized * chartHeight;
  };

  context.strokeStyle = "rgba(28, 31, 34, 0.15)";
  context.beginPath();
  context.moveTo(padding.left, padding.top);
  context.lineTo(padding.left, padding.top + chartHeight);
  context.lineTo(padding.left + chartWidth, padding.top + chartHeight);
  context.stroke();

  const lines = [
    { key: "serial", color: "#0f766e" },
    { key: "parallel", color: "#f97316" }
  ];

  lines.forEach((line) => {
    context.strokeStyle = line.color;
    context.lineWidth = 2;
    context.beginPath();
    data.forEach((item, index) => {
      const x = getX(item.x, index);
      const y = getY(item[line.key]);
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.stroke();

    context.fillStyle = line.color;
    data.forEach((item, index) => {
      const x = getX(item.x, index);
      const y = getY(item[line.key]);
      context.beginPath();
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fill();
    });
  });

  context.fillStyle = "#5c5d5f";
  context.font = "12px Manrope, sans-serif";
  context.fillText(xLabel, padding.left, padding.top + chartHeight + 28);

  const last = data[data.length - 1];
  if (summaryEl && last) {
    const speedup = (last.serial / last.parallel).toFixed(2);
    summaryEl.textContent = `Latest point speedup: ${speedup}x`;
  }
}

const barCharts = document.querySelectorAll("[data-bar-chart]");
barCharts.forEach((chart) => {
  let data = null;
  if (chart.dataset.barValues) {
    try {
      data = JSON.parse(chart.dataset.barValues);
    } catch (error) {
      data = null;
    }
  } else if (chart.dataset.barSource === "covid") {
    data = covidAffinity;
  }

  if (!data) {
    return;
  }

  const draw = () => drawBarChart(chart, data);
  draw();
  window.addEventListener("resize", draw);
});

const lineChart = document.querySelector("[data-line-chart]");
if (lineChart) {
  const summary = document.querySelector("[data-line-summary]");
  const select = document.querySelector("[data-line-select]");

  const draw = () => {
    const key = select ? select.value : "cutoff";
    const dataset = parallelDataSets[key] || parallelDataSets.cutoff;
    drawLineChart(lineChart, dataset.data, dataset.label, summary);
  };

  if (select) {
    select.addEventListener("change", draw);
  }
  draw();
  window.addEventListener("resize", draw);
}

const pipeline = document.querySelector("[data-pipeline]");
if (pipeline) {
  const steps = Array.from(pipeline.querySelectorAll(".pipeline-step"));
  let activeIndex = 0;
  const advance = () => {
    steps.forEach((step, index) => {
      step.classList.toggle("is-active", index === activeIndex);
    });
    activeIndex = (activeIndex + 1) % steps.length;
  };
  advance();
  setInterval(advance, 2500);
}

const shotMap = document.querySelector("[data-shot-map]");
if (shotMap) {
  const shotData = [
    {
      id: 1,
      left: 40,
      top: 100,
      result: "miss",
      match: "Entella - Lucca",
      minute: "Shootout",
      outcome: "Missed",
      video: "https://www.youtube.com/watch?v=Suea4SrQXiA&list=PLD64-55Vi5w6_Cjxx9fLWz6DuqYuCVE5Q&index=1"
    },
    {
      id: 2,
      left: 10,
      top: 80,
      result: "goal",
      match: "Fiorenzuola - Lucca",
      minute: "Shootout",
      outcome: "Converted",
      video: "https://www.youtube.com/watch?v=LkqMCdXVdG4&list=PLD64-55Vi5w6_Cjxx9fLWz6DuqYuCVE5Q&index=2"
    },
    {
      id: 3,
      left: 6.67,
      top: 80,
      result: "miss",
      match: "Ascoli U19 - Milan U19",
      minute: "74'",
      outcome: "Missed",
      video: "https://www.youtube.com/watch?v=xqjK3pF2u3s&list=PLD64-55Vi5w6_Cjxx9fLWz6DuqYuCVE5Q&index=3"
    },
    {
      id: 4,
      left: 10,
      top: 100,
      result: "goal",
      match: "Ascoli U19 - Empoli U19",
      minute: "78'",
      outcome: "Converted",
      video: "https://www.youtube.com/watch?v=4C7nzcFLUT0&list=PLD64-55Vi5w6_Cjxx9fLWz6DuqYuCVE5Q&index=4"
    },
    {
      id: 5,
      left: 90,
      top: 90,
      result: "goal",
      match: "Sampdoria U19 - Ascoli U19",
      minute: "83'",
      outcome: "Converted",
      video: "https://www.youtube.com/watch?v=iZMGtecf3dY&list=PLD64-55Vi5w6_Cjxx9fLWz6DuqYuCVE5Q&index=5"
    },
    {
      id: 6,
      left: 13.33,
      top: 100,
      result: "goal",
      match: "Milan U19 - Ascoli U19",
      minute: "35'",
      outcome: "Converted",
      video: "https://www.youtube.com/watch?v=sWdg0Ogst8E&list=PLD64-55Vi5w6_Cjxx9fLWz6DuqYuCVE5Q&index=6"
    },
    {
      id: 7,
      left: 80,
      top: 70,
      result: "goal",
      match: "Ascoli U19 - Roma U19",
      minute: "35'",
      outcome: "Converted",
      video: "https://www.youtube.com/watch?v=6i8noDYKyqY&list=PLD64-55Vi5w6_Cjxx9fLWz6DuqYuCVE5Q&index=7"
    }
  ];

  const container = shotMap.querySelector(".shot-map-inner");
  const info = shotMap.querySelector("[data-shot-info]");
  const tableBody = shotMap.querySelector("[data-shot-table]");

  const renderInfo = (shot) => {
    if (!info) {
      return;
    }
    info.innerHTML = `
      <strong>Shot ${shot.id}:</strong> ${shot.match} (${shot.minute}) - ${shot.outcome}.
      <a href="${shot.video}" target="_blank" rel="noreferrer">Watch clip</a>
    `;
  };

  shotData.forEach((shot) => {
    const button = document.createElement("button");
    button.className = "shot-dot";
    button.style.left = `${shot.left}%`;
    button.style.top = `${shot.top}%`;
    button.setAttribute("type", "button");
    button.setAttribute("aria-label", `Shot ${shot.id} ${shot.outcome}`);

    const icon = document.createElement("img");
    icon.src = shot.result === "goal"
      ? "../assets/projects/rigori/football.png"
      : "../assets/projects/rigori/missed.png";
    icon.alt = "";

    button.appendChild(icon);
    button.addEventListener("click", () => renderInfo(shot));
    container.appendChild(button);
  });

  if (tableBody) {
    tableBody.innerHTML = shotData.map((shot) => {
      return `
        <tr>
          <td>${shot.id}</td>
          <td>${shot.match}</td>
          <td>${shot.minute}</td>
          <td>${shot.outcome}</td>
          <td><a href="${shot.video}" target="_blank" rel="noreferrer">Video</a></td>
        </tr>
      `;
    }).join("");
  }

  renderInfo(shotData[0]);
}

const codexBuilder = document.querySelector("[data-codex-builder]");
if (codexBuilder) {
  const connectionInputs = codexBuilder.querySelectorAll("input[name=connection]");
  const uiInputs = codexBuilder.querySelectorAll("input[name=ui]");
  const ipInput = codexBuilder.querySelector("[data-server-ip]");
  const output = codexBuilder.querySelector("[data-command-output]");
  const serverOutput = codexBuilder.querySelector("[data-server-command]");

  const update = () => {
    const connection = Array.from(connectionInputs).find((input) => input.checked)?.value || "1";
    const ui = Array.from(uiInputs).find((input) => input.checked)?.value || "1";
    const ip = ipInput?.value.trim() || "127.0.0.1";
    if (output) {
      output.textContent = `java -jar code-naturalis.jar ${connection} ${ui} ${ip}`;
    }
    if (serverOutput) {
      serverOutput.textContent = `java -jar server.jar ${ip}`;
    }
  };

  connectionInputs.forEach((input) => input.addEventListener("change", update));
  uiInputs.forEach((input) => input.addEventListener("change", update));
  if (ipInput) {
    ipInput.addEventListener("input", update);
  }
  update();
}

const stationPlanner = document.querySelector("[data-station-planner]");
if (stationPlanner) {
  let stations = [];
  try {
    stations = JSON.parse(stationPlanner.dataset.stations || "[]");
  } catch (error) {
    stations = [];
  }
  const startSelect = stationPlanner.querySelector("[data-start]");
  const endSelect = stationPlanner.querySelector("[data-end]");
  const markers = stationPlanner.querySelector("[data-markers]");
  const rangeBar = stationPlanner.querySelector("[data-range]");
  const output = stationPlanner.querySelector("[data-output]");

  if (!stations.length || !startSelect || !endSelect) {
    if (output) {
      output.textContent = "No station data available.";
    }
  } else {
    const minDist = Math.min(...stations.map((station) => station.distance));
    const maxDist = Math.max(...stations.map((station) => station.distance));

    const setOptions = () => {
      stations.forEach((station, index) => {
        const option = document.createElement("option");
        option.value = `${index}`;
        option.textContent = `${station.id} (${station.distance} km)`;
        if (startSelect) {
          startSelect.appendChild(option.cloneNode(true));
        }
        if (endSelect) {
          endSelect.appendChild(option);
        }
      });
      endSelect.selectedIndex = stations.length - 1;
    };

    const renderMarkers = () => {
      if (!markers) {
        return;
      }
      markers.innerHTML = "";
      stations.forEach((station, index) => {
        const marker = document.createElement("div");
        marker.className = "station-marker";
        const left = ((station.distance - minDist) / (maxDist - minDist || 1)) * 100;
        marker.style.left = `${left}%`;
        marker.innerHTML = `
          <button type="button">${station.id}</button>
          <div>${station.distance} km</div>
          <div>${station.range} km</div>
        `;
        marker.dataset.index = `${index}`;
        markers.appendChild(marker);
      });
    };

    const findPath = (startIndex, endIndex) => {
      const direction = stations[endIndex].distance >= stations[startIndex].distance ? 1 : -1;
      const queue = [startIndex];
      const visited = new Set([startIndex]);
      const prev = new Array(stations.length).fill(null);

      while (queue.length) {
        const current = queue.shift();
        if (current === endIndex) {
          break;
        }
        stations.forEach((station, index) => {
          if (index === current || visited.has(index)) {
            return;
          }
          const delta = station.distance - stations[current].distance;
          if ((direction === 1 && delta < 0) || (direction === -1 && delta > 0)) {
            return;
          }
          if (Math.abs(delta) <= stations[current].range) {
            visited.add(index);
            prev[index] = current;
            queue.push(index);
          }
        });
      }

      if (!visited.has(endIndex)) {
        return [];
      }
      const path = [];
      let step = endIndex;
      while (step !== null) {
        path.unshift(step);
        step = prev[step];
      }
      return path;
    };

    const update = () => {
      const startIndex = Number(startSelect.value || 0);
      const endIndex = Number(endSelect.value || stations.length - 1);
      const path = findPath(startIndex, endIndex);

      if (rangeBar) {
        const start = stations[startIndex];
        const leftRaw = ((start.distance - minDist) / (maxDist - minDist || 1)) * 100;
        const rightRaw = ((start.distance + start.range - minDist) / (maxDist - minDist || 1)) * 100;
        const left = Math.min(100, Math.max(0, leftRaw));
        const right = Math.min(100, Math.max(0, rightRaw));
        rangeBar.style.left = `${Math.min(left, right)}%`;
        rangeBar.style.width = `${Math.abs(right - left)}%`;
      }

      const markerNodes = stationPlanner.querySelectorAll(".station-marker");
      markerNodes.forEach((marker) => {
        const idx = Number(marker.dataset.index);
        marker.classList.toggle("is-start", idx === startIndex);
        marker.classList.toggle("is-end", idx === endIndex);
        marker.classList.toggle("is-path", path.includes(idx) && idx !== startIndex && idx !== endIndex);
      });

      if (output) {
        if (!path.length) {
          output.textContent = "No feasible route with the current autonomy limits.";
        } else {
          const route = path.map((idx) => stations[idx].id).join(" -> ");
          output.textContent = `Shortest feasible path: ${route}`;
        }
      }
    };

    setOptions();
    renderMarkers();
    startSelect.addEventListener("change", update);
    endSelect.addEventListener("change", update);
    update();
  }
}
