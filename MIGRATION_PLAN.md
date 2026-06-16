# 🗺️ Plan Maestro de Migración y Reorganización: Madness Expeditions

Este documento detalla la hoja de ruta para profesionalizar el proyecto, migrarlo de GitHub a Gitea, y optimizar el rendimiento mediante la eliminación de dependencias externas.

## 🏗️ 1. Nueva Arquitectura: Monorepo con Workspaces
Para separar las preocupaciones y mantener el orden, el proyecto se reorganizará bajo una estructura de monorepo.

```text
/madness-expeditions
├── apps/
│   ├── web/               # Next.js (Sitio principal)
│   └── coming-soon/       # Landing page de "En Construcción"
├── packages/
│   ├── assets/            # Imágenes, logos y PDFs compartidos (Git LFS)
│   ├── marketing/         # Templates de correos y materiales de venta
│   └── pdf-generator/     # Script Puppeteer y HTMLs de origen
├── infra/
│   └── gitea/             # Dockerfiles y configs de servidor
├── .gitea/
│   └── workflows/         # Gitea Actions (CI/CD)
├── package.json           # Configuración de Workspaces
└── MIGRATION_PLAN.md      # Este documento
```

---

## 🚀 2. Fase de Ejecución: Paso a Paso

### Paso 1: Reorganización Local
1. **Configurar Workspaces:** Modificar el `package.json` raíz para incluir `"workspaces": ["apps/*", "packages/*"]`.
2. **Mover Archivos:** Trasladar la carpeta `web/` a `apps/web/` y `resources/` a los respectivos paquetes en `packages/`.
3. **Migrar Landing:** Extraer la página "en construcción" a `apps/coming-soon/`.

### Paso 2: Optimización de Recursos (Bye Bye GitHub URLs)
El objetivo es que el proyecto funcione al 100% sin conexión a internet durante el build.
1. **Descarga Masiva:** Asegurar que todas las imágenes en `https://raw.githubusercontent.com/...` estén en `packages/assets/images/`.
2. **Refactor de HTMLs:** Reemplazar las URLs absolutas de GitHub por rutas relativas en los archivos de marketing y presentaciones.
3. **Puppeteer Local:** Ajustar `generate-pdf.js` para usar `path.join(__dirname, ...)` y cargar recursos locales.

### Paso 3: Configuración de Gitea
1. **Crear Repo en Gitea:** Configurar un nuevo repositorio vacío.
2. **Activar Git LFS:** Indispensable para manejar los PDFs y assets pesados sin ralentizar el `git clone`.
3. **Cambiar Remotos:**
   ```bash
   git remote rename origin github
   git remote add origin https://tu-gitea.com/usuario/madness-expeditions.git
   git push -u origin main
   ```

### Paso 4: CI/CD con Gitea Actions
Configurar el despliegue automático hacia tu servidor.
1. **Build Job:** Instalar dependencias y ejecutar `npm run build` en el workspace de `web`.
2. **PDF Job:** Ejecutar el generador de PDFs para que los documentos en el servidor siempre estén actualizados.
3. **Deploy Job:** Usar Docker o SSH para mover los archivos compilados al entorno de producción.

---

## 🛠️ 3. Consideraciones Técnicas "Pro"

- **Despliegue Inmutable:** Se recomienda usar Docker. Gitea tiene su propio **Container Registry**, úsalo para guardar las imágenes de tu web.
- **Variables de Entorno:** Mover los secretos de GitHub Actions a **Gitea Secrets**.
- **Rendimiento:** Al servir las imágenes desde el mismo dominio (o subdominio de assets), el LCP (Largest Contentful Paint) de la web mejorará significativamente al no depender de `raw.githubusercontent.com`.

---

## 📝 Próximos Pasos sugeridos
- [ ] Ejecutar script de refactor de URLs.
- [ ] Crear estructura de carpetas `apps/` y `packages/`.
- [ ] Configurar el primer `workflow` de Gitea Actions.

---
*Documento generado para la sesión de reorganización de Madness Expeditions.*
