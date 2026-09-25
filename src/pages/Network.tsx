import React from 'react';
import { Network as NetworkIcon, Globe, Zap, Server, Database, Shield, Lock, Wifi } from 'lucide-react';

const Network: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Architecture Diagram */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <NetworkIcon size={18} className="text-blue-600" />
          <h2 className="font-semibold text-slate-800">Arquitectura de Red AWS</h2>
        </div>

        {/* Visual Network Architecture */}
        <div className="space-y-6">
          {/* Internet Layer */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <Globe size={24} />
              <div>
                <p className="font-bold text-sm">INTERNET</p>
                <p className="text-xs text-blue-100">Tráfico de usuarios globales</p>
              </div>
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center">
            <div className="w-1 h-12 bg-slate-200 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-slate-300" />
            </div>
          </div>

          {/* Route 53 */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-orange-50 border-2 border-orange-300 px-5 py-3 rounded-2xl">
              <Globe size={22} className="text-orange-600" />
              <div>
                <p className="font-bold text-sm text-orange-900">Amazon Route 53</p>
                <p className="text-xs text-orange-600">DNS y enrutamiento de tráfico</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-1 h-12 bg-slate-200 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-slate-300" />
            </div>
          </div>

          {/* CloudFront */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-purple-50 border-2 border-purple-300 px-5 py-3 rounded-2xl">
              <Zap size={22} className="text-purple-600" />
              <div>
                <p className="font-bold text-sm text-purple-900">Amazon CloudFront</p>
                <p className="text-xs text-purple-600">CDN — Distribución de contenido global</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-1 h-12 bg-slate-200 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-slate-300" />
            </div>
          </div>

          {/* VPC Container */}
          <div className="border-4 border-blue-300 bg-blue-50/30 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Shield size={18} className="text-blue-700" />
              <h3 className="font-bold text-blue-900">Amazon VPC (Virtual Private Cloud)</h3>
              <span className="ml-auto text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-semibold">10.0.0.0/16</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Public Subnet */}
              <div className="border-2 border-green-300 bg-green-50 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Wifi size={16} className="text-green-700" />
                  <h4 className="font-semibold text-green-900 text-sm">Subred Pública</h4>
                  <span className="ml-auto text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-medium">10.0.1.0/24</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-white border border-green-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Server size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">EC2 - Web Server</p>
                        <p className="text-xs text-slate-400">t3.medium</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-slate-100">
                      <span className="text-slate-500">IP Pública</span>
                      <span className="font-mono font-semibold text-slate-700">54.123.45.67</span>
                    </div>
                  </div>

                  <div className="bg-white border border-green-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Shield size={16} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">NAT Gateway</p>
                        <p className="text-xs text-slate-400">Tráfico saliente</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-green-100 rounded-xl p-3">
                  <p className="text-xs text-green-700"><strong>Internet Gateway:</strong> Conectado</p>
                  <p className="text-xs text-green-600 mt-1">Acceso directo a Internet ✓</p>
                </div>
              </div>

              {/* Private Subnet */}
              <div className="border-2 border-rose-300 bg-rose-50 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Lock size={16} className="text-rose-700" />
                  <h4 className="font-semibold text-rose-900 text-sm">Subred Privada</h4>
                  <span className="ml-auto text-xs text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full font-medium">10.0.2.0/24</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-white border border-rose-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Server size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">EC2 - App Server</p>
                        <p className="text-xs text-slate-400">t3.large</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-slate-100">
                      <span className="text-slate-500">IP Privada</span>
                      <span className="font-mono font-semibold text-slate-700">10.0.2.10</span>
                    </div>
                  </div>

                  <div className="bg-white border border-rose-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Database size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">RDS - Database</p>
                        <p className="text-xs text-slate-400">PostgreSQL 15</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-slate-100">
                      <span className="text-slate-500">IP Privada</span>
                      <span className="font-mono font-semibold text-slate-700">10.0.2.20</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-rose-100 rounded-xl p-3">
                  <p className="text-xs text-rose-700"><strong>Sin acceso directo a Internet</strong></p>
                  <p className="text-xs text-rose-600 mt-1">Tráfico saliente vía NAT Gateway</p>
                </div>
              </div>
            </div>

            {/* Security Groups */}
            <div className="mt-6 bg-blue-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={16} className="text-blue-700" />
                <h4 className="font-semibold text-blue-900 text-sm">Security Groups (Firewall Virtual)</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-white rounded-xl p-3">
                  <p className="font-semibold text-slate-700 mb-1">Web-SG</p>
                  <p className="text-slate-500">Entrada: HTTP (80), HTTPS (443)</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="font-semibold text-slate-700 mb-1">App-SG</p>
                  <p className="text-slate-500">Entrada: Solo desde Web-SG</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="font-semibold text-slate-700 mb-1">DB-SG</p>
                  <p className="text-slate-500">Entrada: 5432 desde App-SG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VPC Explanation */}
        <div className="bg-blue-600 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-3 mb-3">
            <Shield size={22} className="flex-shrink-0 text-blue-200" />
            <div>
              <h3 className="font-bold mb-1">¿Qué es Amazon VPC?</h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                <strong>Amazon VPC (Virtual Private Cloud)</strong> te permite crear una red virtual aislada en AWS.
                Tienes control total sobre tu entorno de red: rangos de IP, subredes, tablas de enrutamiento y gateways de red.
                Puedes lanzar recursos AWS como instancias EC2 dentro de tu VPC.
              </p>
            </div>
          </div>
        </div>

        {/* Subnets Explanation */}
        <div className="bg-green-600 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-3 mb-3">
            <NetworkIcon size={22} className="flex-shrink-0 text-green-200" />
            <div>
              <h3 className="font-bold mb-1">Subredes Públicas y Privadas</h3>
              <p className="text-sm text-green-100 leading-relaxed">
                Una <strong>subred pública</strong> tiene una ruta hacia Internet Gateway y puede recibir tráfico de Internet.
                Una <strong>subred privada</strong> NO tiene acceso directo a Internet; usa NAT Gateway para tráfico saliente.
                Esta segmentación protege recursos sensibles como bases de datos.
              </p>
            </div>
          </div>
        </div>

        {/* Route 53 */}
        <div className="bg-orange-600 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-3 mb-3">
            <Globe size={22} className="flex-shrink-0 text-orange-200" />
            <div>
              <h3 className="font-bold mb-1">Amazon Route 53</h3>
              <p className="text-sm text-orange-100 leading-relaxed">
                <strong>Route 53</strong> es el servicio DNS de AWS. Traduce nombres de dominio (ej. miapp.com) en direcciones IP.
                Ofrece enrutamiento basado en geolocalización, latencia y health checks, dirigiendo el tráfico a endpoints saludables.
              </p>
            </div>
          </div>
        </div>

        {/* CloudFront */}
        <div className="bg-purple-600 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-3 mb-3">
            <Zap size={22} className="flex-shrink-0 text-purple-200" />
            <div>
              <h3 className="font-bold mb-1">Amazon CloudFront</h3>
              <p className="text-sm text-purple-100 leading-relaxed">
                <strong>CloudFront</strong> es una red de entrega de contenido (CDN) que distribuye contenido con baja latencia.
                Almacena en caché contenido estático (imágenes, CSS, JS) en ubicaciones edge globales, mejorando la velocidad de carga
                y reduciendo la carga en servidores de origen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Network components table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Componentes de Red AWS</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Componente', 'Función', 'Ubicación', 'Configuración'].map((h) => (
                  <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Internet Gateway', func: 'Conecta VPC a Internet', loc: 'VPC', config: 'Adjunto a VPC' },
                { name: 'NAT Gateway', func: 'Tráfico saliente desde subred privada', loc: 'Subred Pública', config: 'IP Elástica asignada' },
                { name: 'Route Table', func: 'Define rutas de tráfico', loc: 'VPC/Subred', config: '3 tablas activas' },
                { name: 'Security Group', func: 'Firewall a nivel de instancia', loc: 'Instancias EC2/RDS', config: 'Stateful' },
                { name: 'Network ACL', func: 'Firewall a nivel de subred', loc: 'Subredes', config: 'Stateless' },
                { name: 'VPC Peering', func: 'Conecta 2 VPCs', loc: 'Entre VPCs', config: 'No configurado' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-800">{row.name}</td>
                  <td className="py-3 px-3 text-slate-600">{row.func}</td>
                  <td className="py-3 px-3 text-slate-500 text-xs">{row.loc}</td>
                  <td className="py-3 px-3 text-slate-500 text-xs">{row.config}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best practices */}
      <div className="bg-slate-800 rounded-2xl p-5 text-white">
        <h3 className="font-bold mb-3">Mejores Prácticas de Arquitectura de Red</h3>
        <ul className="space-y-2 text-sm text-slate-200">
          {[
            'Usar al menos 2 Zonas de Disponibilidad para alta disponibilidad',
            'Segmentar recursos en subredes públicas y privadas según su exposición',
            'Implementar Security Groups con el principio de mínimo privilegio',
            'Usar NACLs como capa adicional de seguridad a nivel de subred',
            'Habilitar VPC Flow Logs para auditoría y troubleshooting',
            'Configurar Route 53 health checks para failover automático',
            'Usar CloudFront para reducir latencia y proteger contra ataques DDoS',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Network;
