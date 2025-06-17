// chrome.storage.local.get(...) reads saved data from local Chrome storage.
// This checks if there’s already a value saved for ruleIdCounter:
// ✅ If it exists and is a number, it uses that value.
// ❌ If it doesn’t exist, it initializes it by saving the current value of ruleIdCounter (which is set below to 1000).

chrome.storage.local.get("ruleIdCounter", (data) => {
  if (typeof data.ruleIdCounter === "number") {
    ruleIdCounter = data.ruleIdCounter;
  } else {
    chrome.storage.local.set({ ruleIdCounter });
  }
});

// Get references to the HTML elements:
// addBtn → the "Add" button
// websiteInput → the input field for the website
// list → the <ul> where blocked websites are shown
// Set default ruleIdCounter = 1000 if it's not found in storage

const addBtn = document.getElementById("addBtn");
const websiteInput = document.getElementById("website");
const list = document.getElementById("list");

let ruleIdCounter = 1000;

// Load the saved blocked sites from Chrome storage
// If none, use an empty array
// Clear the <ul> list in the popup

function updateUI() {
  chrome.storage.local.get("blockedSites", (data) => {
    const sites = data.blockedSites || [];
    list.innerHTML = "";

    // For each blocked site, create a new list item
    sites.forEach((site) => {
      const li = document.createElement("li");

      // Show the site's text
      const siteText = document.createElement("span");
      siteText.textContent = site;

      // Add a "Remove" button next to it
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.title = "Remove";
      removeBtn.classList.add("remove-btn");

      //When "Remove" is clicked:
      // It checks current DNR rules
      // Finds the one that matches this site
      // Removes it from the dynamic rules
      removeBtn.addEventListener("click", () => {
        chrome.declarativeNetRequest.getDynamicRules((rules) => {
          const rule = rules.find((r) => r.condition.urlFilter === site);
          if (rule) {
            chrome.declarativeNetRequest.updateDynamicRules({
              removeRuleIds: [rule.id],
            });
          }

          //Updates the saved blocked sites in storage (removes this one)
          // Refreshes the UI
          const updatedSites = sites.filter((s) => s !== site);
          chrome.storage.local.set({ blockedSites: updatedSites }, updateUI);
        });
      });

      li.appendChild(siteText);
      li.appendChild(removeBtn);
      list.appendChild(li);
    });
  });
}

// ➕ Add New Block Rule When Button Clicked
// When the Add button is clicked:
// Get the site input
// Don’t continue if it's empty
addBtn.addEventListener("click", () => {
  const site = websiteInput.value.trim();
  if (!site) return;

  // Load current blocked sites
  // If this site is already blocked, do nothing
  chrome.storage.local.get("blockedSites", async (data) => {
    const blockedSites = data.blockedSites || [];
    if (blockedSites.includes(site)) return;

    // Create a new DNR rule to block this site
    // urlFilter matches any part of a URL (e.g. "facebook.com")
    // main_frame means it blocks the top-level page (not images/scripts)
    const rule = {
      id: ruleIdCounter++,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: site,
        resourceTypes: ["main_frame"],
      },
    };

    // Add the new rule to the browser’s dynamic blocking rules
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [rule],
      removeRuleIds: [],
    });

    // Add the site to the saved list
    // Refresh the UI
    // Clear the input field
    blockedSites.push(site);
    chrome.storage.local.set({ blockedSites });
    updateUI();
    websiteInput.value = "";
  });
});

// Load the blocked sites list immediately when popup opens
updateUI();
