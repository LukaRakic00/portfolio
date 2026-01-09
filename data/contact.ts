export interface ContactData {
  title: string
  subtitle: string
}

export const contactData: Record<'en' | 'sr', ContactData> = {
  en: {
    title: 'Get In Touch',
    subtitle: 'Have a project in mind? Let\'s work together to bring it to life',
  },
  sr: {
    title: 'Kontaktirajte Me',
    subtitle: 'Imate projekat na umu? Hajde da zajedno oživimo vašu ideju',
  },
}

