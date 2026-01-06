const projects = [
  {
    title: "HPC Bio Docking Pipeline",
    context: "Personal project",
    date: "Jan 2026",
    summary: "End-to-end virtual screening pipeline for SARS-CoV-2 Mpro using AutoDock Vina.",
    tags: ["HPC", "Bioinformatics", "MPI", "Python", "Docker"],
    filters: ["hpc", "bio", "devops"],
    page: "projects/covid-ligand.html",
    repo: "https://github.com/poliReus/covid_ligand",
    highlights: [
      "Built an end-to-end virtual screening pipeline for SARS-CoV-2 Mpro (6LU7) using AutoDock Vina.",
      "Automated ligand generation from SMILES via OpenBabel and implemented MPI-based distributed docking.",
      "Aggregated and ranked affinities with ligand efficiency metrics; generated NGLView HTML reports and CSV summaries.",
      "Packaged the workflow for SLURM and Docker execution."
    ]
  },
  {
    title: "Football Penalty Takers Analysis",
    context: "Personal project",
    date: "Sep 2024 - Mar 2025",
    summary: "Penalty analytics platform with interactive shot maps and calendar views.",
    tags: ["HTML", "CSS", "JavaScript", "Data Viz"],
    filters: ["data", "web"],
    page: "projects/rigori-24-25.html",
    repo: "https://github.com/analisirigori/rigori_24-25",
    highlights: [
      "Built a multi-page analytics site for Serie C Group B penalty takers (2024/25).",
      "Designed team and player views with shot maps and video-linked events.",
      "Implemented a visual match calendar to track fixture progression.",
      "Added login-gated navigation and reusable styling across pages."
    ]
  },
  {
    title: "DevOps Project - Color to Grayscale Conversion",
    context: "Politecnico di Milano",
    date: "Jun 2025",
    summary: "CI/CD pipeline with 120+ tests, Singularity containerization, and SLURM deployment.",
    tags: ["GitHub Actions", "Google Test", "Singularity", "SLURM"],
    filters: ["devops", "hpc", "systems"],
    page: "projects/devops-grayscale.html",
    highlights: [
      "Built a 120+ test suite covering multiple grayscale strategies and edge cases.",
      "Automated build/test/containerization stages in GitHub Actions.",
      "Packaged a Singularity image and deployed to Galileo100 via SLURM.",
      "Added robust SSH handling and log polling for remote execution."
    ]
  },
  {
    title: "Parallel Computing Challenge",
    context: "Politecnico di Milano",
    date: "Nov 2024",
    summary: "Benchmarked serial and multi-threaded merge sort in C++.",
    tags: ["HPC", "C++", "Benchmarking"],
    filters: ["hpc", "systems"],
    page: "projects/parallel-challenge.html",
    repo: "https://github.com/FedericoQuartieri/ParallelChallenge",
    highlights: [
      "Implemented serial and multi-threaded merge sort in C++, evaluating scalability across input sizes and cutoff thresholds.",
      "Built a reproducible benchmarking pipeline producing CSV timing datasets and 2D/3D visualizations using Python and Gnuplot.",
      "Analyzed speedup and efficiency trade-offs between parallel and serial runs; summarized findings in a technical report."
    ]
  },
  {
    title: "NLA Challenge - Image Processing",
    context: "Politecnico di Milano",
    date: "Oct 2024",
    summary: "Discrete operators, matrix exports, and edge detection for image processing.",
    tags: ["C++", "Eigen", "Image Processing"],
    filters: ["systems"],
    page: "projects/nla-challenge-1.html",
    repo: "https://github.com/FedericoQuartieri/NLAChallenge1",
    highlights: [
      "Implemented an image-processing pipeline in C/C++ with discrete operators for noise injection, smoothing, and sharpening.",
      "Exported matrices and vectors to Matrix Market for inspection and reloaded solutions from .mtx files.",
      "Applied edge detection and generated PNG outputs for every task stage.",
      "Validated symmetry and positive definiteness checks on filter operators."
    ]
  },
  {
    title: "NLA Challenge 2 - Spectral Analysis",
    context: "Politecnico di Milano",
    date: "Oct 2024",
    summary: "SVD reconstructions, eigenvalue estimation, and checkerboard denoising with LIS.",
    tags: ["C", "Eigen", "SVD", "LIS"],
    filters: ["systems"],
    page: "projects/nla-challenge-2.html",
    repo: "https://github.com/FedericoQuartieri/NLAChallenge2",
    highlights: [
      "Computed A^T A and estimated dominant eigenvalues using the LIS power method.",
      "Generated low-rank reconstructions (CD^T) at multiple ranks for comparison.",
      "Created checkerboard patterns and injected noise to stress-test reconstructions.",
      "Exported diagnostic outputs and logs for spectral analysis."
    ]
  },
  {
    title: "Software Engineering",
    context: "Politecnico di Milano",
    date: "Jun 2024",
    summary: "Implemented the board game Codex Naturalis in Java with multiplayer support.",
    tags: ["Java", "Architecture", "Networking"],
    filters: ["systems"],
    page: "projects/codex-naturalis.html",
    highlights: [
      "Built a full Codex Naturalis implementation with CLI and GUI clients.",
      "Supported both RMI and Socket networking for distributed play.",
      "Added multi-game hosting, in-game chat, and reconnection handling.",
      "Applied design patterns across the architecture and codebase."
    ]
  },
  {
    title: "Logical Networks",
    context: "Politecnico di Milano",
    date: "Mar 2024",
    summary: "VHDL state machine for data credibility verification.",
    tags: ["VHDL", "Verification", "Systems"],
    filters: ["systems"],
    highlights: [
      "Implemented a VHDL state machine to verify the credibility of data stored in memory.",
      "Validated functional correctness against course specifications."
    ]
  },
  {
    title: "Introduction to Finite Elements and Algorithms",
    context: "Delft University, Athens Programme",
    date: "Nov 2023",
    summary: "Finite element method implementation and solver cost analysis in Julia.",
    tags: ["Julia", "Numerical Methods", "Algorithms"],
    filters: ["systems"],
    highlights: [
      "Implemented a finite element method problem using Julia.",
      "Analyzed the computational cost of linear system solvers."
    ]
  },
  {
    title: "Algorithms and Data Structures",
    context: "Politecnico di Milano",
    date: "Sep 2023",
    summary: "BST-based highway station manager with route planning by vehicle autonomy.",
    tags: ["C", "BST", "Linked List"],
    filters: ["systems"],
    page: "projects/algorithms-highway.html",
    highlights: [
      "Managed stations in a BST keyed by distance, with sorted vehicle lists per station.",
      "Supported station/vehicle insertion, demolition, and scrapping operations.",
      "Computed feasible routes based on max autonomy across stations."
    ]
  }
];

const projectGrid = document.getElementById("project-grid");
const panel = document.getElementById("project-panel");
const panelTitle = document.getElementById("panel-title");
const panelContext = document.getElementById("panel-context");
const panelDate = document.getElementById("panel-date");
const panelList = document.getElementById("panel-list");
const panelTags = document.getElementById("panel-tags");
const panelLinks = document.getElementById("panel-links");
const panelCaseStudy = document.getElementById("panel-case-study");
const panelRepo = document.getElementById("panel-repo");
const panelPrev = document.getElementById("panel-prev");
const panelNext = document.getElementById("panel-next");
const panelClose = document.querySelector(".panel-close");
const filterButtons = document.querySelectorAll("[data-filter]");

let activeFilter = "all";
let visibleProjects = projects.slice();
let activeIndex = 0;

function renderProjects() {
  projectGrid.innerHTML = "";
  visibleProjects = projects.filter((project) => {
    return activeFilter === "all" || project.filters.includes(activeFilter);
  });

  visibleProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.style.setProperty("--delay", `${index * 0.04}s`);
    card.innerHTML = `
      <p class="project-meta">${project.context} | ${project.date}</p>
      <h3 class="project-title">${project.title}</h3>
      <p>${project.summary}</p>
      <div class="project-tags">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    `;

    const open = () => openPanel(index);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });

    projectGrid.appendChild(card);
    requestAnimationFrame(() => card.classList.add("is-visible"));
  });
}

function openPanel(index) {
  activeIndex = index;
  const project = visibleProjects[activeIndex];
  if (!project) {
    return;
  }

  panelTitle.textContent = project.title;
  panelContext.textContent = project.context;
  panelDate.textContent = project.date;
  panelList.innerHTML = project.highlights.map((item) => `<li>${item}</li>`).join("");
  panelTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  if (panelCaseStudy) {
    if (project.page) {
      panelCaseStudy.href = project.page;
      panelCaseStudy.style.display = "inline-flex";
    } else {
      panelCaseStudy.style.display = "none";
    }
  }
  if (panelRepo) {
    if (project.repo) {
      panelRepo.href = project.repo;
      panelRepo.target = "_blank";
      panelRepo.rel = "noreferrer";
      panelRepo.style.display = "inline-flex";
    } else {
      panelRepo.style.display = "none";
    }
  }
  if (panelLinks) {
    const hasLinks = Boolean(project.page || project.repo);
    panelLinks.style.display = hasLinks ? "flex" : "none";
  }

  panelPrev.disabled = activeIndex === 0;
  panelNext.disabled = activeIndex === visibleProjects.length - 1;

  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");
}

function closePanel() {
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("panel-open");
}

panelPrev.addEventListener("click", () => {
  if (activeIndex > 0) {
    openPanel(activeIndex - 1);
  }
});

panelNext.addEventListener("click", () => {
  if (activeIndex < visibleProjects.length - 1) {
    openPanel(activeIndex + 1);
  }
});

panelClose.addEventListener("click", closePanel);

panel.addEventListener("click", (event) => {
  if (event.target === panel) {
    closePanel();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && panel.classList.contains("is-open")) {
    closePanel();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filterButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    renderProjects();
  });
});

const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");
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

const sectionIds = ["about", "projects", "experience", "skills", "education", "contact"];
const navMap = new Map();
sectionIds.forEach((id) => {
  const link = document.querySelector(`.nav-links a[href="#${id}"]`);
  if (link) {
    navMap.set(id, link);
  }
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navMap.forEach((link) => link.classList.remove("is-active"));
        const activeLink = navMap.get(entry.target.id);
        if (activeLink) {
          activeLink.classList.add("is-active");
        }
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
);

sectionIds.forEach((id) => {
  const section = document.getElementById(id);
  if (section) {
    sectionObserver.observe(section);
  }
});

renderProjects();
