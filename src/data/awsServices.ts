import type { AWSService, CloudRegion, SecurityItem, IAMUser, IAMPolicy } from '../types/cloud';

// ─── AWS Services Catalog ─────────────────────────────────────────────────────
export const awsServices: AWSService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    category: 'Cómputo',
    description:
      'Amazon Elastic Compute Cloud proporciona capacidad de cómputo escalable en la nube. Permite lanzar servidores virtuales (instancias) con el sistema operativo, CPU, RAM y almacenamiento que necesites, pagando solo por lo que usas.',
    mainFunction:
      'Alojar aplicaciones web, servidores de backend, procesamiento de datos y entornos de desarrollo en máquinas virtuales configurables.',
    status: 'active',
    icon: 'Server',
    monthlyBaseCost: 72.0,
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Almacenamiento',
    description:
      'Amazon Simple Storage Service es un servicio de almacenamiento de objetos que ofrece escalabilidad, disponibilidad de datos, seguridad y rendimiento líderes en la industria. Almacena y recupera cualquier cantidad de datos desde cualquier lugar.',
    mainFunction:
      'Almacenar archivos estáticos, backups, imágenes, videos, logs y activos de sitios web con durabilidad del 99.999999999% (11 nueves).',
    status: 'active',
    icon: 'HardDrive',
    monthlyBaseCost: 23.0,
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    category: 'Base de Datos',
    description:
      'Amazon Relational Database Service facilita la configuración, operación y escalado de bases de datos relacionales en la nube. Soporta MySQL, PostgreSQL, MariaDB, Oracle, SQL Server y Amazon Aurora, administrando tareas rutinarias como parches y backups.',
    mainFunction:
      'Gestionar bases de datos relacionales administradas con alta disponibilidad, copias de seguridad automáticas y escalado con mínima intervención.',
    status: 'active',
    icon: 'Database',
    monthlyBaseCost: 145.0,
  },
  {
    id: 'iam',
    name: 'AWS IAM',
    category: 'Seguridad e Identidad',
    description:
      'AWS Identity and Access Management permite controlar de forma segura el acceso a los servicios y recursos de AWS. Con IAM puedes crear y gestionar usuarios, grupos y roles, y definir permisos granulares mediante políticas JSON.',
    mainFunction:
      'Gestionar identidades, controlar permisos de acceso a recursos AWS, implementar el principio de mínimo privilegio y habilitar MFA para mayor seguridad.',
    status: 'active',
    icon: 'Shield',
    monthlyBaseCost: 0,
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    category: 'Red y Entrega de Contenido',
    description:
      'Amazon Virtual Private Cloud permite lanzar recursos de AWS en una red virtual que tú defines. Ofrece control total sobre el entorno de red virtual, incluyendo selección de rangos IP, creación de subredes, configuración de tablas de enrutamiento y gateways.',
    mainFunction:
      'Crear redes privadas aisladas en AWS, segmentar recursos en subredes públicas y privadas, y controlar el tráfico con grupos de seguridad y NACLs.',
    status: 'active',
    icon: 'Network',
    monthlyBaseCost: 0,
  },
  {
    id: 'route53',
    name: 'Amazon Route 53',
    category: 'Red y Entrega de Contenido',
    description:
      'Amazon Route 53 es un servicio DNS (Sistema de Nombres de Dominio) de alta disponibilidad y escalabilidad en la nube. Conecta las solicitudes del usuario con la infraestructura de AWS o fuera de ella, con enrutamiento inteligente y comprobaciones de estado.',
    mainFunction:
      'Resolver nombres de dominio, gestionar registros DNS, enrutar tráfico con políticas de latencia/geolocalización y monitorear la salud de los endpoints.',
    status: 'active',
    icon: 'Globe',
    monthlyBaseCost: 0.5,
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    category: 'Red y Entrega de Contenido',
    description:
      'Amazon CloudFront es una red de distribución de contenido (CDN) rápida que entrega datos, videos, aplicaciones y APIs de forma segura a usuarios globales con baja latencia y altas velocidades de transferencia, usando más de 450 puntos de presencia globales.',
    mainFunction:
      'Acelerar la entrega de contenido estático y dinámico, reducir latencia para usuarios globales, proteger contra ataques DDoS y servir contenido desde ubicaciones edge cercanas al usuario.',
    status: 'active',
    icon: 'Zap',
    monthlyBaseCost: 12.0,
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Cómputo',
    description:
      'AWS Lambda es un servicio de cómputo sin servidor (serverless) que ejecuta código en respuesta a eventos sin necesidad de aprovisionar ni gestionar servidores. Solo se paga por el tiempo de cómputo consumido.',
    mainFunction:
      'Ejecutar funciones de backend sin servidores, procesar eventos en tiempo real, automatizar tareas y crear arquitecturas de microservicios escalables.',
    status: 'active',
    icon: 'Code',
    monthlyBaseCost: 8.5,
  },
  {
    id: 'cloudwatch',
    name: 'Amazon CloudWatch',
    category: 'Monitoreo',
    description:
      'Amazon CloudWatch es un servicio de monitoreo y observabilidad para recursos y aplicaciones de AWS. Recopila y rastrea métricas, recopila y monitorea archivos de log, establece alarmas y reacciona automáticamente a los cambios en los recursos de AWS.',
    mainFunction:
      'Monitorear métricas de infraestructura, visualizar dashboards en tiempo real, configurar alarmas automáticas y analizar logs para detectar problemas operacionales.',
    status: 'active',
    icon: 'Activity',
    monthlyBaseCost: 18.0,
  },
  {
    id: 'elasticache',
    name: 'Amazon ElastiCache',
    category: 'Base de Datos',
    description:
      'Amazon ElastiCache es un servicio de caché en memoria totalmente administrado compatible con Redis y Memcached. Mejora el rendimiento de las aplicaciones al recuperar información de cachés rápidas en lugar de bases de datos más lentas.',
    mainFunction:
      'Acelerar el rendimiento de aplicaciones con caché en memoria, reducir latencia de base de datos, gestionar sesiones de usuario y almacenar datos de acceso frecuente.',
    status: 'pending',
    icon: 'Cpu',
    monthlyBaseCost: 55.0,
  },
];

// ─── AWS Regions ──────────────────────────────────────────────────────────────
export const awsRegions: CloudRegion[] = [
  {
    id: 'us-east-1',
    code: 'us-east-1',
    name: 'US East (N. Virginia)',
    location: 'Virginia del Norte, EE. UU.',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    deployedServices: ['EC2', 'S3', 'RDS', 'CloudFront', 'Lambda'],
    status: 'operational',
    latency: 12,
    availabilityZones: 6,
  },
  {
    id: 'us-west-2',
    code: 'us-west-2',
    name: 'US West (Oregon)',
    location: 'Oregón, EE. UU.',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    deployedServices: ['EC2', 'S3', 'Lambda'],
    status: 'operational',
    latency: 28,
    availabilityZones: 4,
  },
  {
    id: 'eu-west-1',
    code: 'eu-west-1',
    name: 'Europe (Ireland)',
    location: 'Dublín, Irlanda',
    country: 'Irlanda',
    flag: '🇮🇪',
    deployedServices: ['EC2', 'RDS', 'CloudFront'],
    status: 'operational',
    latency: 95,
    availabilityZones: 3,
  },
  {
    id: 'ap-southeast-1',
    code: 'ap-southeast-1',
    name: 'Asia Pacific (Singapore)',
    location: 'Singapur',
    country: 'Singapur',
    flag: '🇸🇬',
    deployedServices: ['EC2', 'S3'],
    status: 'degraded',
    latency: 180,
    availabilityZones: 3,
  },
  {
    id: 'sa-east-1',
    code: 'sa-east-1',
    name: 'South America (São Paulo)',
    location: 'São Paulo, Brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    deployedServices: ['EC2', 'S3', 'RDS'],
    status: 'operational',
    latency: 45,
    availabilityZones: 3,
  },
  {
    id: 'ap-northeast-1',
    code: 'ap-northeast-1',
    name: 'Asia Pacific (Tokyo)',
    location: 'Tokio, Japón',
    country: 'Japón',
    flag: '🇯🇵',
    deployedServices: ['EC2', 'CloudFront'],
    status: 'operational',
    latency: 165,
    availabilityZones: 4,
  },
  {
    id: 'eu-central-1',
    code: 'eu-central-1',
    name: 'Europe (Frankfurt)',
    location: 'Frankfurt, Alemania',
    country: 'Alemania',
    flag: '🇩🇪',
    deployedServices: ['EC2', 'S3', 'Lambda'],
    status: 'operational',
    latency: 88,
    availabilityZones: 3,
  },
  {
    id: 'ap-south-1',
    code: 'ap-south-1',
    name: 'Asia Pacific (Mumbai)',
    location: 'Bombai, India',
    country: 'India',
    flag: '🇮🇳',
    deployedServices: ['EC2', 'RDS'],
    status: 'outage',
    latency: 210,
    availabilityZones: 3,
  },
];

// ─── Security Items ───────────────────────────────────────────────────────────
export const securityItems: SecurityItem[] = [
  {
    id: 'shared-responsibility',
    category: 'Modelo de Responsabilidad Compartida',
    title: 'Responsabilidad del Cliente',
    description:
      'El cliente es responsable de la seguridad EN la nube: datos, configuración, accesos, OS y red.',
    status: 'ok',
    details: [
      'Cifrado de datos en reposo y tránsito ✓',
      'Gestión de credenciales IAM ✓',
      'Parches del sistema operativo ✓',
      'Configuración de grupos de seguridad ✓',
    ],
  },
  {
    id: 'aws-responsibility',
    category: 'Modelo de Responsabilidad Compartida',
    title: 'Responsabilidad de AWS',
    description:
      'AWS es responsable de la seguridad DE la nube: hardware, software, redes e instalaciones.',
    status: 'ok',
    details: [
      'Infraestructura física de centros de datos ✓',
      'Hardware de cómputo, almacenamiento y red ✓',
      'Virtualización del hipervisor ✓',
      'Servicios administrados de AWS ✓',
    ],
  },
  {
    id: 'iam-security',
    category: 'IAM',
    title: 'Control de Identidades',
    description: 'Gestión de usuarios, roles y políticas de acceso con principio de mínimo privilegio.',
    status: 'warning',
    details: [
      'MFA habilitado en cuenta raíz ✓',
      '3 usuarios sin MFA — requiere atención ⚠',
      'Políticas de contraseña configuradas ✓',
      'Rotación de claves de acceso pendiente ⚠',
    ],
  },
  {
    id: 'data-protection',
    category: 'Protección de Datos',
    title: 'Cifrado y Backups',
    description: 'Estado del cifrado de datos en reposo y en tránsito, y política de respaldos.',
    status: 'ok',
    details: [
      'S3 con cifrado AES-256 habilitado ✓',
      'RDS con cifrado en reposo activo ✓',
      'Certificados TLS/SSL vigentes ✓',
      'Backups automáticos diarios activos ✓',
    ],
  },
  {
    id: 'network-security',
    category: 'Seguridad de Red',
    title: 'Firewall y Grupos de Seguridad',
    description: 'Configuración de Security Groups, NACLs y protección ante intrusiones.',
    status: 'warning',
    details: [
      'Security Groups configurados por servicio ✓',
      'Puerto 22 (SSH) expuesto públicamente ⚠',
      'NACLs de subred configurados ✓',
      'AWS Shield Standard activo ✓',
    ],
  },
  {
    id: 'compliance',
    category: 'Cumplimiento',
    title: 'Normativas y Estándares',
    description: 'Estado del cumplimiento con normativas regulatorias y estándares de seguridad.',
    status: 'critical',
    details: [
      'Logs de CloudTrail deshabilitados ✗',
      'AWS Config no configurado ✗',
      'Revisión SOC 2 pendiente ⚠',
      'Política de retención de logs sin definir ✗',
    ],
  },
];

// ─── IAM Users ────────────────────────────────────────────────────────────────
export const iamUsers: IAMUser[] = [
  { id: '1', name: 'admin-root', role: 'AdministratorAccess', mfaEnabled: true, lastLogin: '2026-09-25', status: 'active' },
  { id: '2', name: 'dev-backend', role: 'PowerUserAccess', mfaEnabled: true, lastLogin: '2026-09-24', status: 'active' },
  { id: '3', name: 'dev-frontend', role: 'ReadOnlyAccess', mfaEnabled: false, lastLogin: '2026-09-23', status: 'active' },
  { id: '4', name: 'ops-engineer', role: 'EC2FullAccess', mfaEnabled: true, lastLogin: '2026-09-22', status: 'active' },
  { id: '5', name: 'data-analyst', role: 'S3ReadOnlyAccess', mfaEnabled: false, lastLogin: '2026-09-18', status: 'inactive' },
  { id: '6', name: 'security-auditor', role: 'SecurityAudit', mfaEnabled: true, lastLogin: '2026-09-25', status: 'active' },
];

// ─── IAM Policies ─────────────────────────────────────────────────────────────
export const iamPolicies: IAMPolicy[] = [
  { id: '1', name: 'AdministratorAccess', type: 'AWS Managed', description: 'Acceso completo a todos los servicios AWS', attachedTo: 1 },
  { id: '2', name: 'PowerUserAccess', type: 'AWS Managed', description: 'Acceso a servicios excepto IAM y Organizations', attachedTo: 2 },
  { id: '3', name: 'ReadOnlyAccess', type: 'AWS Managed', description: 'Acceso de sólo lectura a todos los servicios', attachedTo: 3 },
  { id: '4', name: 'EC2FullAccess', type: 'AWS Managed', description: 'Acceso completo a EC2 y recursos relacionados', attachedTo: 1 },
  { id: '5', name: 'S3-Prod-Policy', type: 'Customer Managed', description: 'Acceso restringido a buckets de producción', attachedTo: 2 },
  { id: '6', name: 'SecurityAudit', type: 'AWS Managed', description: 'Acceso de lectura para auditorías de seguridad', attachedTo: 1 },
];

// ─── Cost chart data ──────────────────────────────────────────────────────────
export const costChartData = [
  { month: 'Ene', total: 1850 },
  { month: 'Feb', total: 1920 },
  { month: 'Mar', total: 2100 },
  { month: 'Abr', total: 2380 },
  { month: 'May', total: 2150 },
  { month: 'Jun', total: 2680 },
  { month: 'Jul', total: 2450 },
  { month: 'Ago', total: 2890 },
  { month: 'Sep', total: 3120 },
  { month: 'Oct', total: 2980 },
  { month: 'Nov', total: 3150 },
  { month: 'Dic', total: 3300 },
];

export const costDistributionData = [
  { name: 'EC2', value: 72, color: '#2563EB' },
  { name: 'RDS', value: 145, color: '#16A34A' },
  { name: 'CloudFront', value: 12, color: '#F59E0B' },
  { name: 'Lambda', value: 8.5, color: '#8B5CF6' },
  { name: 'CloudWatch', value: 18, color: '#06B6D4' },
  { name: 'Otros', value: 23, color: '#64748B' },
];
