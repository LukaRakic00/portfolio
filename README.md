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

2. Kreiraj `.env` fajl u root direktorijumu sa sledećim varijablama:

**Za Redis Cloud (preporučeno):**
```env
# Redis Cloud Configuration (koristi REDIS_URL)
REDIS_URL=redis://default:your-password@your-redis-host:your-redis-port
# Ili sa TLS/SSL:
# REDIS_URL=rediss://default:your-password@your-redis-host:your-redis-port

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-secret-key-change-in-production
```

**Ili za lokalni Redis:**
```env
# Redis Configuration (lokalni server)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_TLS=false

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-secret-key-change-in-production
```

**Napomena:** Ako koristiš Redis Cloud, dobićeš connection string u formatu:
- `redis://default:password@host:port` (bez TLS)
- `rediss://default:password@host:port` (sa TLS)

Kopiraj taj string i stavi ga kao `REDIS_URL` u `.env` fajl.

4. Za Cloudinary:
   - Registruj se na [Cloudinary](https://cloudinary.com)
   - Dobij API kredencijale iz dashboard-a
   - Dodaj ih u `.env` fajl

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

## 🔐 Admin Panel

Admin panel omogućava upravljanje svim sadržajem sajta preko web interfejsa.

### Pristup Admin Panelu

1. Pokreni aplikaciju: `npm run dev`
2. Idi na: `http://localhost:3000/admin/login`
3. Prijavi se sa:
   - Korisničko ime: `admin` (ili ono što si postavio u `.env`)
   - Lozinka: `admin123` (ili ono što si postavio u `.env`)

### Funkcionalnosti Admin Panela

- **Hero Sekcija**: Upravljanje imenom, prezimenom, naslovom, opisom i CV linkom
- **About Sekcija**: Upravljanje naslovom, podnaslovom, paragrafima i profilnom slikom
- **Projekti**: Dodavanje, izmena i brisanje projekata sa slikama, opisima i tehnologijama
- **Skills & Technologies**: Upravljanje tehnologijama sa ikonama (emoji ili slike)
- **Contact Sekcija**: Upravljanje naslovom i podnaslovom kontakt sekcije
- **Social Networks**: Upravljanje LinkedIn i ResearchGate linkovima i ikonama

### Upload Slika

Sve slike se automatski upload-uju na Cloudinary u folder `luka-portfolio`. Putanje se čuvaju u Redis bazi.

## 📝 Prilagođavanje Sadržaja

Sve promene se sada rade preko Admin Panela na `/admin`. Nema potrebe za ručnim menjanjem koda!

### Alternativno: Ručno menjanje

Ako želiš da ručno menjaš podatke, svi podaci se čuvaju u Redis bazi sa sledećim ključevima:
- `hero` - Hero sekcija
- `about` - About sekcija
- `projects` - Lista projekata
- `skills` - Lista tehnologija
- `contact` - Contact sekcija
- `social` - Social networks linkovi

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
