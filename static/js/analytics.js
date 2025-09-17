(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/@vercel/analytics/dist/index.mjs
  function isBrowser() {
    return typeof window !== "undefined";
  }
  function detectEnvironment() {
    try {
      const env = "development";
      if (env === "development" || env === "test") {
        return "development";
      }
    } catch (e) {
    }
    return "production";
  }
  function setMode(mode = "auto") {
    if (mode === "auto") {
      window.vam = detectEnvironment();
      return;
    }
    window.vam = mode;
  }
  function getMode() {
    const mode = isBrowser() ? window.vam : detectEnvironment();
    return mode || "production";
  }
  function isDevelopment() {
    return getMode() === "development";
  }
  function getScriptSrc(props) {
    if (props.scriptSrc) {
      return props.scriptSrc;
    }
    if (isDevelopment()) {
      return "https://va.vercel-scripts.com/v1/script.debug.js";
    }
    if (props.basePath) {
      return `${props.basePath}/insights/script.js`;
    }
    return "/_vercel/insights/script.js";
  }
  function inject(props = {
    debug: true
  }) {
    var _a;
    if (!isBrowser()) return;
    setMode(props.mode);
    initQueue();
    if (props.beforeSend) {
      (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
    }
    const src = getScriptSrc(props);
    if (document.head.querySelector(`script[src*="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
    script.dataset.sdkv = version;
    if (props.disableAutoTrack) {
      script.dataset.disableAutoTrack = "1";
    }
    if (props.endpoint) {
      script.dataset.endpoint = props.endpoint;
    } else if (props.basePath) {
      script.dataset.endpoint = `${props.basePath}/insights`;
    }
    if (props.dsn) {
      script.dataset.dsn = props.dsn;
    }
    script.onerror = () => {
      const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
      console.log(
        `[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`
      );
    };
    if (isDevelopment() && props.debug === false) {
      script.dataset.debug = "false";
    }
    document.head.appendChild(script);
  }
  var name, version, initQueue;
  var init_dist = __esm({
    "node_modules/@vercel/analytics/dist/index.mjs"() {
      name = "@vercel/analytics";
      version = "1.5.0";
      initQueue = () => {
        if (window.va) return;
        window.va = function a(...params) {
          (window.vaq = window.vaq || []).push(params);
        };
      };
    }
  });

  // src/analytics.js
  var require_analytics = __commonJS({
    "src/analytics.js"() {
      init_dist();
      inject();
    }
  });
  require_analytics();
})();
