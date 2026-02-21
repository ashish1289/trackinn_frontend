/* ============================================
   TRACKINN — Dashboard JS
   dashboard.js
   ============================================ */

// ---- Sidebar Toggle ----
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const topbar = document.getElementById("topbar");

function toggleSidebar() {
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("mobile-open");
    document.getElementById("sidebarOverlay").classList.toggle("active");
  } else {
    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("shifted");
  }
}

function closeMobileSidebar() {
  sidebar.classList.remove("mobile-open");
  document.getElementById("sidebarOverlay").classList.remove("active");
}

// ---- Active Nav ----
function setActiveNav() {
  const currentPage =
    window.location.pathname.split("/").pop() || "dashboard.html";
  document.querySelectorAll(".nav-item").forEach((item) => {
    if (item.getAttribute("href") === currentPage) {
      item.classList.add("active");
    }
  });
}

// ---- Topbar Date ----
function setTopbarDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateEl = document.getElementById("topbarDate");
  if (dateEl) dateEl.textContent = now.toLocaleDateString("en-IN", options);
}

// ---- Tabs ----
function switchTab(tabId, groupClass) {
  const group = groupClass || "tab-panel";
  document
    .querySelectorAll("." + group)
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  const panel = document.getElementById("tab-" + tabId);
  if (panel) panel.classList.add("active");
  event.target.classList.add("active");
}

// ---- Modal ----
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}
// Close on overlay click
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("modal-overlay") &&
    e.target.classList.contains("active")
  ) {
    e.target.classList.remove("active");
    document.body.style.overflow = "";
  }
});
// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.active").forEach((m) => {
      m.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
});

// ---- Init Charts (if Chart.js available) ----
function initLineChart(canvasId, labels, data, label) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || typeof Chart === "undefined") return;
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: label || "Revenue",
          data: data,
          borderColor: "#00bcd4",
          backgroundColor: "rgba(0,188,212,0.08)",
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#00bcd4",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#94a3c0", font: { size: 11 } },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#94a3c0", font: { size: 11 } },
        },
      },
    },
  });
}

function initDoughnutChart(canvasId, labels, data, colors) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || typeof Chart === "undefined") return;
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{ data: data, backgroundColor: colors, borderWidth: 0 }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            color: "#94a3c0",
            font: { size: 11 },
            padding: 12,
            boxWidth: 12,
            borderRadius: 3,
          },
        },
      },
    },
  });
}

function initBarChart(canvasId, labels, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || typeof Chart === "undefined") return;
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: "rgba(0,188,212,0.5)",
          hoverBackgroundColor: "#00bcd4",
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: { color: "#94a3c0", font: { size: 11 } },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: { color: "#94a3c0", font: { size: 11 } },
        },
      },
    },
  });
}

// ---- Role Based Access Control ----
// ---- Role Based Access Control ----
function initSidebarRole() {
  const role = localStorage.getItem('userRole') || 'manager'; // Default to manager
  const navItems = document.querySelectorAll('.nav-item');
  const labels = document.querySelectorAll('.nav-section-label');
  // Labels: 0=Overview, 1=Operations, 2=Finance, 3=Team, 4=Insights

  if(role === 'housekeeping') {
    // HK sees: Room Live View + Staff Management (for tasks/attendance)
    // Hide: Dashboard, Checkin, Rooms (Mgmt), Bookings, Billing, Analytics
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      // Keep room-detail.html and staff.html visible
      if(href.includes('dashboard') || href.includes('checkin') || href.includes('rooms.html') || href.includes('bookings') || href.includes('billing') || href.includes('analytics')) {
        item.style.display = 'none';
      }
    });
    // Hide headers: Overview(0), Finance(2), Insights(4)
    if(labels[0]) labels[0].style.display = 'none';
    if(labels[2]) labels[2].style.display = 'none';
    if(labels[4]) labels[4].style.display = 'none';
    // Keep Team(3) visible for Staff
  }
  
  if(role === 'frontdesk') {
    // FD sees: Dashboard, Checkin, Rooms, RoomDetail, Bookings, Billing (Checkout), Staff (Tasks)
    // Hide: Analytics ONLY
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if(href.includes('analytics')) {
        item.style.display = 'none';
      }
    });
    // Hide headers: Insights(4)
    if(labels[4]) labels[4].style.display = 'none';
  }
  
  if(role === 'billing') {
     // Sees: Dashboard, Billing, Bookings, Staff (Tasks)
     // Hide: Checkin, Rooms, RoomDetail, Analytics
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if(href.includes('checkin') || href.includes('rooms') || href.includes('room-detail') || href.includes('analytics')) {
        item.style.display = 'none';
      }
    });
    // Hide headers: Operations(1), Insights(4)
    if(labels[1]) labels[1].style.display = 'none';
    if(labels[4]) labels[4].style.display = 'none';
  }
}

function updateUserProfile() {
  const userName = localStorage.getItem('userName') || 'Rajesh Kumar';
  const userRoleLabel = localStorage.getItem('userRoleLabel') || 'Hotel Manager';
  const userAvatar = localStorage.getItem('userAvatar') || 'RK';

  // Update Topbar Profile
  const profileName = document.querySelector('.profile-info strong');
  const profileRole = document.querySelector('.profile-info span');
  const profileAvatar = document.querySelector('.profile-avatar');

  if(profileName) profileName.textContent = userName;
  if(profileRole) profileRole.textContent = userRoleLabel;
  if(profileAvatar) profileAvatar.textContent = userAvatar;
  
  // Update Page Header Greeting if exists
  const pageHeaderH1 = document.querySelector('.page-header-left h1');
  if(pageHeaderH1 && pageHeaderH1.textContent.includes('Good morning')) {
     const firstName = userName.split(' ')[0];
     pageHeaderH1.innerHTML = `Good morning, ${firstName} 👋`;
  }
}

// ---- On DOMContentLoaded ----
document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  setTopbarDate();
  initSidebarRole();
  updateUserProfile();
});
