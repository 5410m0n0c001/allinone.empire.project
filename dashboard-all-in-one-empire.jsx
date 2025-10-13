import React, { useState } from 'react';
import { BarChart3, Ship, Wrench, Building2, Home, Bike, Smartphone, Car, Plane, Snowflake, TrendingUp, Users, DollarSign, Anchor, Package, Globe, Hammer, Info, Target, Lightbulb } from 'lucide-react';

const Dashboard = () => {
  const [selectedUnit, setSelectedUnit] = useState('overview');
  const [expandedSection, setExpandedSection] = useState(null);

  const marketData = {
    ocupacion: 79,
    ocupacionMax: 84,
    ocupacionMin: 74,
    adr: 498,
    adrMin: 405,
    revpar: 418,
    revparMin: 299,
    turistasInternacionales: 85.6,
    turistasNacionales: 40,
    cruceros: 605763,
    crucerosArribos: 161,
    embarcaciones: 40000,
    muelles: 380,
    yatesMes: 32,
    pasajerosTotales: 1025700,
    impactoEconomico: 54000000,
    gruposHoteleros: 85,
    habitaciones: 19500,
    habitacionesLuxury: 3000,
    turistasRepetitivos: 42,
    gastoPromedioLuxury: 2400,
    californiaTuristas: 40
  };

  const businessUnits = [
    {
      id: 'platform',
      name: 'allin1cabo.com',
      icon: Globe,
      status: 'progress',
      revenue: 'Plataforma Central',
      growth: 'Integrador',
      locations: 'Cabo San Lucas, San José del Cabo',
      kpis: {
        visitasMes: '45,000',
        conversionReservas: '8.2%',
        tiempoSitio: '4.5 min',
        divisiones: '14',
        nps: '72'
      },
      kpiDescriptions: {
        visitasMes: 'Visitas mensuales al sitio web',
        conversionReservas: 'Tasa de conversión de visitantes a reservas',
        tiempoSitio: 'Tiempo promedio en el sitio (engagement)',
        divisiones: 'Número de unidades de negocio integradas',
        nps: 'Net Promoter Score (satisfacción del cliente, escala 0-100)'
      },
      justificacion: 'Hub central del ecosistema. Propuesta de valor unificada: todos los servicios en una plataforma. Escalabilidad exponencial al integrar múltiples fuentes de ingreso.',
      segmentoClientes: 'Todo el ecosistema: turistas, inversionistas, empresas',
      fuentesIngreso: 'Comisiones por reservas, publicidad premium, suscripciones',
      propuestaValor: 'Todo Los Cabos en un solo lugar: mar, tierra, aire'
    },
    {
      id: 'charters',
      name: 'Allin1 Cabo Charters',
      icon: Ship,
      status: 'progress',
      revenue: '$2.4M',
      growth: '+36%',
      locations: 'Cabo San Lucas, La Paz, Mazatlán, Punta Mita, Riviera Maya',
      kpis: {
        ocupacion: '82%',
        pasajerosMes: '50,400',
        margen: '45%',
        cac: '$85',
        clv: '$1,240'
      },
      kpiDescriptions: {
        ocupacion: 'Porcentaje de capacidad utilizada de embarcaciones',
        pasajerosMes: 'Total de pasajeros transportados por mes',
        margen: 'Margen de contribución (ingresos - costos variables)',
        cac: 'Customer Acquisition Cost: costo para adquirir un cliente',
        clv: 'Customer Lifetime Value: valor de tiempo de vida del cliente'
      },
      justificacion: 'Mercado validado: 605K pasajeros cruceros. Propuesta 3x mejor: reservas digitales vs agencias tradicionales. Motor de reservas reduce CAC y aumenta margen.',
      segmentoClientes: 'Turistas internacionales luxury (85%), repetitivos (42%)',
      fuentesIngreso: 'Comisiones reserva (30%), tours premium, servicios adicionales',
      propuestaValor: 'Experiencia náutica premium 100% digital, reserva instantánea'
    },
    {
      id: 'naviera',
      name: 'Naviera Allin1',
      icon: Anchor,
      status: 'planned',
      revenue: '$1.8M',
      growth: 'Q2 2026',
      locations: 'Cabo San Lucas, La Paz, Mazatlán, Riviera Maya',
      kpis: {
        flotaEmbarcaciones: '28',
        capacidadPasajeros: '420',
        certificaciones: '6',
        seguros: '100%',
        mantenimientoMes: '$42K'
      },
      kpiDescriptions: {
        flotaEmbarcaciones: 'Total de embarcaciones en operación',
        capacidadPasajeros: 'Capacidad total de pasajeros simultáneos',
        certificaciones: 'Certificaciones náuticas y de seguridad vigentes',
        seguros: 'Porcentaje de flota con cobertura completa',
        mantenimientoMes: 'Costo mensual de mantenimiento preventivo/correctivo'
      },
      justificacion: 'Recurso clave: control de flota asegura calidad. Permisos SCT/ASIPONA son barreras de entrada. Logística optimizada reduce costos 30%.',
      segmentoClientes: 'Operadores turísticos, hoteles premium, cruceros',
      fuentesIngreso: 'Contratos operación flotilla, mantenimiento, logística',
      propuestaValor: 'Operación náutica certificada, segura, eficiente'
    },
    {
      id: 'workshop',
      name: 'Marine & Auto Workshop',
      icon: Wrench,
      status: 'development',
      revenue: '$450K',
      growth: 'Nuevo',
      locations: 'Cabo San Lucas, La Paz, San José del Cabo',
      kpis: {
        capacidadMensual: '120 servicios',
        ticketPromedio: '$850',
        margen: '62%',
        alianzas: '8 marinas',
        recurrencia: '38%'
      },
      kpiDescriptions: {
        capacidadMensual: 'Número máximo de servicios que puede realizar por mes',
        ticketPromedio: 'Valor promedio de cada servicio',
        margen: 'Margen bruto (ingresos - costos directos)',
        alianzas: 'Número de marinas y concesionarias con acuerdos',
        recurrencia: 'Porcentaje de clientes que regresan'
      },
      justificacion: 'Oportunidad identificada: 40K+ embarcaciones sin servicio integrado náutico+auto. Diferenciación radical: único taller dual.',
      segmentoClientes: 'Propietarios embarcaciones premium, flotillas, autos luxury',
      fuentesIngreso: 'Servicios mantenimiento, detailing, diagnóstico, emergencias',
      propuestaValor: 'Único servicio integrado náutico+auto, atención móvil'
    },
    {
      id: 'constructions',
      name: 'Allin1 Constructions',
      icon: Hammer,
      status: 'planned',
      revenue: '$3.5M',
      growth: 'Q3 2026',
      locations: 'Cabo San Lucas, San José del Cabo, Riviera Maya',
      kpis: {
        proyectosActivos: '12',
        m2Construccion: '8,400',
        margenProyecto: '28%',
        tiempoEntrega: '180 días',
        clientesRepetitivos: '45%'
      },
      kpiDescriptions: {
        proyectosActivos: 'Número de proyectos en construcción simultáneos',
        m2Construccion: 'Metros cuadrados totales en desarrollo',
        margenProyecto: 'Margen promedio por proyecto terminado',
        tiempoEntrega: 'Tiempo promedio de entrega de proyectos',
        clientesRepetitivos: 'Clientes que contratan más de un proyecto'
      },
      justificacion: 'Mercado en expansión: +85 grupos hoteleros. Problema real: falta de constructoras especializadas en luxury. Márgenes altos justifican inversión.',
      segmentoClientes: 'Inversionistas inmobiliarios, desarrolladores, hoteles',
      fuentesIngreso: 'Contratos construcción, remodelación, diseño',
      propuestaValor: 'Construcción luxury turnkey, experiencia premium'
    },
    {
      id: 'properties',
      name: 'Allin1 Properties',
      icon: Home,
      status: 'planned',
      revenue: '$8.5M',
      growth: '+24%',
      locations: 'San José, Cabo, Riviera Maya',
      kpis: {
        propiedades: '47',
        valorPromedio: '$1.2M',
        comision: '6%',
        diasVenta: '45',
        repeticion: '31%'
      },
      kpiDescriptions: {
        propiedades: 'Número de propiedades en cartera activa',
        valorPromedio: 'Valor promedio de las propiedades',
        comision: 'Comisión promedio por transacción',
        diasVenta: 'Tiempo promedio desde listado hasta cierre',
        repeticion: 'Clientes que regresan para otra transacción'
      },
      justificacion: 'Segmentación clara: inversionistas USA (80% mercado). Valor promedio luxury validado: $2,489 USD/noche. Modelo de comisiones permite escalabilidad.',
      segmentoClientes: 'Inversionistas USA high-value, compradores luxury',
      fuentesIngreso: 'Comisiones venta (6%), renta temporal, asesoría inversión',
      propuestaValor: 'Cartera exclusiva luxury, asesoría personalizada, ROI alto'
    },
    {
      id: 'bikes',
      name: 'Allin1 Bikes',
      icon: Bike,
      status: 'development',
      revenue: '$180K',
      growth: 'MVP',
      locations: 'Cabo San Lucas',
      kpis: {
        bicicletas: '150',
        viajesDia: '420',
        tarifaHora: '$8',
        zonas: '12',
        appDownloads: '3,200'
      },
      kpiDescriptions: {
        bicicletas: 'Total de bicicletas eléctricas en flota',
        viajesDia: 'Número promedio de viajes diarios',
        tarifaHora: 'Tarifa por hora de renta',
        zonas: 'Estaciones/zonas de disponibilidad',
        appDownloads: 'Descargas totales de la app'
      },
      justificacion: 'Modelo startup escalable: inversión inicial se distribuye entre usuarios crecientes. CAC $12 vs CLV $96. MVP permite iteración rápida.',
      segmentoClientes: 'Turistas eco-conscientes, millennials, viajeros urbanos',
      fuentesIngreso: 'Renta por hora/día, suscripciones mensuales, publicidad',
      propuestaValor: 'Movilidad eco-friendly instantánea vía app'
    },
    {
      id: 'app',
      name: 'Allin1 App Central',
      icon: Smartphone,
      status: 'design',
      revenue: 'Integrador',
      growth: 'Q4 2025',
      locations: 'Cobertura nacional',
      kpis: {
        usuarios: '8,500',
        reservasMes: '1,240',
        nps: '67',
        integraciones: '14',
        retencion: '54%'
      },
      kpiDescriptions: {
        usuarios: 'Usuarios activos registrados en la app',
        reservasMes: 'Total de reservas mensuales en todas las divisiones',
        nps: 'Net Promoter Score (satisfacción, escala 0-100)',
        integraciones: 'Servicios integrados en la app',
        retencion: 'Usuarios que usan la app mes tras mes'
      },
      justificacion: 'Tecnología clave: centraliza todas las unidades de negocio. Creador de alegrías: experiencia unificada sin fricción. Retención 54% aumenta CLV.',
      segmentoClientes: 'Todo el ecosistema All In One Empire conectado',
      fuentesIngreso: 'Comisiones por reserva, suscripciones premium, publicidad',
      propuestaValor: 'Todo el ecosistema conectado: una app, infinitas experiencias'
    },
    {
      id: 'cars',
      name: 'Allin1 Cars',
      icon: Car,
      status: 'planned',
      revenue: '$2.1M',
      growth: 'Q3 2025',
      locations: 'Cabo San Lucas, San José',
      kpis: {
        flota: '85',
        rentaDia: '$95',
        ocupacion: '68%',
        electricos: '15%',
        alianzas: '6 seguros'
      },
      kpiDescriptions: {
        flota: 'Total de vehículos disponibles para renta',
        rentaDia: 'Tarifa promedio de renta diaria',
        ocupacion: 'Porcentaje de días que los autos están rentados',
        electricos: 'Porcentaje de flota con vehículos eléctricos',
        alianzas: 'Compañías de seguros asociadas'
      },
      justificacion: 'Mercado existente con diferenciación: flota eléctrica premium (15%). 4.5M pasajeros/año necesitan transporte. Precio del cambio bajo.',
      segmentoClientes: 'Turistas internacionales, ejecutivos, familias premium',
      fuentesIngreso: 'Renta diaria/semanal, seguros premium, servicios adicionales',
      propuestaValor: 'Flota premium con vehículos eléctricos, servicio express'
    },
    {
      id: 'boats',
      name: 'Allin1 Boats (Buy & Sell)',
      icon: Ship,
      status: 'progress',
      revenue: '$1.2M',
      growth: '+18%',
      locations: 'Cabo San Lucas, La Paz, Mazatlán, Punta Mita',
      kpis: {
        inventario: '34 embarcaciones',
        valorPromedio: '$180K',
        comision: '8%',
        tiempoVenta: '60 días',
        alianzasBrokers: '12'
      },
      kpiDescriptions: {
        inventario: 'Embarcaciones en consignación/venta',
        valorPromedio: 'Valor promedio de embarcaciones',
        comision: 'Comisión promedio por venta',
        tiempoVenta: 'Tiempo promedio desde listado hasta venta',
        alianzasBrokers: 'Brokers y astilleros asociados'
      },
      justificacion: 'Oportunidad en mercado establecido: 40K+ embarcaciones registradas. Alianzas con brokers reducen costo de inventario.',
      segmentoClientes: 'Compradores náuticos USA/CA, inversionistas marinos',
      fuentesIngreso: 'Comisiones venta (8%), consignación, brokerage, asesoría',
      propuestaValor: 'Acceso a inventario exclusivo, proceso transparente'
    },
    {
      id: 'villas',
      name: 'Airbnb & Villas',
      icon: Building2,
      status: 'active',
      revenue: '$1.8M',
      growth: '+18%',
      locations: 'Cabo, San José, Riviera Maya',
      kpis: {
        ocupacion: '73%',
        tarifaNoche: '$385',
        villas: '24',
        satisfaccion: '4.8/5',
        repetitivos: '42%'
      },
      kpiDescriptions: {
        ocupacion: 'Porcentaje de noches ocupadas vs disponibles',
        tarifaNoche: 'Tarifa promedio por noche',
        villas: 'Total de propiedades en administración',
        satisfaccion: 'Calificación promedio de huéspedes',
        repetitivos: 'Huéspedes que regresan'
      },
      justificacion: 'CLV optimizado: 42% turistas repetitivos. Alleviador de frustraciones: concierge 24/7 digital. Flujo de caja positivo por pagos anticipados.',
      segmentoClientes: 'Viajeros premium, familias, grupos corporativos',
      fuentesIngreso: 'Renta por noche, servicios concierge, experiencias',
      propuestaValor: 'Villas premium + concierge 24/7, experiencias memorables'
    },
    {
      id: 'ice',
      name: 'Allin1 Ice Distribution',
      icon: Snowflake,
      status: 'planned',
      revenue: '$320K',
      growth: 'Q1 2026',
      locations: 'Cabo San Lucas, La Paz',
      kpis: {
        clientesActivos: '78',
        toneladasMes: '240',
        rutasDistribucion: '8',
        margen: '42%',
        contratos: '52 anuales'
      },
      kpiDescriptions: {
        clientesActivos: 'Clientes B2B con pedidos regulares',
        toneladasMes: 'Toneladas de hielo distribuidas mensualmente',
        rutasDistribucion: 'Rutas de entrega establecidas',
        margen: 'Margen bruto (precio venta - costo producción)',
        contratos: 'Contratos anuales activos (recurrencia)'
      },
      justificacion: 'Mercado B2B estable: hoteles a 79% ocupación + 605K cruceros requieren suministro constante. Modelo de contratos anuales asegura recurrencia.',
      segmentoClientes: 'Hoteles, restaurantes, marinas, cruceros, eventos',
      fuentesIngreso: 'Venta hielo, contratos anuales, distribución eventos',
      propuestaValor: 'Distribución confiable 24/7, calidad certificada'
    },
    {
      id: 'import',
      name: 'Allin1 Import & Distribution',
      icon: Package,
      status: 'planned',
      revenue: '$2.8M',
      growth: 'Q2 2026',
      locations: 'Los Cabos, Mazatlán',
      kpis: {
        productosSKU: '340',
        clientesB2B: '124',
        margenPromedio: '35%',
        volumenMensual: '$180K',
        alianzasUSA: '8'
      },
      kpiDescriptions: {
        productosSKU: 'Stock Keeping Units: productos únicos en catálogo',
        clientesB2B: 'Clientes Business-to-Business activos',
        margenPromedio: 'Margen promedio en productos importados',
        volumenMensual: 'Volumen de ventas mensual en USD',
        alianzasUSA: 'Proveedores/distribuidores en EUA'
      },
      justificacion: 'Problema identificado: demanda insatisfecha de productos USA en sector turístico. Márgenes altos en productos especializados luxury.',
      segmentoClientes: 'Hoteles luxury, restaurantes premium, marinas',
      fuentesIngreso: 'Venta productos importados, distribución B2B, logística',
      propuestaValor: 'Productos USA premium, proceso aduanal simplificado'
    },
    {
      id: 'travel',
      name: 'Allin1 Travel Agency',
      icon: Plane,
      status: 'planned',
      revenue: '$3.2M',
      growth: 'Q1 2026',
      locations: 'Cobertura nacional',
      kpis: {
        paquetes: '340/año',
        ticketPromedio: '$4,500',
        margen: '22%',
        corporativos: '28%',
        satisfaccion: '4.7/5'
      },
      kpiDescriptions: {
        paquetes: 'Paquetes turísticos vendidos anualmente',
        ticketPromedio: 'Valor promedio por paquete',
        margen: 'Margen después de comisiones a proveedores',
        corporativos: 'Porcentaje de ventas a segmento corporativo/MICE',
        satisfaccion: 'Calificación promedio de clientes'
      },
      justificacion: 'Segmentación nicho: MICE y luxury. Complementos generan más lucro que servicio base. Canales: alianzas con hoteles top reducen CAC.',
      segmentoClientes: 'Segmento MICE, luxury travelers, grupos corporativos',
      fuentesIngreso: 'Paquetes turísticos, comisiones hoteles/tours, servicios VIP',
      propuestaValor: 'Paquetes luxury a medida, acceso VIP, sin intermediarios'
    },
    {
      id: 'marineworkshop',
      name: '🛠️ Allin1 Marine & Auto Workshop',
      icon: Wrench,
      status: 'development',
      revenue: '$650K',
      growth: '⭐ NUEVO DESTACADO',
      locations: 'Cabo San Lucas, La Paz, San José del Cabo',
      kpis: {
        serviciosMes: '180',
        ticketPromedio: '$920',
        margen: '65%',
        clientesRecurrentes: '42%',
        calificacion: '4.9/5'
      },
      kpiDescriptions: {
        serviciosMes: 'Servicios totales realizados mensualmente',
        ticketPromedio: 'Valor promedio por servicio (náutico+auto)',
        margen: 'Margen bruto (servicios especializados alta rentabilidad)',
        clientesRecurrentes: 'Clientes que regresan para mantenimiento',
        calificacion: 'Calificación promedio de satisfacción'
      },
      justificacion: '💡 PROYECTO DESTACADO: Fusión disruptiva náutico+automotriz. Oportunidad única: 40K+ embarcaciones + mercado autos luxury/eléctricos sin servicio especializado integrado. Diagnóstico electrónico avanzado + servicio móvil = diferenciación radical 3x mejor que talleres tradicionales. Barreras de entrada: certificaciones técnicas y alianzas con marinas.',
      segmentoClientes: '⭐ Propietarios yates/embarcaciones premium, flotillas charters, dueños autos luxury/eléctricos, marinas, concesionarias premium',
      fuentesIngreso: '⭐ Mantenimiento preventivo/correctivo náutico+auto, diagnóstico electrónico avanzado, detailing premium, servicio móvil 24/7, certificaciones técnicas, paquetes anuales',
      propuestaValor: '⭐ ÚNICO TALLER DUAL: Fusión revolucionaria náutico+automotriz. Diagnóstico digital avanzado, servicio móvil a domicilio/marina, certificaciones premium. "Donde el mar y la tierra se encuentran en movimiento"'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-500',
      progress: 'bg-yellow-500',
      development: 'bg-blue-500',
      design: 'bg-purple-500',
      planned: 'bg-gray-400'
    };
    return colors[status] || 'bg-gray-400';
  };

  const getStatusLabel = (status) => {
    const labels = {
      active: '🟢 Activo',
      progress: '🟡 En progreso',
      development: '🟢 En desarrollo',
      design: '🟡 En diseño',
      planned: '🔵 Planeado'
    };
    return labels[status] || '🔵 Planeado';
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Ejecutivo */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="logo.png"
              alt="All In One Empire Logo"
              className="h-12 w-auto object-contain logo-minimalist"
            />
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">🏝️ All In One Empire</h1>
              <p className="text-base md:text-lg opacity-90">Ecosistema Premium Los Cabos - Dashboard Ejecutivo 2025</p>
            </div>
          </div>

          {/* KPIs Principales */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur cursor-help group relative">
              <div className="text-xs opacity-80">Ocupación Hotelera</div>
              <div className="text-xl font-bold">{marketData.ocupacion}%</div>
              <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-10">
                % de habitaciones ocupadas vs disponibles en Los Cabos
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur cursor-help group relative">
              <div className="text-xs opacity-80">ADR</div>
              <div className="text-xl font-bold">${marketData.adr}</div>
              <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 w-56 bg-gray-900 text-white text-xs rounded p-2 z-10">
                Average Daily Rate: Tarifa promedio por noche de hotel en USD
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur cursor-help group relative">
              <div className="text-xs opacity-80">RevPAR</div>
              <div className="text-xl font-bold">${marketData.revpar}</div>
              <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 w-56 bg-gray-900 text-white text-xs rounded p-2 z-10">
                Revenue Per Available Room: Ingreso por habitación disponible (ADR × Ocupación)
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur cursor-help group relative">
              <div className="text-xs opacity-80">Turismo Int.</div>
              <div className="text-xl font-bold">{marketData.turistasInternacionales}%</div>
              <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-10">
                Porcentaje de turistas extranjeros (principalmente USA)
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur cursor-help group relative">
              <div className="text-xs opacity-80">Cruceros</div>
              <div className="text-xl font-bold">{(marketData.cruceros/1000).toFixed(0)}K</div>
              <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-10">
                K = Miles. 606K = 606,000 pasajeros de cruceros en 2025
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur cursor-help group relative">
              <div className="text-xs opacity-80">Embarcaciones</div>
              <div className="text-xl font-bold">{(marketData.embarcaciones/1000).toFixed(0)}K</div>
              <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-10">
                K = Miles. 40K = 40,000 embarcaciones registradas +30 pies
              </div>
            </div>
          </div>
        </div>

        {/* Contexto del Mercado */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-5 mb-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              📊 Contexto del Mercado Los Cabos 2025
            </h3>
            <button
              onClick={() => toggleSection('market')}
              className="text-green-600 hover:text-green-800 text-sm font-semibold"
            >
              {expandedSection === 'market' ? 'Ocultar Detalles' : 'Ver Detalles'}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">🏨 Infraestructura Hotelera</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• <strong>{marketData.gruposHoteleros}+ grupos hoteleros</strong> operando</li>
                <li>• <strong>{marketData.habitaciones.toLocaleString()} habitaciones</strong> disponibles</li>
                <li>• <strong>{marketData.habitacionesLuxury.toLocaleString()} cuartos luxury</strong> (~250 por resort)</li>
                <li>• Ocupación récord: <strong>84% en marzo</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">👥 Perfil del Turista</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• <strong>{marketData.turistasRepetitivos}% turistas repetitivos</strong></li>
                <li>• Gasto luxury: <strong>${marketData.gastoPromedioLuxury.toLocaleString()} USD/noche</strong></li>
                <li>• <strong>USA principal origen</strong> (80-85%)</li>
                <li>• California: <strong>{marketData.californiaTuristas}%</strong> de turistas USA</li>
                <li>• Turismo nacional: hasta <strong>{marketData.turistasNacionales}% en verano</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">⚓ Infraestructura Náutica</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• <strong>{marketData.muelles} muelles</strong> en Marina CSL</li>
                <li>• <strong>{(marketData.embarcaciones/1000).toFixed(0)}K+ embarcaciones</strong> registradas (+30 pies)</li>
                <li>• <strong>{marketData.yatesMes} yates/mes</strong> promedio arribos</li>
                <li>• <strong>{marketData.crucerosArribos} cruceros</strong> en 2025 (+36%)</li>
                <li>• Centro náutico clave del <strong>Pacífico mexicano</strong></li>
              </ul>
            </div>
          </div>

          {expandedSection === 'market' && (
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">📈 Crecimiento Turístico</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Recuperación sostenida: +2.1% visitantes vs 2024</li>
                    <li>• Turismo internacional predominante (80-85%)</li>
                    <li>• Mercado USA: California representa 40% del turismo americano</li>
                    <li>• Turismo nacional repunta en verano hasta 40%</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">💰 Impacto Económico</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Impacto cruceros: >$54 millones USD en 2025</li>
                    <li>• Gasto promedio luxury: >$2,400 USD por noche</li>
                    <li>• 4.5M pasajeros anuales en BCS (54% extranjeros)</li>
                    <li>• 97+ socios hoteleros registrados</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-xs text-gray-600">
                  <strong>Fuentes:</strong> FITURCA, Observatorio Turístico Los Cabos, DataTur/SECTUR, Asociación de Hoteles BCS, API Cabo San Lucas
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Selector de Unidades de Negocio */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800">📊 15 Unidades de Negocio + Plataforma Central</h2>
          <div className="mb-3 bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-orange-500 p-3 rounded-lg">
            <p className="text-sm font-semibold text-orange-900">⭐ DESTACADO: Allin1 Marine & Auto Workshop - Concepto revolucionario dual</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {businessUnits.map((unit) => {
              const Icon = unit.icon;
              return (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit.id)}
                  className={`p-3 rounded-xl transition-all transform hover:scale-105 ${
                    selectedUnit === unit.id
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-xl'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1 mx-auto" />
                  <div className="text-xs font-semibold text-center leading-tight">{unit.name.replace('Allin1 ', '').replace('allin1cabo.com', 'Plataforma')}</div>
                  <div className="mt-1 text-xs">
                    {getStatusLabel(unit.status)}
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setSelectedUnit('overview')}
            className="mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            📈 Ver Todas las Unidades (Vista General)
          </button>
        </div>

        {/* Vista General */}
        {selectedUnit === 'overview' && (
          <div className="grid md:grid-cols-2 gap-4">
            {businessUnits.map((unit) => {
              const Icon = unit.icon;
              return (
                <div key={unit.id} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-gray-800">{unit.name}</h3>
                        <span className="text-xs text-gray-600">{getStatusLabel(unit.status)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{unit.revenue}</div>
                      <div className="text-xs text-green-600 font-semibold">{unit.growth}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-700 mb-2">
                    <span className="font-semibold">📍</span> {unit.locations}
                  </div>
                  <div className="text-xs text-gray-600 italic bg-blue-50 p-2 rounded-lg">
                    💡 {unit.justificacion}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Vista Detallada de Unidad Seleccionada */}
        {selectedUnit !== 'overview' && (
          <div className="bg-white rounded-xl shadow-2xl p-6">
            {businessUnits
              .filter((unit) => unit.id === selectedUnit)
              .map((unit) => {
                const Icon = unit.icon;
                return (
                  <div key={unit.id}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-800">{unit.name}</h2>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                            {getStatusLabel(unit.status)}
                          </span>
                          <span className="text-lg font-bold text-blue-600">{unit.revenue}</span>
                          <span className="text-sm text-green-600 font-semibold">{unit.growth}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-semibold">📍</span> {unit.locations}
                        </div>
                      </div>
                    </div>

                    {/* KPIs Principales */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                      {Object.entries(unit.kpis).map(([key, value]) => {
                        const description = unit.kpiDescriptions ? unit.kpiDescriptions[key] : '';
                        return (
                          <div key={key} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border-2 border-blue-200 cursor-help group relative">
                            <div className="text-xs text-gray-600 uppercase font-semibold mb-1">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-xl font-bold text-blue-700">{value}</div>
                            {description && (
                              <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 w-56 bg-gray-900 text-white text-xs rounded p-2 z-20">
                                <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong><br/>
                                {description}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Secciones Desplegables */}
                    <div className="space-y-3">
                      {/* Justificación Metodológica */}
                      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-4 border-l-4 border-blue-600">
                        <button
                          onClick={() => toggleSection('justificacion')}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h3 className="font-bold text-base text-gray-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Justificación Metodológica
                          </h3>
                          <span className="text-blue-600">
                            {expandedSection === 'justificacion' ? '▼' : '▶'}
                          </span>
                        </button>
                        {expandedSection === 'justificacion' && (
                          <p className="text-sm text-gray-700 leading-relaxed mt-3">{unit.justificacion}</p>
                        )}
                      </div>

                      {/* Segmento de Clientes */}
                      <div className="bg-purple-50 rounded-lg p-3 border-2 border-purple-200">
                        <button
                          onClick={() => toggleSection('segmento')}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h4 className="font-bold text-sm text-purple-800 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Segmento Clientes
                          </h4>
                          <span className="text-purple-600">
                            {expandedSection === 'segmento' ? '▼' : '▶'}
                          </span>
                        </button>
                        {expandedSection === 'segmento' && (
                          <p className="text-xs text-gray-700 mt-2">{unit.segmentoClientes}</p>
                        )}
                      </div>

                      {/* Fuentes de Ingreso */}
                      <div className="bg-green-50 rounded-lg p-3 border-2 border-green-200">
                        <button
                          onClick={() => toggleSection('fuentes')}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h4 className="font-bold text-sm text-green-800 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Fuentes Ingreso
                          </h4>
                          <span className="text-green-600">
                            {expandedSection === 'fuentes' ? '▼' : '▶'}
                          </span>
                        </button>
                        {expandedSection === 'fuentes' && (
                          <p className="text-xs text-gray-700 mt-2">{unit.fuentesIngreso}</p>
                        )}
                      </div>

                      {/* Propuesta de Valor */}
                      <div className="bg-orange-50 rounded-lg p-3 border-2 border-orange-200">
                        <button
                          onClick={() => toggleSection('propuesta')}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h4 className="font-bold text-sm text-orange-800 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Propuesta Valor
                          </h4>
                          <span className="text-orange-600">
                            {expandedSection === 'propuesta' ? '▼' : '▶'}
                          </span>
                        </button>
                        {expandedSection === 'propuesta' && (
                          <p className="text-xs text-gray-700 mt-2">{unit.propuestaValor}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* Metodología del Curso */}
        <div className="mt-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Info className="w-5 h-5" />
              📚 Metodología: De la idea al plan de negocios
            </h3>
            <button
              onClick={() => toggleSection('metodologia')}
              className="text-gray-300 hover:text-white text-sm font-semibold"
            >
              {expandedSection === 'metodologia' ? 'Ocultar' : 'Ver Detalles'}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-3 text-xs">
            <div>
              <h4 className="font-semibold mb-2">✅ 3 Fuerzas del Negocio</h4>
              <ul className="space-y-1 opacity-90">
                <li>• Emprendedor: Equipo con experiencia validada</li>
                <li>• Oportunidad: Mercado 79% ocupación, 605K cruceros</li>
                <li>• Recursos: Tecnología, flota, alianzas, capital</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">✅ Validación Oportunidades</h4>
              <ul className="space-y-1 opacity-90">
                <li>• Problema: Fragmentación servicios premium</li>
                <li>• Solución 3x mejor: Ecosistema integrado digital</li>
                <li>• Mercado: $54M+ impacto económico anual</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">✅ Modelo Negocio</h4>
              <ul className="space-y-1 opacity-90">
                <li>• CLV optimizado por recurrencia (42% repetitivos)</li>
                <li>• CAC bajo via marketing digital</li>
                <li>• Escalabilidad: app centraliza ecosistema</li>
              </ul>
            </div>
          </div>

          {expandedSection === 'metodologia' && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold mb-2 text-cyan-300">🎯 Aplicación Específica al Proyecto</h5>
                  <ul className="space-y-2 text-gray-300">
                    <li><strong>Mapa de Valor:</strong> Aliviadores de frustraciones (burocracia en renta de embarcaciones → app con reservas 100% digitales)</li>
                    <li><strong>Creadores de Alegrías:</strong> Experiencias personalizadas (servicio de concierge 24/7)</li>
                    <li><strong>Business Model Canvas:</strong> Diversificación ingresos (comisiones 30%, renta propiedades 40%)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-cyan-300">💡 Justificaciones Pedagógicas</h5>
                  <ul className="space-y-2 text-gray-300">
                    <li><strong>Programa de lealtad:</strong> "El curso enfatiza que la recurrencia incrementa el CLV"</li>
                    <li><strong>Alianzas financieras:</strong> "Priorizamos alianzas con Visa/MasterCard para reducir riesgos regulatorios"</li>
                    <li><strong>Punto de equilibrio:</strong> "Calculamos el breakeven en 18 meses considerando costos fijos y margen de contribución"</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;