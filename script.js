"use strict";

/*
 * =========================================================
 * AI CHAT
 * Vanilla JavaScript — modular, lightweight, framework-free.
 * All sidebar features render directly in the main chat area.
 * =========================================================
 */


/* =========================================================
   DOM references
   ========================================================= */

const elements = {
  form: document.getElementById("chatForm"),
  input: document.getElementById("messageInput"),
  sendButton: document.getElementById("sendButton"),
  messages: document.getElementById("messages"),
  welcome: document.getElementById("welcome"),
  newChatButton: document.getElementById("newChatButton"),
  topbarTitle: document.getElementById("topbarTitle"),
  brandHomeLink: document.getElementById("brandHomeLink"),
  composer: document.getElementById("composer"),

  // Dynamic Views
  viewSections: {
    chat: document.getElementById("viewChat"),
    search: document.getElementById("viewSearch"),
    library: document.getElementById("viewLibrary"),
    projects: document.getElementById("viewProjects"),
    plugins: document.getElementById("viewPlugins"),
    profile: document.getElementById("viewProfile"),
    auth: document.getElementById("viewAuth"),
  },

  // Sidebar Nav Items
  navItems: {
    chat: document.getElementById("navNewChat"),
    search: document.getElementById("navSearchBtn"),
    library: document.getElementById("navLibraryBtn"),
    projects: document.getElementById("navProjectsBtn"),
    plugins: document.getElementById("navPluginsBtn"),
    profile: document.getElementById("profileButton"),
  },

  // Sidebar search & actions
  searchButton: document.getElementById("searchButton"),
  sidebarSearch: document.getElementById("sidebarSearch"),
  searchInput: document.getElementById("searchInput"),
  pinnedChatsList: document.getElementById("pinnedChatsList"),
  recentChatsList: document.getElementById("recentChatsList"),
  collapseSidebarButton: document.getElementById("collapseSidebarButton"),
  expandSidebarButton: document.getElementById("expandSidebarButton"),
  mobileMenuButton: document.getElementById("mobileMenuButton"),
  sidebarBackdrop: document.getElementById("sidebarBackdrop"),
  sidebar: document.getElementById("sidebar"),

  // Plus Menu & Composer Actions
  plusButton: document.getElementById("plusButton"),
  plusMenu: document.getElementById("plusMenu"),
  fileInput: document.getElementById("fileInput"),
  actionAddFiles: document.getElementById("actionAddFiles"),
  actionAddLibrary: document.getElementById("actionAddLibrary"),
  actionWebSearch: document.getElementById("actionWebSearch"),
  webSearchCheck: document.getElementById("webSearchCheck"),
  webSearchBadge: document.getElementById("webSearchBadge"),
  removeWebSearchBtn: document.getElementById("removeWebSearchBtn"),
  attachmentsPreview: document.getElementById("attachmentsPreview"),
  voiceButton: document.getElementById("voiceButton"),
  suggestions: document.querySelectorAll(".suggestion"),

  // Search View Specific
  mainSearchInput: document.getElementById("mainSearchInput"),
  searchResultsContainer: document.getElementById("searchResultsContainer"),
  searchFilterPills: document.getElementById("searchFilterPills"),

  // Library View Specific
  mainLibraryGrid: document.getElementById("mainLibraryGrid"),
  libraryUploadBtn: document.getElementById("libraryUploadBtn"),
  libraryFilterPills: document.getElementById("libraryFilterPills"),

  // Projects View Specific
  projectsGrid: document.getElementById("projectsGrid"),
  newProjectBtn: document.getElementById("newProjectBtn"),

  // Project Modal Popup Elements
  projectModalBackdrop: document.getElementById("projectModalBackdrop"),
  projectModal: document.getElementById("projectModal"),
  closeProjectModalBtn: document.getElementById("closeProjectModalBtn"),
  cancelProjectModalBtn: document.getElementById("cancelProjectModalBtn"),
  projectForm: document.getElementById("projectForm"),
  projectNameInput: document.getElementById("projectNameInput"),
  projectDescInput: document.getElementById("projectDescInput"),

  // Plugins View Specific
  pluginsGrid: document.getElementById("pluginsGrid"),

  // Settings, API, Personalization, Appearance, Help & Logout
  clearDataBtn: document.getElementById("clearDataBtn"),
  profileTabPills: document.getElementById("profileTabPills"),
  logoutBtn: document.getElementById("logoutBtn"),
  paneSettings: document.getElementById("paneSettings"),
  paneApi: document.getElementById("paneApi"),
  panePersonalization: document.getElementById("panePersonalization"),
  paneAppearance: document.getElementById("paneAppearance"),
  paneHelp: document.getElementById("paneHelp"),
  paneAccount: document.getElementById("paneAccount"),
  savePersonalizationBtn: document.getElementById("savePersonalizationBtn"),
  saveAppearanceBtn: document.getElementById("saveAppearanceBtn"),
  themeSelect: document.getElementById("themeSelect"),
  fontSizeSelect: document.getElementById("fontSizeSelect"),
  spacingSelect: document.getElementById("spacingSelect"),

  // AI / API Configuration Elements
  apiProviderSelect: document.getElementById("apiProviderSelect"),
  apiEndpointInput: document.getElementById("apiEndpointInput"),
  apiEndpointHint: document.getElementById("apiEndpointHint"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  toggleApiKeyVisibility: document.getElementById("toggleApiKeyVisibility"),
  apiModelInput: document.getElementById("apiModelInput"),
  apiTemperatureInput: document.getElementById("apiTemperatureInput"),
  tempValueDisplay: document.getElementById("tempValueDisplay"),
  apiMaxTokensInput: document.getElementById("apiMaxTokensInput"),
  apiSystemPromptInput: document.getElementById("apiSystemPromptInput"),
  saveApiConfigBtn: document.getElementById("saveApiConfigBtn"),
  resetApiConfigBtn: document.getElementById("resetApiConfigBtn"),
  testApiConnectionBtn: document.getElementById("testApiConnectionBtn"),
  tavilyApiKeyInput: document.getElementById("tavilyApiKeyInput"),
  toggleTavilyApiKeyVisibility: document.getElementById("toggleTavilyApiKeyVisibility"),
  // Token Usage Progress Elements
  tokenUsageContainer: document.getElementById("tokenUsageContainer"),
  dailyTokensText: document.getElementById("dailyTokensText"),
  dailyTokensRemaining: document.getElementById("dailyTokensRemaining"),
  dailyTokensBar: document.getElementById("dailyTokensBar"),
  monthlyTokensText: document.getElementById("monthlyTokensText"),
  monthlyTokensRemaining: document.getElementById("monthlyTokensRemaining"),
  monthlyTokensBar: document.getElementById("monthlyTokensBar"),

  // Topbar Auth Buttons & Authentication View Elements
  topbarLoginBtn: document.getElementById("topbarLoginBtn"),
  topbarSignupBtn: document.getElementById("topbarSignupBtn"),
  viewAuth: document.getElementById("viewAuth"),
  cardLogin: document.getElementById("cardLogin"),
  cardSignup: document.getElementById("cardSignup"),
  loginForm: document.getElementById("loginForm"),
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),
  toggleLoginPwd: document.getElementById("toggleLoginPwd"),
  forgotPasswordBtn: document.getElementById("forgotPasswordBtn"),
  switchToSignupBtn: document.getElementById("switchToSignupBtn"),
  switchToLoginBtn: document.getElementById("switchToLoginBtn"),
  signupForm: document.getElementById("signupForm"),
  signupName: document.getElementById("signupName"),
  signupEmail: document.getElementById("signupEmail"),
  signupPassword: document.getElementById("signupPassword"),
  signupConfirmPassword: document.getElementById("signupConfirmPassword"),
  toggleSignupPwd: document.getElementById("toggleSignupPwd"),
  toggleSignupConfirmPwd: document.getElementById("toggleSignupConfirmPwd"),
  // Model Library Elements
  hfModelsListContainer: document.getElementById("hfModelsListContainer"),
  newModelIdInput: document.getElementById("newModelIdInput"),
  newModelNameInput: document.getElementById("newModelNameInput"),
  newModelTagSelect: document.getElementById("newModelTagSelect"),
  addModelBtn: document.getElementById("addModelBtn"),

  // Toast
  toast: document.getElementById("toast"),
};


/* =========================================================
   Hugging Face Model Presets & Multi-Model Library
   ========================================================= */

const DEFAULT_HF_MODELS = [
  {
    id: "meta-llama/Llama-3.3-70B-Instruct",
    name: "Llama 3.3 70B",
    tag: "⚡ Fast",
    enabled: true,
    isDefault: true,
  },
  {
    id: "deepseek-ai/DeepSeek-R1",
    name: "DeepSeek R1",
    tag: "🧠 Reasoning",
    enabled: true,
    isDefault: false,
  },
  {
    id: "Qwen/Qwen2.5-72B-Instruct",
    name: "Qwen 2.5 72B",
    tag: "💎 Balanced",
    enabled: true,
    isDefault: false,
  },
  {
    id: "Qwen/Qwen2.5-Coder-32B-Instruct",
    name: "Qwen 2.5 Coder",
    tag: "💻 Coding",
    enabled: true,
    isDefault: false,
  },
  {
    id: "google/gemma-2-27b-it",
    name: "Gemma 2 27B",
    tag: "⚡ Fast",
    enabled: true,
    isDefault: false,
  },
  {
    id: "mistralai/Mistral-7B-Instruct-v0.3",
    name: "Mistral 7B",
    tag: "🌊 Creative",
    enabled: true,
    isDefault: false,
  },
  {
    id: "meta-llama/Llama-3.2-11B-Vision-Instruct",
    name: "Llama 3.2 Vision",
    tag: "👁️ Vision",
    enabled: true,
    isDefault: false,
  },
];

const API_PRESETS = {
  huggingface: {
    name: "Hugging Face",
    endpoint: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.3-70B-Instruct",
    model: "meta-llama/Llama-3.3-70B-Instruct",
    hint: "Format: https://api-inference.huggingface.co/models/<model-id>"
  },
  openai: {
    name: "OpenAI / Compatible",
    endpoint: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
    hint: "Compatible with OpenRouter, DeepSeek, Together, Groq, etc."
  },
  ollama: {
    name: "Ollama Local",
    endpoint: "http://localhost:11434/v1/chat/completions",
    model: "llama3.2",
    hint: "Local Ollama server (ensure CORS is enabled: OLLAMA_ORIGINS=*)"
  },
  custom: {
    name: "Custom API Endpoint",
    endpoint: "",
    model: "",
    hint: "Any standard REST or OpenAI-compatible endpoint."
  }
};

const DEFAULT_API_CONFIG = {
  provider: "huggingface",
  endpoint: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.3-70B-Instruct",
  apiKey: "",
  tavilyApiKey: "",
  model: "meta-llama/Llama-3.3-70B-Instruct",
  temperature: 0.7,
  maxTokens: 1024,
  systemPrompt: "You are a helpful, knowledgeable, and precise AI assistant."
};

const DEFAULT_TOKEN_LIMITS = {
  daily: 10000,
  monthly: 100000,
};


/* =========================================================
   State & Mock Data
   ========================================================= */

const state = {
  currentView: "chat", // 'chat' | 'search' | 'library' | 'projects' | 'plugins' | 'profile' | 'auth'
  isResponding: false,
  isSidebarCollapsed: false,
  isMobileSidebarOpen: false,
  activeChatId: null,

  // Multi-Model Hugging Face state
  selectedModel: "meta-llama/Llama-3.3-70B-Instruct",
  hfModels: [...DEFAULT_HF_MODELS],

  // Supabase Auth & User Profile State
  currentUser: null,
  userProfile: null,

  // Token Tracking State
  tokenLimits: { ...DEFAULT_TOKEN_LIMITS },
  tokenUsage: {
    dailyUsed: 0,
    monthlyUsed: 0,
    lastDay: "",
    lastMonth: "",
  },

  // Flexible AI API Config
  apiConfig: { ...DEFAULT_API_CONFIG },

  // Composer & Modal state
  webSearchEnabled: false,
  attachments: [], // Array of { id, name, size, type, isImage, dataUrl }
  isVoiceRecording: false,
  speechRecognition: null,
  isPlusMenuOpen: false,
  isProjectModalOpen: false,

  // Search Filter State
  searchFilter: "all",
  libraryFilter: "all",

  // Mock Library Resources
  libraryResources: [
    {
      id: "lib-1",
      name: "Product_Roadmap_Q3.pdf",
      type: "pdf",
      size: "1.4 MB",
      date: "Aug 28, 2026",
      isImage: false,
      dataUrl: null
    },
    {
      id: "lib-2",
      name: "Architecture_Overview.png",
      type: "image",
      size: "820 KB",
      date: "Aug 24, 2026",
      isImage: true,
      dataUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect fill='%23f1f5f9' width='100' height='100'/><text fill='%23475569' font-family='sans-serif' font-size='12' font-weight='bold' x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'>Diagram</text></svg>"
    },
    {
      id: "lib-3",
      name: "Meeting_Notes_Aug.docx",
      type: "doc",
      size: "340 KB",
      date: "Aug 20, 2026",
      isImage: false,
      dataUrl: null
    },
    {
      id: "lib-4",
      name: "Financial_Forecast.xlsx",
      type: "sheet",
      size: "2.1 MB",
      date: "Aug 15, 2026",
      isImage: false,
      dataUrl: null
    },
    {
      id: "lib-5",
      name: "API_Documentation.pdf",
      type: "pdf",
      size: "950 KB",
      date: "Aug 10, 2026",
      isImage: false,
      dataUrl: null
    },
    {
      id: "lib-6",
      name: "Design_Guidelines.png",
      type: "image",
      size: "1.8 MB",
      date: "Aug 02, 2026",
      isImage: true,
      dataUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect fill='%23e2e8f0' width='100' height='100'/><text fill='%23334155' font-family='sans-serif' font-size='12' font-weight='bold' x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'>Design</text></svg>"
    }
  ],

  // Mock Projects Data
  projects: [
    {
      id: "proj-1",
      title: "AI Chat Assistant",
      desc: "Custom chatbot interface with speech recognition and document retrieval capabilities.",
      chatsCount: 8,
      updated: "Just now"
    },
    {
      id: "proj-2",
      title: "Data Analytics Pipeline",
      desc: "Automated report generator and charts extractor from weekly spreadsheets.",
      chatsCount: 4,
      updated: "2 days ago"
    },
    {
      id: "proj-3",
      title: "Customer Support Workflow",
      desc: "Prompt chains and knowledge base integration for tier-1 support queries.",
      chatsCount: 12,
      updated: "Last week"
    }
  ],

  // Mock Plugins Data
  plugins: [
    {
      id: "plug-web",
      title: "Web Search & Browse",
      desc: "Allows the AI to access real-time online content, citations, and search index.",
      enabled: true
    },
    {
      id: "plug-code",
      title: "Code Interpreter",
      desc: "Safely execute Python and JavaScript snippets to solve mathematical & algorithmic problems.",
      enabled: true
    },
    {
      id: "plug-doc",
      title: "Document Parser",
      desc: "Extract text, tables, and structured metadata from PDF, Word, and Excel files.",
      enabled: true
    },
    {
      id: "plug-img",
      title: "Image Generation",
      desc: "Create conceptual artwork, mockups, and illustrations from natural language descriptions.",
      enabled: false
    }
  ],

  // Mock Chat History Data
  chats: [
    { id: '1', title: 'React component setup', pinned: true, timestamp: Date.now() - 100000 },
    { id: '2', title: 'Weekend project ideas', pinned: true, timestamp: Date.now() - 500000 },
    { id: '3', title: 'Professional email draft', pinned: false, timestamp: Date.now() - 800000 },
    { id: '4', title: 'Python data analysis', pinned: false, timestamp: Date.now() - 1200000 },
    { id: '5', title: 'Travel itinerary for Japan', pinned: false, timestamp: Date.now() - 2000000 },
  ]
};


/* =========================================================
   Initialization
   ========================================================= */

function init() {
  initSpeechRecognition();
  loadApiConfig();
  loadHfModels();
  loadTokenUsage();
  initAuth();
  bindEvents();
  renderChats();
  renderMainLibrary();
  renderProjects();
  renderPlugins();
  renderSearchResults();
  updateSendButton();
  autoResizeTextarea();
}

function bindEvents() {

  // Sidebar Navigation -> Dynamically switches main area view
  if (elements.navItems.chat) {
    elements.navItems.chat.addEventListener("click", () => {
      createNewChat();
    });
  }

  if (elements.brandHomeLink) {
    elements.brandHomeLink.addEventListener("click", (e) => {
      e.preventDefault();
      createNewChat();
    });
  }

  if (elements.navItems.search) {
    elements.navItems.search.addEventListener("click", () => {
      switchView("search");
    });
  }

  if (elements.searchButton) {
    elements.searchButton.addEventListener("click", () => {
      switchView("search");
    });
  }

  if (elements.navItems.library) {
    elements.navItems.library.addEventListener("click", () => {
      switchView("library");
    });
  }

  if (elements.navItems.projects) {
    elements.navItems.projects.addEventListener("click", () => {
      switchView("projects");
    });
  }

  if (elements.navItems.plugins) {
    elements.navItems.plugins.addEventListener("click", () => {
      switchView("plugins");
    });
  }

  if (elements.navItems.profile) {
    elements.navItems.profile.addEventListener("click", () => {
      switchView("profile");
    });
  }

  // Topbar New Chat Button
  if (elements.newChatButton) {
    elements.newChatButton.addEventListener("click", () => {
      createNewChat();
    });
  }

  // Chat form submit
  if (elements.form) elements.form.addEventListener("submit", handleSubmit);

  // Textarea input handling
  if (elements.input) {
    elements.input.addEventListener("input", () => {
      autoResizeTextarea();
      updateSendButton();
    });

    elements.input.addEventListener("keydown", handleInputKeydown);
  }

  // Suggestions buttons
  if (elements.suggestions) {
    elements.suggestions.forEach((button) => {
      button.addEventListener("click", () => {
        const prompt = button.dataset.prompt || "";
        if (elements.input) {
          elements.input.value = prompt;
          autoResizeTextarea();
          updateSendButton();
          elements.input.focus();
        }
      });
    });
  }

  // Plus menu actions
  if (elements.plusButton) {
    elements.plusButton.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePlusMenu();
    });
  }

  if (elements.actionAddFiles && elements.fileInput) {
    elements.actionAddFiles.addEventListener("click", () => {
      closePlusMenu();
      elements.fileInput.click();
    });
  }

  if (elements.fileInput) {
    elements.fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files);
        elements.fileInput.value = "";
      }
    });
  }

  if (elements.actionAddLibrary) {
    elements.actionAddLibrary.addEventListener("click", () => {
      closePlusMenu();
      switchView("library");
    });
  }

  if (elements.actionWebSearch) {
    elements.actionWebSearch.addEventListener("click", () => {
      toggleWebSearch();
    });
  }

  if (elements.removeWebSearchBtn) {
    elements.removeWebSearchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWebSearch(false);
    });
  }

  // Voice button action
  if (elements.voiceButton) {
    elements.voiceButton.addEventListener("click", () => {
      if (state.isVoiceRecording) {
        stopVoiceInput();
      } else {
        startVoiceInput();
      }
    });
  }

  // Search Filter Pills
  if (elements.searchFilterPills) {
    elements.searchFilterPills.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-pill");
      if (!btn) return;
      elements.searchFilterPills.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      state.searchFilter = btn.dataset.filter || "all";
      renderSearchResults(elements.mainSearchInput.value);
    });
  }

  // Main Search Input
  if (elements.mainSearchInput) {
    elements.mainSearchInput.addEventListener("input", (e) => {
      renderSearchResults(e.target.value);
    });
  }

  // Library Filter Pills
  if (elements.libraryFilterPills) {
    elements.libraryFilterPills.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-pill");
      if (!btn) return;
      elements.libraryFilterPills.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      state.libraryFilter = btn.dataset.libFilter || "all";
      renderMainLibrary();
    });
  }

  // Library Upload action
  if (elements.libraryUploadBtn) {
    elements.libraryUploadBtn.addEventListener("click", () => {
      elements.fileInput.click();
    });
  }

  // New Project Button -> Opens Custom Popup Modal
  if (elements.newProjectBtn) {
    elements.newProjectBtn.addEventListener("click", () => {
      openProjectModal();
    });
  }

  // Project Modal Dialog Actions
  if (elements.closeProjectModalBtn) {
    elements.closeProjectModalBtn.addEventListener("click", closeProjectModal);
  }

  if (elements.cancelProjectModalBtn) {
    elements.cancelProjectModalBtn.addEventListener("click", closeProjectModal);
  }

  if (elements.projectModalBackdrop) {
    elements.projectModalBackdrop.addEventListener("click", (e) => {
      if (e.target === elements.projectModalBackdrop) {
        closeProjectModal();
      }
    });
  }

  if (elements.projectForm) {
    elements.projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = elements.projectNameInput.value.trim();
      const desc = elements.projectDescInput.value.trim() || "Custom project workspace with isolated memory and resources.";

      if (title) {
        state.projects.unshift({
          id: "proj-" + Date.now(),
          title: title,
          desc: desc,
          chatsCount: 0,
          updated: "Just now"
        });
        renderProjects();
        closeProjectModal();
        showToast(`Created project: ${title}`);
      }
    });
  }

  // Clear data button
  if (elements.clearDataBtn) {
    elements.clearDataBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your local chat history?")) {
        state.chats = [];
        renderChats();
        createNewChat();
        showToast("Chat history cleared.");
      }
    });
  }

  // Profile / Settings Tab Switching (Settings | API Settings | Personalization | Appearance | Help & FAQ | Account & Log Out)
  if (elements.profileTabPills) {
    elements.profileTabPills.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-pill");
      if (!btn) return;
      elements.profileTabPills.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.dataset.profileTab;
      const panes = {
        settings: elements.paneSettings,
        api: elements.paneApi,
        personalization: elements.panePersonalization,
        appearance: elements.paneAppearance,
        help: elements.paneHelp,
        account: elements.paneAccount,
      };

      Object.keys(panes).forEach(k => {
        if (panes[k]) {
          if (k === tab) {
            panes[k].classList.remove("hidden");
          } else {
            panes[k].classList.add("hidden");
          }
        }
      });
    });
  }

  // API Settings Event Handlers
  if (elements.apiProviderSelect) {
    elements.apiProviderSelect.addEventListener("change", (e) => {
      handleProviderChange(e.target.value);
    });
  }

  if (elements.toggleApiKeyVisibility && elements.apiKeyInput) {
    elements.toggleApiKeyVisibility.addEventListener("click", () => {
      const isPass = elements.apiKeyInput.type === "password";
      elements.apiKeyInput.type = isPass ? "text" : "password";
    });
  }

  if (elements.apiTemperatureInput && elements.tempValueDisplay) {
    elements.apiTemperatureInput.addEventListener("input", (e) => {
      elements.tempValueDisplay.textContent = e.target.value;
    });
  }

  if (elements.saveApiConfigBtn) {
    elements.saveApiConfigBtn.addEventListener("click", saveApiConfig);
  }

  if (elements.toggleTavilyApiKeyVisibility && elements.tavilyApiKeyInput) {
    elements.toggleTavilyApiKeyVisibility.addEventListener("click", () => {
      if (elements.tavilyApiKeyInput.type === "password") {
        elements.tavilyApiKeyInput.type = "text";
        elements.toggleTavilyApiKeyVisibility.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
      } else {
        elements.tavilyApiKeyInput.type = "password";
        elements.toggleTavilyApiKeyVisibility.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      }
    });
  }

  if (elements.resetApiConfigBtn) {
    elements.resetApiConfigBtn.addEventListener("click", resetApiConfig);
  }

  if (elements.testApiConnectionBtn) {
    elements.testApiConnectionBtn.addEventListener("click", testApiConnection);
  }

  if (elements.addModelBtn) {
    elements.addModelBtn.addEventListener("click", () => {
      const modelId = elements.newModelIdInput ? elements.newModelIdInput.value : "";
      const name = elements.newModelNameInput ? elements.newModelNameInput.value : "";
      const tag = elements.newModelTagSelect ? elements.newModelTagSelect.value : "";
      addCustomHfModel(modelId, name, tag);
    });
  }

  // Save Personalization Button
  if (elements.savePersonalizationBtn) {
    elements.savePersonalizationBtn.addEventListener("click", () => {
      showToast("Personalization preferences saved.");
    });
  }

  // Appearance Controls
  if (elements.themeSelect) {
    elements.themeSelect.addEventListener("change", (e) => {
      applyTheme(e.target.value);
    });
  }

  if (elements.fontSizeSelect) {
    elements.fontSizeSelect.addEventListener("change", (e) => {
      document.body.setAttribute("data-font-size", e.target.value);
    });
  }

  if (elements.spacingSelect) {
    elements.spacingSelect.addEventListener("change", (e) => {
      document.body.setAttribute("data-spacing", e.target.value);
    });
  }

  if (elements.saveAppearanceBtn) {
    elements.saveAppearanceBtn.addEventListener("click", () => {
      showToast("Appearance preferences saved.");
    });
  }

  // Log Out button
  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to log out of your session?")) {
        showToast("Logged out successfully.");
        setTimeout(() => {
          createNewChat();
          switchView("chat");
        }, 600);
      }
    });
  }

  // Global click & keydown listeners
  document.addEventListener("click", (e) => {
    if (state.isPlusMenuOpen && !elements.plusMenu.contains(e.target) && e.target !== elements.plusButton) {
      closePlusMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (state.isPlusMenuOpen) closePlusMenu();
      if (state.isProjectModalOpen) closeProjectModal();
    }
  });

  // Authentication UI Controls
  if (elements.topbarLoginBtn) {
    elements.topbarLoginBtn.addEventListener("click", () => openAuthView("login"));
  }

  if (elements.topbarSignupBtn) {
    elements.topbarSignupBtn.addEventListener("click", () => openAuthView("signup"));
  }

  if (elements.switchToSignupBtn) {
    elements.switchToSignupBtn.addEventListener("click", () => openAuthView("signup"));
  }

  if (elements.switchToLoginBtn) {
    elements.switchToLoginBtn.addEventListener("click", () => openAuthView("login"));
  }

  // Password visibility toggles
  if (elements.toggleLoginPwd && elements.loginPassword) {
    elements.toggleLoginPwd.addEventListener("click", () => {
      const isPass = elements.loginPassword.type === "password";
      elements.loginPassword.type = isPass ? "text" : "password";
    });
  }

  if (elements.toggleSignupPwd && elements.signupPassword) {
    elements.toggleSignupPwd.addEventListener("click", () => {
      const isPass = elements.signupPassword.type === "password";
      elements.signupPassword.type = isPass ? "text" : "password";
    });
  }

  if (elements.toggleSignupConfirmPwd && elements.signupConfirmPassword) {
    elements.toggleSignupConfirmPwd.addEventListener("click", () => {
      const isPass = elements.signupConfirmPassword.type === "password";
      elements.signupConfirmPassword.type = isPass ? "text" : "password";
    });
  }

  if (elements.forgotPasswordBtn) {
    elements.forgotPasswordBtn.addEventListener("click", async () => {
      const email = elements.loginEmail ? elements.loginEmail.value.trim() : "";
      if (!email) {
        showToast("Please enter your email address to reset password.");
        return;
      }
      try {
        if (window.SupabaseService && window.SupabaseService.isConfigured()) {
          showToast("Sending password reset email...");
          await window.SupabaseService.auth.resetPassword(email);
          showToast(`Password reset instructions sent to ${email}`);
        } else {
          showToast(`Password reset instructions sent to ${email} (Simulated).`);
        }
      } catch (err) {
        showToast(`Reset error: ${err.message || err}`);
      }
    });
  }

  if (elements.loginForm) {
    elements.loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = elements.loginEmail.value.trim();
      const password = elements.loginPassword.value;

      if (!email || !password) {
        showToast("Please enter both email and password.");
        return;
      }

      try {
        if (window.SupabaseService && window.SupabaseService.isConfigured()) {
          showToast("Signing in to your workspace...");
          const res = await window.SupabaseService.auth.signIn(email, password);
          if (res && res.user) {
            state.currentUser = res.user;
            await loadUserData(res.user);
            showToast(`Welcome back, ${res.user.email}!`);
          }
        } else {
          showToast(`Welcome back! Logged in as ${email}`);
        }
        setTimeout(() => {
          switchView("chat");
        }, 500);
      } catch (err) {
        console.error("Login error:", err);
        showToast(`Login failed: ${err.message || err}`);
      }
    });
  }

  if (elements.signupForm) {
    elements.signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = elements.signupName.value.trim();
      const email = elements.signupEmail.value.trim();
      const password = elements.signupPassword.value;
      const confirmPassword = elements.signupConfirmPassword.value;

      if (!name || !email || !password) {
        showToast("Please complete all registration fields.");
        return;
      }

      if (password !== confirmPassword) {
        showToast("Passwords do not match. Please try again.");
        return;
      }

      if (password.length < 6) {
        showToast("Password must be at least 6 characters long.");
        return;
      }

      try {
        if (window.SupabaseService && window.SupabaseService.isConfigured()) {
          showToast("Creating your AI workspace account...");
          const res = await window.SupabaseService.auth.signUp(email, password, name);
          if (res && res.user) {
            state.currentUser = res.user;
            await loadUserData(res.user);
            showToast(`Account created for ${name}! Welcome aboard.`);
          }
        } else {
          showToast(`Account created for ${name}! Welcome aboard.`);
        }
        setTimeout(() => {
          switchView("chat");
        }, 500);
      } catch (err) {
        console.error("Registration error:", err);
        showToast(`Registration failed: ${err.message || err}`);
      }
    });
  }

  // Sidebar controls
  if (elements.collapseSidebarButton) {
    elements.collapseSidebarButton.addEventListener("click", toggleSidebar);
  }
  if (elements.expandSidebarButton) {
    elements.expandSidebarButton.addEventListener("click", toggleSidebar);
  }
  if (elements.mobileMenuButton) {
    elements.mobileMenuButton.addEventListener("click", toggleMobileSidebar);
  }
  if (elements.sidebarBackdrop) {
    elements.sidebarBackdrop.addEventListener("click", toggleMobileSidebar);
  }
  if (elements.searchInput) {
    elements.searchInput.addEventListener("input", (e) => {
      searchChats(e.target.value);
    });
  }
}


/* =========================================================
   Authentication & Supabase User State Controller
   ========================================================= */

async function initAuth() {
  if (!window.SupabaseService) return;

  // Listen to Auth State Changes
  try {
    window.SupabaseService.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        state.currentUser = session.user;
        await loadUserData(session.user);
      } else {
        state.currentUser = null;
        state.userProfile = null;
        state.chats = [];
        state.libraryResources = [];
        updateAuthUI(null);
        renderChats();
        renderMainLibrary();
      }
    });

    const user = await window.SupabaseService.auth.getUser();
    if (user) {
      state.currentUser = user;
      await loadUserData(user);
    }
  } catch (err) {
    console.warn("Auth initialization notice:", err);
  }
}

async function loadUserData(user) {
  try {
    // 1. Fetch Profile
    const profile = await window.SupabaseService.profile.get(user.id);
    state.userProfile = profile || { email: user.email, full_name: user.user_metadata?.full_name || user.email.split('@')[0] };
    updateAuthUI(state.userProfile);

    // 2. Fetch Conversations from Supabase
    const dbConversations = await window.SupabaseService.conversations.list(user.id);
    state.chats = (dbConversations || []).map(c => ({
      id: c.id,
      title: c.title,
      pinned: c.is_pinned,
      model_used: c.model_used,
      timestamp: new Date(c.updated_at).getTime()
    }));
    renderChats();

    // 3. Fetch Files from Supabase
    const dbFiles = await window.SupabaseService.files.list(user.id);
    state.libraryResources = (dbFiles || []).map(f => ({
      id: f.id,
      name: f.file_name,
      type: f.file_type.toLowerCase().includes("pdf") ? "pdf" : (f.file_type.toLowerCase().includes("doc") ? "doc" : "img"),
      size: formatFileSize(f.file_size),
      date: new Date(f.created_at).toLocaleDateString(),
      path: f.file_path,
      url: f.signedUrl || "#"
    }));
    renderMainLibrary();
  } catch (e) {
    console.warn("Failed to fetch user records from Supabase:", e);
  }
}

function updateAuthUI(profile) {
  const profileBtn = document.getElementById("profileButton");
  const profileNameEl = profileBtn ? profileBtn.querySelector(".profile-item__name") : null;
  const profileEmailEl = profileBtn ? profileBtn.querySelector(".profile-item__status") : null;
  const profileAvatarEl = profileBtn ? profileBtn.querySelector(".profile-avatar") : null;
  const authGroup = document.getElementById("topbarAuthGroup");

  if (profile) {
    const displayName = profile.full_name || profile.email.split("@")[0] || "User";
    const initials = displayName.slice(0, 2).toUpperCase();

    if (profileNameEl) profileNameEl.textContent = displayName;
    if (profileEmailEl) profileEmailEl.textContent = profile.email;
    if (profileAvatarEl) profileAvatarEl.textContent = initials;

    // Update settings modal elements
    const settingsAvatar = document.getElementById("settingsAvatar");
    const settingsUserName = document.getElementById("settingsUserName");
    const settingsUserEmail = document.getElementById("settingsUserEmail");
    const settingsUserStatus = document.getElementById("settingsUserStatus");

    if (settingsAvatar) settingsAvatar.textContent = initials;
    if (settingsUserName) settingsUserName.textContent = displayName;
    if (settingsUserEmail) settingsUserEmail.textContent = profile.email;
    if (settingsUserStatus) settingsUserStatus.textContent = `Signed in as ${profile.email}`;

    if (authGroup) {
      authGroup.innerHTML = `
        <button type="button" class="btn-auth-signup" id="topbarUserPill" style="display: inline-flex; align-items: center; gap: 6px;" title="View Profile">
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10a37f;"></span>
          <span>${escapeHtml(displayName)}</span>
        </button>
        <button type="button" class="btn-auth-login" id="topbarLogoutBtn" title="Log Out">Sign Out</button>
      `;

      const pill = document.getElementById("topbarUserPill");
      if (pill) pill.onclick = () => switchView("profile");
      const logoutBtn = document.getElementById("topbarLogoutBtn");
      if (logoutBtn) logoutBtn.onclick = handleLogout;
    }
  } else {
    if (profileNameEl) profileNameEl.textContent = "Guest User";
    if (profileEmailEl) profileEmailEl.textContent = "Sign in to save chats";
    if (profileAvatarEl) profileAvatarEl.textContent = "GU";

    if (authGroup) {
      authGroup.innerHTML = `
        <button type="button" class="btn-auth-login" id="topbarLoginBtn">Log in</button>
        <button type="button" class="btn-auth-signup" id="topbarSignupBtn">Sign up for free</button>
      `;
      const loginBtn = document.getElementById("topbarLoginBtn");
      if (loginBtn) loginBtn.onclick = () => openAuthView("login");
      const signupBtn = document.getElementById("topbarSignupBtn");
      if (signupBtn) signupBtn.onclick = () => openAuthView("signup");
    }
  }
}

async function handleLogout() {
  if (confirm("Are you sure you want to log out of your AI workspace?")) {
    try {
      if (window.SupabaseService && window.SupabaseService.isConfigured()) {
        await window.SupabaseService.auth.signOut();
      }
      state.currentUser = null;
      state.userProfile = null;
      updateAuthUI(null);
      showToast("Logged out successfully.");
      setTimeout(() => {
        createNewChat();
        switchView("chat");
      }, 500);
    } catch (err) {
      console.error("Logout error:", err);
      showToast(`Logout error: ${err.message || err}`);
    }
  }
}

function openAuthView(mode = "login") {
  if (mode === "login") {
    if (elements.cardLogin) elements.cardLogin.classList.remove("hidden");
    if (elements.cardSignup) elements.cardSignup.classList.add("hidden");
    if (elements.topbarTitle) elements.topbarTitle.textContent = "Log In";
  } else {
    if (elements.cardSignup) elements.cardSignup.classList.remove("hidden");
    if (elements.cardLogin) elements.cardLogin.classList.add("hidden");
    if (elements.topbarTitle) elements.topbarTitle.textContent = "Sign Up";
  }

  switchView("auth");
}


/* =========================================================
   Dynamic Inline View Switcher
   ========================================================= */

/**
 * Switches the main container view directly without popups or page loads.
 * @param {"chat"|"search"|"library"|"projects"|"plugins"|"profile"} viewName
 */
function switchView(viewName) {
  state.currentView = viewName;

  // Deactivate all view sections
  Object.keys(elements.viewSections).forEach((key) => {
    if (elements.viewSections[key]) {
      elements.viewSections[key].classList.remove("active");
    }
  });

  // Activate target view
  if (elements.viewSections[viewName]) {
    elements.viewSections[viewName].classList.add("active");
  }

  // Hide message composer when on Search, Library, Projects, Plugins, Profile
  if (elements.composer) {
    if (viewName === "chat") {
      elements.composer.classList.remove("hidden");
    } else {
      elements.composer.classList.add("hidden");
    }
  }

  // Update sidebar active states
  Object.keys(elements.navItems).forEach((key) => {
    if (elements.navItems[key]) {
      if (key === viewName) {
        elements.navItems[key].classList.add("active");
      } else {
        elements.navItems[key].classList.remove("active");
      }
    }
  });

  // Update topbar title
  const titles = {
    chat: state.activeChatId ? getActiveChatTitle() : "New chat",
    search: "Search",
    library: "Library",
    projects: "Projects",
    plugins: "Plugins",
    profile: "Account & Settings"
  };
  elements.topbarTitle.textContent = titles[viewName] || "Chat";

  // Specific view initialization on switch
  if (viewName === "search" && elements.mainSearchInput) {
    elements.mainSearchInput.focus();
    renderSearchResults(elements.mainSearchInput.value);
  } else if (viewName === "library") {
    renderMainLibrary();
  } else if (viewName === "projects") {
    renderProjects();
  } else if (viewName === "plugins") {
    renderPlugins();
  }

  // Close mobile sidebar if open
  if (state.isMobileSidebarOpen) {
    toggleMobileSidebar();
  }

  // Scroll chat area to top smoothly
  const chatScrollContainer = document.querySelector(".chat");
  if (chatScrollContainer) {
    chatScrollContainer.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function getActiveChatTitle() {
  const c = state.chats.find(chat => chat.id === state.activeChatId);
  return c ? c.title : "Chat";
}


/* =========================================================
   Inline View Renderers
   ========================================================= */

/**
 * 1. Renders the Library View Grid directly inside the main chat container
 */
function renderMainLibrary() {
  if (!elements.mainLibraryGrid) return;
  elements.mainLibraryGrid.innerHTML = "";

  const filter = state.libraryFilter;
  const items = state.libraryResources.filter(item => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  if (items.length === 0) {
    elements.mainLibraryGrid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted); font-size: 13px;">
        No items found matching the selected filter.
      </div>
    `;
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "library-card";

    let iconHtml = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
    if (item.isImage) {
      iconHtml = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
    } else if (item.type === "sheet") {
      iconHtml = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>`;
    }

    card.innerHTML = `
      <div class="library-card__top">
        <div class="library-card__icon">${iconHtml}</div>
        <div class="library-card__meta">
          <span class="library-card__name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
          <span class="library-card__sub">${item.size} • ${item.date}</span>
        </div>
      </div>
      <div class="library-card__actions">
        <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">${item.type}</span>
        <button type="button" class="library-card__attach-btn">Attach to Chat</button>
      </div>
    `;

    card.querySelector(".library-card__attach-btn").onclick = () => {
      addAttachmentFromLibrary(item);
      switchView("chat");
      elements.input.focus();
    };

    elements.mainLibraryGrid.appendChild(card);
  });
}

/**
 * 2. Renders Projects View directly inside the main chat container
 */
function renderProjects() {
  if (!elements.projectsGrid) return;
  elements.projectsGrid.innerHTML = "";

  state.projects.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <h3 class="project-card__title">${escapeHtml(proj.title)}</h3>
      <p class="project-card__desc">${escapeHtml(proj.desc)}</p>
      <div class="project-card__footer">
        <span>${proj.chatsCount} conversations</span>
        <span>Updated ${proj.updated}</span>
      </div>
    `;

    card.onclick = () => {
      createNewChat();
      elements.input.value = `[Project: ${proj.title}] `;
      autoResizeTextarea();
      elements.input.focus();
    };

    elements.projectsGrid.appendChild(card);
  });
}

/**
 * 3. Renders Plugins View directly inside the main chat container
 */
function renderPlugins() {
  if (!elements.pluginsGrid) return;
  elements.pluginsGrid.innerHTML = "";

  state.plugins.forEach((plug) => {
    const card = document.createElement("div");
    card.className = "plugin-card";

    card.innerHTML = `
      <div class="plugin-card__top">
        <span class="plugin-card__title">${escapeHtml(plug.title)}</span>
        <label class="switch-control">
          <input type="checkbox" ${plug.enabled ? "checked" : ""} data-id="${plug.id}" />
          <span class="switch-slider"></span>
        </label>
      </div>
      <p class="plugin-card__desc">${escapeHtml(plug.desc)}</p>
    `;

    const checkbox = card.querySelector("input");
    checkbox.onchange = (e) => {
      plug.enabled = e.target.checked;
      showToast(`${plug.title} ${plug.enabled ? "enabled" : "disabled"}`);
    };

    elements.pluginsGrid.appendChild(card);
  });
}

/**
 * 4. Renders Search Results directly inside the main chat container
 */
function renderSearchResults(query = "") {
  if (!elements.searchResultsContainer) return;
  elements.searchResultsContainer.innerHTML = "";

  const q = (query || "").trim().toLowerCase();
  const filter = state.searchFilter;

  // Filter chats
  let matchingChats = state.chats.filter(c => {
    if (filter === "files") return false;
    if (filter === "pinned" && !c.pinned) return false;
    return c.title.toLowerCase().includes(q);
  });

  // Filter library files if applicable
  let matchingFiles = [];
  if (filter === "all" || filter === "files") {
    matchingFiles = state.libraryResources.filter(f => f.name.toLowerCase().includes(q));
  }

  if (matchingChats.length === 0 && matchingFiles.length === 0) {
    elements.searchResultsContainer.innerHTML = `
      <div style="padding: 48px 0; text-align: center; color: var(--text-muted); font-size: 13.5px;">
        No results found for "${escapeHtml(query)}". Try another query or change filters.
      </div>
    `;
    return;
  }

  // Render chat matches
  matchingChats.forEach((chat) => {
    const card = document.createElement("div");
    card.className = "search-result-card";
    card.innerHTML = `
      <div class="search-result-card__info">
        <span class="search-result-card__title">💬 ${escapeHtml(chat.title)}</span>
        <span class="search-result-card__snippet">${chat.pinned ? "Pinned Conversation" : "Recent Conversation"}</span>
      </div>
      <span style="font-size: 12px; color: var(--text-muted);">Open →</span>
    `;

    card.onclick = () => {
      loadChat(chat.id);
      switchView("chat");
    };

    elements.searchResultsContainer.appendChild(card);
  });

  // Render file matches
  matchingFiles.forEach((file) => {
    const card = document.createElement("div");
    card.className = "search-result-card";
    card.innerHTML = `
      <div class="search-result-card__info">
        <span class="search-result-card__title">📄 ${escapeHtml(file.name)}</span>
        <span class="search-result-card__snippet">Workspace Library • ${file.size}</span>
      </div>
      <span style="font-size: 12px; color: var(--text-muted);">Attach →</span>
    `;

    card.onclick = () => {
      addAttachmentFromLibrary(file);
      switchView("chat");
      elements.input.focus();
    };

    elements.searchResultsContainer.appendChild(card);
  });
}


/* =========================================================
   Plus Action Menu & Web Search
   ========================================================= */

function togglePlusMenu() {
  if (state.isPlusMenuOpen) {
    closePlusMenu();
  } else {
    openPlusMenu();
  }
}

function openPlusMenu() {
  state.isPlusMenuOpen = true;
  elements.plusMenu.classList.add("open");
  elements.plusButton.classList.add("active");
  elements.plusButton.setAttribute("aria-expanded", "true");
  elements.plusMenu.setAttribute("aria-hidden", "false");
}

function closePlusMenu() {
  state.isPlusMenuOpen = false;
  elements.plusMenu.classList.remove("open");
  elements.plusButton.classList.remove("active");
  elements.plusButton.setAttribute("aria-expanded", "false");
  elements.plusMenu.setAttribute("aria-hidden", "true");
}


/* =========================================================
   Project Creation Modal Popup
   ========================================================= */

function openProjectModal() {
  state.isProjectModalOpen = true;
  if (elements.projectModalBackdrop) {
    elements.projectModalBackdrop.classList.add("open");
    elements.projectModalBackdrop.setAttribute("aria-hidden", "false");
  }
  if (elements.projectNameInput) {
    elements.projectNameInput.value = "";
  }
  if (elements.projectDescInput) {
    elements.projectDescInput.value = "";
  }
  setTimeout(() => {
    if (elements.projectNameInput) elements.projectNameInput.focus();
  }, 60);
}

function closeProjectModal() {
  state.isProjectModalOpen = false;
  if (elements.projectModalBackdrop) {
    elements.projectModalBackdrop.classList.remove("open");
    elements.projectModalBackdrop.setAttribute("aria-hidden", "true");
  }
}

function toggleWebSearch(forcedValue = null) {
  state.webSearchEnabled = forcedValue !== null ? forcedValue : !state.webSearchEnabled;

  if (state.webSearchEnabled) {
    elements.actionWebSearch.classList.add("active");
    elements.webSearchBadge.classList.remove("hidden");
    showToast("Web search enabled for next message");
  } else {
    elements.actionWebSearch.classList.remove("active");
    elements.webSearchBadge.classList.add("hidden");
  }
}


/* =========================================================
   Attachments Handling
   ========================================================= */

function handleFileSelection(files) {
  Array.from(files).forEach((file) => {
    const isImage = file.type.startsWith("image/");
    const attachmentId = "att-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7);

    const attachmentItem = {
      id: attachmentId,
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileTypeLabel(file.name),
      isImage: isImage,
      dataUrl: null,
      file: file
    };

    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        attachmentItem.dataUrl = e.target.result;
        renderAttachments();
      };
      reader.readAsDataURL(file);
    }

    state.attachments.push(attachmentItem);

    // Also upload to Supabase Storage if user is authenticated
    if (state.currentUser && window.SupabaseService && window.SupabaseService.isConfigured()) {
      window.SupabaseService.files.upload(state.currentUser.id, file, state.activeChatId)
        .then((uploaded) => {
          if (uploaded && uploaded.signedUrl) {
            attachmentItem.dataUrl = uploaded.signedUrl;
          }
          showToast(`Uploaded to storage: ${file.name}`);
          // Refresh library
          window.SupabaseService.files.list(state.currentUser.id).then(files => {
            if (files && files.length > 0) {
              state.libraryResources = files.map(f => ({
                id: f.id,
                name: f.file_name,
                type: f.file_type.toLowerCase().includes("pdf") ? "pdf" : (f.file_type.toLowerCase().includes("doc") ? "doc" : "img"),
                size: formatFileSize(f.file_size),
                date: new Date(f.created_at).toLocaleDateString(),
                path: f.file_path,
                url: f.signedUrl || "#"
              }));
              renderMainLibrary();
            }
          });
        })
        .catch((err) => {
          console.warn("Supabase Storage upload warning:", err);
        });
    } else {
      // Add to local workspace library in mock mode
      state.libraryResources.unshift({
        id: attachmentId,
        name: file.name,
        type: isImage ? "image" : getFileTypeLabel(file.name).toLowerCase(),
        size: formatFileSize(file.size),
        date: "Just now",
        isImage: isImage,
        dataUrl: null
      });
    }
  });

  renderAttachments();
  renderMainLibrary();
  updateSendButton();
}

function addAttachmentFromLibrary(item) {
  const existing = state.attachments.find(a => a.name === item.name);
  if (existing) {
    showToast(`"${item.name}" is already attached`);
    return;
  }

  const attachmentItem = {
    id: "att-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    name: item.name,
    size: item.size,
    type: item.type,
    isImage: item.isImage,
    dataUrl: item.dataUrl,
    fromLibrary: true
  };

  state.attachments.push(attachmentItem);
  renderAttachments();
  updateSendButton();
  showToast(`Attached from library: ${item.name}`);
}

function removeAttachment(id) {
  state.attachments = state.attachments.filter(item => item.id !== id);
  renderAttachments();
  updateSendButton();
}

function clearAttachments() {
  state.attachments = [];
  renderAttachments();
  updateSendButton();
}

function renderAttachments() {
  elements.attachmentsPreview.innerHTML = "";

  if (state.attachments.length === 0) {
    elements.attachmentsPreview.classList.add("hidden");
    return;
  }

  elements.attachmentsPreview.classList.remove("hidden");

  state.attachments.forEach((att) => {
    const chip = document.createElement("div");
    chip.className = "attachment-chip";

    if (att.isImage && att.dataUrl) {
      const img = document.createElement("img");
      img.src = att.dataUrl;
      img.alt = att.name;
      img.className = "attachment-chip__thumb";
      chip.appendChild(img);
    } else {
      const icon = document.createElement("div");
      icon.className = "attachment-chip__icon";
      icon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
      chip.appendChild(icon);
    }

    const details = document.createElement("div");
    details.className = "attachment-chip__details";

    const name = document.createElement("span");
    name.className = "attachment-chip__name";
    name.textContent = att.name;
    name.title = att.name;

    const size = document.createElement("span");
    size.className = "attachment-chip__size";
    size.textContent = att.size;

    details.appendChild(name);
    details.appendChild(size);
    chip.appendChild(details);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "attachment-chip__remove";
    removeBtn.setAttribute("aria-label", `Remove ${att.name}`);
    removeBtn.innerHTML = "&times;";
    removeBtn.onclick = () => removeAttachment(att.id);
    chip.appendChild(removeBtn);

    elements.attachmentsPreview.appendChild(chip);
  });
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

function getFileTypeLabel(filename) {
  const ext = filename.split(".").pop().toLowerCase();
  return ext.toUpperCase();
}


/* =========================================================
   Voice Input (Speech to Text)
   ========================================================= */

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.info("SpeechRecognition API is not supported in this browser.");
    return;
  }

  try {
    state.speechRecognition = new SpeechRecognition();
    state.speechRecognition.continuous = false;
    state.speechRecognition.interimResults = true;
    state.speechRecognition.lang = "en-US";

    state.speechRecognition.onstart = () => {
      state.isVoiceRecording = true;
      elements.voiceButton.classList.add("recording");
      elements.voiceButton.setAttribute("title", "Listening... Click to stop");
      showToast("Listening... speak now");
    };

    state.speechRecognition.onresult = (event) => {
      handleVoiceResult(event);
    };

    state.speechRecognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      stopVoiceInput();
      if (event.error === "not-allowed") {
        showToast("Microphone access was denied.");
      } else if (event.error !== "no-speech") {
        showToast("Speech recognition error: " + event.error);
      }
    };

    state.speechRecognition.onend = () => {
      stopVoiceInput();
    };
  } catch (err) {
    console.error("Failed to initialize SpeechRecognition:", err);
  }
}

function startVoiceInput() {
  if (!state.speechRecognition) {
    showToast("Voice input is not supported on this browser.");
    return;
  }

  try {
    state.speechRecognition.start();
  } catch (err) {
    console.warn("Speech recognition already active or error:", err);
  }
}

function stopVoiceInput() {
  state.isVoiceRecording = false;
  elements.voiceButton.classList.remove("recording");
  elements.voiceButton.setAttribute("title", "Voice input (Speech to Text)");

  if (state.speechRecognition) {
    try {
      state.speechRecognition.stop();
    } catch (e) {
      // Ignored
    }
  }
}

function handleVoiceResult(event) {
  let transcript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }

  if (transcript) {
    const currentVal = elements.input.value.trim();
    if (currentVal) {
      elements.input.value = currentVal + " " + transcript;
    } else {
      elements.input.value = transcript;
    }
    autoResizeTextarea();
    updateSendButton();
  }
}


/* =========================================================
   Sidebar & Chat History Management
   ========================================================= */

function toggleSidebar() {
  state.isSidebarCollapsed = !state.isSidebarCollapsed;
  if (state.isSidebarCollapsed) {
    elements.sidebar.classList.add("collapsed");
    elements.expandSidebarButton.classList.remove("hidden");
  } else {
    elements.sidebar.classList.remove("collapsed");
    elements.expandSidebarButton.classList.add("hidden");
  }
}

function toggleMobileSidebar() {
  state.isMobileSidebarOpen = !state.isMobileSidebarOpen;
  if (state.isMobileSidebarOpen) {
    elements.sidebar.classList.add("open");
    elements.sidebarBackdrop.classList.add("show");
  } else {
    elements.sidebar.classList.remove("open");
    elements.sidebarBackdrop.classList.remove("show");
  }
}

function renderChats(filterQuery = "") {
  elements.pinnedChatsList.innerHTML = "";
  elements.recentChatsList.innerHTML = "";

  const query = filterQuery.toLowerCase();
  
  const filteredChats = state.chats.filter(chat => 
    chat.title.toLowerCase().includes(query)
  );

  const pinned = filteredChats.filter(chat => chat.pinned);
  const recent = filteredChats.filter(chat => !chat.pinned);

  if (pinned.length === 0) {
    elements.pinnedChatsList.innerHTML = `<li class="sidebar__empty-state">No pinned chats</li>`;
  } else {
    pinned.forEach(chat => elements.pinnedChatsList.appendChild(createChatItem(chat)));
  }

  if (recent.length === 0) {
    elements.recentChatsList.innerHTML = `<li class="sidebar__empty-state">No recent chats</li>`;
  } else {
    recent.forEach(chat => elements.recentChatsList.appendChild(createChatItem(chat)));
  }
}

function createChatItem(chat) {
  const li = document.createElement("li");
  li.className = `chat-item ${chat.id === state.activeChatId ? 'active' : ''}`;
  li.onclick = () => {
    loadChat(chat.id);
    switchView("chat");
  };

  const titleSpan = document.createElement("span");
  titleSpan.className = "chat-item-title";
  titleSpan.textContent = chat.title;

  const actions = document.createElement("div");
  actions.className = "chat-item-actions";
  actions.onclick = (e) => e.stopPropagation();

  // Pin/Unpin button
  const pinBtn = document.createElement("button");
  pinBtn.className = "chat-action-btn";
  pinBtn.title = chat.pinned ? "Unpin" : "Pin";
  pinBtn.innerHTML = chat.pinned 
    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 11.24V6a3 3 0 0 0-6 0v5.24a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path></svg>`
    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 11.24V6a3 3 0 0 0-6 0v5.24a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path></svg>`;
  pinBtn.onclick = () => togglePinChat(chat.id);

  // Rename button
  const renameBtn = document.createElement("button");
  renameBtn.className = "chat-action-btn";
  renameBtn.title = "Rename";
  renameBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`;
  renameBtn.onclick = () => renameChat(chat.id);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "chat-action-btn";
  deleteBtn.title = "Delete";
  deleteBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
  deleteBtn.onclick = () => deleteChat(chat.id);

  actions.appendChild(pinBtn);
  actions.appendChild(renameBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(titleSpan);
  li.appendChild(actions);

  return li;
}

function createNewChat() {
  if (state.isResponding) return;

  state.activeChatId = null;
  elements.messages.innerHTML = "";
  clearInput();
  clearAttachments();
  toggleWebSearch(false);
  showWelcome();
  renderChats();

  switchView("chat");
  elements.input.focus();
}

async function loadChat(chatId) {
  if (state.isResponding) return;
  
  state.activeChatId = chatId;
  const chat = state.chats.find(c => c.id === chatId);
  
  if (chat) {
    elements.topbarTitle.textContent = chat.title;
    hideWelcome();
    elements.messages.innerHTML = "";

    // If connected to Supabase and user logged in, load real conversation messages
    if (state.currentUser && window.SupabaseService && window.SupabaseService.isConfigured()) {
      try {
        const msgs = await window.SupabaseService.messages.list(chatId);
        if (msgs && msgs.length > 0) {
          msgs.forEach((m) => {
            addMessage(m.role === 'user' ? 'user' : 'ai', m.content, m.metadata || {});
          });
        } else {
          addMessage("ai", `Conversation **${chat.title}** opened. Ask a question or start chatting!`);
        }
      } catch (err) {
        console.warn("Failed to load messages from Supabase:", err);
        addMessage("ai", `Loaded conversation "${chat.title}".`);
      }
    } else {
      addMessage("user", `Show me the content for: ${chat.title}`);
      addMessage("ai", `Here is the loaded history for "${chat.title}". (Simulated local mode).`);
    }
  }

  renderChats();
}

async function togglePinChat(chatId) {
  const chatIndex = state.chats.findIndex(c => c.id === chatId);
  if (chatIndex > -1) {
    const newPinned = !state.chats[chatIndex].pinned;
    state.chats[chatIndex].pinned = newPinned;
    renderChats();
    renderSearchResults(elements.mainSearchInput.value);

    if (state.currentUser && window.SupabaseService && window.SupabaseService.isConfigured()) {
      try {
        await window.SupabaseService.conversations.update(chatId, { is_pinned: newPinned });
      } catch (e) {
        console.warn("Failed to update pin status in Supabase:", e);
      }
    }
  }
}

async function renameChat(chatId) {
  const chatIndex = state.chats.findIndex(c => c.id === chatId);
  if (chatIndex > -1) {
    const newTitle = prompt("Enter new chat title:", state.chats[chatIndex].title);
    if (newTitle !== null && newTitle.trim() !== "") {
      const cleanTitle = newTitle.trim();
      state.chats[chatIndex].title = cleanTitle;
      renderChats();
      renderSearchResults(elements.mainSearchInput.value);
      if (state.activeChatId === chatId && state.currentView === "chat") {
        elements.topbarTitle.textContent = cleanTitle;
      }

      if (state.currentUser && window.SupabaseService && window.SupabaseService.isConfigured()) {
        try {
          await window.SupabaseService.conversations.update(chatId, { title: cleanTitle });
        } catch (e) {
          console.warn("Failed to rename conversation in Supabase:", e);
        }
      }
    }
  }
}

async function deleteChat(chatId) {
  if (confirm("Are you sure you want to delete this chat?")) {
    state.chats = state.chats.filter(c => c.id !== chatId);
    if (state.activeChatId === chatId) {
      createNewChat();
    } else {
      renderChats();
      renderSearchResults(elements.mainSearchInput.value);
    }

    if (state.currentUser && window.SupabaseService && window.SupabaseService.isConfigured()) {
      try {
        await window.SupabaseService.conversations.delete(chatId);
        showToast("Conversation deleted from database.");
      } catch (e) {
        console.warn("Failed to delete conversation from Supabase:", e);
      }
    }
  }
}

function searchChats(query) {
  renderChats(query);
}


/* =========================================================
   Input handling
   ========================================================= */

function handleInputKeydown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();

    const hasText = elements.input.value.trim().length > 0;
    const hasAttachments = state.attachments.length > 0;

    if (!state.isResponding && (hasText || hasAttachments)) {
      elements.form.requestSubmit();
    }
  }
}

function autoResizeTextarea() {
  const textarea = elements.input;
  textarea.style.height = "auto";
  const maxHeight = 160;
  const newHeight = Math.min(textarea.scrollHeight, maxHeight);
  textarea.style.height = `${newHeight}px`;
  textarea.style.overflowY =
    textarea.scrollHeight > maxHeight ? "auto" : "hidden";
}

function updateSendButton() {
  const hasText = elements.input.value.trim().length > 0;
  const hasAttachments = state.attachments.length > 0;

  elements.sendButton.disabled = (!hasText && !hasAttachments) || state.isResponding;
}


/* =========================================================
   Message submission & Supabase Storage / Edge Pipeline
   ========================================================= */

async function handleSubmit(event) {
  event.preventDefault();
  sendMessage();
}

async function sendMessage() {
  if (state.isResponding) return;

  // Check token limits before sending
  if (state.tokenUsage.dailyUsed >= state.tokenLimits.daily) {
    showToast("Daily token limit reached! Resetting tomorrow.");
    addMessage("ai", "⚠️ **Daily Token Limit Reached**: You have consumed all available daily tokens (" + state.tokenLimits.daily.toLocaleString() + " / " + state.tokenLimits.daily.toLocaleString() + "). Your daily balance will automatically refresh at midnight.");
    return;
  }
  if (state.tokenUsage.monthlyUsed >= state.tokenLimits.monthly) {
    showToast("Monthly token limit reached! Resetting next month.");
    addMessage("ai", "⚠️ **Monthly Token Limit Reached**: You have consumed all available monthly tokens (" + state.tokenLimits.monthly.toLocaleString() + " / " + state.tokenLimits.monthly.toLocaleString() + "). Your balance will automatically refresh next month.");
    return;
  }

  // If user sends message while on another view (Search/Library/Projects), switch to chat view
  if (state.currentView !== "chat") {
    switchView("chat");
  }

  const message = elements.input.value.trim();
  const currentAttachments = [...state.attachments];
  const isWebSearch = state.webSearchEnabled;

  if (!message && currentAttachments.length === 0) return;

  // Initialize or create conversation in Supabase if user is logged in
  if (!state.activeChatId) {
    const titleSource = message || (currentAttachments[0] ? currentAttachments[0].name : "New chat");
    const newTitle = titleSource.length > 25 ? titleSource.substring(0, 25) + '...' : titleSource;

    if (state.currentUser && window.SupabaseService && window.SupabaseService.isConfigured()) {
      try {
        const newConv = await window.SupabaseService.conversations.create(state.currentUser.id, newTitle, state.selectedModel);
        if (newConv) {
          state.activeChatId = newConv.id;
          state.chats.unshift({
            id: newConv.id,
            title: newConv.title,
            pinned: false,
            timestamp: Date.now()
          });
        }
      } catch (e) {
        console.warn("Could not create conversation in Supabase:", e);
      }
    }

    if (!state.activeChatId) {
      const newId = Date.now().toString();
      state.chats.unshift({
        id: newId,
        title: newTitle,
        pinned: false,
        timestamp: Date.now()
      });
      state.activeChatId = newId;
    }

    elements.topbarTitle.textContent = newTitle;
    renderChats();
  }

  hideWelcome();

  addMessage("user", message, {
    attachments: currentAttachments,
    webSearch: isWebSearch
  });

  // Save user message to Supabase DB if logged in
  if (state.currentUser && window.SupabaseService && window.SupabaseService.isConfigured() && state.activeChatId) {
    try {
      await window.SupabaseService.messages.insert(
        state.activeChatId,
        state.currentUser.id,
        "user",
        message,
        { attachments: currentAttachments, webSearchEnabled: isWebSearch }
      );
    } catch (e) {
      console.warn("Could not save user message to Supabase:", e);
    }
  }

  clearInput();
  clearAttachments();

  state.isResponding = true;
  updateSendButton();

  const typingIndicator = addTypingIndicator();

  try {
    const response = await getAIResponse(message, {
      conversationId: state.activeChatId,
      attachments: currentAttachments,
      webSearchEnabled: isWebSearch
    });

    removeTypingIndicator(typingIndicator);
    addMessage("ai", response);

    // Save assistant response to Supabase DB if logged in
    if (state.currentUser && window.SupabaseService && window.SupabaseService.isConfigured() && state.activeChatId) {
      try {
        await window.SupabaseService.messages.insert(
          state.activeChatId,
          state.currentUser.id,
          "assistant",
          response,
          { model: state.selectedModel }
        );
      } catch (e) {
        console.warn("Could not save AI message to Supabase:", e);
      }
    }
  } catch (error) {
    console.error("AI response error:", error);
    removeTypingIndicator(typingIndicator);
    addMessage("ai", "Sorry, something went wrong while generating a response.");
  } finally {
    state.isResponding = false;
    updateSendButton();
    elements.input.focus();
  }
}


/* =========================================================
   Hugging Face Model Library Management
   ========================================================= */

function loadHfModels() {
  try {
    const saved = localStorage.getItem("ai_chat_hf_models");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.hfModels = parsed;
      }
    }
  } catch (err) {
    console.warn("Failed to load Hugging Face models:", err);
    state.hfModels = [...DEFAULT_HF_MODELS];
  }

  // Find default model
  const defaultModel = state.hfModels.find(m => m.isDefault && m.enabled) || state.hfModels.find(m => m.enabled) || state.hfModels[0];
  if (defaultModel) {
    state.selectedModel = defaultModel.id;
    if (state.apiConfig.provider === "huggingface") {
      state.apiConfig.endpoint = `https://api-inference.huggingface.co/models/${defaultModel.id}`;
      state.apiConfig.model = defaultModel.id;
    }
  }

  renderHfModelsManager();
}

function saveHfModels() {
  try {
    localStorage.setItem("ai_chat_hf_models", JSON.stringify(state.hfModels));
  } catch (err) {
    console.error("Failed to save Hugging Face models:", err);
  }
  renderHfModelsManager();
}

function renderHfModelsManager() {
  if (!elements.hfModelsListContainer) return;
  elements.hfModelsListContainer.innerHTML = "";

  state.hfModels.forEach((m) => {
    const item = document.createElement("div");
    item.className = `hf-model-item ${m.isDefault ? "is-default" : ""}`;

    item.innerHTML = `
      <div class="hf-model-item__left">
        <label class="switch-control" title="${m.enabled ? 'Disable model' : 'Enable model'}">
          <input type="checkbox" class="hf-model-toggle" data-id="${escapeHtml(m.id)}" ${m.enabled ? "checked" : ""} />
          <span class="switch-slider"></span>
        </label>
        <div class="hf-model-item__info">
          <div class="hf-model-item__name-row">
            <span class="hf-model-item__name">${escapeHtml(m.name)}</span>
            <span class="hf-model-tag">${escapeHtml(m.tag || 'AI')}</span>
          </div>
          <span class="hf-model-item__id">${escapeHtml(m.id)}</span>
        </div>
      </div>
      <div class="hf-model-item__actions">
        <button type="button" class="btn-set-default ${m.isDefault ? 'active' : ''}" data-id="${escapeHtml(m.id)}" title="Set as default model">
          ${m.isDefault ? '✓ Default' : 'Set Default'}
        </button>
        ${
          !DEFAULT_HF_MODELS.some(def => def.id === m.id)
            ? `<button type="button" class="btn-delete-model" data-id="${escapeHtml(m.id)}" title="Remove custom model">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>`
            : ''
        }
      </div>
    `;

    // Event listener for toggle enable/disable
    const toggle = item.querySelector(".hf-model-toggle");
    if (toggle) {
      toggle.addEventListener("change", (e) => {
        m.enabled = e.target.checked;
        saveHfModels();
        showToast(`${m.name} ${m.enabled ? 'enabled' : 'disabled'}`);
      });
    }

    // Event listener for Set Default
    const defaultBtn = item.querySelector(".btn-set-default");
    if (defaultBtn) {
      defaultBtn.addEventListener("click", () => {
        state.hfModels.forEach(mod => mod.isDefault = false);
        m.isDefault = true;
        m.enabled = true; // Ensure default is enabled
        state.selectedModel = m.id;
        if (state.apiConfig.provider === "huggingface") {
          state.apiConfig.endpoint = `https://api-inference.huggingface.co/models/${m.id}`;
          state.apiConfig.model = m.id;
          if (elements.apiEndpointInput) elements.apiEndpointInput.value = state.apiConfig.endpoint;
        }
        saveHfModels();
        saveApiConfig();
        showToast(`Default model set to ${m.name}`);
      });
    }

    // Event listener for Delete
    const delBtn = item.querySelector(".btn-delete-model");
    if (delBtn) {
      delBtn.addEventListener("click", () => {
        if (confirm(`Remove custom model "${m.name}"?`)) {
          state.hfModels = state.hfModels.filter(mod => mod.id !== m.id);
          saveHfModels();
          showToast(`Removed model: ${m.name}`);
        }
      });
    }

    elements.hfModelsListContainer.appendChild(item);
  });
}

function addCustomHfModel(modelId, name, tag) {
  if (!modelId) {
    showToast("Please enter a Hugging Face Model ID / Repo.");
    return;
  }
  const cleanId = modelId.trim();
  const cleanName = name ? name.trim() : cleanId.split("/").pop() || cleanId;
  const cleanTag = tag || "⚡ Fast";

  if (state.hfModels.some(m => m.id.toLowerCase() === cleanId.toLowerCase())) {
    showToast("This model ID is already in your library.");
    return;
  }

  state.hfModels.push({
    id: cleanId,
    name: cleanName,
    tag: cleanTag,
    enabled: true,
    isDefault: false
  });

  saveHfModels();
  showToast(`Added ${cleanName} to model library.`);

  if (elements.newModelIdInput) elements.newModelIdInput.value = "";
  if (elements.newModelNameInput) elements.newModelNameInput.value = "";
}


/* =========================================================
   Flexible AI API Service Layer
   ========================================================= */

function loadApiConfig() {
  try {
    const saved = localStorage.getItem("ai_chat_api_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      state.apiConfig = { ...DEFAULT_API_CONFIG, ...parsed };
    }
  } catch (err) {
    console.warn("Failed to load saved API configuration:", err);
    state.apiConfig = { ...DEFAULT_API_CONFIG };
  }

  // Populate UI inputs if available
  if (elements.apiProviderSelect) elements.apiProviderSelect.value = state.apiConfig.provider || "huggingface";
  if (elements.apiEndpointInput) elements.apiEndpointInput.value = state.apiConfig.endpoint || "";
  if (elements.apiKeyInput) elements.apiKeyInput.value = state.apiConfig.apiKey || "";
  if (elements.tavilyApiKeyInput) elements.tavilyApiKeyInput.value = state.apiConfig.tavilyApiKey || "";
  if (elements.apiModelInput) elements.apiModelInput.value = state.apiConfig.model || "";
  if (elements.apiTemperatureInput) elements.apiTemperatureInput.value = state.apiConfig.temperature ?? 0.7;
  if (elements.tempValueDisplay) elements.tempValueDisplay.textContent = state.apiConfig.temperature ?? 0.7;
  if (elements.apiMaxTokensInput) elements.apiMaxTokensInput.value = state.apiConfig.maxTokens || 1024;
  if (elements.apiSystemPromptInput) elements.apiSystemPromptInput.value = state.apiConfig.systemPrompt || "";

  updateApiEndpointHint(state.apiConfig.provider);
}

function saveApiConfig() {
  const provider = elements.apiProviderSelect ? elements.apiProviderSelect.value : "huggingface";
  const endpoint = elements.apiEndpointInput ? elements.apiEndpointInput.value.trim() : "";
  const apiKey = elements.apiKeyInput ? elements.apiKeyInput.value.trim() : "";
  const model = elements.apiModelInput ? elements.apiModelInput.value.trim() : "";
  const temperature = elements.apiTemperatureInput ? parseFloat(elements.apiTemperatureInput.value) : 0.7;
  const maxTokens = elements.apiMaxTokensInput ? parseInt(elements.apiMaxTokensInput.value, 10) : 1024;
  const systemPrompt = elements.apiSystemPromptInput ? elements.apiSystemPromptInput.value.trim() : "";

  const tavilyApiKey = elements.tavilyApiKeyInput ? elements.tavilyApiKeyInput.value.trim() : "";

  state.apiConfig = {
    provider,
    endpoint,
    apiKey,
    tavilyApiKey,
    model,
    temperature,
    maxTokens,
    systemPrompt
  };

  try {
    localStorage.setItem("ai_chat_api_config", JSON.stringify(state.apiConfig));
    showToast("AI API configuration saved successfully!");
  } catch (err) {
    console.error("Failed to save API config:", err);
    showToast("Error saving configuration to local storage.");
  }
}

function resetApiConfig() {
  state.apiConfig = { ...DEFAULT_API_CONFIG };

  if (elements.apiProviderSelect) elements.apiProviderSelect.value = state.apiConfig.provider;
  if (elements.apiEndpointInput) elements.apiEndpointInput.value = state.apiConfig.endpoint;
  if (elements.apiKeyInput) elements.apiKeyInput.value = state.apiConfig.apiKey;
  if (elements.tavilyApiKeyInput) elements.tavilyApiKeyInput.value = state.apiConfig.tavilyApiKey;
  if (elements.apiModelInput) elements.apiModelInput.value = state.apiConfig.model;
  if (elements.apiTemperatureInput) elements.apiTemperatureInput.value = state.apiConfig.temperature;
  if (elements.tempValueDisplay) elements.tempValueDisplay.textContent = state.apiConfig.temperature;
  if (elements.apiMaxTokensInput) elements.apiMaxTokensInput.value = state.apiConfig.maxTokens;
  if (elements.apiSystemPromptInput) elements.apiSystemPromptInput.value = state.apiConfig.systemPrompt;

  updateApiEndpointHint(state.apiConfig.provider);

  try {
    localStorage.setItem("ai_chat_api_config", JSON.stringify(state.apiConfig));
    showToast("API settings reset to defaults.");
  } catch (err) {
    console.error("Failed to reset config:", err);
  }
}

function handleProviderChange(providerKey) {
  const preset = API_PRESETS[providerKey];
  if (preset) {
    if (elements.apiEndpointInput) elements.apiEndpointInput.value = preset.endpoint;
    if (elements.apiModelInput) elements.apiModelInput.value = preset.model;
    updateApiEndpointHint(providerKey);
  }
}

function updateApiEndpointHint(providerKey) {
  if (!elements.apiEndpointHint) return;
  const preset = API_PRESETS[providerKey];
  if (preset && preset.hint) {
    elements.apiEndpointHint.textContent = preset.hint;
  } else {
    elements.apiEndpointHint.textContent = "Specify the complete API URL endpoint for inference.";
  }
}

async function testApiConnection() {
  const endpoint = elements.apiEndpointInput ? elements.apiEndpointInput.value.trim() : "";
  const apiKey = elements.apiKeyInput ? elements.apiKeyInput.value.trim() : "";
  const model = elements.apiModelInput ? elements.apiModelInput.value.trim() : "";
  const provider = elements.apiProviderSelect ? elements.apiProviderSelect.value : "huggingface";

  if (!endpoint) {
    showToast("Please enter an API endpoint URL first.");
    return;
  }

  showToast("Testing API connection...");

  const startTime = Date.now();
  try {
    if (window.SupabaseService && window.SupabaseService.isConfigured()) {
      const result = await window.SupabaseService.functions.chat({
        conversationId: "test_connection",
        message: "Hello, test connection. Reply with 'Connected'.",
        model: model || "Qwen/Qwen3-32B",
        systemPrompt: "You are a helpful assistant.",
        temperature: 0.7,
        maxTokens: 15,
        userApiKey: apiKey,
        tavilyApiKey: ""
      });

      const elapsed = Date.now() - startTime;
      if (result && result.content) {
        showToast(`Connection successful! (${elapsed}ms)`);
      } else {
        showToast(`API Test Failed: No response content received.`);
      }
    } else {
      showToast("Backend connection is not configured.");
    }
  } catch (err) {
    console.error("Test connection error:", err);
    showToast(`Network/CORS error: ${err.message}`);
  }
}

/**
 * Universal AI API caller with Multi-Model Hugging Face support.
 */
async function getAIResponse(message, options = {}) {
  const config = state.apiConfig || DEFAULT_API_CONFIG;
  const apiKey = (config.apiKey || "").trim();
  const provider = config.provider || "huggingface";
  const selectedModelId = state.selectedModel || config.model || "meta-llama/Llama-3.3-70B-Instruct";
  
  // Dynamically resolve endpoint based on selected model for Hugging Face
  let endpoint = (config.endpoint || "").trim();
  if (provider === "huggingface") {
    endpoint = `https://api-inference.huggingface.co/models/${selectedModelId}`;
  }

  const model = selectedModelId;
  const temperature = parseFloat(config.temperature) || 0.7;
  const maxTokens = parseInt(config.maxTokens, 10) || 1024;
  const systemPrompt = config.systemPrompt || "You are a helpful and intelligent AI assistant.";

  // Enrich prompt with attachments or web search if active
  let prefix = "";

  if (options.webSearchEnabled) {
    prefix += `[Web Search Active: Querying latest live info]\n\n`;
  }

  if (options.attachments && options.attachments.length > 0) {
    const fileNames = options.attachments.map(a => a.name).join(", ");
    prefix += `[Attached files: ${fileNames}]\n\n`;
  }

  // 1. Try secure Supabase Edge Function if backend is configured
  if (window.SupabaseService && window.SupabaseService.isConfigured()) {
    try {
      const edgeResult = await window.SupabaseService.functions.chat({
        conversationId: options.conversationId || state.activeChatId,
        message,
        model: selectedModelId,
        systemPrompt,
        temperature,
        maxTokens,
        attachments: options.attachments || [],
        webSearchEnabled: options.webSearchEnabled || false,
        userApiKey: apiKey,
        tavilyApiKey: config.tavilyApiKey || ""
      });

      if (edgeResult && edgeResult.content) {
        if (edgeResult.usage) {
          addTokenUsage(edgeResult.usage.prompt_tokens, edgeResult.usage.completion_tokens);
        }
        
        let finalContent = edgeResult.content;
        
        if (edgeResult.sources && edgeResult.sources.length > 0) {
          finalContent += `\n\n---\n**Sources:**\n`;
          edgeResult.sources.forEach(source => {
            const domain = new URL(source.url).hostname.replace('www.', '');
            const title = source.title || domain;
            finalContent += `- [${title}](${source.url}) (${domain})\n`;
          });
        }
        
        return finalContent;
      }
    } catch (edgeErr) {
      console.warn("Supabase Edge Function notice (falling back to direct client API / simulation):", edgeErr);
    }
  }

  // If no endpoint configured, fall back to smart mock response
  if (!endpoint) {
    await delay(600 + Math.random() * 600);
    return createMockResponse(message, options);
  }

  // If apiKey is empty for Hugging Face / OpenAI, notify user but still provide helpful mock response
  if (!apiKey && (provider === "huggingface" || provider === "openai")) {
    await delay(700);
    const mockAns = createMockResponse(message, options);
    const modelObj = state.hfModels.find(m => m.id === selectedModelId);
    const modelDisplayName = modelObj ? modelObj.name : selectedModelId;
    return (
      `> ℹ️ *Tip: You are currently viewing simulated responses with **${escapeHtml(modelDisplayName)}**. To enable live inference with Hugging Face models, enter your API key under **Account & Settings → AI / API Settings**.*\n\n` +
      mockAns
    );
  }

  const headers = {
    "Content-Type": "application/json"
  };

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  let requestBody = {};

  if (provider === "huggingface") {
    // Hugging Face standard inference payload
    requestBody = {
      inputs: prefix ? `${prefix}${message}` : message,
      parameters: {
        temperature: temperature,
        max_new_tokens: maxTokens,
        return_full_text: false
      }
    };
  } else {
    // OpenAI / Ollama / Compatible Chat Completions format
    requestBody = {
      model: model || "gpt-4o-mini",
      messages: [
        ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
        { role: "user", content: prefix ? `${prefix}${message}` : message }
      ],
      temperature: temperature,
      max_tokens: maxTokens
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      let detailed = `Status ${response.status} (${response.statusText})`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) detailed = typeof errorJson.error === 'string' ? errorJson.error : (errorJson.error.message || JSON.stringify(errorJson.error));
        if (errorJson.estimated_time) detailed += ` (Estimated model load time: ${Math.round(errorJson.estimated_time)}s)`;
      } catch (e) {
        if (errorText.length < 200) detailed = errorText;
      }

      if (response.status === 401) {
        return `⚠️ **Authentication Error (401)**: Invalid or missing API key. Please check your token in **AI / API Settings**.`;
      } else if (response.status === 429) {
        return `⚠️ **Rate Limit Exceeded (429)**: The API request quota has been reached. Please wait a moment before trying again.`;
      } else if (response.status === 503) {
        return `⏳ **Model Loading (503)**: The requested model is currently spinning up on the server. Please try again in 20-30 seconds. Details: ${detailed}`;
      }

      return `⚠️ **API Error (${response.status})**: ${detailed}`;
    }

    const data = await response.json();

    let resultText = "";

    // Universal response parser
    // 1. OpenAI / OpenRouter format: data.choices[0].message.content
    if (data.choices && data.choices[0]) {
      if (data.choices[0].message && data.choices[0].message.content) {
        resultText = data.choices[0].message.content.trim();
      } else if (data.choices[0].text) {
        resultText = data.choices[0].text.trim();
      }
    }

    // 2. Hugging Face Array format: data[0].generated_text
    if (!resultText && Array.isArray(data) && data[0]) {
      if (data[0].generated_text) resultText = data[0].generated_text.trim();
      else if (data[0].summary_text) resultText = data[0].summary_text.trim();
      else if (typeof data[0] === 'string') resultText = data[0].trim();
    }

    // 3. Hugging Face Object format: data.generated_text
    if (!resultText && data.generated_text) {
      resultText = data.generated_text.trim();
    }

    // 4. Ollama raw format: data.response
    if (!resultText && data.response) {
      resultText = data.response.trim();
    }

    // 5. Fallback stringification
    if (!resultText) {
      resultText = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    }

    // Calculate & Record Token Usage
    let promptTokens = 0;
    let completionTokens = 0;
    if (data.usage) {
      promptTokens = data.usage.prompt_tokens || 0;
      completionTokens = data.usage.completion_tokens || 0;
    }
    if (!promptTokens && !completionTokens) {
      promptTokens = estimateTokens(prefix + message);
      completionTokens = estimateTokens(resultText);
    }
    addTokenUsage(promptTokens, completionTokens);

    return resultText;

  } catch (networkError) {
    console.error("API Fetch Network Error:", networkError);
    return (
      `⚠️ **Network / Connection Error**: Could not connect to \`${escapeHtml(endpoint)}\`.\n\n` +
      `• Check that your device has an active internet connection.\n` +
      `• If using a local API server (e.g. Ollama or vLLM), ensure CORS is enabled (\`OLLAMA_ORIGINS=*\`).\n` +
      `• Error details: *${escapeHtml(networkError.message)}*`
    );
  }
}

function createMockResponse(message, options = {}) {
  const normalized = (message || "").toLowerCase();
  let prefix = "";

  if (options.webSearchEnabled) {
    prefix = `[Web Search Active] Searched recent online sources for: "${message}"\n\n`;
  }

  if (options.attachments && options.attachments.length > 0) {
    const fileNames = options.attachments.map(a => a.name).join(", ");
    prefix += `[Attachments Analyzed: ${fileNames}]\n\n`;
  }

  let responseBody = "";

  if (normalized.includes("hello") || normalized.includes("hi")) {
    responseBody = "Hello! It's great to meet you. How can I assist you today?";
  } else if (normalized.includes("explain")) {
    responseBody = "I can break complex topics into clear, easy-to-understand explanations. What subject or concept would you like to explore?";
  } else if (normalized.includes("write") || normalized.includes("draft") || normalized.includes("email")) {
    responseBody = "I'd be glad to help draft or polish that. Share your intended goals, audience, and preferred tone to get started.";
  } else if (options.webSearchEnabled) {
    responseBody = `Here is a summary of the latest online information regarding "${message}":\n\n• Key trends and updates were identified across top sources.\n• Real-time data will be retrieved when connected to your backend search endpoint.`;
  } else {
    responseBody = (
      (message ? `Thanks for your message: "${message}"\n\n` : "") +
      "This is currently a placeholder response. When you are ready for real AI generation, connect `getAIResponse()` to your secure backend endpoint."
    );
  }

  const fullResponse = prefix + responseBody;

  // Track simulated tokens
  const promptTokens = estimateTokens(prefix + message);
  const completionTokens = estimateTokens(fullResponse);
  addTokenUsage(promptTokens, completionTokens);

  return fullResponse;
}


/* =========================================================
   Token Usage Tracking System
   ========================================================= */

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getMonthString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function loadTokenUsage() {
  const today = getTodayString();
  const currentMonth = getMonthString();

  try {
    const saved = localStorage.getItem("ai_chat_token_usage");
    if (saved) {
      const parsed = JSON.parse(saved);
      state.tokenUsage = {
        dailyUsed: parsed.dailyUsed || 0,
        monthlyUsed: parsed.monthlyUsed || 0,
        lastDay: parsed.lastDay || today,
        lastMonth: parsed.lastMonth || currentMonth,
      };

      // Auto-reset on day change
      if (state.tokenUsage.lastDay !== today) {
        state.tokenUsage.dailyUsed = 0;
        state.tokenUsage.lastDay = today;
      }

      // Auto-reset on month change
      if (state.tokenUsage.lastMonth !== currentMonth) {
        state.tokenUsage.monthlyUsed = 0;
        state.tokenUsage.lastMonth = currentMonth;
      }
    } else {
      state.tokenUsage = {
        dailyUsed: 0,
        monthlyUsed: 0,
        lastDay: today,
        lastMonth: currentMonth,
      };
    }
  } catch (err) {
    console.warn("Failed to load token usage:", err);
    state.tokenUsage = {
      dailyUsed: 0,
      monthlyUsed: 0,
      lastDay: today,
      lastMonth: currentMonth,
    };
  }

  saveTokenUsage();
  renderTokenUsage();
}

function saveTokenUsage() {
  try {
    localStorage.setItem("ai_chat_token_usage", JSON.stringify(state.tokenUsage));
  } catch (err) {
    console.error("Failed to save token usage:", err);
  }
}

function addTokenUsage(promptTokens, completionTokens) {
  const today = getTodayString();
  const currentMonth = getMonthString();

  // Reset if day changed
  if (state.tokenUsage.lastDay !== today) {
    state.tokenUsage.dailyUsed = 0;
    state.tokenUsage.lastDay = today;
  }

  // Reset if month changed
  if (state.tokenUsage.lastMonth !== currentMonth) {
    state.tokenUsage.monthlyUsed = 0;
    state.tokenUsage.lastMonth = currentMonth;
  }

  const total = Math.max(1, (promptTokens || 0) + (completionTokens || 0));
  state.tokenUsage.dailyUsed = Math.min(state.tokenLimits.daily, state.tokenUsage.dailyUsed + total);
  state.tokenUsage.monthlyUsed = Math.min(state.tokenLimits.monthly, state.tokenUsage.monthlyUsed + total);

  saveTokenUsage();
  renderTokenUsage();
}

function renderTokenUsage() {
  const dailyLimit = state.tokenLimits.daily;
  const monthlyLimit = state.tokenLimits.monthly;
  const dailyUsed = state.tokenUsage.dailyUsed;
  const monthlyUsed = state.tokenUsage.monthlyUsed;

  const dailyRemaining = Math.max(0, dailyLimit - dailyUsed);
  const monthlyRemaining = Math.max(0, monthlyLimit - monthlyUsed);

  const pctDaily = Math.min(100, Math.round((dailyUsed / dailyLimit) * 100));
  const pctMonthly = Math.min(100, Math.round((monthlyUsed / monthlyLimit) * 100));

  // Update Daily UI
  if (elements.dailyTokensText) {
    elements.dailyTokensText.textContent = `${dailyUsed.toLocaleString()} / ${dailyLimit.toLocaleString()} used`;
  }
  if (elements.dailyTokensRemaining) {
    elements.dailyTokensRemaining.textContent = dailyRemaining === 0 ? "Limit reached" : `${dailyRemaining.toLocaleString()} left`;
    elements.dailyTokensRemaining.classList.toggle("limit-warning", pctDaily >= 80 && pctDaily < 100);
    elements.dailyTokensRemaining.classList.toggle("limit-reached", pctDaily >= 100);
  }
  if (elements.dailyTokensBar) {
    elements.dailyTokensBar.style.width = `${pctDaily}%`;
    elements.dailyTokensBar.classList.toggle("limit-warning", pctDaily >= 80 && pctDaily < 100);
    elements.dailyTokensBar.classList.toggle("limit-reached", pctDaily >= 100);
    if (elements.dailyTokensBar.parentElement) {
      elements.dailyTokensBar.parentElement.title = `Daily Tokens: ${dailyUsed.toLocaleString()} / ${dailyLimit.toLocaleString()} used (${dailyRemaining.toLocaleString()} left)`;
    }
  }

  // Update Monthly UI
  if (elements.monthlyTokensText) {
    elements.monthlyTokensText.textContent = `${monthlyUsed.toLocaleString()} / ${monthlyLimit.toLocaleString()} used`;
  }
  if (elements.monthlyTokensRemaining) {
    elements.monthlyTokensRemaining.textContent = monthlyRemaining === 0 ? "Limit reached" : `${monthlyRemaining.toLocaleString()} left`;
    elements.monthlyTokensRemaining.classList.toggle("limit-warning", pctMonthly >= 80 && pctMonthly < 100);
    elements.monthlyTokensRemaining.classList.toggle("limit-reached", pctMonthly >= 100);
  }
  if (elements.monthlyTokensBar) {
    elements.monthlyTokensBar.style.width = `${pctMonthly}%`;
    elements.monthlyTokensBar.classList.toggle("limit-warning", pctMonthly >= 80 && pctMonthly < 100);
    elements.monthlyTokensBar.classList.toggle("limit-reached", pctMonthly >= 100);
    if (elements.monthlyTokensBar.parentElement) {
      elements.monthlyTokensBar.parentElement.title = `Monthly Tokens: ${monthlyUsed.toLocaleString()} / ${monthlyLimit.toLocaleString()} used (${monthlyRemaining.toLocaleString()} left)`;
    }
  }
}

function estimateTokens(text) {
  if (!text) return 0;
  // Standard token heuristic: ~4 characters per token
  return Math.max(1, Math.ceil(text.length / 4));
}


/* =========================================================
   Message rendering
   ========================================================= */

function addMessage(role, text, metadata = {}) {
  const messageElement = document.createElement("article");
  messageElement.className = `message message--${role}`;

  const content = document.createElement("div");
  content.className = "message__content";

  const label = document.createElement("div");
  label.className = "message__label";
  label.innerHTML = `<span>${role === "user" ? "You" : "AI"}</span>`;

  if (role === "user" && metadata.webSearch) {
    const searchBadge = document.createElement("span");
    searchBadge.className = "message-meta-badge";
    searchBadge.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> Web Search`;
    label.appendChild(searchBadge);
  }

  if (role === "user" && metadata.attachments && metadata.attachments.length > 0) {
    const attachmentsContainer = document.createElement("div");
    attachmentsContainer.className = "message-attachments";

    metadata.attachments.forEach(att => {
      if (att.isImage && att.dataUrl) {
        const img = document.createElement("img");
        img.src = att.dataUrl;
        img.alt = att.name;
        img.className = "message-attachment-thumb";
        img.title = att.name;
        attachmentsContainer.appendChild(img);
      } else {
        const chip = document.createElement("div");
        chip.className = "message-attachment-chip";
        chip.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span>${escapeHtml(att.name)}</span>
        `;
        attachmentsContainer.appendChild(chip);
      }
    });

    content.appendChild(label);
    content.appendChild(attachmentsContainer);
  } else {
    content.appendChild(label);
  }

  if (text) {
    const bubble = document.createElement("div");
    bubble.className = "message__bubble";
    bubble.textContent = text;
    bubble.style.whiteSpace = "pre-wrap";
    content.appendChild(bubble);
  }

  messageElement.appendChild(content);
  elements.messages.appendChild(messageElement);

  scrollToLatest();

  return messageElement;
}

function addTypingIndicator() {
  const messageElement = document.createElement("article");
  messageElement.className = "message message--ai";
  messageElement.setAttribute("data-typing", "true");

  const content = document.createElement("div");
  content.className = "message__content";

  const label = document.createElement("div");
  label.className = "message__label";
  label.textContent = "AI";

  const bubble = document.createElement("div");
  bubble.className = "message__bubble";

  const typing = document.createElement("div");
  typing.className = "typing";
  typing.setAttribute("aria-label", "AI is typing");

  for (let i = 0; i < 3; i += 1) {
    const dot = document.createElement("span");
    dot.setAttribute("aria-hidden", "true");
    typing.appendChild(dot);
  }

  bubble.appendChild(typing);
  content.appendChild(label);
  content.appendChild(bubble);
  messageElement.appendChild(content);

  elements.messages.appendChild(messageElement);
  scrollToLatest();

  return messageElement;
}

function removeTypingIndicator(typingIndicator) {
  if (typingIndicator && typingIndicator.parentNode) {
    typingIndicator.remove();
  }
}


/* =========================================================
   UI helpers & Toast
   ========================================================= */

function hideWelcome() {
  elements.welcome.classList.add("hidden");
}

function showWelcome() {
  elements.welcome.classList.remove("hidden");
}

function clearInput() {
  elements.input.value = "";
  elements.input.style.height = "auto";
  elements.input.style.overflowY = "hidden";
  updateSendButton();
}

function scrollToLatest() {
  const chatScrollContainer = document.querySelector('.chat');
  requestAnimationFrame(() => {
    chatScrollContainer.scrollTo({
      top: chatScrollContainer.scrollHeight,
      behavior: "smooth",
    });
  });
}

let toastTimer = null;
function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2800);
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}


function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else if (theme === "light") {
    document.documentElement.removeAttribute("data-theme");
  } else if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }
}


/* =========================================================
   Start Application
   ========================================================= */

init();