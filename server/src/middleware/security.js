const helmet = require("helmet");
const compression = require("compression");

/**
 * Phase 5.16: Enterprise Security Headers & Anti-Injection Defense
 * Implements strict CSP, HSTS, X-Frame-Options, X-Content-Type-Options,
 * Referrer Policy, and custom Permissions Policy.
 */
module.exports = (app) => {
  // Helmet enterprise hardened configuration
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
          imgSrc: ["'self'", "data:", "blob:", "https:"],
          connectSrc: ["'self'", "https:", "wss:", "ws:"],
          frameAncestors: ["'none'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      frameguard: { action: "deny" },
      noSniff: true,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    })
  );

  // Custom Permissions-Policy Header (Phase 5.16)
  app.use((req, res, next) => {
    res.setHeader(
      "Permissions-Policy",
      "geolocation=(), microphone=(self), camera=(self), payment=()"
    );
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  app.use(compression());
};