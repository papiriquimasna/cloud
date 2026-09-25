# CloudOps Dashboard

Sistema web profesional para la planificación y visualización de una solución Cloud basada en AWS.

---

## 📋 Descripción

**CloudOps Dashboard** es una aplicación web desarrollada con React, TypeScript y Tailwind CSS que permite planificar, visualizar y analizar los componentes fundamentales de una solución de computación en la nube. El sistema aplica conceptos de AWS relacionados con planificación Cloud, economía de la nube, infraestructura global, seguridad y arquitectura de red.

---

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS v4** - Framework CSS
- **React Router DOM** - Navegación SPA
- **Lucide React** - Iconografía
- **Recharts** - Gráficos y visualización de datos

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ y npm

### Pasos

1. **Clonar o descargar el proyecto**
   ```bash
   cd cloudops-dashboard
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación se abrirá automáticamente en `http://localhost:5173`

4. **Compilar para producción**
   ```bash
   npm run build
   ```
   Los archivos compilados estarán en la carpeta `dist/`

5. **Previsualizar build de producción**
   ```bash
   npm run preview
   ```

---

## 📂 Estructura del Proyecto

```
cloudops-dashboard/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── CostCard.tsx
│   │   ├── SecurityCard.tsx
│   │   ├── RegionCard.tsx
│   │   └── StatusBadge.tsx
│   ├── pages/              # Páginas principales
│   │   ├── Dashboard.tsx
│   │   ├── Planning.tsx
│   │   ├── Costs.tsx
│   │   ├── Infrastructure.tsx
│   │   ├── Security.tsx
│   │   ├── Network.tsx
│   │   └── Services.tsx
│   ├── data/
│   │   └── awsServices.ts  # Datos simulados (mock data)
│   ├── types/
│   │   └── cloud.ts        # Definiciones TypeScript
│   ├── App.tsx             # Componente raíz con rutas
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globales
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## ✨ Funcionalidades

### 1. **Dashboard (Módulo 1)**
- Resumen general de la solución Cloud
- KPIs: servicios activos, costos mensuales/anuales, regiones activas
- Gráficos de tendencia de costos y distribución por servicio
- Estado de seguridad con score visual
- Tabla de recursos Cloud

### 2. **Planificación Cloud (Módulo 2)**
- Formulario completo para registrar propuestas de solución Cloud
- Campos: nombre, tipo de app, descripción, región, usuarios estimados, disponibilidad, servicios, objetivo de migración
- Validación en tiempo real
- Lista de propuestas registradas con visualización detallada
- Funcionalidad de eliminar propuestas

### 3. **Costos y Economía Cloud (Módulo 3)**
- Calculadora de costos simulada
- Selección de servicio, cantidad y horas estimadas
- Vista previa de costos: unitario, estimado, mensual y anual
- Lista de servicios agregados con tarjetas
- Gráficos de tendencia histórica (barra) y distribución (pastel)

### 4. **Infraestructura Global (Módulo 4)**
- Visualización de regiones AWS globales
- Filtros por estado: operacional, degradado, sin servicio
- Tarjetas con detalles: latencia, zonas de disponibilidad, servicios desplegados
- Panel de detalle de región seleccionada
- Gráfico de latencia por región

### 5. **Seguridad (Módulo 5)**
- Banner de postura de seguridad con score general
- Tabs: Responsabilidad Compartida, IAM, Cumplimiento
- Modelo de responsabilidad compartida (AWS vs Cliente)
- Tarjetas de estado de seguridad por categoría
- Tabla de usuarios IAM con MFA y roles
- Lista de políticas IAM (AWS Managed y Customer Managed)
- Lista de verificación de cumplimiento normativo

### 6. **Arquitectura de Red (Módulo 6)**
- Diagrama visual de arquitectura de red AWS
- Flujo: Internet → Route 53 → CloudFront → VPC → Subredes → EC2/RDS
- Subredes públicas y privadas con componentes
- Security Groups y configuración de firewall
- Explicaciones de VPC, subredes, Route 53 y CloudFront
- Tabla de componentes de red
- Mejores prácticas de arquitectura

### 7. **Servicios AWS (Módulo 7)**
- Catálogo completo de servicios AWS
- Filtros: búsqueda por texto, categoría y estado
- Tarjetas con descripción completa y función principal
- Estadísticas: total, activos, inactivos, pendientes
- Información sobre costo base mensual

---

## 🎨 Diseño de la Interfaz

La aplicación utiliza la paleta de colores especificada:

- **Fondo principal:** `#F8FAFC`
- **Sidebar:** `#0F172A`
- **Color principal:** `#2563EB` (azul)
- **Seguridad:** `#16A34A` (verde)
- **Costos:** `#F59E0B` (ámbar)
- **Alertas:** `#DC2626` (rojo)
- **Texto principal:** `#1E293B`
- **Texto secundario:** `#64748B`
- **Bordes:** `#E2E8F0`
- **Cards:** `#FFFFFF`

### Características de diseño:
- **Responsive design:** adaptado a móviles, tablets y escritorio
- **Cards con bordes redondeados:** 12-16px border-radius
- **Sombras ligeras** para dar profundidad
- **Tipografía clara:** 14-16px para texto, 28-32px para títulos
- **Iconografía coherente** con Lucide React
- **Sidebar colapsable** para mejor uso del espacio

---

## 📸 Capturas de Pantalla

### Dashboard
Vista principal con KPIs, gráficos de costos, estado de seguridad y recursos Cloud.

### Planificación Cloud
Formulario funcional para registrar propuestas con validación completa y visualización de propuestas registradas.

### Costos
Calculadora de costos con gráficos de tendencia y distribución por servicio.

### Infraestructura Global
Mapa de regiones AWS con filtros, detalles de latencia y zonas de disponibilidad.

### Seguridad
Modelo de responsabilidad compartida, gestión IAM con usuarios y políticas, y checklist de cumplimiento.

### Arquitectura de Red
Diagrama visual completo: Internet → Route 53 → CloudFront → VPC → EC2/RDS, con explicaciones de cada componente.

### Servicios AWS
Catálogo filtrable con 10 servicios AWS, descripciones completas y costos base.

### Vista Responsive
Interfaz completamente adaptada a dispositivos móviles con sidebar colapsable.

---

## 🧠 Conceptos Cloud Aplicados

### AWS Fundamentals
- **Computación en la nube:** modelo de entrega de servicios bajo demanda
- **Regiones y Zonas de Disponibilidad:** infraestructura global distribuida
- **Modelo pay-as-you-go:** pago solo por lo que usas

### Categorías de Servicios AWS
- **Cómputo:** EC2 (instancias virtuales), Lambda (serverless)
- **Almacenamiento:** S3 (object storage), EBS (block storage)
- **Base de Datos:** RDS (relacional administrado), ElastiCache (caché en memoria)
- **Red:** VPC (red privada), Route 53 (DNS), CloudFront (CDN)
- **Seguridad:** IAM (gestión de identidades), Security Groups (firewall)
- **Monitoreo:** CloudWatch (métricas y logs)

### Economía Cloud
- **Estimación de costos** por servicio
- **Optimización de gastos** mediante selección adecuada de recursos
- **Escalabilidad horizontal y vertical**

### Seguridad
- **Modelo de Responsabilidad Compartida:** AWS protege la infraestructura; el cliente protege sus datos y configuraciones
- **IAM:** usuarios, roles, políticas y principio de mínimo privilegio
- **MFA (Multi-Factor Authentication):** protección adicional de cuentas críticas
- **Cifrado:** datos en reposo (AES-256) y en tránsito (TLS/SSL)
- **Cumplimiento:** SOC 2, ISO 27001, HIPAA

### Arquitectura de Red
- **VPC (Virtual Private Cloud):** red virtual aislada en AWS
- **Subredes públicas:** con acceso directo a Internet vía Internet Gateway
- **Subredes privadas:** sin acceso directo; tráfico saliente mediante NAT Gateway
- **Security Groups:** firewall stateful a nivel de instancia
- **Route 53:** DNS con enrutamiento inteligente (latencia, geolocalización)
- **CloudFront:** CDN para acelerar entrega de contenido global

---

## 🔧 Decisiones de Diseño

### Arquitectura de la Aplicación
- **SPA (Single Page Application)** con React Router para navegación fluida
- **Componentes reutilizables** para mantener consistencia y facilitar mantenimiento
- **Separación clara** entre datos (mock), tipos (TypeScript) y UI (componentes)
- **Estado local** con React hooks (useState) — suficiente para esta aplicación sin backend

### Tipado con TypeScript
- **Interfaces explícitas** para todos los modelos de datos (CloudPlan, AWSService, SecurityItem, etc.)
- **Union types** para estados controlados (ServiceStatus, SecurityStatus, etc.)
- **Type safety** en props de componentes

### Estilizado con Tailwind CSS v4
- **Utility-first approach** para desarrollo rápido
- **Clases personalizadas** para casos específicos (scrollbar, gradientes)
- **Plugin @tailwindcss/vite** para integración con Vite
- **Diseño mobile-first** con breakpoints responsive

### Datos Simulados
- **Mock data estático** en `data/awsServices.ts`
- Información detallada de servicios AWS con descripciones educativas
- **Sin backend real** — enfoque en frontend y conceptos Cloud

---

## 👨‍💻 Autor

**Proyecto desarrollado como práctica integrativa de Cloud Foundations - Semanas 5 y 6**

---

## 📄 Licencia

Este proyecto es material educativo para fines académicos.

---

## 🙏 Agradecimientos

- **AWS** por la documentación oficial de servicios Cloud
- **Lucide** por los iconos
- **Recharts** por las herramientas de visualización de datos
- **Tailwind CSS** por el framework de diseño

---

## 📞 Soporte

Para dudas o consultas sobre el proyecto, revisar la documentación de:
- [AWS Documentation](https://docs.aws.amazon.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
