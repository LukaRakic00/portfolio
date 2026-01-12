# Statički Podaci za Portfolio Sajt

Ovaj folder sadrži statičke podatke za portfolio sajt. Ovo je bolje za SEO optimizaciju jer su podaci direktno u HTML-u.

## Struktura

- `hero.ts` - Hero sekcija podaci (ime, prezime, naslov, opis, CV link)
- `about.ts` - About sekcija podaci (naslov, podnaslov, paragrafi, profilna slika)
- `projects.ts` - Lista projekata
- `skills.ts` - Lista tehnologija i veština
- `contact.ts` - Kontakt sekcija podaci
- `social.ts` - Social network linkovi (LinkedIn, ResearchGate)

Svaki fajl sadrži podatke za oba jezika (`en` i `sr`).

## Kako da izmeniš podatke

Jednostavno otvori odgovarajući TypeScript fajl i izmeni podatke direktno u kodu. Podaci se automatski učitavaju u komponente.

## Format podataka

Svaki fajl ima sledeći format:

```typescript
export interface DataType {
  // polja...
}

export const dataName: Record<'en' | 'sr', DataType> = {
  en: {
    // podaci na engleskom
  },
  sr: {
    // podaci na srpskom
  },
}

