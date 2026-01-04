/* =========================
   GLOBAL HELPERS
========================= */

// Get redirect target after login (if any)
function getRedirectAfterLogin() {
  return localStorage.getItem("redirectAfterLogin") || "catalogue.html";
}

// Clear redirect flag
function clearRedirect() {
  localStorage.removeItem("redirectAfterLogin");
}

/* =========================
   BOOK / RENT HANDLER
   (Used on catalogue page)
========================= */

function handleBooking() {
  const role = localStorage.getItem("userRole");

  if (!role) {
    alert("Please login or register to continue");
    localStorage.setItem("redirectAfterLogin", "catalogue.html");
    window.location.href = "login.html";
    return;
  }

  // Logged-in user (future booking flow)
  alert("Booking flow will continue here");
}

/* =========================
   TENANT AUTH
========================= */

function registerTenant() {
  const name = document.getElementById("tName").value.trim();
  const phone = document.getElementById("tPhone").value.trim();

  if (!name || !phone) {
    alert("Please fill all required fields");
    return;
  }

  const tenantData = { name, phone };

  localStorage.setItem("tenantUser", JSON.stringify(tenantData));
  localStorage.setItem("userRole", "tenant");

  const redirect = getRedirectAfterLogin();
  clearRedirect();
  window.location.href = redirect;
}

function loginTenant() {
  const phone = document.getElementById("loginPhone").value.trim();
  const savedTenant = JSON.parse(localStorage.getItem("tenantUser"));

  if (!savedTenant || savedTenant.phone !== phone) {
    alert("Tenant not found. Please register first.");
    return;
  }

  localStorage.setItem("userRole", "tenant");

  const redirect = getRedirectAfterLogin();
  clearRedirect();
  window.location.href = redirect;
}

/* =========================
   OWNER AUTH
========================= */

// TEMP owner IDs (replace later with backend)
const validOwnerIDs = ["SS-OWN-2841", "SS-OWN-7392"];

function registerOwner() {
  const name = document.getElementById("oName").value.trim();
  const phone = document.getElementById("oPhone").value.trim();
  const ownerId = document.getElementById("ownerId").value.trim();

  if (!name || !phone || !ownerId) {
    alert("All fields including Owner ID are required");
    return;
  }

  if (!validOwnerIDs.includes(ownerId)) {
    alert("Invalid Owner ID. Please contact Siliguri Stay.");
    return;
  }

  const ownerData = { name, phone, ownerId };

  localStorage.setItem("ownerUser", JSON.stringify(ownerData));
  localStorage.setItem("userRole", "owner");
  localStorage.setItem("isOwnerVerified", "true");

  clearRedirect();
  window.location.href = "owner-dashboard.html";
}

function loginOwner() {
  const phone = document.getElementById("loginOwnerPhone").value.trim();
  const savedOwner = JSON.parse(localStorage.getItem("ownerUser"));

  if (!savedOwner || savedOwner.phone !== phone) {
    alert("Owner not found. Please register first.");
    return;
  }

  localStorage.setItem("userRole", "owner");
  localStorage.setItem("isOwnerVerified", "true");

  clearRedirect();
  window.location.href = "owner-dashboard.html";
}

/* =========================
   LOGOUT
========================= */

function logoutUser() {
  localStorage.clear();
  window.location.href = "login.html";
}
