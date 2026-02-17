# Week 1 Fixes — Changelist

**18 files modified** (16 HTML + 2 CSS)

---

## 1. Encoding Corruption — FIXED ✓

All double-encoded UTF-8 characters resolved across every file.

| Corrupted | Fixed | Occurrences |
|-----------|-------|-------------|
| `â€™` | ' (apostrophe) | index, servicedesk, contact, health-check |
| `â€¢` | • (bullet) | index, pricing, cloud, cyber, data, ai, infra, servicedesk, health-check |
| `â†'` | → (arrow) | index (×6 learn-more links), contact |
| `â˜…` | ★ (star) | index (×3 testimonial cards), testimonials (×6) |
| `â€"` / `â€"` | – (dash) | index (×3 testimonial authors), servicedesk (×5), services, contact |
| `â€œ` / `â€` | " " (quotes) | testimonials (×6 pull quotes) |
| `Â©` | © (copyright) | index, services, testimonials |
| `Ã¢Å"â€œ` | ✓ (checkmark) | style.css (×3 `::before` pseudo-elements), style_min.css (×3) |

**Files touched:** all 16 HTML files + style.css + style_min.css

---

## 2. Inflated Claims — FIXED ✓

### Homepage stats (index.html)
| Before | After |
|--------|-------|
| **50+** Expert Team Members | **10+** Years Experience |
| **24/7** Global Support | **Perth** Based Support |

*150+ Projects Delivered and 98% Client Satisfaction left unchanged (plausible).*

### Meta descriptions
| File | Before | After |
|------|--------|-------|
| index.html (OG) | "…elegant, powerful IT solutions designed for the modern enterprise." | "Managed IT services for Perth businesses. Cloud, security, support and infrastructure — one team, one clear monthly fee." |
| index.html (Twitter) | "…elegant, powerful IT solutions." | "Managed IT services for Perth businesses. Cloud, security, support and infrastructure." |
| services.html (OG) | "Comprehensive IT solutions for modern enterprises" | "Cloud, cybersecurity, IT support, infrastructure and AI services for Perth businesses." |
| services.html (Twitter) | "Comprehensive IT solutions for modern enterprises" | "Cloud, cybersecurity, IT support, infrastructure and AI services for Perth businesses." |

### About page (about.html)
| Before | After |
|--------|-------|
| "serving over 150 clients across diverse industries worldwide" | "supporting businesses across Perth and Western Australia" |
| Timeline: "2026 — Industry Leader" | "2026 — Growing Team" |
| Vision: "To be the global leader in IT transformation…worldwide" | "To be the IT partner Perth businesses trust most — known for clear communication, reliable delivery, and genuinely helping teams work better." |

### Footer description (ALL 14 non-legal pages)
| Before | After |
|--------|-------|
| "Transforming businesses through innovative IT solutions and unparalleled expertise." | "Helping Perth businesses run better with practical IT support." |

### Contact page
| Before | After |
|--------|-------|
| "Visit us at one of our office locations worldwide" | "Get in touch with our Perth team" |

---

## 3. Phone Formatting — FIXED ✓

All **display text** instances of `0431644181` changed to `0431 644 181`.

Preserved unformatted in:
- `href="tel:0431644181"` (required for tel: protocol)
- JSON-LD schema `"telephone": "0431644181"` (schema standard)

**Files touched:** all pages with footer + contact.html (method cards, location cards)

---

## 4. Dead Social Links — FIXED ✓

### Footer "Follow Us" section
Removed entire `<div class="footer-section">` containing LinkedIn, Twitter, Facebook icons with `aria-disabled="true"` and no href attributes.

**Removed from:** all 16 HTML files

### About page team member social links
Removed 18 dead `<div class="social-links">` blocks from team member cards (LinkedIn, Twitter, GitHub, Email — all with `aria-disabled="true"`, no hrefs).

**Removed from:** about.html

---

## How to Deploy

Replace the corresponding files in your project root. All filenames match exactly. No new files, no deleted files — just updated content in existing files.
