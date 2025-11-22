# Portfolio Website

Moderni portfolio sajt napravljen sa Next.js i TypeScript.

## ✨ Karakteristike

- ✅ Next.js 14 sa TypeScript
- ✅ Tailwind CSS za stilizaciju
- ✅ Dark/Light mode toggle
- ✅ Responsive dizajn (desktop i mobilni uređaji)
- ✅ Animacije i hover efekti (Framer Motion)
- ✅ SEO optimizacija
- ✅ Smooth scroll animacije
- ✅ Portfolio sekcija sa 5 projekata
- ✅ Skills/Technologies sekcija
- ✅ Kontakt forma
- ✅ Download CV funkcionalnost

## 🚀 Instalacija

1. Instaliraj zavisnosti:
```bash
npm install
```

## 🏃 Pokretanje

Za development:
```bash
npm run dev
```

Sajt će biti dostupan na [http://localhost:3000](http://localhost:3000)

Za produkciju:
```bash
npm run build
npm start
```

## 📁 Struktura Projekta

```
portfolioSajt/
├── app/                    # Next.js App Router
│   ├── globals.css        # Globalni stilovi
│   ├── layout.tsx         # Root layout sa Header i Footer
│   └── page.tsx           # Glavna stranica
├── components/            # React komponente
│   ├── About.tsx          # About sekcija
│   ├── Contact.tsx        # Kontakt forma
│   ├── Footer.tsx         # Footer komponenta
│   ├── Header.tsx         # Header sa navigacijom
│   ├── Hero.tsx           # Hero/Landing sekcija
│   ├── Projects.tsx       # Portfolio sekcija
│   ├── Skills.tsx         # Skills sekcija
│   └── ThemeProvider.tsx  # Dark/Light mode provider
├── public/                # Statički fajlovi
│   ├── images/            # Folder za slike
│   │   ├── profile.jpg    # Profilna slika (dodajte svoju)
│   │   ├── project-1.jpg  # Slika projekta 1 (dodajte svoje)
│   │   ├── project-2.jpg  # Slika projekta 2
│   │   ├── project-3.jpg  # Slika projekta 3
│   │   ├── project-4.jpg  # Slika projekta 4
│   │   └── project-5.jpg  # Slika projekta 5
│   └── cv-placeholder.pdf # CV fajl (zamenite sa svojim CV-om)
└── package.json           # Zavisnosti projekta
```

## 🖼️ Slike

Stavite svoje slike u `/public/images` folder:

### Profilna slika
- **Ime fajla:** `profile.jpg`
- **Preporučena veličina:** 800x1000px
- **Format:** JPG, PNG ili WebP

### Slike projekata
- **Imena fajlova:** `project-1.jpg`, `project-2.jpg`, `project-3.jpg`, `project-4.jpg`, `project-5.jpg`
- **Preporučena veličina:** 1200x800px
- **Format:** JPG, PNG ili WebP

**Napomena:** Ako slike ne postoje, prikazuje se placeholder sa gradientom.

## 📝 Prilagođavanje Sadržaja

### 1. Promena imena i zanimanja

U `components/Hero.tsx`:
```tsx
// Linija 34
Ime Prezime  // Zamenite sa svojim imenom

// Linija 43
Full Stack Developer  // Zamenite sa svojim zanimanjem
```

### 2. Promena About sekcije

U `components/About.tsx`:
- Zamenite Lorem Ipsum tekst sa svojom biografijom (linije 44-58)

### 3. Promena projekata

U `components/Projects.tsx`:
- Izmenite niz `projects` (linije 9-50)
- Promenite imena, opise, tehnologije i linkove projekata

### 4. Promena tehnologija

U `components/Skills.tsx`:
- Izmenite niz `technologies` (linije 12-23)
- Dodajte ili uklonite tehnologije

### 5. Promena social linkova

U `components/Header.tsx` i `components/Footer.tsx`:
- Izmenite niz `socialLinks` (linije 15-19)
- Zamenite placeholder linkove sa svojim LinkedIn, GitHub i ResearchGate profilima

### 6. Dodavanje CV-a

Zamenite `/public/cv-placeholder.pdf` sa svojim CV fajlom. Fajl mora da se zove `cv-placeholder.pdf` ili izmenite putanju u `components/Hero.tsx` (linija 11).

### 7. SEO optimizacija

U `app/layout.tsx`:
- Promenite `title`, `description`, `keywords` i `authors` u metadata objektu (linije 10-19)

## 🎨 Prilagođavanje Boja

U `tailwind.config.ts` možete prilagoditi boje:
- `primary` - Primarna boja (tamnoplava/plava)
- `secondary` - Sekundarna boja (siva)

## 📱 Responsive Dizajn

Sajt je potpuno responsive i optimizovan za:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🌓 Dark Mode

Dark mode se automatski čuva u localStorage i rezpekuje sistem preferencije korisnika.

## 🚀 Deployment

Sajt je spreman za deployment na:
- **Vercel** (preporučeno za Next.js)
- **Netlify**
- **Docker** (dodajte Dockerfile)
- Bilo koji drugi hosting koji podržava Node.js

## 📄 Licenca

Ovaj projekat je kreiran za ličnu upotrebu. Možete slobodno koristiti i modifikovati prema svojim potrebama.

## 🤝 Podrška

Ako imate pitanja ili problema, možete:
1. Proveriti dokumentaciju Next.js: https://nextjs.org/docs
2. Proveriti dokumentaciju Tailwind CSS: https://tailwindcss.com/docs

---

**Napomena:** Sajt koristi Lorem Ipsum tekst i placeholder slike. Zamenite ih sa svojim stvarnim sadržajem pre deployment-a.
