// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "."
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "."
    }
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Contenuto Sito",
        path: "content",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "image", name: "backgroundImage", label: "Immagine di sfondo" },
              { type: "string", name: "titleLine1", label: "Titolo Riga 1" },
              { type: "string", name: "titleLine2", label: "Titolo Riga 2" },
              { type: "string", name: "titleLine3", label: "Titolo Riga 3" },
              { type: "string", name: "description", label: "Descrizione", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "booking",
            label: "Prenotazione",
            fields: [
              { type: "string", name: "description", label: "Descrizione prenotazione", ui: { component: "textarea" } },
              { type: "string", name: "address", label: "Indirizzo", ui: { component: "textarea" } },
              { type: "string", name: "hours", label: "Orari", list: true },
              { type: "string", name: "phone", label: "Telefono" },
              { type: "string", name: "walkInNotice", label: "Nota walk-in", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "services",
            label: "Servizi",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "Servizio" })
            },
            fields: [
              { type: "string", name: "name", label: "Nome" },
              { type: "string", name: "description", label: "Descrizione", ui: { component: "textarea" } },
              { type: "string", name: "duration", label: "Durata (es. 30 min)" },
              { type: "string", name: "price", label: "Prezzo (es. \u20AC15)" }
            ]
          },
          {
            type: "object",
            name: "story",
            label: "La Storia",
            fields: [
              { type: "image", name: "mainImage", label: "Immagine principale" },
              { type: "image", name: "secondaryImage", label: "Immagine secondaria" },
              { type: "image", name: "accentImage", label: "Immagine accento" },
              { type: "string", name: "quote", label: "Citazione principale", ui: { component: "textarea" } },
              { type: "string", name: "paragraph1", label: "Paragrafo 1", ui: { component: "textarea" } },
              { type: "string", name: "paragraph2", label: "Paragrafo 2", ui: { component: "textarea" } },
              { type: "string", name: "signature", label: "Firma" }
            ]
          },
          {
            type: "object",
            name: "philosophy",
            label: "Filosofia (banner)",
            fields: [
              { type: "string", name: "quote", label: "Citazione", ui: { component: "textarea" } },
              { type: "string", name: "author", label: "Autore" }
            ]
          },
          {
            type: "object",
            name: "gallery",
            label: "Galleria",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || "Foto" })
            },
            fields: [
              { type: "image", name: "image", label: "Immagine" },
              { type: "string", name: "label", label: "Etichetta" },
              { type: "string", name: "tag", label: "Tag (opzionale, es. indirizzo)" },
              {
                type: "string",
                name: "size",
                label: "Dimensione",
                options: [
                  { value: "normal", label: "Normale" },
                  { value: "large", label: "Grande (quadrato)" },
                  { value: "tall", label: "Alto (verticale)" },
                  { value: "wide", label: "Largo (orizzontale)" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "Contatti",
            fields: [
              { type: "image", name: "backgroundImage", label: "Immagine di sfondo" },
              { type: "string", name: "name", label: "Nome locale" },
              { type: "string", name: "address", label: "Indirizzo" },
              { type: "string", name: "mapsUrl", label: "Link Google Maps" }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "tagline", label: "Tagline" },
              { type: "string", name: "phone", label: "Telefono" },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "address", label: "Indirizzo" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
